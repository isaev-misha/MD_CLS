import { Workspace, Acl } from '@servicenow/sdk/core'
import { crashListConfig, reviewerRole, workspaceAdminRole } from './list-menu.now'

/**
 * The Crash Location Services workspace.
 *
 * Why a workspace at all, when the navigator modules already reach every record:
 * the demo's claim is that unplaceable crashes are *work*, not data. A reviewer
 * working a queue needs the queue, the record and the evidence on one screen, with
 * the next item one click away — which is what the workspace list/detail layout
 * gives and the classic form does not. The classic UI stays in place for the admin
 * half of the story; this is the reviewer half.
 *
 * Reachable at /now/crash-location/home once installed.
 *
 * The form that opens when a reviewer clicks a review is the declarative layout in
 * `layouts.now.ts` — the workspace renders the same record producer, so the
 * candidate/resolved split and its annotations carry over without being rebuilt.
 */
export const crashLocationWorkspace = Workspace({
    $id: Now.ID['ws-crash-location'],
    title: 'Crash Location Services',
    path: 'crash-location',
    landingPath: 'home',
    active: true,
    order: 100,
    tables: ['x_1000748_cls_geocode_review', 'x_1000748_cls_crash'],
    listConfig: crashListConfig,
})

/**
 * Route security.
 *
 * `name` must be `now.` + the workspace path + `.*`. The `now.` prefix is not
 * decoration: every OOB ux_route ACL on the instance is named that way
 * (`now.assetworkspace.*`, `now.app-manager.*`), and the route check looks for
 * exactly that name. The SDK's workspace guide still shows the deprecated
 * `table: 'now'` + `field: '<path>.*'` pair, and 4.12.2 warns both are ignored
 * for `ux_route` — but `table` WAS the `now.` prefix, so translating that pair
 * to `name` means carrying the prefix across, not dropping it.
 *
 * Getting this wrong does not read as a permissions problem. With no ACL whose
 * name matches the route, /now/crash-location/home renders "Page not found" —
 * for admin too, because `adminOverrides` only helps on an ACL that is actually
 * being consulted. Cost an hour of looking for a missing record that was there
 * all along.
 *
 * `adminOverrides` is left on so a plain admin sign-in (what the demo actually
 * uses) reaches the workspace without first granting itself the role.
 */
Acl({
    $id: Now.ID['ws-crash-location-acl'],
    type: 'ux_route',
    operation: 'read',
    name: 'now.crash-location.*',
    localOrExisting: 'Existing',
    active: true,
    adminOverrides: true,
    description: 'Admits geocode reviewers to the Crash Location Services workspace.',
    roles: [reviewerRole, workspaceAdminRole],
})
