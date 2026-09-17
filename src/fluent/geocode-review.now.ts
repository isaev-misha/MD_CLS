import { Table, StringColumn, ChoiceColumn, IntegerColumn, FloatColumn, ReferenceColumn } from '@servicenow/sdk/core'

/**
 * Geocode review task — the exception queue.
 *
 * This is the part of the demo that a GIS tool cannot do. Geocoding a crash is a
 * computation; a crash that *fails* to geocode is a piece of work someone has to
 * pick up, investigate and resolve. Extending `task` is what makes it work rather
 * than a row in a spreadsheet: number, state, assigned_to, assignment_group,
 * priority, work_notes, opened_at/closed_at and SLA attachment all come for free.
 *
 * One review per crash that the geocoder could not place confidently. The crash
 * keeps its own geocode_state; this table tracks the human effort to fix it.
 */
export const x_1000748_cls_geocode_review = Table({
    name: 'x_1000748_cls_geocode_review',
    label: 'Geocode Review',
    extends: 'task',
    audit: true,
    autoNumber: {
        prefix: 'GCR',
        number: 1000,
        numberOfDigits: 7,
    },
    schema: {
        crash: ReferenceColumn({
            label: 'Crash',
            referenceTable: 'x_1000748_cls_crash',
            mandatory: true,
        }),
        reason: ChoiceColumn({
            label: 'Reason',
            hint: 'Why the geocoder handed this to a person',
            choices: {
                no_location_data: { label: 'No usable location data' },
                low_confidence: { label: 'Below confidence threshold' },
                ambiguous_route: { label: 'Ambiguous route match' },
                off_network: { label: 'Point not near any road' },
                conflicting_sources: { label: 'Reported route conflicts with GPS' },
            },
        }),

        // ---- What the geocoder offers the reviewer -----------------------
        // Its best guess, so the reviewer starts from a candidate rather than a
        // blank map. Never written back to the crash without a human accepting it.
        candidate_route_id: StringColumn({ label: 'Candidate route ID', maxLength: 40, readOnly: true }),
        candidate_measure: FloatColumn({ label: 'Candidate measure', scale: 4, readOnly: true }),
        candidate_street: StringColumn({ label: 'Candidate street', maxLength: 100, readOnly: true }),
        candidate_score: IntegerColumn({
            label: 'Candidate score',
            min: 0,
            max: 100,
            readOnly: true,
            hint: 'Confidence the geocoder had in the candidate it is offering',
        }),

        // ---- What the reviewer decided ------------------------------------
        resolved_route_id: StringColumn({ label: 'Resolved route ID', maxLength: 40 }),
        resolved_measure: FloatColumn({ label: 'Resolved measure', scale: 4 }),
        resolution_note: StringColumn({ label: 'Resolution note', maxLength: 255 }),
    },
    index: [{ name: 'idx_crash', unique: false, element: 'crash' }],
})
