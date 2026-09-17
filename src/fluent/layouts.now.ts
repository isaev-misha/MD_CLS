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
