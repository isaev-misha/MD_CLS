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
