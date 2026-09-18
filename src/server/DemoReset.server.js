/**
 * DemoReset — put the staged demo back to its installed state.
 *
 * Rehearsing dirties the data, and not only the obvious way. Geocoding a hero
 * crash locates it; resolving a review writes back to its crash, closes the task
 * and stamps the crash `manual`. Without a reset, the second run-through does not
 * look like the first — which is exactly the kind of thing that goes wrong ten
 * minutes before a customer call.
 *
 * It used to reset only the two hero crashes. That left the review-queue scenes
 * un-repeatable: press Apply resolution once in rehearsal and CRSH0001031 stays
 * `manual`/Located and GCR0001002 stays closed, for good. Since the queue is the
 * half of the demo that carries the argument, the reset now covers all eight
 * crashes and all six reviews.
 *
 * ORDER MATTERS. Reviews are reopened BEFORE their crashes are set back to
 * needs_review. The CreateGeocodeReview business rule skips any crash that
 * already has an *active* review, so reopening first is what stops the reset
 * from stacking a second review onto every backlog crash.
 *
 * The hero coordinates are not decorative. They were chosen by querying the Road
 * Inventory and running LRSClient's own snapping maths, and the margins are tight
 * — CRSH0001042 sits 3.95 m from the Route 9 centreline, and two metres further
 * north snaps it to Shoppers World Drive instead. Do not round them.
 *
 * Every value below mirrors `src/fluent/demo-data.now.ts`. The two files have to
 * agree; change one and change the other, or the reset quietly restores a demo
 * that is not the demo that was installed.
 */
var DemoReset = Class.create()

