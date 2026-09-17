import { Table, StringColumn, ChoiceColumn, IntegerColumn, FloatColumn, DateTimeColumn } from '@servicenow/sdk/core'

/**
 * Crash record.
 *
 * Deliberately NOT extending `task`. A crash is *data*, not work — MassDOT holds
 * roughly 9 million of them, and task carries assignment, SLA and approval
 * machinery that would be dead weight on every row. The *work* of fixing a crash
 * that failed to geocode lives in x_1000748_cls_geocode_review, which does extend
 * task. That separation is the spine of the demo: the crash is data, the exception
 * is work.
 *
 * Location model — linear referencing. The authoritative location of a crash is
 * `route_id` + `measure` (distance along that route), NOT latitude/longitude.
 * Coordinates are an input at intake and a derived value at display time; the
 * measure is what survives the road network being re-surveyed or realigned.
 * See CLAUDE.md before changing any of this.
 */
export const x_1000748_cls_crash = Table({
    name: 'x_1000748_cls_crash',
    label: 'Crash',
    display: 'number',
    audit: true,
    autoNumber: {
        prefix: 'CRSH',
        // Above the seeded range (…1030-1043) so live records cannot collide
        // with staged demo numbers. autoNumber does not know about explicit ones.
        number: 1050,
        numberOfDigits: 7,
    },
    schema: {
        number: StringColumn({ label: 'Number', maxLength: 40, readOnly: true }),
        crash_datetime: DateTimeColumn({ label: 'Crash date/time', mandatory: true }),

        // ---- As reported -------------------------------------------------
        // Whatever the officer supplied, kept verbatim. Never overwritten by
        // geocoding, so a reviewer can always see what the source actually said.
        location_text: StringColumn({
            label: 'Reported location',
            maxLength: 255,
            hint: 'Narrative location as written on the crash report',
        }),
        reported_route: StringColumn({ label: 'Reported route', maxLength: 40 }),
        reported_milemarker: FloatColumn({ label: 'Reported milemarker', scale: 3 }),
        latitude: FloatColumn({ label: 'Latitude', scale: 6 }),
        longitude: FloatColumn({ label: 'Longitude', scale: 6 }),

        // ---- Resolved location (the authoritative values) -----------------
        route_id: StringColumn({
            label: 'Route ID',
            maxLength: 40,
            hint: 'MassDOT Road Inventory route_id — the authoritative route',
        }),
        measure: FloatColumn({
            label: 'Measure',
            scale: 4,
            hint: 'Miles from the start of the route — the authoritative position',
        }),
        route_direction: StringColumn({ label: 'Route direction', maxLength: 10 }),
        street_name: StringColumn({ label: 'Street name', maxLength: 100, readOnly: true }),
        municipality: StringColumn({ label: 'Municipality', maxLength: 60, readOnly: true }),

        // ---- How we got there --------------------------------------------
        geocode_state: ChoiceColumn({
            label: 'Geocode state',
            default: 'pending',
            choices: {
                pending: { label: 'Pending' },
                located: { label: 'Located' },
                needs_review: { label: 'Needs review' },
                unlocatable: { label: 'Unlocatable' },
            },
        }),
        geocode_method: ChoiceColumn({
            label: 'Geocode method',
            hint: 'Which rung of the resolution ladder produced the location',
            choices: {
                officer_lrs: { label: 'Officer route + milemarker' },
                gps_snap: { label: 'GPS snapped to network' },
                address_geocode: { label: 'Address geocoded then snapped' },
                manual: { label: 'Manually located by reviewer' },
            },
        }),
        geocode_confidence: IntegerColumn({
            label: 'Confidence',
            min: 0,
            max: 100,
            hint: 'Below the review threshold this record becomes a review task',
        }),
        snap_distance_m: FloatColumn({
            label: 'Snap distance (m)',
            scale: 2,
            readOnly: true,
            hint: 'Distance from the input point to the snapped route. A large value means the point was nowhere near a road.',
        }),
        geocode_message: StringColumn({
            label: 'Geocode message',
            maxLength: 255,
            readOnly: true,
            hint: 'Why the location could not be resolved, or a diagnostic note',
        }),
    },
    index: [
        { name: 'idx_route_measure', unique: false, element: ['route_id', 'measure'] },
        { name: 'idx_geocode_state', unique: false, element: 'geocode_state' },
    ],
})
