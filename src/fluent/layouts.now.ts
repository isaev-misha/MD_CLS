import { Form, List, AnnotationType, default_view } from '@servicenow/sdk/core'

/**
 * Form and list layouts.
 *
 * These are not cosmetics. `x_1000748_cls_geocode_review` extends `task`, so it
 * inherits task's form — which knows nothing about `candidate_*` or `resolved_*`
 * and therefore does not show them. Scene 4 of the demo is *entirely* about
 * pointing at those two groups of fields side by side; without this layout the
 * form shows Short description and Work notes, and the argument has nowhere to
 * land. Caught in rehearsal on the instance, not in review.
 */

/**
 * The review form, arranged as the argument it has to make: what the machine
 * proposed, then what the person decided, in that order and visibly separated.
 * The annotations carry the point for anyone reading the form without the demo
 * narration around it.
 */
export const geocodeReviewForm = Form({
    table: 'x_1000748_cls_geocode_review',
    view: default_view,
    sections: [
        {
            caption: 'Review',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'crash', type: 'table_field' },
                        { field: 'reason', type: 'table_field' },
                        { field: 'short_description', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'state', type: 'table_field' },
                        { field: 'assigned_to', type: 'table_field' },
                        { field: 'priority', type: 'table_field' },
                        { field: 'opened_at', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'What the geocoder proposed',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['ann-candidate'],
                            text: 'The geocoder’s best guess, with the confidence it had. Offered, not applied — nothing here reaches the crash record until a person accepts it below.',
                            annotationType: AnnotationType.Info_Box_Blue,
                        },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'candidate_route_id', type: 'table_field' },
                        { field: 'candidate_street', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'candidate_measure', type: 'table_field' },
                        { field: 'candidate_score', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'What the reviewer decided',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['ann-resolved'],
                            text: 'The authoritative answer. Use Accept candidate to copy the proposal across, check it, then Apply resolution to write it to the crash and close this task.',
                            annotationType: AnnotationType.Info_Box_Blue,
                        },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'resolved_route_id', type: 'table_field' },
                        { field: 'resolution_note', type: 'table_field' },
                    ],
                    rightElements: [{ field: 'resolved_measure', type: 'table_field' }],
                },
            ],
        },
        {
            caption: 'Notes',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'description', type: 'table_field' },
                        { field: 'work_notes', type: 'table_field' },
                    ],
                },
            ],
        },
    ],
})

/**
 * The review queue. `reason` and `opened_at` carry the whole story of scenes 3
 * and 5 — why a person is needed, and how long they have been needed for. The
 * inherited task list shows neither.
 */
List({
    table: 'x_1000748_cls_geocode_review',
    view: default_view,
    columns: ['number', 'crash', 'reason', 'state', 'assigned_to', 'priority', 'opened_at'],
})

/**
 * The crash list, ordered so the geocoding outcome reads across in one pass:
 * what came in, where it landed, how far off it was, and how sure we are.
 */
List({
    table: 'x_1000748_cls_crash',
    view: default_view,
    columns: [
        'number',
        'crash_datetime',
        'location_text',
        'route_id',
        'measure',
        'snap_distance_m',
        'geocode_confidence',
        'geocode_state',
    ],
})

/**
 * The crash form.
 *
 * Without this, the platform auto-generates a layout from schema order and
 * alternates the fields across two columns — which put Latitude and Longitude in
 * different sections, Measure nowhere near Route ID, and Reported route nowhere
 * near Reported milemarker. Every pair the reader has to compare was split up.
 *
 * The sections are the ones the schema comments already describe, in the order
 * the record actually happens: what came in, where it resolved to, and how it
 * got there. The reported values and the resolved values are kept visibly apart
 * for the same reason `candidate_*` and `resolved_*` are apart on the review —
 * the source report is evidence, not truth, and the form should never let the
 * two blur together.
 */
export const crashForm = Form({
    table: 'x_1000748_cls_crash',
    view: default_view,
    sections: [
        {
            caption: 'Crash',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'crash_datetime', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'geocode_state', type: 'table_field' },
                        { field: 'geocode_confidence', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'As reported',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['ann-crash-reported'],
                            text: 'Exactly what the crash report said, kept verbatim. Geocoding reads these and never writes back to them, so the source is always recoverable.',
                            annotationType: AnnotationType.Info_Box_Blue,
                        },
                        { field: 'location_text', type: 'table_field' },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'reported_route', type: 'table_field' },
                        { field: 'reported_milemarker', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'latitude', type: 'table_field' },
                        { field: 'longitude', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Resolved location',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        {
                            type: 'annotation',
                            annotationId: Now.ID['ann-crash-resolved'],
                            text: 'Route ID + Measure is the stored truth — a position along a route, in miles from its start. Coordinates above are an input; these two survive the road being re-surveyed. Street and municipality are read back from the Road Inventory.',
                            annotationType: AnnotationType.Info_Box_Blue,
                        },
                    ],
                },
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'route_id', type: 'table_field' },
                        { field: 'measure', type: 'table_field' },
                        { field: 'route_direction', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'street_name', type: 'table_field' },
                        { field: 'municipality', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'How it was located',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [{ field: 'geocode_method', type: 'table_field' }],
                    rightElements: [{ field: 'snap_distance_m', type: 'table_field' }],
                },
                {
                    layout: 'one-column',
                    elements: [{ field: 'geocode_message', type: 'table_field' }],
                },
            ],
        },
    ],
})
