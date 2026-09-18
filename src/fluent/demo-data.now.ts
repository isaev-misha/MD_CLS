import { Record } from '@servicenow/sdk/core'

/**
 * Staged demo data. `installMethod: 'demo'` marks it as sample content rather
 * than application configuration.
 *
 * The two hero records are deliberately left PENDING. The demo is far better
 * when the geocoder runs live in front of the room than when it displays a
 * result someone seeded earlier — and a live run is also the honest version.
 *
 * Everything else exists so the review queue has a backlog. A queue with one
 * item in it proves nothing; the argument depends on the room seeing work
 * piling up with owners and ages.
 */

// =====================================================================
// Hero 1 — geocodes cleanly. Route 9 eastbound at Speen Street, Natick.
// =====================================================================
export const crashClean = Record({
    $id: Now.ID['crash-hero-clean'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001042',
        crash_datetime: '2026-09-15 07:42:00',
        location_text: 'Rt 9 EB near Shoppers World Dr, Framingham',
        latitude: 42.298781,
        longitude: -71.394660,
        geocode_state: 'pending',
    },
})

// =====================================================================
// Hero 2 — the one that fails. Coordinates sit well off any road, so the
// geocoder finds a route but refuses to believe the match. This record is
// the demo; everything else is setting for it.
// =====================================================================
export const crashOffNetwork = Record({
    $id: Now.ID['crash-hero-fail'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001043',
        crash_datetime: '2026-09-15 22:18:00',
        location_text: 'Off roadway, wooded area, Natick',
        latitude: 42.318000,
        longitude: -71.358000,
        geocode_state: 'pending',
    },
})

// =====================================================================
// Backlog — already triaged, so the queue has depth and age on install.
// =====================================================================

export const crashQueue1 = Record({
    $id: Now.ID['crash-queue-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001030',
        crash_datetime: '2026-09-11 16:05:00',
        location_text: 'Intersection of Main St and Union Ave, Framingham',
        geocode_state: 'needs_review',
        geocode_confidence: 15,
        geocode_reason: 'no_location_data',
        geocode_message: 'Only narrative text available — address geocoding is not configured',
    },
})

export const crashQueue2 = Record({
    $id: Now.ID['crash-queue-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001031',
        crash_datetime: '2026-09-12 08:30:00',
        location_text: 'Rt 20 EB near Granger Blvd, Marlborough',
        reported_route: '20',
        // 1.1 miles up the road from where the cruiser actually was. Real
        // measures on a real route: Route 20 through Marlborough is US20, not
        // SR20 — a MassDOT reviewer knows their own route ids on sight.
        reported_milemarker: 129.7021,
        latitude: 42.345634,
        longitude: -71.551903,
        geocode_state: 'needs_review',
        geocode_confidence: 30,
        // The GPS snapped cleanly; the disagreement is with the officer, not the
        // road network. These four are what the review copies across as its
        // candidate — without them GCR0001002 carries a candidate that no run of
        // the geocoder could have produced.
        route_id: 'US20 EB',
        measure: 128.6021,
        street_name: 'GRANGER BOULEVARD',
        snap_distance_m: 4.1,
        geocode_method: 'gps_snap',
        geocode_reason: 'conflicting_sources',
        geocode_message: 'Reported milemarker and GPS disagree by more than 1 mile',
    },
})

export const crashQueue3 = Record({
    $id: Now.ID['crash-queue-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001032',
        crash_datetime: '2026-09-13 19:47:00',
        location_text: 'Rt 9 / Rt 30 overlap, Southborough',
        reported_route: '9',
        reported_milemarker: 22.8,
        geocode_state: 'needs_review',
        geocode_confidence: 30,
        geocode_reason: 'ambiguous_route',
        geocode_message: '2 routes match — concurrency, needs a human',
    },
})

export const crashQueue4 = Record({
    $id: Now.ID['crash-queue-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001033',
        crash_datetime: '2026-09-14 06:12:00',
        location_text: 'Parking lot, Shoppers World, Framingham',
        latitude: 42.331900,
        longitude: -71.434800,
        geocode_state: 'needs_review',
        geocode_confidence: 30,
        snap_distance_m: 168.4,
        route_id: 'SR30 EB',
        street_name: 'Cochituate Road',
        geocode_method: 'gps_snap',
        geocode_reason: 'off_network',
        geocode_message: 'Nearest route is 168.4 m away, beyond the 50 m tolerance',
    },
})

