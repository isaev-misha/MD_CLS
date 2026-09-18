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

    var VALID_REASONS = [
        'no_location_data',
        'low_confidence',
        'ambiguous_route',
        'off_network',
        'conflicting_sources',
    ]

    // How far the officer's milemarker may sit from the resolved measure before
    // the two count as disagreeing rather than rounding. Miles, because measure is.
    var CONFLICT_MILES = 1

    var snapDistance = parseFloat(current.getValue('snap_distance_m'))
    var hasCandidate = !!current.getValue('route_id')
    var tolerance = parseFloat(gs.getProperty('x_1000748_cls.geocode.snap_tolerance_m', '50'))

    // The geocoder already decided why it was giving up, so use its answer.
    // Re-deriving loses information it had and we do not: `ambiguous_route` in
    // particular is unrecoverable here, because the two matching routes are not
    // written anywhere on the crash.
    var reason = current.getValue('geocode_reason')

    if (VALID_REASONS.indexOf(reason) === -1) {
        // Fallback for crashes that arrive already in needs_review from a feed,
        // having never passed through CrashGeocoder.
        var reportedRoute = current.getValue('reported_route')
        var reportedMm = parseFloat(current.getValue('reported_milemarker'))
        var measure = parseFloat(current.getValue('measure'))
        var disagrees =
            reportedRoute &&
            !isNaN(reportedMm) &&
            !isNaN(measure) &&
            Math.abs(reportedMm - measure) > CONFLICT_MILES

        reason = 'no_location_data'
        if (disagrees) {
            reason = 'conflicting_sources'
        } else if (hasCandidate && !isNaN(snapDistance) && snapDistance > tolerance) {
            reason = 'off_network'
        } else if (hasCandidate) {
            reason = 'low_confidence'
        } else if (reportedRoute && current.getValue('latitude')) {
            reason = 'conflicting_sources'
        }
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

    var reviewSysId = grReview.insert()

    // Point the crash at its review so the form can offer a one-click jump to the
    // work. setWorkflow(false) because this is bookkeeping, not a state change:
    // without it this update re-enters this very rule, and only the duplicate
    // guard above stops it.
    if (reviewSysId) {
        var grCrash = new GlideRecord('x_1000748_cls_crash')
        if (grCrash.get(crashSysId)) {
            grCrash.setValue('geocode_review', reviewSysId)
            grCrash.setWorkflow(false)
            grCrash.update()
        }
    }
})(current, previous)
