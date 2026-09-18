import { UiAction, Record } from '@servicenow/sdk/core'

/**
 * Geocode — the button pressed in scenes 2 and 3 of the demo.
 *
 * In production this work is a nightly batch (CrashGeocoder.geocodePending).
 * The button exists so the resolution is visible happening, rather than being
 * something that already happened before anyone walked into the room.
 */
const geocodeCrash = UiAction({
    $id: Now.ID['ua-geocode-crash'],
    table: 'x_1000748_cls_crash',
    name: 'Geocode',
    actionName: 'geocode_crash',
    hint: 'Resolve this crash to a route and measure',
    showInsert: false,
    showUpdate: true,
    order: 100,
    active: true,
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
        style: 'primary',
    },
    // A configurable workspace renders NONE of a table's UI actions unless they
    // are flagged for it — the workspace record page showed only Save and Delete
    // until this was set. `form.showButton` governs the classic form; this governs
    // the workspace, and both are needed because the demo uses both.
    workspace: { isConfigurableWorkspace: true, showFormButtonV2: true },
    script: `var geocoder = new CrashGeocoder();
var outcome = geocoder.geocodeRecord(current);

if (outcome.state === 'located') {
    gs.addInfoMessage('Located on ' + outcome.routeId + ' at measure ' + outcome.measure +
        ' (' + outcome.distanceM + ' m from centreline, confidence ' + outcome.confidence + ').');
} else {
    gs.addErrorMessage('Could not place this crash: ' + outcome.message +
        ' A review task has been opened.');
}

action.setRedirectURL(current);`,
})

/**
 * Apply resolution — scene 4.
 *
 * The moment a human answer becomes the record of truth. Everything up to here
 * has kept the machine's guess and the person's answer apart on purpose; this
 * is the only path that moves one into the other, and it stamps the crash with
 * `manual` so the history says a person did it.
 */
const applyResolution = UiAction({
    $id: Now.ID['ua-apply-resolution'],
    table: 'x_1000748_cls_geocode_review',
    name: 'Apply resolution',
    actionName: 'apply_geocode_resolution',
    hint: 'Write the reviewed location back to the crash and close this task',
    showInsert: false,
    showUpdate: true,
    order: 100,
    active: true,
    condition: 'current.resolved_route_id != "" && current.active == true',
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
        style: 'primary',
    },
    // The button the whole demo turns on. Primary in the workspace, not tucked
    // into the overflow menu.
    workspace: { isConfigurableWorkspace: true, showFormButtonV2: true },
    script: `var routeId = current.getValue('resolved_route_id');
var measure = current.getValue('resolved_measure');

if (!routeId || measure === null || measure === '') {
    gs.addErrorMessage('Enter both a resolved route and a resolved measure first.');
    action.setRedirectURL(current);
} else {
    var grCrash = new GlideRecord('x_1000748_cls_crash');

    if (grCrash.get(current.getValue('crash'))) {
        grCrash.setValue('route_id', routeId);
        grCrash.setValue('measure', measure);
        grCrash.setValue('geocode_method', 'manual');
        grCrash.setValue('geocode_state', 'located');
        grCrash.setValue('geocode_confidence', 100);
        grCrash.setValue('geocode_message', 'Located by ' + gs.getUserDisplayName());
        grCrash.update();

        current.setValue('state', 3);
        current.setValue('active', false);
        current.work_notes = 'Applied ' + routeId + ' at measure ' + measure + ' to crash ' +
            grCrash.getValue('number') + '.';
        current.update();

        gs.addInfoMessage('Crash ' + grCrash.getValue('number') + ' located on ' + routeId +
            ' at measure ' + measure + '.');
        action.setRedirectURL(grCrash);
    } else {
        gs.addErrorMessage('The crash this review points at no longer exists.');
        action.setRedirectURL(current);
    }
}`,
})

/**
 * Accept candidate — a convenience on the queue.
 *
 * Copies the geocoder's guess into the reviewer's fields. It does NOT close the
 * task: the reviewer still presses Apply. Saving typing is fine; skipping the
 * human decision is the one thing this system is built not to do.
 */
