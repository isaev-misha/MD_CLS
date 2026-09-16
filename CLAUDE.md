# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

A ServiceNow scoped application that geocodes crash records against the Massachusetts road
network, built as a **customer demo** for the MassDOT Crash Data and Geocoding System
opportunity. The bid-response workspace is a *separate* repo at
`C:\For me\AntigravityGoogle\MassDOT` — this one is the working software.

The point the demo has to make: a GIS tool can geocode a crash, but **nobody has a system for the
crashes that fail to geocode.** Those become human work — assignment, SLA, audit trail, correction
— and that is the part ServiceNow owns. Build the exception queue first; the happy path is the
easy half.

## Linear referencing — the domain concept this app exists to serve

Crash locations are **not** street addresses. They are a position **along a route**:
`route_id` + `measure` (distance from the route's start, in miles). A crash is a *point event* on
a route; a work zone or pavement section is a *linear event* spanning `from_measure` → `to_measure`.

**The stored truth is route + measure. Coordinates are derived for display.** This matters because
road geometry gets re-surveyed and realigned. Measures stored against a calibrated network survive
that; stored coordinates freeze against an alignment that no longer exists. With 9 million crash
records, that is the difference between a durable asset and a snapshot.

Two inverse conversions carry the whole integration:

| Operation | Direction | Fires when |
|---|---|---|
| `geometryToMeasure` | x/y → `route_id` + measure | Intake (GPS or geocoded address) and reviewer correction |
| `measureToGeometry` | `route_id` + measure → x/y | Every map render |

So you convert **in** once, and convert **out** forever.

Do not "simplify" this to storing lat/long. It is the single most load-bearing design decision
here, and a MassDOT evaluator who has run crash analysis for years will probe it.

## Data source — public, no API key required

MassDOT publishes the Road Inventory as an anonymously queryable, M-enabled ArcGIS feature service:

```
https://gis.massdot.state.ma.us/arcgis/rest/services/Roads/RoadInventoryYearEndFiles/FeatureServer/10
```

Verified: `esriGeometryPolyline`, **`hasM: true`**, capabilities `Query,Extract,ChangeTracking`,
maxRecordCount 2,000,000. Relevant fields: `route_id` (string), `from_measure` / `to_measure`
(double), `St_Name`, `Route_Number`, `Route_Direction`, `City` (smallint), `F_F_Class` (smallint).

Because the geometry carries M-values, nearest-segment snapping **and** measure interpolation can
both be done from this service alone — no Esri licence, no credits, no key.

For address text → x/y, Esri's public World Geocoding Service allows anonymous
`findAddressCandidates`. **Caveat:** anonymous use is licensed for *display*, not for *storing*
results, and this app stores them. Acceptable on a PDI; **not** acceptable on the customer demo
instance, which needs a real ArcGIS Online key or credits.

Also noted for later: `gis.crashdata.dot.mass.gov` hosts MassDOT's own IMPACT crash services.

## Instance and scope

| | |
|---|---|
| Instance | `https://dev426248.service-now.com` (PDI) |
| SDK credential alias | `dev426248` (the default profile; basic auth, user `claude`, has admin) |
| Scope | `x_2133493_cls` |
| scopeId | `d370c6491a0245c89576112b0d312e86` |
| App name | `Crash Location Services` |

### The instance vendor prefix is `x_2133493_`

`now-sdk init` warns when a scope name does not carry it: *"Applications with non-matching prefixes
may not install correctly on this instance."* A first scaffold used a bare `x_md_cls` and was
discarded and re-run for this reason.

Note the sibling project at `../dev426248` uses a bare `x_dtf` and its notes claim the instance
enforces no prefix. That is contradicted by SDK 4.12.2's own warning. Trust the warning.

### `now-sdk init` does not create an instance record — `install` does

The discarded `x_md_cls` scaffold left **nothing** on the PDI. Verified after the fact: both
`sys_scope` and `sys_app` contained only an unrelated `VHS rent` app, and the scopeId `init`
reported (`4e186eae838c4aa0a1f47778e264aea4`) returned *Record not found*. The scopeId is minted
client-side and the app record materialises on the instance only at first `now-sdk install`.

So a discarded scaffold needs no cleanup, and an app's absence from Application Manager before the
first deploy is expected, not a fault.

Scope names are capped at 18 characters.

### `now-sdk init` flags that avoid interactive prompts

`init` prompts — and therefore hangs headless — unless **all** of these are passed. Discovered one
prompt at a time; `init --help` itself hangs:

```bash
now-sdk init --appName "Crash Location Services" \
             --scopeName x_2133493_cls \
             --packageName "md-cls" \
             --auth dev426248 --template base
```

`--appName` has a 4-character minimum. `init` writes to the instance (it reserves the scope), so it
should not be run again in this project.

## Git-gated deployment

Git is the only sanctioned path to the instance. Repo: https://github.com/isaev-misha/MD_CLS

Push to `main` triggers `.github/workflows/deploy.yml`:
`npm ci` → `now-sdk dependencies` → `now-sdk build --frozenKeys --errorOnConflict` → `now-sdk install`.

CI authenticates in the SDK's CI mode (stores nothing): `SN_SDK_NODE_ENV=SN_SDK_CI_INSTALL` plus
`SN_SDK_INSTANCE_URL` / `SN_SDK_USER` / `SN_SDK_USER_PWD`, the last from repo secret `SN_PASSWORD`.

**Do not run `now-sdk install` locally** unless explicitly asked. It bypasses the pipeline and
leaves the instance in a state no commit describes.

**Always commit `src/fluent/generated/keys.ts`.** It maps `Now.ID` → `sys_id`. Without it CI mints
fresh sys_ids and *duplicates* records instead of updating them; `--frozenKeys` is the guard that
turns a stale or missing keys file into a failed build.

## Commands

```bash
npm install                       # or npm ci
npx now-sdk dependencies -a dev426248   # regenerates gitignored @types/
npx now-sdk build                 # compile src/fluent -> installable package
npx now-sdk explain <topic>       # Fluent SDK documentation
```

Verified working as of scaffold: `npm install`, `now-sdk dependencies -a dev426248`, `now-sdk build`.
No test or lint setup yet — add one when there is code worth testing.

## Node

Local machine runs **Node 24.x** (upgraded 2026-09-16) and has no `nvm`. CI pins **24**
(`.nvmrc`, `setup-node`). `engines.node` is `>=20.18.0` — the SDK's actual floor.

### Do not `winget uninstall` an old Node package after installing a new one

The winget IDs `OpenJS.NodeJS.20`, `OpenJS.NodeJS.LTS` and `OpenJS.NodeJS` all manage the **same**
installation at `C:\Program Files\nodejs`, and Node's MSI upgrades in place via a shared upgrade
code. Installing LTS over 20 therefore *replaces* it, and a follow-up
`winget uninstall --id OpenJS.NodeJS.20` **deletes Node entirely** — this happened here and left the
machine with no `node` or `npm` at all. Install the new package and stop.

Also note `winget upgrade --id OpenJS.NodeJS.20` reports "No available upgrade found": that package
ID is pinned to the 20.x line. Moving majors is always an *install* of a different package, never an
upgrade.

After any Node major change, re-run `npm install` — the SDK's native modules (`libxmljs2`,
`@swc/core`) are built against the Node ABI.

