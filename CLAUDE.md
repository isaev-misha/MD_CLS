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

## What is built

| Artifact | File | Does |
|---|---|---|
| `x_1000748_cls_crash` | `src/fluent/crash.now.ts` | Crash data. Plain table, **not** `task`. |
| `x_1000748_cls_geocode_review` | `src/fluent/geocode-review.now.ts` | The exception queue. Extends `task`. |
| `LRSClient` | `src/server/LRSClient.server.js` | Linear referencing against an ArcGIS feature service. |
| `CrashGeocoder` | `src/server/CrashGeocoder.server.js` | The evidence ladder and confidence scoring. |
| Create geocode review | `src/server/CreateGeocodeReview.server.js` | Opens one review per unplaceable crash. |
| Geocode / Apply resolution / Accept candidate | `src/fluent/ui-actions.now.ts` | The three buttons the demo presses. |
| 5 properties | `src/fluent/properties.now.ts` | Endpoint, radius, timeout, tolerance, threshold. |
| 8 crashes + 6 reviews | `src/fluent/demo-data.now.ts` | Staged demo content (`installMethod: 'demo'`). |
| `Crash Location Services` workspace | `src/fluent/workspaces/crash-location/` | Reviewer experience. **Does not route yet** — see below. |

### The workspace does not route yet — open problem

`src/fluent/workspaces/crash-location/` declares a `Workspace`, a `UxListMenuConfig`
and a `Dashboard`, it builds and installs cleanly, and **`/now/crash-location/home`
returns "Page not found"** — every route, bare path included, for an admin.

Do not spend the afternoon looking for a missing record. Verified present, in scope,
active and correctly cross-linked on dev412677: the page registry, the app config
(`landing_path=home`), four UX app routes, four screens each with a Page Definition,
four screen types, the root macroponent ("Workspace App Shell"). The registry record
is field-for-field identical to the working CMDB workspace apart from its own ids.

Also ruled out, each by measurement:

- **Roles** — the `claude` user has `admin`, `x_1000748_cls.reviewer` and `canvas_user`.
- **Cache** — flushed via `/cache.do`, no change.
- **The URL pattern** — `/now/cmdb/home`, `/now/ef-demo/home`, `/now/app-manager/home`
  and two other custom experiences all resolve. Ours is uniquely unreachable.
- **The 404 itself** — it is the *classic* not-found page (27 KB, `notfound_message`),
  not the UX router's. A resolving experience returns ~160-380 KB. So the platform
  never recognises `crash-location` as a UX path at all.

UI Builder opens the experience with an empty canvas, which points at the record graph
rather than at routing config, but nothing in that graph is visibly wrong.

**Next step when this is picked up:** build a throwaway workspace through the platform's
own UI, then diff its `sys_ux_*` records against ours. That gives ground truth on what
the SDK's `Workspace` plugin does not emit, which is the only remaining theory.

One thing that WAS wrong and is now fixed, though it did not fix the routing: the
`ux_route` ACL name. Every OOB one is `now.<path>.*` — `now.assetworkspace.*`,
`now.app-manager.*`. The SDK's workspace guide still shows the deprecated
`table: 'now'` + `field: '<path>.*'` pair and warns both are ignored for `ux_route`;
translating that to `name` means carrying the prefix across, because `table` **was**
the `now.` prefix. A non-matching name means no rule allows the route, and the failure
looks exactly like the one above — including for admin, since `adminOverrides` only
applies to an ACL that is actually consulted.

### UI actions do not appear in a configurable workspace unless flagged

A configurable workspace renders **none** of a table's UI actions unless the record
carries `format_for_configurable_workspace`. The classic form flags do not imply it, so
Geocode, Apply resolution and Accept candidate were all invisible in a workspace record
page that showed only Save and Delete.

The SDK exposes this as a `workspace` block the API docs do not mention — found by
reading the field mapping in the shipped bundle:

```ts
workspace: { isConfigurableWorkspace: true, showFormButtonV2: true }
```

Two constraints that follow from it:

- **A workspace UI action can only BE a form button.** The SDK rejects
  `isConfigurableWorkspace` without `showFormButtonV2` or `showFormMenuButtonV2`
  (TS112); there is no workspace equivalent of a list banner button. A list-wide action
  like Reset demo therefore needs a form home to exist in a workspace at all.
