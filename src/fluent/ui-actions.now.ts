import { UiAction } from '@servicenow/sdk/core'

/**
 * Geocode — the button pressed in scenes 2 and 3 of the demo.
 *
 * In production this work is a nightly batch (CrashGeocoder.geocodePending).
 * The button exists so the resolution is visible happening, rather than being
 * something that already happened before anyone walked into the room.
 */
UiAction({
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
UiAction({
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
UiAction({
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
 * Reset demo — a list banner button on the crash table.
 *
 * Not part of the demo itself; it is what makes the demo repeatable. Press it
 * between rehearsals so the second run looks exactly like the first.
 */
UiAction({
    $id: Now.ID['ua-reset-demo'],
    table: 'x_1000748_cls_crash',
    name: 'Reset demo',
    actionName: 'reset_crash_demo',
    hint: 'Return the two hero crashes to Pending and clear their review tasks',
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
    // Offered three ways on purpose, because the banner button alone was reported
    // missing from the crash list. Banner buttons sit in the list title row, where
    // they are easy to lose; the related link under the list and the context-menu
    // entry both render unconditionally. Belt and braces on the one control that
    // has to work between two run-throughs.
    list: {
        showButton: true,
        showBannerButton: true,
        showLink: true,
        showContextMenu: true,
    },
    // Also a form button, because the list banner button alone could not be found
    // on the instance. A UI action is only expressible in a configurable workspace
    // as a form button — the SDK rejects `isConfigurableWorkspace` without one
    // (TS112), and there is no workspace equivalent of a banner button. So the
    // bench control rides on the record form, in the overflow menu rather than as
    // a primary button: reachable in both UIs, without putting a destructive-
    // sounding button next to Save in front of a customer.
    form: {
        showButton: true,
        showLink: false,
        showContextMenu: true,
    },
    workspace: { isConfigurableWorkspace: true, showFormMenuButtonV2: true },
    script: `var outcome = new DemoReset().run();

gs.addInfoMessage('Demo reset: ' + outcome.crashes + ' crash(es) back to Pending, ' +
    outcome.reviews + ' review task(s) removed.');

if (outcome.missing.length) {
    gs.addErrorMessage('Not found on this instance: ' + outcome.missing.join(', ') +
        '. Re-deploy the demo data.');
}

// A list banner button has no 'current' record — redirect by URL, not by record,
// or this throws the moment it is pressed.
action.setRedirectURL('x_1000748_cls_crash_list.do');`,
})
