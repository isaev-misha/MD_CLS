import { Property } from '@servicenow/sdk/core'

/**
 * Everything environment-specific lives here rather than in the scripts.
 *
 * The service URL is the one that matters: today it points at the MassDOT
 * Road Inventory, which is public and needs no key. MassDOT runs ArcGIS
 * Enterprise, so pointing this at their own LRS server is a configuration
 * change, not a rewrite.
 */

Property({
    $id: Now.ID['prop-lrs-url'],
    name: 'x_2133493_cls.lrs.service_url',
    value: 'https://gis.massdot.state.ma.us/arcgis/rest/services/Roads/RoadInventoryYearEndFiles/FeatureServer/10',
    description:
        'ArcGIS feature service layer carrying the road network. Must expose route_id, from_measure, to_measure and M-enabled geometry.',
})

Property({
    $id: Now.ID['prop-lrs-radius'],
    name: 'x_2133493_cls.lrs.search_radius_m',
    value: '250',
    description:
        'How far from a coordinate to look for a road, in metres. Wider finds a road for almost anything; the tolerance below is what decides whether the match is believable.',
})

Property({
    $id: Now.ID['prop-lrs-timeout'],
    name: 'x_2133493_cls.lrs.timeout_ms',
    value: '20000',
    description: 'HTTP timeout for road network calls, in milliseconds.',
})

Property({
    $id: Now.ID['prop-snap-tolerance'],
    name: 'x_2133493_cls.geocode.snap_tolerance_m',
    value: '50',
    description:
        'A snapped point further than this from the centreline is not trusted and goes to review. This is the single number that decides how big the review queue is.',
})

Property({
    $id: Now.ID['prop-review-threshold'],
    name: 'x_2133493_cls.geocode.review_threshold',
    value: '60',
    description: 'Confidence below this routes the crash to a human. Raise it to trade queue volume for accuracy.',
})