- **A form button needs `showUpdate: true`** or it never renders on a saved record,
  whatever the form flags say.

### Through the SDK, a list UI action always demands a selection

Reset demo answered **"No records selected"** from every list rendering — banner
button, related link and bottom button alike. Two rounds of fixing failed before the
cause was clear, so it is written down here rather than rediscovered:

- It is **not** `list.showButton` (`list_button`). Dropping that removed the bottom
  button and changed nothing else.
- It is `list_action`, which the platform reads as *action on selected records* — and
  which the SDK derives from the **presence of a `list` block**. No property turns it
  off. The tell in the DOM is `class="selected_action"` on a button sitting in the list
  banner.

So through `UiAction`, any list UI action requires a selection, and a demo reset has
nothing to select. Reset demo is therefore a **form button** on any crash record
(verified end to end) plus the workspace overflow menu. A working banner button would
need a raw `Record({ table: 'sys_ui_action' })` with `list_action` false — untested.

### The demo borrows 13 cross-scope privileges

Everything the app does at runtime reaches from `x_1000748_cls` into global: the REST
client that calls the Road Inventory, the GlideRecord verbs, `gs.*`, `gs.getProperty`.
The PDI granted all 13 silently on first use and flashed three blue banners across the
crash list mid-reset. `src/fluent/cross-scope.now.ts` now declares them — read off the
instance after a full run-through, not guessed. An instance that does not auto-grant
fails silently instead: no route from the geocoder, nothing deleted by the reset.

### Reset demo covers the whole demo, and the ordering matters

It used to reset only the two hero crashes, which left the review-queue scenes
un-repeatable — one press of Apply resolution in rehearsal and CRSH0001031 stays
`manual`/Located and GCR0001002 stays closed for good.

`DemoReset` now restores all eight crashes and all six queue tasks. **Reviews are
reopened before their crashes go back to `needs_review`**, because `CreateGeocodeReview`
skips a crash that already has an active review; the other way round, every reset stacks
a second review onto every backlog crash. Its values duplicate `demo-data.now.ts` — the
two must be changed together, since there is no runtime handle on the installed demo
records to read them back from.

### The evidence ladder

`CrashGeocoder` resolves in order of how trustworthy the evidence is: officer's
route + milemarker → cruiser GPS snapped to the network → narrative address text →
hand it to a person. Each rung records *how* it got there in `geocode_method`.

**Snap distance is the confidence signal**, not a vague score. Four metres from the
centreline means the point is on that road; 380 m means something is wrong with the
point. `snap_tolerance_m` (default 50) is the single number that decides how big the
review queue is.

Two refusals are deliberate and should not be "fixed":

- **Concurrent routes are not guessed at.** Where Route 9 and Route 30 share pavement,
  one coordinate belongs to two `route_id`s. `resolveReportedRoute` returns
  `ambiguous` rather than picking, and the crash goes to review.
- **The address rung is not wired to a geocoding service.** Esri's public geocoder
  permits anonymous calls for *display*, not for *storing* results — and this table
  stores them. On the customer demo instance this needs a real ArcGIS key or an
  Enterprise locator.

### The candidate/resolved split

The review carries `candidate_*` (what the geocoder guessed) separately from
`resolved_*` (what the reviewer decided). `Accept candidate` copies one to the other
but does **not** close the task; only `Apply resolution` writes back to the crash, and
it stamps `geocode_method = manual`. A machine guess must never become the record of
truth without a person in the path — that is the demo's whole argument, and collapsing
these two field groups would destroy it.

### Measures here are interpolated, not authoritative

`LRSClient` interpolates measure between the vertices of a **published yearly extract**.
A real LRS server uses calibration points, and where a road was realigned without
re-stretching its measures the two disagree. MassDOT runs **ArcGIS Enterprise**, so
production would call their LRS (`geometryToMeasure` / `measureToGeometry`) instead —
which is why the endpoint is `x_1000748_cls.lrs.service_url` and not a constant.

Say this out loud if asked in a demo. Claiming these measures are authoritative is the
fastest way to lose a room that knows linear referencing.

## Instance and scope

