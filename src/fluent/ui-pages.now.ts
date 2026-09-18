import { Record } from '@servicenow/sdk/core'

/**
 * The map page.
 *
 * Fluent has no `UiPage()` constructor — there is no uipage-api in the shipped
 * docs and no export for it — so the page is declared as a raw record, the same
 * way the workspace form actions are.
 *
 * Reached at:
 *   /x_1000748_cls_crash_map.do?sysparm_table=<table>&sysparm_sys_id=<sys_id>
 *
 * The record is named `crash_map`, NOT `x_1000748_cls_crash_map`: the platform
 * prefixes the scope onto the endpoint itself, so a name carrying the prefix is
 * served at `x_1000748_cls_x_1000748_cls_crash_map.do` and every sensible URL
 * 404s.
 *
 * It accepts both the crash table and the review table, because the two tell
 * different halves of the story: a crash shows the reported point against the
 * resolved one, and a review shows the geocoder's candidate against the
 * reviewer's resolution.
 */
Record({
    $id: Now.ID['page-crash-map'],
    table: 'sys_ui_page',
    data: {
        name: 'crash_map',
        category: 'general',
        description:
            'Draws a crash or a geocode review on the MassDOT Road Inventory: the reported GPS point, the position derived from route + measure, and the distance between them.',
        direct: false,
        html: Now.include('../server/crash-map-page.xhtml'),
    },
})