DemoReset.prototype = {
    initialize: function () {
        // The two that are geocoded live in front of the room. Their reviews are
        // deleted rather than reopened, because a live run has to create them.
        this.heroes = [
            { number: 'CRSH0001042', latitude: '42.298781', longitude: '-71.394660' },
            { number: 'CRSH0001043', latitude: '42.318000', longitude: '-71.358000' },
        ]

        // The staged backlog. These are never geocoded live; they exist to give
        // the queue depth and age.
        this.backlog = [
            {
                number: 'CRSH0001030',
                geocode_confidence: '15',
                geocode_message: 'Only narrative text available — address geocoding is not configured',
            },
            {
                number: 'CRSH0001031',
                reported_route: '20',
                reported_milemarker: '41.2',
                latitude: '42.345100',
                longitude: '-71.552300',
                geocode_confidence: '30',
                geocode_message: 'Reported milemarker and GPS disagree by more than 1 mile',
            },
            {
                number: 'CRSH0001032',
                reported_route: '9',
                reported_milemarker: '22.8',
                geocode_confidence: '30',
                geocode_message: '2 routes match — concurrency, needs a human',
            },
            {
                number: 'CRSH0001033',
                latitude: '42.331900',
                longitude: '-71.434800',
                geocode_confidence: '30',
                snap_distance_m: '168.4',
                route_id: 'SR30 EB',
                street_name: 'Cochituate Road',
                geocode_message: 'Nearest route is 168.4 m away, beyond the 50 m tolerance',
            },
            {
                number: 'CRSH0001034',
                latitude: '42.363400',
                longitude: '-71.264100',
                geocode_confidence: '55',
                snap_distance_m: '74.9',
                route_id: 'I90 EB',
                street_name: 'Massachusetts Turnpike',
                geocode_message: 'Ramp geometry — snapped to the mainline rather than the ramp',
            },
            {
                number: 'CRSH0001035',
                geocode_confidence: '0',
                geocode_message: 'No coordinates, route or location text on the record',
            },
        ]

        // The queue as installed. `state` and `priority` are restored because
        // Apply resolution closes the task, and a reopened task with the wrong
        // state reads as a bug from the back of the room.
        this.reviews = [
            { number: 'GCR0001001', state: '2', priority: '3' },
            {
                number: 'GCR0001002',
                state: '2',
                priority: '2',
                candidate_route_id: 'SR20 WB',
                candidate_measure: '40.1',
                candidate_street: 'Boston Post Road',
                candidate_score: '30',
            },
            { number: 'GCR0001003', state: '1', priority: '3' },
            {
                number: 'GCR0001004',
                state: '1',
                priority: '4',
                candidate_route_id: 'SR30 EB',
                candidate_measure: '8.4',
                candidate_street: 'Cochituate Road',
                candidate_score: '30',
            },
            {
                number: 'GCR0001005',
                state: '2',
                priority: '2',
                candidate_route_id: 'I90 EB',
                candidate_measure: '118.6',
                candidate_street: 'Massachusetts Turnpike',
                candidate_score: '55',
            },
            { number: 'GCR0001006', state: '1', priority: '3' },
        ]

        // Everything the demo can write to a crash. Listed once so a reset clears
        // a field even when the staged record does not mention it.
        this.crashFields = [
            'latitude',
            'longitude',
            'reported_route',
            'reported_milemarker',
            'route_id',
            'measure',
            'street_name',
            'route_direction',
            'municipality',
            'snap_distance_m',
            'geocode_confidence',
            'geocode_method',
            'geocode_message',
            'geocode_review',
        ]
    },

    /**
     * @return {object} { crashes, reviews, restored, missing }
     *   crashes  — hero crashes returned to Pending
     *   reviews  — hero review tasks deleted
     *   restored — backlog crashes and queue tasks put back
     */
    run: function () {
        var outcome = { crashes: 0, reviews: 0, restored: 0, missing: [] }

        this._resetHeroes(outcome)

        // Reviews first — see the note on ordering at the top of this file.
        this._restoreReviews(outcome)
        this._restoreBacklog(outcome)
        this._relinkReviews()

        return outcome
    },

    _resetHeroes: function (outcome) {
        for (var i = 0; i < this.heroes.length; i++) {
            var hero = this.heroes[i]
            var grCrash = this._findCrash(hero.number)

            if (!grCrash) {
                outcome.missing.push(hero.number)
                continue
            }

            // Remove reviews first. Deleting them after resetting the crash would
            // re-trigger the business rule on the way past needs_review.
            var grReview = new GlideRecord('x_1000748_cls_geocode_review')
            grReview.addQuery('crash', grCrash.getUniqueValue())
            grReview.query()
            while (grReview.next()) {
                grReview.deleteRecord()
                outcome.reviews++
            }

            this._clearCrashFields(grCrash)
            grCrash.setValue('latitude', hero.latitude)
            grCrash.setValue('longitude', hero.longitude)
            grCrash.setValue('geocode_state', 'pending')
            grCrash.update()
            outcome.crashes++
        }
    },

    _restoreReviews: function (outcome) {
        for (var i = 0; i < this.reviews.length; i++) {
            var staged = this.reviews[i]

            var grReview = new GlideRecord('x_1000748_cls_geocode_review')
            grReview.addQuery('number', staged.number)
            grReview.setLimit(1)
            grReview.query()

            if (!grReview.next()) {
                outcome.missing.push(staged.number)
                continue
            }

            grReview.setValue('resolved_route_id', '')
            grReview.setValue('resolved_measure', '')
            grReview.setValue('resolution_note', '')
            grReview.setValue('candidate_route_id', staged.candidate_route_id || '')
            grReview.setValue('candidate_measure', staged.candidate_measure || '')
            grReview.setValue('candidate_street', staged.candidate_street || '')
            grReview.setValue('candidate_score', staged.candidate_score || '')
            grReview.setValue('state', staged.state)
            grReview.setValue('priority', staged.priority)
            grReview.setValue('active', true)
            grReview.update()
            outcome.restored++
        }
    },

    _restoreBacklog: function (outcome) {
        for (var i = 0; i < this.backlog.length; i++) {
            var staged = this.backlog[i]
            var grCrash = this._findCrash(staged.number)

            if (!grCrash) {
                outcome.missing.push(staged.number)
                continue
            }

            this._clearCrashFields(grCrash)

            for (var f = 0; f < this.crashFields.length; f++) {
                var field = this.crashFields[f]
                if (staged[field]) {
                    grCrash.setValue(field, staged[field])
                }
            }

            grCrash.setValue('geocode_state', 'needs_review')
            grCrash.update()
            outcome.restored++
        }
    },

    /**
     * Re-point every crash at its own open review.
     *
     * Runs last on purpose: _restoreBacklog clears the crash fields, geocode_review
     * among them, so a link written any earlier would be wiped on the way past.
     * setWorkflow(false) keeps this out of Create geocode review.
     */
    _relinkReviews: function () {
        var grReview = new GlideRecord('x_1000748_cls_geocode_review')
        grReview.addQuery('active', true)
        grReview.query()

        while (grReview.next()) {
            var crashSysId = grReview.getValue('crash')
            if (!crashSysId) {
                continue
            }

            var grCrash = new GlideRecord('x_1000748_cls_crash')
            if (grCrash.get(crashSysId)) {
                grCrash.setValue('geocode_review', grReview.getUniqueValue())
                grCrash.setWorkflow(false)
                grCrash.update()
            }
        }
    },

    _findCrash: function (number) {
        var grCrash = new GlideRecord('x_1000748_cls_crash')
        grCrash.addQuery('number', number)
        grCrash.setLimit(1)
        grCrash.query()

        return grCrash.next() ? grCrash : null
    },

    _clearCrashFields: function (grCrash) {
        for (var i = 0; i < this.crashFields.length; i++) {
            grCrash.setValue(this.crashFields[i], '')
        }
    },

    type: 'DemoReset',
}