| | |
|---|---|
| Instance | `https://dev412677.service-now.com` (PDI) |
| SDK credential alias | `dev412677` (the default profile; basic auth, user `claude`, has admin) |
| Scope | `x_1000748_cls` |
| scopeId | `00d8cda7d32a41ceb8e3c95deb3721b4` |
| App name | `Crash Location Services` |

### Instance moved 2026-09-17 — dev426248 → dev412677

The original PDI **dev426248 broke** (HTTP 502) and was replaced by `dev412677`. The app was rebuilt
from git rather than migrated — nothing was exported from the dead instance.

Moving instances took **three** changes, not the one it looked like:

1. `.github/workflows/deploy.yml` — the instance URL
2. The app had to be **registered** on the new instance with `now-sdk init`. `install` resolves the
   app by the `scopeId` in `now.config.json` and has no `--create` flag, so a scope that has never
   been registered there fails with *"application was null"*.
3. The scope had to be **renamed** to match the new instance's vendor prefix — see below. This is
   the one that cost the most time, because the failure mode looks identical to (2).

The GitHub secret `SN_PASSWORD` did not need changing, since the replacement `claude` user reuses
the old password.

### Vendor prefixes are per INSTANCE, not per developer account

Measured, not assumed: dev426248's prefix was `x_2133493_`; the replacement PDI **dev412677's is
`x_1000748_`** — same developer, same account, different prefix. Do not expect a prefix to carry
across instances.

`now-sdk init` warns when a scope name does not carry the instance prefix: *"Applications with
non-matching prefixes may not install correctly on this instance."* A first scaffold used a bare
`x_md_cls` and was discarded and re-run for this reason.

**That warning is not advisory — it is fatal, and it fails late and confusingly.** `init` reports
*"Application created successfully"* for a mismatched scope and writes a scopeId, but nothing is
persisted: `sys_scope` stays empty. The install then fails with `Unable to install application as
application was null`, and the server-side execution tracker says only the same thing. The real
cause is that the platform refuses to *create* an app whose scope does not carry the instance's
vendor prefix, so there is no application for the zip install to land in.

The app was therefore renamed `x_2133493_cls` → `x_1000748_cls` on 2026-09-17. The recipe, if an
instance ever changes again:

1. `now-sdk init` in a throwaway directory with the new scope name to register it and mint a scopeId
2. Global `x_<old>_` → `x_<new>_` across `src/`, skipping `generated/`
3. Update `scope` and `scopeId` in `now.config.json`
4. Delete `src/fluent/generated/keys.ts` and rebuild — table names are part of its composite keys,
   so it must regenerate

Step 4 mints fresh sys_ids. Harmless on an instance the app has never been installed to; on one
where it has, it orphans every existing record instead of updating it.

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
             --scopeName x_1000748_cls \
             --packageName "md-cls" \
             --auth dev412677 --template base
```

`--appName` has a 4-character minimum. `init` writes to the instance — it **registers the scope**,
and `install` then looks the app up by the `scopeId` in `now.config.json`. On an instance where
`init` has never run, install fails with *"Unable to install application as application was null"*.
There is no `--create` flag on `install`; registering the scope once per instance is the only route.

### The auth prompt needs a real TTY

`now-sdk auth --add` masks its password prompt and reads from a terminal. Piping stdin, or running
it through Claude Code's `!` prefix, fails with `ERROR: User force closed the prompt with 0 null`.
It has to be run from an actual PowerShell or Git Bash window:

```bash
now-sdk auth --add https://<instance>.service-now.com --type basic --alias <instance>
```

The username prompt defaults to `admin`; this project's user is `claude`.

To authenticate without storing anything — the only option when no human is at a console — use CI
mode per command instead:

```bash
SN_SDK_NODE_ENV=SN_SDK_CI_INSTALL \
SN_SDK_INSTANCE_URL=https://<instance>.service-now.com \
SN_SDK_USER=claude SN_SDK_USER_PWD='<password>' \
now-sdk <command>
```

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
npx now-sdk dependencies -a dev412677   # regenerates gitignored @types/
npx now-sdk build                 # compile src/fluent -> installable package
npx now-sdk explain <topic>       # Fluent SDK documentation
```

Verified working as of scaffold: `npm install`, `now-sdk dependencies -a dev412677`, `now-sdk build`.
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
binding at `node_modules/libxmljs2/build/Release/xmljs.node`, `now-sdk dependencies -a dev412677`
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
