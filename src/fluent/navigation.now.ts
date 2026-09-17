import { ApplicationMenu, Record } from '@servicenow/sdk/core'

/**
 * Navigator entry for the application.
 *
 * Without this the app has no presence in the "All" menu at all — every record
 * has to be reached by typing a table name, which is both awkward to rehearse
 * and a poor look in front of a customer. Caught during rehearsal.
 *
 * Roles are deliberately left unset on the menu and its modules. ACLs still
 * govern who can read the data; restricting the navigator as well would hide
 * the queue from any non-admin persona the demo might sign in as.
 */
const menu = ApplicationMenu({
    $id: Now.ID['menu-cls'],
    title: 'Crash Location Services',
    hint: 'Crash geocoding and the geocode review queue',
    description:
        'Crash records located against the Massachusetts road network, and the review queue for the ones that could not be placed automatically.',
    active: true,
})

// ---------------------------------------------------------------------
// Crashes
// ---------------------------------------------------------------------

Record({
    $id: Now.ID['mod-crashes'],
    table: 'sys_app_module',
    data: {
        title: 'Crashes',
        application: menu,
        link_type: 'LIST',
        name: 'x_1000748_cls_crash',
        hint: 'All crash records. The Reset demo button lives on this list.',
        active: true,
        order: 100,
    },
})

Record({
    $id: Now.ID['mod-crashes-pending'],
    table: 'sys_app_module',
    data: {
        title: 'Awaiting geocoding',
        application: menu,
        link_type: 'FILTER',
        name: 'x_1000748_cls_crash',
        filter: 'geocode_state=pending',
        hint: 'Crashes the geocoder has not processed yet',
        active: true,
        order: 200,
    },
})

Record({
    $id: Now.ID['mod-crashes-located'],
    table: 'sys_app_module',
    data: {
        title: 'Located',
        application: menu,
        link_type: 'FILTER',
        name: 'x_1000748_cls_crash',
        filter: 'geocode_state=located',
        hint: 'Crashes carrying an authoritative route and measure',
        active: true,
        order: 300,
    },
})

// ---------------------------------------------------------------------
// The review queue — the part of the demo that carries the argument
// ---------------------------------------------------------------------

Record({
    $id: Now.ID['mod-sep-reviews'],
    table: 'sys_app_module',
    data: {
        title: 'Geocode review',
        application: menu,
        link_type: 'SEPARATOR',
        active: true,
        order: 400,
    },
})

Record({
    $id: Now.ID['mod-reviews-open'],
    table: 'sys_app_module',
    data: {
        title: 'Open reviews',
        application: menu,
        link_type: 'FILTER',
        name: 'x_1000748_cls_geocode_review',
        filter: 'active=true^ORDERBYopened_at',
        hint: 'The queue, oldest first — this is the list scenes 3 and 5 are about',
        active: true,
        order: 500,
    },
})

Record({
    $id: Now.ID['mod-reviews-mine'],
    table: 'sys_app_module',
    data: {
        title: 'Assigned to me',
        application: menu,
        link_type: 'FILTER',
        name: 'x_1000748_cls_geocode_review',
        filter: 'active=true^assigned_to=javascript:gs.getUserID()',
        hint: 'What this reviewer personally owns',
        active: true,
        order: 600,
    },
})

Record({
    $id: Now.ID['mod-reviews-all'],
    table: 'sys_app_module',
    data: {
        title: 'All reviews',
        application: menu,
        link_type: 'LIST',
        name: 'x_1000748_cls_geocode_review',
        hint: 'Open and closed, for throughput questions',
        active: true,
        order: 700,
    },
})
