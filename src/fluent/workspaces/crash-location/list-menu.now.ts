import { UxListMenuConfig, Applicability, Role } from '@servicenow/sdk/core'

/**
 * Workspace navigation — the left rail of the Crash Location Services workspace.
 *
 * The ordering here is the demo's argument in miniature: the **review queue comes
 * first**, crashes second. A GIS tool opens on a map of everything it placed; this
 * opens on the work that is outstanding, because the exceptions are the part a
 * platform owns. Do not reorder these categories to put Crashes on top — the first
 * thing on screen is the whole point.
 *
 * These lists deliberately mirror the navigator modules in `navigation.now.ts`
 * rather than replacing them. The navigator is how an admin reaches the data; the
 * workspace is how a reviewer works it. Both are demonstrated.
 */

/**
 * The reviewer persona. `canvas_user` is what actually admits a user to a UX
 * experience — without it the workspace route renders an empty shell, whatever
 * the ACLs say.
 */
export const reviewerRole = Role({
    name: 'x_1000748_cls.reviewer',
    description:
        'Works the geocode review queue: investigates crashes the geocoder could not place and writes the authoritative route and measure back.',
    containsRoles: ['canvas_user'],
})

/**
 * The configuring persona. `canvas_admin` carries the right to open the workspace
 * in UI Builder, which is worth having on the demo instance so pages can be shown
 * being edited rather than only used.
 */
export const workspaceAdminRole = Role({
    name: 'x_1000748_cls.workspace_admin',
    description: 'Configures the Crash Location Services workspace and its pages.',
    containsRoles: ['canvas_admin'],
})

export const workspaceAudience = Applicability({
    $id: Now.ID['ws-applicability'],
    name: 'Crash Location Services Audience',
    description: 'Who sees the lists in the Crash Location Services workspace.',
    roles: [reviewerRole, workspaceAdminRole],
})

/**
 * `assigned_to` = the logged-in user. This is the OOB "Me" dynamic filter sys_id,
 * which is the only way to express a current-user condition in a stored encoded
 * query — `javascript:gs.getUserID()` (what the navigator module uses) is not
 * evaluated by the workspace list broker.
 */
const ASSIGNED_TO_ME = 'assigned_toDYNAMIC90d1921e5f510100a9ad2572f2b477fe^EQ'

export const crashListConfig = UxListMenuConfig({
    $id: Now.ID['ws-list-config'],
    name: 'Crash Location Services Lists',
    description: 'Navigation for the Crash Location Services workspace.',
    active: true,
    categories: [
        {
            $id: Now.ID['ws-cat-reviews'],
            title: 'Geocode review',
            order: 10,
            lists: [
                {
                    $id: Now.ID['ws-list-reviews-open'],
                    title: 'Open',
                    order: 10,
                    table: 'x_1000748_cls_geocode_review',
                    condition: 'active=true^EQ^ORDERBYopened_at',
                    columns: 'number,crash,reason,candidate_score,priority,assigned_to,state,opened_at',
                    applicabilities: [{ $id: Now.ID['ws-list-reviews-open-app'], applicability: workspaceAudience }],
                },
                {
                    $id: Now.ID['ws-list-reviews-mine'],
                    title: 'Assigned to me',
                    order: 20,
                    table: 'x_1000748_cls_geocode_review',
                    condition: `active=true^${ASSIGNED_TO_ME}`,
                    columns: 'number,crash,reason,candidate_score,priority,state,opened_at',
                    applicabilities: [{ $id: Now.ID['ws-list-reviews-mine-app'], applicability: workspaceAudience }],
                },
                {
                    $id: Now.ID['ws-list-reviews-unassigned'],
                    title: 'Unassigned',
                    order: 30,
                    table: 'x_1000748_cls_geocode_review',
                    condition: 'active=true^assigned_toISEMPTY^EQ^ORDERBYopened_at',
                    columns: 'number,crash,reason,candidate_score,priority,opened_at',
                    applicabilities: [{ $id: Now.ID['ws-list-reviews-unassigned-app'], applicability: workspaceAudience }],
                },
                {
                    $id: Now.ID['ws-list-reviews-all'],
                    title: 'All reviews',
                    order: 40,
                    table: 'x_1000748_cls_geocode_review',
                    condition: '',
                    columns: 'number,crash,reason,state,assigned_to,opened_at,closed_at',
                    applicabilities: [{ $id: Now.ID['ws-list-reviews-all-app'], applicability: workspaceAudience }],
                },
            ],
        },
        {
            $id: Now.ID['ws-cat-crashes'],
            title: 'Crashes',
            order: 20,
            lists: [
                {
                    $id: Now.ID['ws-list-crashes-needs-review'],
                    title: 'Needs review',
                    order: 10,
                    table: 'x_1000748_cls_crash',
                    condition: 'geocode_state=needs_review^EQ',
                    columns: 'number,crash_datetime,location_text,geocode_confidence,snap_distance_m,geocode_message',
                    applicabilities: [{ $id: Now.ID['ws-list-crashes-needs-review-app'], applicability: workspaceAudience }],
                },
                {
                    $id: Now.ID['ws-list-crashes-pending'],
                    title: 'Awaiting geocoding',
                    order: 20,
                    table: 'x_1000748_cls_crash',
                    condition: 'geocode_state=pending^EQ',
                    columns: 'number,crash_datetime,location_text,reported_route,reported_milemarker,latitude,longitude',
                    applicabilities: [{ $id: Now.ID['ws-list-crashes-pending-app'], applicability: workspaceAudience }],
                },
                {
                    $id: Now.ID['ws-list-crashes-located'],
                    title: 'Located',
                    order: 30,
                    table: 'x_1000748_cls_crash',
                    condition: 'geocode_state=located^EQ',
                    columns: 'number,crash_datetime,route_id,measure,street_name,municipality,geocode_method,geocode_confidence',
                    applicabilities: [{ $id: Now.ID['ws-list-crashes-located-app'], applicability: workspaceAudience }],
                },
                {
                    $id: Now.ID['ws-list-crashes-all'],
                    title: 'All crashes',
                    order: 40,
                    table: 'x_1000748_cls_crash',
                    condition: '',
                    columns: 'number,crash_datetime,location_text,geocode_state,geocode_method,route_id,measure,municipality',
                    applicabilities: [{ $id: Now.ID['ws-list-crashes-all-app'], applicability: workspaceAudience }],
                },
            ],
        },
    ],
})
