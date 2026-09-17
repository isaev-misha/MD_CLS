import { CrossScopePrivilege } from '@servicenow/sdk/core'

/**
 * Cross-scope privileges.
 *
 * Everything this app does at runtime — geocoding, opening a review, resetting
 * the demo — reaches out of `x_1000748_cls` into global: the REST client that
 * calls the Road Inventory, the GlideRecord verbs that write the crash and the
 * review, `gs.getProperty` for the five tuning properties.
 *
 * None of that was declared. The PDI granted all of it silently on first use and
 * flashed three blue banners across the list while a crash was being reset. Two
 * problems with leaving it there: those banners are visible in a demo, and an
 * instance that does not auto-grant simply fails — the geocoder gets no route
 * and the reset deletes nothing, with the cause buried in the system log rather
 * than on screen.
 *
 * The thirteen below are not a guess. They are the `sys_scope_privilege` records
 * this app actually accumulated on dev412677 after a full run-through, read back
 * off the instance. Declaring them makes the app install with the access it
 * needs instead of negotiating for it in front of a customer.
 *
 * If a new Glide API gets called from server script, expect a fourteenth: the
 * symptom is a blue banner on a PDI and a silent failure anywhere stricter.
 */

// ---------------------------------------------------------------------
// The REST client — LRSClient's calls to the MassDOT feature service
// ---------------------------------------------------------------------

CrossScopePrivilege({
    $id: Now.ID['csp-rest-execute'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ScriptableRESTMessageClient.execute',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-rest-endpoint'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ScriptableRESTMessageClient.setEndpoint',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-rest-method'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ScriptableRESTMessageClient.setHttpMethod',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-rest-timeout'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ScriptableRESTMessageClient.setHttpTimeout',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-rest-body'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ScriptableRESTResponse.getBody',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-rest-status'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ScriptableRESTResponse.getStatusCode',
    targetScope: 'global',
    targetType: 'scriptable',
})

// ---------------------------------------------------------------------
// GlideRecord — writing the crash, and the review queue
// ---------------------------------------------------------------------

CrossScopePrivilege({
    $id: Now.ID['csp-gr-setvalue'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'GlideRecord.setValue',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-gr-insert'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'GlideRecord.insert',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-gr-update'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'GlideRecord.update',
    targetScope: 'global',
    targetType: 'scriptable',
})

/** Only DemoReset deletes, and only ever the hero crashes' review tasks. */
CrossScopePrivilege({
    $id: Now.ID['csp-gr-delete'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'GlideRecord.deleteRecord',
    targetScope: 'global',
    targetType: 'scriptable',
})

// ---------------------------------------------------------------------
// Platform scripting — gs.* and the tuning properties
// ---------------------------------------------------------------------

CrossScopePrivilege({
    $id: Now.ID['csp-glide-scripting'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'Glide API: scripting',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-glide-properties'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'Glide API: properties',
    targetScope: 'global',
    targetType: 'scriptable',
})

CrossScopePrivilege({
    $id: Now.ID['csp-resource-support'],
    operation: 'execute',
    status: 'allowed',
    targetName: 'ResourceSupport',
    targetScope: 'global',
    targetType: 'sys_script_include',
})
