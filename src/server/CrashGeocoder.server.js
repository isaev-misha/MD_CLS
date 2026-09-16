/**
 * CrashGeocoder — resolves a crash record to route_id + measure.
 *
 * The ladder, best evidence first:
 *
 *   1. Officer wrote a route and milemarker  -> validate it against the network
 *   2. Cruiser GPS coordinates               -> snap to the nearest route
 *   3. Narrative address text                -> (optional) geocode, then snap
 *   4. Nothing usable                        -> hand it to a person
 *
 * Every rung records HOW it got there and how far the evidence had to travel,
 * because the interesting part of this system is not the crashes it places —
 * it is the ones it refuses to. A low confidence score is not a failure of the
 * geocoder; it is the geocoder correctly declining to guess, which is what
 * turns the record into work for a human.
 */
var CrashGeocoder = Class.create()

CrashGeocoder.prototype = {
    initialize: function () {
        this.lrs = new LRSClient()
        this.reviewThreshold = parseInt(gs.getProperty('x_2133493_cls.geocode.review_threshold', '60'), 10)
        this.toleranceM = parseFloat(gs.getProperty('x_2133493_cls.geocode.snap_tolerance_m', '50'))
    },

    /**
     * Geocode one crash and write the result back to it.
     *
     * @param {GlideRecord} grCrash — an x_2133493_cls_crash record
     * @param {boolean} autoUpdate — call update() when done (default true)
     * @return {object} the outcome, for callers that want to message the user
     */
    geocodeRecord: function (grCrash, autoUpdate) {
        var outcome = this._resolve(grCrash)

        grCrash.setValue('route_id', outcome.routeId || '')
        grCrash.setValue('measure', this._isNumber(outcome.measure) ? outcome.measure : '')
        grCrash.setValue('street_name', outcome.street || '')
        grCrash.setValue('route_direction', outcome.routeDirection || '')
        grCrash.setValue('snap_distance_m', this._isNumber(outcome.distanceM) ? outcome.distanceM : '')
        grCrash.setValue('geocode_confidence', outcome.confidence)
        grCrash.setValue('geocode_method', outcome.method || '')
        grCrash.setValue('geocode_state', outcome.state)
        grCrash.setValue('geocode_message', outcome.message || '')

        if (autoUpdate !== false) {
            grCrash.update()
        }

        return outcome
    },

    /**
     * Geocode every crash still waiting. The batch path — what would run nightly
     * against MassDOT's feed rather than from a button on a form.
     */
    geocodePending: function (limit) {
        var processed = 0
        var located = 0
        var review = 0

        var grCrash = new GlideRecord('x_2133493_cls_crash')
        grCrash.addQuery('geocode_state', 'pending')
        if (limit) {
            grCrash.setLimit(limit)
        }
        grCrash.query()

        while (grCrash.next()) {
            var outcome = this.geocodeRecord(grCrash)
            processed++
            if (outcome.state === 'located') {
                located++
            } else {
                review++
            }
        }

        return { processed: processed, located: located, needsReview: review }
    },

    // ------------------------------------------------------------------
    // the ladder
    // ------------------------------------------------------------------

    _resolve: function (grCrash) {
        // ---- rung 1: the officer's own route and milemarker --------------
        var reportedRoute = grCrash.getValue('reported_route')
        var reportedMilemarker = this._toNumber(grCrash.getValue('reported_milemarker'))

        if (reportedRoute && this._isNumber(reportedMilemarker)) {
            var onNetwork = this.lrs.resolveReportedRoute(reportedRoute, reportedMilemarker)

            if (onNetwork.found) {
                return {
                    routeId: onNetwork.routeId,
                    measure: onNetwork.measure,
                    street: onNetwork.street,
                    routeDirection: onNetwork.routeDirection,
                    distanceM: null,
                    confidence: 92,
                    method: 'officer_lrs',
                    state: 'located',
                    message: 'Reported route and milemarker confirmed on the network',
                }
            }

            // Concurrent routes: a person has to say which route owns this crash.
            if (onNetwork.ambiguous) {
                return this._needsReview('ambiguous_route', onNetwork.message, 30)
            }
            // Otherwise fall through — the officer may simply have mis-keyed it,
            // and GPS is the better evidence if we have it.
        }

        // ---- rung 2: cruiser GPS -----------------------------------------
        var latitude = this._toNumber(grCrash.getValue('latitude'))
        var longitude = this._toNumber(grCrash.getValue('longitude'))

        if (this._isNumber(latitude) && this._isNumber(longitude)) {
            var snapped = this.lrs.geometryToMeasure(latitude, longitude)

            if (snapped.found) {
                var confidence = this._confidenceFromDistance(snapped.distanceM)

                if (snapped.distanceM > this.toleranceM) {
                    return {
                        routeId: snapped.routeId,
                        measure: snapped.measure,
                        street: snapped.street,
                        routeDirection: snapped.routeDirection,
                        distanceM: snapped.distanceM,
                        confidence: confidence,
                        method: 'gps_snap',
                        state: 'needs_review',
                        message:
                            'Nearest route is ' +
                            snapped.distanceM +
                            ' m away, beyond the ' +
                            this.toleranceM +
                            ' m tolerance',
                    }
                }

                return {
                    routeId: snapped.routeId,
                    measure: snapped.measure,
                    street: snapped.street,
                    routeDirection: snapped.routeDirection,
                    distanceM: snapped.distanceM,
                    confidence: confidence,
                    method: 'gps_snap',
                    state: confidence >= this.reviewThreshold ? 'located' : 'needs_review',
                    message: '',
                }
            }

            return this._needsReview('off_network', snapped.message || 'No road near these coordinates', 20)
        }

        // ---- rung 3: narrative address text ------------------------------
        // Deliberately not wired to a geocoding service in this build. Esri's
        // public geocoder permits anonymous calls for DISPLAY, not for storing
        // the result, and this table stores it. On the customer demo instance
        // this rung needs a real ArcGIS key or an Enterprise locator.
        var locationText = grCrash.getValue('location_text')
        if (locationText) {
            return this._needsReview(
                'no_location_data',
                'Only narrative text available — address geocoding is not configured',
                15
            )
        }

        // ---- rung 4: nothing to work with --------------------------------
        return this._needsReview('no_location_data', 'No coordinates, route or location text on the record', 0)
    },

    // ------------------------------------------------------------------
    // scoring
    // ------------------------------------------------------------------

    /**
     * Snap distance is the honest confidence signal. A point four metres from
     * the centreline is on that road; one 380 m away is telling you something
     * is wrong with the point, not with the road network.
     */
    _confidenceFromDistance: function (distanceM) {
        if (distanceM <= 10) {
            return 95
        }
        if (distanceM <= 25) {
            return 88
        }
        if (distanceM <= 50) {
            return 72
        }
        if (distanceM <= 100) {
            return 55
        }
        if (distanceM <= 250) {
            return 30
        }
        return 20
    },

    _needsReview: function (reason, message, confidence) {
        return {
            routeId: '',
            measure: null,
            street: '',
            routeDirection: '',
            distanceM: null,
            confidence: confidence,
            method: '',
            state: 'needs_review',
            reason: reason,
            message: message,
        }
    },

    _toNumber: function (value) {
        if (value === null || value === '' || typeof value === 'undefined') {
            return null
        }
        var parsed = parseFloat(value)
        return isNaN(parsed) ? null : parsed
    },

    _isNumber: function (value) {
        return typeof value === 'number' && isFinite(value)
    },

    type: 'CrashGeocoder',
}
