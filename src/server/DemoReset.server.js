/**
 * DemoReset — put the two hero crashes back to their pre-demo state.
 *
 * Rehearsing dirties the data: CRSH0001042 ends up Located, CRSH0001043 opens a
 * review, and a resolved review writes back to its crash. Without a reset, the
 * second run-through does not look like the first — which is exactly the kind of
 * thing that goes wrong ten minutes before a customer call.
 *
 * Only the two hero records are touched. The six staged backlog crashes and their
 * reviews are left alone: they exist to give the queue depth and age, and are
 * never geocoded live.
 *
 * The coordinates here are not decorative. They were chosen by querying the Road
 * Inventory and running LRSClient's own snapping maths, and the margins are tight
 * — CRSH0001042 sits 3.95 m from the Route 9 centreline, and two metres further
 * north snaps it to Shoppers World Drive instead. Do not round them.
 */
var DemoReset = Class.create()

DemoReset.prototype = {
    initialize: function () {
        this.heroes = [
            { number: 'CRSH0001042', latitude: '42.298781', longitude: '-71.394660' },
            { number: 'CRSH0001043', latitude: '42.318000', longitude: '-71.358000' },
        ]
    },

    /**
     * @return {object} { crashes: n, reviews: n, missing: [] }
     */
    run: function () {
        var crashes = 0
        var reviews = 0
        var missing = []

        for (var i = 0; i < this.heroes.length; i++) {
            var hero = this.heroes[i]

            var grCrash = new GlideRecord('x_1000748_cls_crash')
            grCrash.addQuery('number', hero.number)
            grCrash.setLimit(1)
            grCrash.query()

            if (!grCrash.next()) {
                missing.push(hero.number)
                continue
            }

            // Remove reviews first. Deleting them after resetting the crash would
            // re-trigger the business rule on the way past needs_review.
            var grReview = new GlideRecord('x_1000748_cls_geocode_review')
            grReview.addQuery('crash', grCrash.getUniqueValue())
            grReview.query()
            while (grReview.next()) {
                grReview.deleteRecord()
                reviews++
            }

            grCrash.setValue('latitude', hero.latitude)
            grCrash.setValue('longitude', hero.longitude)
            grCrash.setValue('route_id', '')
            grCrash.setValue('measure', '')
            grCrash.setValue('street_name', '')
            grCrash.setValue('route_direction', '')
            grCrash.setValue('snap_distance_m', '')
            grCrash.setValue('geocode_confidence', '')
            grCrash.setValue('geocode_method', '')
            grCrash.setValue('geocode_message', '')
            grCrash.setValue('geocode_state', 'pending')
            grCrash.update()
            crashes++
        }

        return { crashes: crashes, reviews: reviews, missing: missing }
    },

    type: 'DemoReset',
}
