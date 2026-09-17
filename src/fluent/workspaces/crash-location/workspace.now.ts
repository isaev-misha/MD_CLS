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
 * `name` must be the workspace path followed by `.*` — it matches every route
 * under /now/crash-location. Get this wrong and the workspace is silently
 * unreachable for everyone but admin, which looks like a broken deploy. The
 * workspace guide still shows `table` / `field` here; SDK 4.12.2 warns that both
 * are deprecated for `ux_route` and ignored, so `name` is the only one that
 * actually secures anything.
 *
 * `adminOverrides` is left on so a plain admin sign-in (what the demo actually
 * uses) reaches the workspace without first granting itself the role.
 */
Acl({
    $id: Now.ID['ws-crash-location-acl'],
    type: 'ux_route',
    operation: 'read',
    name: 'crash-location.*',
    localOrExisting: 'Existing',
    active: true,
    adminOverrides: true,
    description: 'Admits geocode reviewers to the Crash Location Services workspace.',
    roles: [reviewerRole, workspaceAdminRole],
})
