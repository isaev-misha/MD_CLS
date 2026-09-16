import { BusinessRule } from '@servicenow/sdk/core'

/**
 * Fires when a crash moves into Needs review — on insert as well as update,
 * because a nightly batch feed inserts records already carrying that state.
 *
 * `filterCondition` keeps it off the other 8.9 million crashes that geocoded
 * cleanly; without it this rule would run on every row of the table.
 */
export const CreateGeocodeReview = BusinessRule({
    $id: Now.ID['br-create-geocode-review'],
    name: 'Create geocode review',
    table: 'x_2133493_cls_crash',
    when: 'after',
    action: ['insert', 'update'],
    order: 100,
    active: true,
    filterCondition: 'geocode_state=needs_review',
    description:
        'Opens a Geocode Review task when a crash cannot be placed confidently. One open review per crash — re-running the geocoder does not stack duplicates.',
    script: Now.include('../server/CreateGeocodeReview.server.js'),
})