const acceptCandidate = UiAction({
    $id: Now.ID['ua-accept-candidate'],
    table: 'x_1000748_cls_geocode_review',
    name: 'Accept candidate',
    actionName: 'accept_geocode_candidate',
    hint: "Copy the geocoder's candidate into the resolved fields for review",
    showInsert: false,
    showUpdate: true,
    order: 200,
    active: true,
    condition: 'current.candidate_route_id != "" && current.active == true',
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
    },
    workspace: { isConfigurableWorkspace: true, showFormButtonV2: true },
    script: `current.setValue('resolved_route_id', current.getValue('candidate_route_id'));
current.setValue('resolved_measure', current.getValue('candidate_measure'));
current.update();

gs.addInfoMessage('Candidate copied into the resolved fields. Check it, then press Apply resolution.');
action.setRedirectURL(current);`,
})

/**
 * Reset demo — a form button on any crash record.
 *
 * Not part of the demo itself; it is what makes the demo repeatable. Press it
 * between rehearsals so the second run looks exactly like the first: all eight
 * crashes and all six queue tasks go back to their installed state.
 *
 * It lives on the form rather than the list, which is not where you would put it
 * by choice — see the note below.
 */
const resetDemo = UiAction({
    $id: Now.ID['ua-reset-demo'],
    table: 'x_1000748_cls_crash',
    name: 'Reset demo',
    actionName: 'reset_crash_demo',
    hint: 'Put every staged crash and review task back to its installed state',
    showInsert: false,
    // A form button needs showUpdate — without it the action never renders on a
    // saved record, whatever the form flags say. The script never touches
    // `current`, so pressing it from a crash record is safe and lands the
    // presenter back on the reset list.
    showUpdate: true,
    order: 300,
    active: true,
    // Reads as a contradiction and is not one: `isClient: false` keeps this a
    // server-side action (the emitted record still says client=false), and the two
    // compatibility flags are the only route the SDK offers to `ui16_compatible`,
    // which it otherwise writes as false. Verified in the built XML.
    client: { isClient: false, isUi11Compatible: true, isUi16Compatible: true },
    // No `list` block, and that is the conclusion of three rounds of testing on
    // the instance rather than a preference.
    //
    // Every list rendering of this action — banner button, related link, bottom
    // button — answered "No records selected." Dropping `showButton`
    // (`list_button`) removed the bottom button and changed nothing else. The
    // cause is `list_action`, which the platform reads as "action on selected
    // records" and which the SDK derives from the mere PRESENCE of a `list`
    // block; there is no property that turns it off. So through this API a list
    // UI action always demands a selection, and a demo reset has nothing to
    // select.
    //
    // A banner button that works would need a raw Record({table:'sys_ui_action'})
    // with list_action false — untested, and not worth a broken button in front
    // of a customer. The form button below is verified working.
    // The form button is the reset. Open any crash, press it — the script never
    // touches `current`, so it resets the whole demo from wherever you are and
    // lands you back on the crash list. Verified end to end on the instance.
    //
    // In the workspace it sits in the overflow menu rather than beside Save: a
    // UI action can only exist in a configurable workspace as a form button (the
    // SDK rejects `isConfigurableWorkspace` without one, TS112), and a bench
    // control does not belong next to the buttons a customer is watching.
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
    },
    workspace: { isConfigurableWorkspace: true, showFormMenuButtonV2: true },
    script: `var outcome = new DemoReset().run();

gs.addInfoMessage('Demo reset: ' + outcome.crashes + ' crash(es) back to Pending, ' +
    outcome.reviews + ' review task(s) removed, ' + outcome.restored + ' staged record(s) restored.');

if (outcome.missing.length) {
    gs.addErrorMessage('Not found on this instance: ' + outcome.missing.join(', ') +
        '. Re-deploy the demo data.');
}

// A list banner button has no 'current' record — redirect by URL, not by record,
// or this throws the moment it is pressed.
action.setRedirectURL('x_1000748_cls_crash_list.do');`,
})