Verified on Node 24.19.0 / npm 11.17.0: `npm install` (lockfile unchanged), the `libxmljs2` native
binding at `node_modules/libxmljs2/build/Release/xmljs.node`, `now-sdk dependencies -a dev426248`
and `now-sdk build`. npm 11 warns that `@parcel/watcher`, `@swc/core` and `libxmljs2` have install
scripts "not yet covered by allowScripts" — the scripts still run today, but expect that to become
an error in a later npm.

### `npm` fails in PowerShell, not in Git Bash

`npm` from PowerShell can fail with *"npm.ps1 cannot be loaded because running scripts is disabled
on this system"* — that is the machine's `ExecutionPolicy` blocking npm's PowerShell shim, not a
broken install. Git Bash uses `npm.cmd` and is unaffected, so run npm from there. To fix PowerShell
itself: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## This is an SDK project, NOT a sn-scriptsync workspace

The user-level `~/.claude/CLAUDE.md` describes a different workflow — sn-scriptsync against the
`mcaddev` instance, file-based agent requests under `mcaddev/agent/requests/*.json`, and `_map.json`
sync files. **None of that applies here.** Do not create `agent/requests/` folders or look for
`_map.json`.

The ServiceNow *coding standards* in that file do still apply, since they are platform rules rather
than tooling rules: no `gs.now()` / `gs.nowDateTime()` in scoped apps (use `new GlideDateTime()`),
`getValue()` / `setValue()` rather than direct property access, semantic GlideRecord variable names
(`grCrash`, not `gr`), and Angular DI rather than an IIFE in Service Portal controllers.
