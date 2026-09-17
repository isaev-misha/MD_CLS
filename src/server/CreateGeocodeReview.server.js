/**
 * When a crash lands in Needs review, open a review task for it.
 *
 * This is the hinge of the whole demo. The geocoder decides it cannot place a
 * crash; this rule turns that decision into assignable work with a number, an
 * owner and a clock. Nothing else in the system does that, and it is the thing
 * a GIS tool has no equivalent for.
 *
 * One open review per crash — re-running the geocoder must not stack duplicates
 * onto the queue.
 */
;(function executeRule(current, previous) {
    var crashSysId = current.getUniqueValue()

    var grExisting = new GlideRecord('x_1000748_cls_geocode_review')
    grExisting.addQuery('crash', crashSysId)
    grExisting.addQuery('active', true)
    grExisting.setLimit(1)
    grExisting.query()

    if (grExisting.hasNext()) {
        return
    }

    var snapDistance = parseFloat(current.getValue('snap_distance_m'))
    var hasCandidate = !!current.getValue('route_id')
    var tolerance = parseFloat(gs.getProperty('x_1000748_cls.geocode.snap_tolerance_m', '50'))

    // Why a person is being asked, in the reviewer's terms rather than the
    // geocoder's. The reason drives how the queue gets triaged.
    var reason = 'no_location_data'
    if (hasCandidate && !isNaN(snapDistance) && snapDistance > tolerance) {
        reason = 'off_network'
    } else if (hasCandidate) {
        reason = 'low_confidence'
    } else if (current.getValue('reported_route') && current.getValue('latitude')) {
        reason = 'conflicting_sources'
    }

    var grReview = new GlideRecord('x_1000748_cls_geocode_review')
    grReview.initialize()
    grReview.setValue('crash', crashSysId)
    grReview.setValue('short_description', 'Locate crash ' + current.getValue('number'))
    grReview.setValue('description', current.getValue('geocode_message') || '')
    grReview.setValue('reason', reason)

    // The geocoder's best guess travels with the task so the reviewer starts
    // from a candidate rather than a blank map. It stays a candidate until a
    // person moves it across.
    grReview.setValue('candidate_route_id', current.getValue('route_id'))
    grReview.setValue('candidate_measure', current.getValue('measure'))
    grReview.setValue('candidate_street', current.getValue('street_name'))
    grReview.setValue('candidate_score', current.getValue('geocode_confidence'))

    grReview.insert()
})(current, previous)
