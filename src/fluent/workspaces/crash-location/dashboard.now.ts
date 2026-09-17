import { Dashboard } from '@servicenow/sdk/core'
import { crashLocationWorkspace } from './workspace.now'

/**
 * The workspace landing page.
 *
 * Mandatory — a workspace without a dashboard bound to it by `visibilities` opens
 * on an empty home route.
 *
 * What it is arranged to say, left to right and top to bottom: how much human work
 * is outstanding, how much of the file is already placed, *why* the geocoder gave
 * up, and which rung of the evidence ladder did the placing. The reason donut is
 * the chart the whole demo builds towards — it is the difference between "some
 * records failed" and "these five named, countable failure modes failed, and here
 * is who owns each one".
 *
 * Counts, not averages. With 8 staged crashes an average is noise; a count is a
 * number a room can check against the list one click away.
 *
 * Everything below is spelled out longhand. Fluent files are parsed rather than
 * executed, so spreads, shorthand properties and helper functions are all rejected
 * by the compiler (TS304/TS305). The repetition is required, not an oversight.
 */
Dashboard({
    $id: Now.ID['ws-dashboard'],
    name: 'Crash Location Overview',
    description: 'Outstanding geocode review work, and how the crash file was placed.',
    active: true,
    tabs: [
        {
            $id: Now.ID['ws-dash-tab-overview'],
            name: 'Overview',
            active: true,
            widgets: [
                // ---- Row 1: the three numbers ------------------------------
                {
                    $id: Now.ID['ws-w-open-reviews'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Open geocode reviews',
                        dataSources: [
                            {
                                id: 'ds_open_reviews',
                                label: 'Geocode Review',
                                sourceType: 'table',
                                tableOrViewName: 'x_1000748_cls_geocode_review',
                                filterQuery: 'active=true',
                            },
                        ],
                        metrics: [
                            {
                                id: 'metric_1',
                                dataSource: 'ds_open_reviews',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                            },
                        ],
                    },
                    height: 12,
                    width: 16,
                    position: { x: 0, y: 0 },
                },
                {
                    $id: Now.ID['ws-w-needs-review'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Crashes awaiting a decision',
                        dataSources: [
                            {
                                id: 'ds_needs_review',
                                label: 'Crash',
                                sourceType: 'table',
                                tableOrViewName: 'x_1000748_cls_crash',
                                filterQuery: 'geocode_state=needs_review',
                            },
                        ],
                        metrics: [
                            {
                                id: 'metric_1',
                                dataSource: 'ds_needs_review',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                            },
                        ],
                    },
                    height: 12,
                    width: 16,
                    position: { x: 16, y: 0 },
                },
                {
                    $id: Now.ID['ws-w-located'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Crashes located on the network',
                        dataSources: [
                            {
                                id: 'ds_located',
                                label: 'Crash',
                                sourceType: 'table',
                                tableOrViewName: 'x_1000748_cls_crash',
                                filterQuery: 'geocode_state=located',
                            },
                        ],
                        metrics: [
                            {
                                id: 'metric_1',
                                dataSource: 'ds_located',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                            },
                        ],
                    },
                    height: 12,
                    width: 16,
                    position: { x: 32, y: 0 },
                },

                // ---- Row 2: why it failed, and where the file stands --------
                {
                    $id: Now.ID['ws-w-reviews-by-reason'],
                    component: 'donut',
                    componentProps: {
                        headerTitle: 'Why the geocoder handed it to a person',
                        dataSources: [
                            {
                                id: 'ds_reasons',
                                label: 'Geocode Review',
                                sourceType: 'table',
                                tableOrViewName: 'x_1000748_cls_geocode_review',
                                filterQuery: 'active=true',
                            },
                        ],
                        metrics: [
                            {
                                id: 'metric_1',
                                dataSource: 'ds_reasons',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [{ dataSource: 'ds_reasons', groupByField: 'reason' }],
                                maxNumberOfGroups: 10,
                                showOthers: false,
                            },
                        ],
                        sortBy: 'value',
                    },
                    height: 18,
                    width: 24,
                    position: { x: 0, y: 12 },
                },
                {
                    $id: Now.ID['ws-w-crashes-by-state'],
                    component: 'vertical-bar',
                    componentProps: {
                        headerTitle: 'Crashes by geocode state',
                        dataSources: [
                            {
                                id: 'ds_states',
                                label: 'Crash',
                                sourceType: 'table',
                                tableOrViewName: 'x_1000748_cls_crash',
                                filterQuery: '',
                            },
                        ],
                        metrics: [
                            {
                                id: 'metric_1',
                                dataSource: 'ds_states',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [{ dataSource: 'ds_states', groupByField: 'geocode_state' }],
                                maxNumberOfGroups: 10,
                                showOthers: false,
                            },
                        ],
                        sortBy: 'value',
                    },
                    height: 18,
                    width: 24,
                    position: { x: 24, y: 12 },
                },

                // ---- Row 3: the evidence ladder ----------------------------
                {
                    $id: Now.ID['ws-w-crashes-by-method'],
                    component: 'horizontal-bar',
                    componentProps: {
                        headerTitle: 'Which evidence placed the crash',
                        dataSources: [
                            {
                                id: 'ds_methods',
                                label: 'Crash',
                                sourceType: 'table',
                                tableOrViewName: 'x_1000748_cls_crash',
                                filterQuery: 'geocode_methodISNOTEMPTY',
                            },
                        ],
                        metrics: [
                            {
                                id: 'metric_1',
                                dataSource: 'ds_methods',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [{ dataSource: 'ds_methods', groupByField: 'geocode_method' }],
                                maxNumberOfGroups: 10,
                                showOthers: false,
                            },
                        ],
                        sortBy: 'value',
                    },
                    height: 18,
                    width: 48,
                    position: { x: 0, y: 30 },
                },
            ],
        },
    ],
    visibilities: [
        {
            $id: Now.ID['ws-dash-visibility'],
            experience: crashLocationWorkspace,
        },
    ],
    permissions: [],
})
