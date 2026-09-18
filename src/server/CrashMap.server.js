/**
 * CrashMap — draws a crash, or a review, on MassDOT's own road network.
 *
 * Why this exists: the demo's central number is a distance — 3.95 m from the
 * centreline means the point is on that road, 143.01 m means something is wrong
 * with the point. Said out loud that is a number; drawn, it is obvious. This also
 * makes `measureToGeometry` visible actually running, which is the inverse half
 * of the linear-referencing argument and until now was only ever asserted.
 *
 * The background is a PNG rendered by MassDOT's MapServer — the same Road
 * Inventory, same layer, that the geocoder queries through the FeatureServer.
 * Anonymous, no key, no Esri licence, no credits. Nothing about the crash is sent:
 * the request carries a bounding box and nothing else.
 *
 * It is a static image, not a pannable map. A slippy map means a JS mapping
 * library and a basemap key, which is exactly the dependency this app avoids.
 */
var CrashMap = Class.create()

CrashMap.prototype = {
    initialize: function () {
        this.lrs = new LRSClient()
        this.timeoutMs = parseInt(gs.getProperty('x_1000748_cls.lrs.timeout_ms', '20000'), 10)
        this.featureUrl = gs.getProperty(
            'x_1000748_cls.lrs.service_url',
            'https://gis.massdot.state.ma.us/arcgis/rest/services/Roads/RoadInventoryYearEndFiles/FeatureServer/10'
        )
        this.mapUrl = gs.getProperty(
            'x_1000748_cls.lrs.map_service_url',
            'https://gis.massdot.state.ma.us/arcgis/rest/services/Roads/RoadInventoryYearEndFiles/MapServer'
        )

        this.width = 760
        this.height = 480

        // Roughly 450 m of breathing room around the points being shown. Small
        // enough that a 4 m snap is still a visible gap rather than one pixel.
        this.padDegrees = 0.004
    },

    /**
     * @param {string} table — the crash table or the review table
     * @param {string} sysId
     * @return {object} everything the UI page needs, or { ok: false, error }
     */
    build: function (table, sysId) {
        if (table !== 'x_1000748_cls_crash' && table !== 'x_1000748_cls_geocode_review') {
            return this._fail('That table cannot be drawn on a map.')
        }

        var grRecord = new GlideRecord(table)
        if (!sysId || !grRecord.get(sysId)) {
            return this._fail('Record not found.')
        }

        var gathered =
            table === 'x_1000748_cls_crash' ? this._fromCrash(grRecord) : this._fromReview(grRecord)

        if (gathered.error) {
            return this._fail(gathered.error)
        }
        if (!gathered.points.length) {
            return this._fail(
                'Nothing to draw yet — this record has no coordinates and no route position. Geocode it first.'
            )
        }

        var image = this._export(this._boundingBox(gathered.points), gathered.highlight)
        if (!image) {
            return this._fail('Could not reach the MassDOT map service.')
        }

        this._placeOnImage(gathered.points, image)

        return {
            ok: true,
            title: gathered.title,
            subtitle: gathered.subtitle,
            image: image,
            points: gathered.points,
            facts: gathered.facts,
            highlight: gathered.highlight,
            highlightStreet: gathered.highlightStreet,
            attribution: 'MassDOT Road Inventory ' + this._layerId() + ' — public service, no licence required',
        }
    },

    // ------------------------------------------------------------------
    // what each table contributes
    // ------------------------------------------------------------------

    _fromCrash: function (grCrash) {
        var points = []
        var facts = []

        var latitude = this._toNumber(grCrash.getValue('latitude'))
        var longitude = this._toNumber(grCrash.getValue('longitude'))

        if (latitude !== null && longitude !== null) {
            points.push({
                kind: 'reported',
                label: 'Reported GPS',
                latitude: latitude,
                longitude: longitude,
            })
        }

        this._pushReportedLrs(points, grCrash.getValue('reported_route'), grCrash.getValue('reported_milemarker'))
        this._pushResolved(points, grCrash.getValue('route_id'), grCrash.getValue('measure'), 'resolved', 'Resolved position')

        facts.push({ label: 'Route', value: grCrash.getValue('route_id') || '—' })
        facts.push({ label: 'Measure', value: grCrash.getValue('measure') || '—' })
        facts.push({ label: 'Snap distance', value: this._metres(grCrash.getValue('snap_distance_m')) })
        facts.push({ label: 'Confidence', value: grCrash.getValue('geocode_confidence') || '—' })
        facts.push({ label: 'State', value: grCrash.getDisplayValue('geocode_state') })

        return {
            title: grCrash.getValue('number'),
            subtitle: grCrash.getValue('location_text') || '',
            points: points,
            facts: facts,
            highlight: grCrash.getValue('route_id') || '',
            highlightStreet: grCrash.getValue('street_name') || '',
        }
    },

    _fromReview: function (grReview) {
        var points = []
        var facts = []

        var grCrash = new GlideRecord('x_1000748_cls_crash')
        if (!grCrash.get(grReview.getValue('crash'))) {
            return { error: 'The crash this review points at could not be read.' }
        }

        var latitude = this._toNumber(grCrash.getValue('latitude'))
        var longitude = this._toNumber(grCrash.getValue('longitude'))

        if (latitude !== null && longitude !== null) {
            points.push({
                kind: 'reported',
                label: 'Reported GPS',
                latitude: latitude,
                longitude: longitude,
            })
        }

        this._pushReportedLrs(points, grCrash.getValue('reported_route'), grCrash.getValue('reported_milemarker'))

        // The whole point of the review form, drawn: what the machine proposed
        // and what the person decided, in the same picture and not the same colour.
        this._pushResolved(
            points,
            grReview.getValue('candidate_route_id'),
            grReview.getValue('candidate_measure'),
            'candidate',
            'Geocoder candidate'
        )
        this._pushResolved(
            points,
            grReview.getValue('resolved_route_id'),
            grReview.getValue('resolved_measure'),
            'resolved',
            'Reviewer resolution'
        )

        facts.push({ label: 'Crash', value: grCrash.getValue('number') })
        facts.push({ label: 'Reason', value: grReview.getDisplayValue('reason') })
        facts.push({
            label: 'Candidate',
            value: this._routeAndMeasure(grReview.getValue('candidate_route_id'), grReview.getValue('candidate_measure')),
        })
        facts.push({
            label: 'Resolution',
            value: this._routeAndMeasure(grReview.getValue('resolved_route_id'), grReview.getValue('resolved_measure')),
        })

        return {
            title: grReview.getValue('number'),
            subtitle: grReview.getValue('short_description') || '',
            points: points,
            facts: facts,
            // The reviewer's answer wins the highlight once there is one; until
            // then the geocoder's guess is the road under discussion.
            highlight: grReview.getValue('resolved_route_id') || grReview.getValue('candidate_route_id') || '',
            highlightStreet: grReview.getValue('candidate_street') || '',
        }
    },

    /**
     * Turn a route + measure into a point on the ground. This is
     * measureToGeometry — the conversion that runs on every map render, and the
     * reason the stored truth can be a measure rather than a coordinate.
     */
    _pushResolved: function (points, routeId, measure, kind, label) {
        var m = this._toNumber(measure)
        if (!routeId || m === null) {
            return
        }

        var located = this.lrs.measureToGeometry(routeId, m)
        if (!located.found) {
            return
        }

        points.push({
            kind: kind,
            label: label,
            latitude: located.latitude,
            longitude: located.longitude,
            street: located.street || '',
        })
    },

    /**
     * Where the officer said it was.
     *
     * A route number and a milemarker are not a position until the network says
     * so, which is rung one of the ladder. Drawing it is the only way to make a
     * `conflicting_sources` review mean anything: the gap on the picture IS the
     * disagreement the reviewer has to settle.
     */
    _pushReportedLrs: function (points, reportedRoute, reportedMilemarker) {
        var milemarker = this._toNumber(reportedMilemarker)
        if (!reportedRoute || milemarker === null) {
            return
        }

        var onNetwork = this.lrs.resolveReportedRoute(reportedRoute, milemarker)
        if (!onNetwork.found) {
            return
        }

        var located = this.lrs.measureToGeometry(onNetwork.routeId, onNetwork.measure)
        if (!located.found) {
            return
        }

        points.push({
            kind: 'officer',
            label: 'Officer’s milemarker',
            latitude: located.latitude,
            longitude: located.longitude,
        })
    },

    // ------------------------------------------------------------------
    // the picture
    // ------------------------------------------------------------------

    _boundingBox: function (points) {
        var minLat = points[0].latitude
        var maxLat = points[0].latitude
        var minLon = points[0].longitude
        var maxLon = points[0].longitude

        for (var i = 1; i < points.length; i++) {
            minLat = Math.min(minLat, points[i].latitude)
            maxLat = Math.max(maxLat, points[i].latitude)
            minLon = Math.min(minLon, points[i].longitude)
            maxLon = Math.max(maxLon, points[i].longitude)
        }

        return {
            xmin: minLon - this.padDegrees,
            ymin: minLat - this.padDegrees,
            xmax: maxLon + this.padDegrees,
            ymax: maxLat + this.padDegrees,
        }
    },

    _export: function (box, highlightRouteId) {
        var params = {
            bbox: box.xmin + ',' + box.ymin + ',' + box.xmax + ',' + box.ymax,
            bboxSR: '4326',
            imageSR: '4326',
            size: this.width + ',' + this.height,
            format: 'png',
            transparent: 'false',
            f: 'json',
        }

        if (highlightRouteId) {
            params.dynamicLayers = this._highlightLayers(highlightRouteId)
        } else {
            params.layers = 'show:' + this._layerId()
        }

        try {
            var request = new sn_ws.RESTMessageV2()
            request.setHttpMethod('GET')
            request.setEndpoint(this.mapUrl + '/export?' + this._encode(params))
            request.setHttpTimeout(this.timeoutMs)

            var response = request.execute()
            if (response.getStatusCode() != 200) {
                gs.error('[CrashMap] map service returned HTTP ' + response.getStatusCode())
                return null
            }

            var body = JSON.parse(response.getBody())
            if (!body.href || !body.extent) {
                gs.error('[CrashMap] map service returned no image')
                return null
            }

            // Use the extent the server actually drew, never the one asked for —
            // it widens the box to match the image's aspect ratio, and placing
            // markers against the requested box would put every one of them
            // slightly wrong.
            return {
                href: body.href,
                width: body.width || this.width,
                height: body.height || this.height,
                extent: body.extent,
            }
        } catch (ex) {
            gs.error('[CrashMap] ' + ex)
            return null
        }
    },

    /**
     * Draw the route this record sits on in red, with its street names along it.
     *
     * Without this the picture is a hundred identical hairlines and a pin, and
     * the first question from the room is "which one is Route 20?". The service
     * advertises supportsDynamicLayers, so the same layer is drawn twice: once
     * plainly, then again filtered to this route with a heavier symbol.
     *
     * `showLabels` is the part that is easy to miss — labelingInfo alone renders
     * nothing at all, silently.
     */
    _highlightLayers: function (routeId) {
        var layerId = parseInt(this._layerId(), 10)
        var safeRoute = String(routeId).replace(/'/g, "''")

        return JSON.stringify([
            { id: layerId, source: { type: 'mapLayer', mapLayerId: layerId } },
            {
                id: layerId + 900,
                source: { type: 'mapLayer', mapLayerId: layerId },
                definitionExpression: "route_id='" + safeRoute + "'",
                minScale: 0,
                maxScale: 0,
                drawingInfo: {
                    renderer: {
                        type: 'simple',
                        symbol: {
                            type: 'esriSLS',
                            style: 'esriSLSSolid',
                            color: [214, 69, 65, 255],
                            width: 5,
                        },
                    },
                    showLabels: true,
                    labelingInfo: [
                        {
                            labelPlacement: 'esriServerLinePlacementAboveAlong',
                            labelExpression: '[St_Name]',
                            useCodedValues: false,
                            minScale: 0,
                            maxScale: 0,
                            symbol: {
                                type: 'esriTS',
                                color: [20, 20, 20, 255],
                                haloColor: [255, 255, 255, 255],
                                haloSize: 2,
                                font: { family: 'Arial', size: 11, weight: 'bold' },
                            },
                        },
                    ],
                },
            },
        ])
    },

    _placeOnImage: function (points, image) {
        var extent = image.extent
        var spanLon = extent.xmax - extent.xmin
        var spanLat = extent.ymax - extent.ymin

        for (var i = 0; i < points.length; i++) {
            points[i].x = Math.round(((points[i].longitude - extent.xmin) / spanLon) * image.width)
            points[i].y = Math.round(((extent.ymax - points[i].latitude) / spanLat) * image.height)
        }
    },

    // ------------------------------------------------------------------
    // the page
    // ------------------------------------------------------------------

    /**
     * The whole page, rendered server side.
     *
     * Built here rather than in Jelly so the UI page stays one `g:evaluate` and
     * one output tag: Jelly's escaping rules are the easiest thing in a UI page
     * to get quietly wrong, and none of this needs a loop the template can see.
     */
    renderHtml: function (table, sysId) {
        var data = this.build(table, sysId)

        if (!data.ok) {
            return (
                '<div class="cls-map-wrap"><div class="cls-map-error">' +
                this._esc(data.error) +
                '</div></div>' +
                this._styles()
            )
        }

        var markers = ''
        var legend = ''
        for (var i = 0; i < data.points.length; i++) {
            var point = data.points[i]
            markers +=
                '<div class="cls-pin cls-pin-' +
                this._esc(point.kind) +
                '" style="left:' +
                point.x +
                'px;top:' +
                point.y +
                'px" title="' +
                this._esc(point.label) +
                '"></div>'
            legend +=
                '<span class="cls-key"><i class="cls-dot cls-pin-' +
                this._esc(point.kind) +
                '"></i>' +
                this._esc(point.label) +
                '</span>'
        }

        var facts = ''
        for (var f = 0; f < data.facts.length; f++) {
            facts +=
                '<div class="cls-fact"><dt>' +
                this._esc(data.facts[f].label) +
                '</dt><dd>' +
                this._esc(data.facts[f].value) +
                '</dd></div>'
        }

        if (data.highlight) {
            legend =
                '<span class="cls-key"><i class="cls-line"></i>' +
                this._esc(data.highlight) +
                (data.highlightStreet ? ' — ' + this._esc(data.highlightStreet) : '') +
                '</span>' +
                legend
        }

        return (
            '<div class="cls-map-wrap">' +
            '<h2>' +
            this._esc(data.title) +
            '</h2>' +
            '<p class="cls-sub">' +
            this._esc(data.subtitle) +
            '</p>' +
            '<div class="cls-stage" style="width:' +
            data.image.width +
            'px;height:' +
            data.image.height +
            'px">' +
            '<img src="' +
            this._esc(data.image.href) +
            '" width="' +
            data.image.width +
            '" height="' +
            data.image.height +
            '" alt="MassDOT road network"/>' +
            markers +
            '</div>' +
            '<div class="cls-legend">' +
            legend +
            '</div>' +
            '<dl class="cls-facts">' +
            facts +
            '</dl>' +
            '<p class="cls-attr">' +
            this._esc(data.attribution) +
            '</p>' +
            '</div>' +
            this._styles()
        )
    },

    _styles: function () {
        return (
            '<style>' +
            '.cls-map-wrap{font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;padding:16px;max-width:820px}' +
            '.cls-map-wrap h2{margin:0 0 2px;font-size:20px}' +
            '.cls-sub{margin:0 0 14px;color:#555}' +
            '.cls-stage{position:relative;border:1px solid #c9ced6;border-radius:6px;overflow:hidden;background:#fff}' +
            '.cls-stage img{display:block}' +
            '.cls-pin{position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.35)}' +
            '.cls-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:middle}' +
            '.cls-pin-reported{background:#d9534f}' +
            '.cls-pin-resolved{background:#1a7f37}' +
            '.cls-pin-candidate{background:#b8860b}' +
            '.cls-pin-officer{background:#2f6fb5}' +
            '.cls-line{display:inline-block;width:16px;height:4px;border-radius:2px;background:#d64541;margin-right:6px;vertical-align:middle}' +
            '.cls-legend{margin:10px 0 0;font-size:13px;color:#333}' +
            '.cls-key{margin-right:18px}' +
            '.cls-facts{display:flex;flex-wrap:wrap;gap:10px 28px;margin:14px 0 0;padding:0}' +
            '.cls-fact dt{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#6b7280;margin:0}' +
            '.cls-fact dd{margin:2px 0 0;font-size:15px}' +
            '.cls-attr{margin:16px 0 0;font-size:12px;color:#6b7280}' +
            '.cls-map-error{padding:18px;border:1px solid #e3c6c6;background:#fdf3f3;border-radius:6px;color:#8a1f1f}' +
            '</style>'
        )
    },

    _esc: function (value) {
        return String(value === null || typeof value === 'undefined' ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
    },

    // ------------------------------------------------------------------

    _layerId: function () {
        var tail = String(this.featureUrl).split('/').pop()
        return /^\d+$/.test(tail) ? tail : '10'
    },

    _routeAndMeasure: function (routeId, measure) {
        if (!routeId) {
            return '—'
        }
        return routeId + (measure ? ' at ' + measure : '')
    },

    _metres: function (value) {
        return value ? value + ' m' : '—'
    },

    _toNumber: function (value) {
        if (value === null || value === '' || typeof value === 'undefined') {
            return null
        }
        var parsed = parseFloat(value)
        return isNaN(parsed) ? null : parsed
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

    _fail: function (message) {
        return { ok: false, error: message }
    },

    type: 'CrashMap',
}