export const crashQueue5 = Record({
    $id: Now.ID['crash-queue-5'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001034',
        crash_datetime: '2026-09-15 13:55:00',
        location_text: 'Ramp from I-90 EB to Rt 128 NB, Weston',
        latitude: 42.363400,
        longitude: -71.264100,
        geocode_state: 'needs_review',
        geocode_confidence: 72,
        snap_distance_m: 44.0,
        route_id: 'I90 EB',
        street_name: 'Massachusetts Turnpike',
        geocode_method: 'gps_snap',
        geocode_reason: 'low_confidence',
        geocode_message: 'Ramp geometry — snapped to the mainline rather than the ramp',
    },
})

export const crashQueue6 = Record({
    $id: Now.ID['crash-queue-6'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_crash',
    data: {
        number: 'CRSH0001035',
        crash_datetime: '2026-09-16 05:20:00',
        location_text: '',
        geocode_state: 'needs_review',
        geocode_confidence: 0,
        geocode_reason: 'no_location_data',
        geocode_message: 'No coordinates, route or location text on the record',
    },
})

// =====================================================================
// The queue itself. Ages are staggered so "how old is the oldest" is a
// question the demo can actually answer on screen.
//
// assigned_to is deliberately left empty — user sys_ids differ per instance.
// Assign three or four of these by hand before the demo; an unassigned queue
// undercuts the whole point about ownership.
// =====================================================================

Record({
    $id: Now.ID['review-1'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_geocode_review',
    data: {
        number: 'GCR0001001',
        crash: crashQueue1,
        short_description: 'Locate crash CRSH0001030',
        reason: 'no_location_data',
        state: 2,
        active: true,
        priority: 3,
        opened_at: '2026-09-11 16:06:00',
        description: 'Intersection description only. Needs an address geocode or local knowledge.',
    },
})

Record({
    $id: Now.ID['review-2'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_geocode_review',
    data: {
        number: 'GCR0001002',
        crash: crashQueue2,
        short_description: 'Locate crash CRSH0001031',
        reason: 'conflicting_sources',
        state: 2,
        active: true,
        priority: 2,
        opened_at: '2026-09-12 08:31:00',
        candidate_route_id: 'US20 EB',
        candidate_measure: 128.6021,
        candidate_street: 'GRANGER BOULEVARD',
        candidate_score: 30,
        description: 'Officer wrote milemarker 129.7; GPS snaps near 128.6. One of them is wrong.',
    },
})

Record({
    $id: Now.ID['review-3'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_geocode_review',
    data: {
        number: 'GCR0001003',
        crash: crashQueue3,
        short_description: 'Locate crash CRSH0001032',
        reason: 'ambiguous_route',
        state: 1,
        active: true,
        priority: 3,
        opened_at: '2026-09-13 19:48:00',
        description: 'Route 9 and Route 30 share this pavement. Which route owns the crash is a judgement call.',
    },
})

Record({
    $id: Now.ID['review-4'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_geocode_review',
    data: {
        number: 'GCR0001004',
        crash: crashQueue4,
        short_description: 'Locate crash CRSH0001033',
        reason: 'off_network',
        state: 1,
        active: true,
        priority: 4,
        opened_at: '2026-09-14 06:13:00',
        candidate_route_id: 'SR30 EB',
        candidate_measure: 8.4,
        candidate_street: 'Cochituate Road',
        candidate_score: 30,
        description: 'Crash occurred on private property. May not belong on the state network at all.',
    },
})

Record({
    $id: Now.ID['review-5'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_geocode_review',
    data: {
        number: 'GCR0001005',
        crash: crashQueue5,
        short_description: 'Locate crash CRSH0001034',
        reason: 'low_confidence',
        state: 2,
        active: true,
        priority: 2,
        opened_at: '2026-09-15 13:56:00',
        candidate_route_id: 'I90 EB',
        candidate_measure: 118.6,
        candidate_street: 'Massachusetts Turnpike',
        candidate_score: 72,
        description: 'Snapped to the mainline. The crash was on the connector ramp.',
    },
})

Record({
    $id: Now.ID['review-6'],
    $meta: { installMethod: 'demo' },
    table: 'x_1000748_cls_geocode_review',
    data: {
        number: 'GCR0001006',
        crash: crashQueue6,
        short_description: 'Locate crash CRSH0001035',
        reason: 'no_location_data',
        state: 1,
        active: true,
        priority: 3,
        opened_at: '2026-09-16 05:21:00',
        description: 'Location field arrived empty from the feed. Needs the source report pulling.',
    },
})
