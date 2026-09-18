import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['si-lrs-client'],
    name: 'LRSClient',
    active: true,
    apiName: 'x_1000748_cls.LRSClient',
    description:
        'Linear referencing against an ArcGIS feature service: coordinates to route_id + measure and back. Endpoint is a system property so it can be repointed at an ArcGIS Enterprise LRS server.',
    script: Now.include('../server/LRSClient.server.js'),
})

ScriptInclude({
    $id: Now.ID['si-crash-geocoder'],
    name: 'CrashGeocoder',
    active: true,
    apiName: 'x_1000748_cls.CrashGeocoder',
    description:
        'Resolves a crash to route_id + measure by the evidence ladder (officer route, GPS, address text), scores confidence from snap distance, and routes low-confidence results to human review.',
    script: Now.include('../server/CrashGeocoder.server.js'),
})

ScriptInclude({
    $id: Now.ID['si-demo-reset'],
    name: 'DemoReset',
    active: true,
    apiName: 'x_1000748_cls.DemoReset',
    description:
        'Returns the two hero crashes to their pre-demo state and clears their review tasks, so a rehearsal can be run more than once. Leaves the staged backlog alone.',
    script: Now.include('../server/DemoReset.server.js'),
})

ScriptInclude({
    $id: Now.ID['si-crash-map'],
    name: 'CrashMap',
    active: true,
    apiName: 'x_1000748_cls.CrashMap',
    description:
        "Renders a crash or a review on MassDOT's Road Inventory MapServer: the reported GPS point, the point derived from route + measure via measureToGeometry, and the snap distance between them.",
    script: Now.include('../server/CrashMap.server.js'),
})
