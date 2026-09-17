/**
 * LRSClient — linear referencing against an ArcGIS feature service.
 *
 * Converts between coordinates and a position along a route:
 *
 *   geometryToMeasure(lat, lon)        x/y  ->  route_id + measure
 *   measureToGeometry(routeId, m)      route_id + measure  ->  x/y
 *
 * Today this points at the MassDOT Road Inventory, which publishes M-enabled
 * polylines anonymously — so the demo needs no Esri licence, credits or key.
 * The endpoint is a system property precisely so it can be repointed at an
 * ArcGIS Enterprise LRS server without touching this code.
 *
 * HONESTY NOTE, and say this out loud if asked: measures produced here are
 * INTERPOLATED between the vertices of a published extract. A real LRS server
 * uses calibration points, and where a road has been realigned without
 * re-stretching its measures the two will disagree. Good enough to demonstrate;
 * not a substitute for MassDOT's own LRS in production.
 */
var LRSClient = Class.create()

LRSClient.prototype = {
    initialize: function () {
        this.serviceUrl = gs.getProperty(
            'x_1000748_cls.lrs.service_url',
            'https://gis.massdot.state.ma.us/arcgis/rest/services/Roads/RoadInventoryYearEndFiles/FeatureServer/10'
        )
        this.searchRadiusM = parseFloat(gs.getProperty('x_1000748_cls.lrs.search_radius_m', '250'))
        this.timeoutMs = parseInt(gs.getProperty('x_1000748_cls.lrs.timeout_ms', '20000'), 10)
        this.outFields = 'route_id,from_measure,to_measure,St_Name,Route_Number,Route_Direction'
        this.lastError = ''
    },

    // ------------------------------------------------------------------
    // x/y -> route_id + measure
    // ------------------------------------------------------------------
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @return {object} { found, routeId, measure, distanceM, street, routeNumber, routeDirection, message }
     */
    geometryToMeasure: function (latitude, longitude) {
        var miss = { found: false, message: '' }

        if (!this._isFinite(latitude) || !this._isFinite(longitude)) {
            miss.message = 'No coordinates supplied'
            return miss
        }

        var body = this._query({
            geometry: longitude + ',' + latitude, // ArcGIS is x,y — longitude first
            geometryType: 'esriGeometryPoint',
            inSR: '4326',
            distance: String(this.searchRadiusM),
            units: 'esriSRUnit_Meter',
            spatialRel: 'esriSpatialRelIntersects',
            outFields: this.outFields,
            returnGeometry: 'true',
            returnM: 'true',
            outSR: '4326',
            f: 'json',
        })

        if (!body) {
            miss.message = this.lastError
            return miss
        }

        var features = body.features || []
        if (!features.length) {
            miss.message = 'No road within ' + this.searchRadiusM + ' m'
            return miss
        }

        var best = this._nearestOnFeatures(features, latitude, longitude)
        if (!best) {
            miss.message = 'Road geometry carried no measure values'
            return miss
        }

        var attrs = best.attributes || {}
        return {
            found: true,
            routeId: attrs.route_id || '',
            measure: this._round(best.measure, 4),
            distanceM: this._round(best.distanceM, 2),
            street: attrs.St_Name || '',
            routeNumber: attrs.Route_Number || '',
            routeDirection: attrs.Route_Direction || '',
            message: '',
        }
    },

    // ------------------------------------------------------------------
    // route_id + measure -> x/y
    // ------------------------------------------------------------------
    /**
     * @param {string} routeId
     * @param {number} measure
     * @return {object} { found, latitude, longitude, street, message }
     */
    measureToGeometry: function (routeId, measure) {
        var miss = { found: false, message: '' }

        if (!routeId || !this._isFinite(measure)) {
            miss.message = 'Route and measure are both required'
            return miss
        }

        var where =
            "route_id='" +
            String(routeId).replace(/'/g, "''") +
            "' AND from_measure<=" +
            measure +
            ' AND to_measure>=' +
            measure

        var body = this._query({
            where: where,
            outFields: this.outFields,
            returnGeometry: 'true',
            returnM: 'true',
            outSR: '4326',
            f: 'json',
        })

        if (!body) {
            miss.message = this.lastError
            return miss
        }

        var features = body.features || []
        if (!features.length) {
            miss.message = 'Measure ' + measure + ' is not on route ' + routeId
            return miss
        }

        var point = this._pointAtMeasure(features[0], measure)
        if (!point) {
            miss.message = 'Could not interpolate a point at measure ' + measure
            return miss
        }

        return {
            found: true,
            latitude: this._round(point.latitude, 6),
            longitude: this._round(point.longitude, 6),
            street: (features[0].attributes || {}).St_Name || '',
            message: '',
        }
    },

    /**
     * Validate an officer-written route number + milemarker against the network.
     * Rung one of the geocoding ladder: what the officer wrote is usually right,
     * but it still has to exist on the network before we trust it.
     */
    resolveReportedRoute: function (routeNumber, milemarker) {
        var miss = { found: false, message: '' }

        if (!routeNumber || !this._isFinite(milemarker)) {
            miss.message = 'No reported route and milemarker'
            return miss
        }

        var where =
            "Route_Number='" +
            String(routeNumber).replace(/'/g, "''") +
            "' AND from_measure<=" +
            milemarker +
            ' AND to_measure>=' +
            milemarker

        var body = this._query({
            where: where,
            outFields: this.outFields,
            returnGeometry: 'false',
            f: 'json',
        })

        if (!body) {
            miss.message = this.lastError
            return miss
        }

        var features = body.features || []
        if (!features.length) {
            miss.message = 'Milemarker ' + milemarker + ' is not on route ' + routeNumber
            return miss
        }

        // More than one hit means concurrent routes share this pavement. The
        // reviewer has to pick; we will not guess which route "owns" the crash.
        if (features.length > 1) {
            miss.message = features.length + ' routes match — concurrency, needs a human'
            miss.ambiguous = true
            return miss
        }

        var attrs = features[0].attributes || {}
        return {
            found: true,
            routeId: attrs.route_id || '',
            measure: this._round(milemarker, 4),
            street: attrs.St_Name || '',
            routeNumber: attrs.Route_Number || '',
            routeDirection: attrs.Route_Direction || '',
            message: '',
        }
    },

    // ------------------------------------------------------------------
    // internals
    // ------------------------------------------------------------------

    _query: function (params) {
        this.lastError = ''
        try {
            var request = new sn_ws.RESTMessageV2()
            request.setHttpMethod('GET')
            request.setEndpoint(this.serviceUrl + '/query?' + this._encode(params))
            request.setHttpTimeout(this.timeoutMs)

            var response = request.execute()
            var status = response.getStatusCode()

            if (status != 200) {
                this.lastError = 'Road network service returned HTTP ' + status
                gs.error('[LRSClient] ' + this.lastError)
                return null
            }

            var body = JSON.parse(response.getBody())
            if (body.error) {
                this.lastError = 'Road network service error: ' + (body.error.message || 'unknown')
                gs.error('[LRSClient] ' + this.lastError)
                return null
            }
            return body
        } catch (ex) {
            this.lastError = 'Could not reach the road network service'
            gs.error('[LRSClient] ' + ex)
            return null
        }
    },

    _encode: function (params) {
        var parts = []
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            }
        }
        return parts.join('&')
    },

    /**
     * Walk every segment of every returned polyline and keep the closest one.
     *
     * Distances are computed in a local planar approximation — degrees scaled to
     * metres about the input latitude. Over the few hundred metres we search,
     * the error is far below the precision anyone cares about here, and it
     * avoids dragging a projection library into a scoped app.
     */
    _nearestOnFeatures: function (features, latitude, longitude) {
        var metresPerDegreeLat = 111320
        var metresPerDegreeLon = 111320 * Math.cos((latitude * Math.PI) / 180)
        var best = null

        for (var f = 0; f < features.length; f++) {
            var geometry = features[f].geometry
            if (!geometry || !geometry.paths) {
                continue
            }

            for (var p = 0; p < geometry.paths.length; p++) {
                var path = geometry.paths[p]

                for (var v = 0; v < path.length - 1; v++) {
                    var a = path[v]
                    var b = path[v + 1]

                    // [x, y, m] — no measure means this vertex is useless to us
                    if (!this._isFinite(a[2]) || !this._isFinite(b[2])) {
                        continue
                    }

                    var ax = (a[0] - longitude) * metresPerDegreeLon
                    var ay = (a[1] - latitude) * metresPerDegreeLat
                    var bx = (b[0] - longitude) * metresPerDegreeLon
                    var by = (b[1] - latitude) * metresPerDegreeLat

                    var dx = bx - ax
                    var dy = by - ay
                    var lengthSquared = dx * dx + dy * dy

                    // Fraction along the segment closest to the origin (our point)
                    var t = lengthSquared === 0 ? 0 : -(ax * dx + ay * dy) / lengthSquared
                    t = Math.max(0, Math.min(1, t))

                    var px = ax + t * dx
                    var py = ay + t * dy
                    var distance = Math.sqrt(px * px + py * py)

                    if (best === null || distance < best.distanceM) {
                        best = {
                            distanceM: distance,
                            measure: a[2] + t * (b[2] - a[2]),
                            attributes: features[f].attributes,
                        }
                    }
                }
            }
        }

        return best
    },

    /** Interpolate a coordinate at the given measure along one feature. */
    _pointAtMeasure: function (feature, measure) {
        var geometry = feature.geometry
        if (!geometry || !geometry.paths) {
            return null
        }

        for (var p = 0; p < geometry.paths.length; p++) {
            var path = geometry.paths[p]

            for (var v = 0; v < path.length - 1; v++) {
                var a = path[v]
                var b = path[v + 1]

                if (!this._isFinite(a[2]) || !this._isFinite(b[2])) {
                    continue
                }

                var low = Math.min(a[2], b[2])
                var high = Math.max(a[2], b[2])

                if (measure < low || measure > high) {
                    continue
                }

                var span = b[2] - a[2]
                var t = span === 0 ? 0 : (measure - a[2]) / span

                return {
                    longitude: a[0] + t * (b[0] - a[0]),
                    latitude: a[1] + t * (b[1] - a[1]),
                }
            }
        }

        return null
    },

    _isFinite: function (value) {
        return typeof value === 'number' && isFinite(value)
    },

    _round: function (value, places) {
        var factor = Math.pow(10, places)
        return Math.round(value * factor) / factor
    },

    type: 'LRSClient',
}