/**
 * Register the four actions with the configurable workspace.
 *
 * `workspace: { isConfigurableWorkspace, showFormButtonV2 }` on the UiAction above
 * is necessary and NOT sufficient. It sets `format_for_configurable_workspace` and
 * `form_button_v2` on sys_ui_action — which the workspace reads only for actions
 * that are already registered as declarative actions for the table. Registration
 * is a row in `sys_ux_form_action`, and the SDK's UiAction does not emit one.
 *
 * Measured on dev412677 on 2026-09-18: with the flags set and no sys_ux_form_action
 * row, the workspace record page offered Save and Delete and nothing else. Adding
 * one row for Geocode made the button appear on the next load, with no other change.
 *
 * `specificity` 20 matches the OOB rows for table-specific actions (a global row is
 * lower); `action_type` 'ui_action' says this wraps a classic UI action rather than
 * a declarative action defined in UI Builder.
 */
/**
 * Map — draws the record on MassDOT's road network.
 *
 * The demo's central number is a distance, and a distance is far more convincing
 * drawn than read out. On a crash it shows the reported GPS point against the
 * position derived from route + measure; on a review it shows the geocoder's
 * candidate against the reviewer's resolution.
 *
 * Server-side rather than a client `window.open`, because a client UI action
 * needs a separate workspace client script to work in both places, and the
 * redirect behaves in classic and in the workspace alike. The page carries its
 * own way back.
 */
const mapCrash = UiAction({
    $id: Now.ID['ua-map-crash'],
    table: 'x_1000748_cls_crash',
    name: 'Map',
    actionName: 'map_crash',
    hint: 'Draw this crash on the MassDOT road network',
    showInsert: false,
    showUpdate: true,
    order: 200,
    active: true,
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
    },
    workspace: { isConfigurableWorkspace: true, showFormButtonV2: true },
    script: `action.setRedirectURL(
    'x_1000748_cls_crash_map.do?sysparm_table=' + current.getTableName() +
    '&sysparm_sys_id=' + current.getUniqueValue());`,
})

const mapReview = UiAction({
    $id: Now.ID['ua-map-review'],
    table: 'x_1000748_cls_geocode_review',
    name: 'Map',
    actionName: 'map_review',
    hint: 'Draw the candidate and the resolution on the MassDOT road network',
    showInsert: false,
    showUpdate: true,
    order: 200,
    active: true,
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
    },
    workspace: { isConfigurableWorkspace: true, showFormButtonV2: true },
    script: `action.setRedirectURL(
    'x_1000748_cls_crash_map.do?sysparm_table=' + current.getTableName() +
    '&sysparm_sys_id=' + current.getUniqueValue());`,
})

Record({
    $id: Now.ID['wsfa-geocode'],
    table: 'sys_ux_form_action',
    data: {
        name: 'Geocode',
        table: 'x_1000748_cls_crash',
        ui_action: geocodeCrash,
        action_type: 'ui_action',
        specificity: 20,
        active: true,
    },
})

Record({
    $id: Now.ID['wsfa-apply-resolution'],
    table: 'sys_ux_form_action',
    data: {
        name: 'Apply resolution',
        table: 'x_1000748_cls_geocode_review',
        ui_action: applyResolution,
        action_type: 'ui_action',
        specificity: 20,
        active: true,
    },
})

Record({
    $id: Now.ID['wsfa-accept-candidate'],
    table: 'sys_ux_form_action',
    data: {
        name: 'Accept candidate',
        table: 'x_1000748_cls_geocode_review',
        ui_action: acceptCandidate,
        action_type: 'ui_action',
        specificity: 20,
        active: true,
    },
})

Record({
    $id: Now.ID['wsfa-reset-demo'],
    table: 'sys_ux_form_action',
    data: {
        name: 'Reset demo',
        table: 'x_1000748_cls_crash',
        ui_action: resetDemo,
        action_type: 'ui_action',
        specificity: 20,
        active: true,
    },
})

Record({
    $id: Now.ID['wsfa-map-crash'],
    table: 'sys_ux_form_action',
    data: {
        name: 'Map',
        table: 'x_1000748_cls_crash',
        ui_action: mapCrash,
        action_type: 'ui_action',
        specificity: 20,
        active: true,
    },
})

Record({
    $id: Now.ID['wsfa-map-review'],
    table: 'sys_ux_form_action',
    data: {
        name: 'Map',
        table: 'x_1000748_cls_geocode_review',
        ui_action: mapReview,
        action_type: 'ui_action',
        specificity: 20,
        active: true,
    },
})
