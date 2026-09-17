import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '6ab8d8e815164cd381a5f20e0abd33dd'
                    }
                    'br-create-geocode-review': {
                        table: 'sys_script'
                        id: 'cb9ecb8a22934dfdb2d8c3b717852e0f'
                    }
                    'crash-hero-clean': {
                        table: 'x_1000748_cls_crash'
                        id: '875f23a1cac44007bc50e8533ab44d69'
                    }
                    'crash-hero-fail': {
                        table: 'x_1000748_cls_crash'
                        id: 'a99e27dea35546a3a178b7084ecde796'
                    }
                    'crash-queue-1': {
                        table: 'x_1000748_cls_crash'
                        id: 'bb32fc9a5cf6405998d1505b8b6ac2f7'
                    }
                    'crash-queue-2': {
                        table: 'x_1000748_cls_crash'
                        id: '805789b07d5a4cc997d690509ae70150'
                    }
                    'crash-queue-3': {
                        table: 'x_1000748_cls_crash'
                        id: '92e648d6654a4f88b677a82488e13fd6'
                    }
                    'crash-queue-4': {
                        table: 'x_1000748_cls_crash'
                        id: '16fd5a76250049939277053f1289867d'
                    }
                    'crash-queue-5': {
                        table: 'x_1000748_cls_crash'
                        id: '0cac2f7b6be240e78641baee2d0f50c8'
                    }
                    'crash-queue-6': {
                        table: 'x_1000748_cls_crash'
                        id: '941a3ec7f41641abb9f287cc1856be20'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '776df8b5e3624cdea904f5b1a4db0640'
                    }
                    'prop-lrs-radius': {
                        table: 'sys_properties'
                        id: '1ddf1207665a475eab2924f4b74900e8'
                    }
                    'prop-lrs-timeout': {
                        table: 'sys_properties'
                        id: 'f3a0433078f24fb584ac520c8102a77f'
                    }
                    'prop-lrs-url': {
                        table: 'sys_properties'
                        id: '16c7c1014b634d059731b608e5673ebd'
                    }
                    'prop-review-threshold': {
                        table: 'sys_properties'
                        id: 'bcdfd743c0644b90aff22013a6451126'
                    }
                    'prop-snap-tolerance': {
                        table: 'sys_properties'
                        id: '6ed276038a7b4fe5a8e3a3fadb8fecea'
                    }
                    'review-1': {
                        table: 'x_1000748_cls_geocode_review'
                        id: 'b6ad3f90c0544f27b79ab20b6e101cb9'
                    }
                    'review-2': {
                        table: 'x_1000748_cls_geocode_review'
                        id: '25d03da5e14e45ad91af1c5a2bc98776'
                    }
                    'review-3': {
                        table: 'x_1000748_cls_geocode_review'
                        id: 'e5c66375485d4818914550988a09a362'
                    }
                    'review-4': {
                        table: 'x_1000748_cls_geocode_review'
                        id: 'f310bc6bc7404e01a2b14adf2441f1dd'
                    }
                    'review-5': {
                        table: 'x_1000748_cls_geocode_review'
                        id: '9b035cf38e2f4ed39fe193fc7249093c'
                    }
                    'review-6': {
                        table: 'x_1000748_cls_geocode_review'
                        id: '3c8a0bc0444d437dbbdf06ba9d7082df'
                    }
                    'si-crash-geocoder': {
                        table: 'sys_script_include'
                        id: '6533a044dbae4a579d58a42f018e10d8'
                    }
                    'si-demo-reset': {
                        table: 'sys_script_include'
                        id: '44533e7127bb42cebd59952ee9092779'
                    }
                    'si-lrs-client': {
                        table: 'sys_script_include'
                        id: '4bdad208bc0544ec85201c3edb9cd110'
                    }
                    src_server_CrashGeocoder_server_js: {
                        table: 'sys_module'
                        id: 'ce638911480647c8921943ce89ea9ffc'
                    }
                    src_server_CreateGeocodeReview_server_js: {
                        table: 'sys_module'
                        id: '5433731cd0ba4c53a8cf8bddda8c8e73'
                    }
                    src_server_DemoReset_server_js: {
                        table: 'sys_module'
                        id: '276a12e114e446059856f7f826a5cedc'
                    }
                    src_server_LRSClient_server_js: {
                        table: 'sys_module'
                        id: 'b0ce5613dd1045389ffdb5354670d303'
                    }
                    'ua-accept-candidate': {
                        table: 'sys_ui_action'
                        id: 'c2f7701da24147acaf0cbe0934eb02f1'
                    }
                    'ua-apply-resolution': {
                        table: 'sys_ui_action'
                        id: '8dffbdcdcf2747b382aece7ff6801cea'
                    }
                    'ua-geocode-crash': {
                        table: 'sys_ui_action'
                        id: 'd1c2c0686344477b9950ff3092e95a76'
                    }
                    'ua-reset-demo': {
                        table: 'sys_ui_action'
                        id: '0b9b076bcfe543b69a54ebb958b277f5'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '0406d1720b8b4703bfaab6796b39aa0d'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '071c9b47d06f4fea87e32ee19432b6c4'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0c90999783a1416aa1d779a7c4f14393'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                            value: 'officer_lrs'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0dbbbf41c59c495e961150f2e3919c34'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '10be0ab970e447798a1d4b8641ab0d7b'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'route_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '126e21f310124c34920d8c906307b930'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_measure'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '13ed688d66644d33855f5f7a04401ce8'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'location_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '14bf0eebe13247498328b9f100d903ca'
                        key: {
                            name: 'x_1000748_cls_crash'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '18b79a5f81634f0783fb9af21867680e'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_street'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18f195208af74c27a842b62aaf04ed1f'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'reported_milemarker'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c2ee7944adb4d2d9f92365e7708d0f4'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'street_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ef1c8c3972c4f20bebd844e62a2e154'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'resolved_measure'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1f9bb43ec47847b587424c9125740817'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'resolution_note'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '285f00dd814d4c2b9edb197c877fc251'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'resolved_route_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35b10447ff42461c9da8c2c0171d6258'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_message'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36da96ce57bd4b79b5de986d5e2b23cb'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                            value: 'conflicting_sources'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '370f3501868f400e9a83190b5f42c644'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                            value: 'address_geocode'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '38f3014b157e44d290f86967fe01b087'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a6cf2c3600d4f55977b92b5dd8d3e56'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'crash'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3d8fbd15ca0d46038f959e5b93aac5e1'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'reported_milemarker'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '42934593ed054e7ebb4db9ff5745a774'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4ae0b194f31b4734be9a62757b64f016'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b168d9b047a4a7b808018bd0c43c0b9'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'measure'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '553d1f971e294e2e9a070e628b74d420'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'resolution_note'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '59fe06f2bdad419a93fc27f04d856e28'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                            value: 'needs_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5d6778d1b87b471e9e58bd83310b1cec'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'municipality'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ecdcfbb0c174150b566ab8211f4ef04'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '600f368eda3a4c53975b4d105c27f310'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_measure'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60e2e1f2b6ef442aa793fb4c5fa098a9'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'latitude'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6435d95da474457aa7179715cf6b4c5e'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_street'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64a34ccb3b99422f9d2109e11a420123'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_score'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '65cf29c4ab164576b4bfe274f1671bd8'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'snap_distance_m'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6809081b67144cecbd1d4cfdf0737ef5'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'snap_distance_m'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6e0501a516b542cb9ef047005e3cf401'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '717960473e8e46deb062bb8d978dce39'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                            value: 'off_network'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '751386c9bbc948d48460562327875993'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'crash_datetime'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7ed3f48c19fe43c7aa1362ec96dfbf9f'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'reported_route'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '84a438588f674916810417da80d2a388'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '851369c1c5f74242a42a44ad4bee4635'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                            value: 'no_location_data'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '863da6d02378497d9105fa7746054191'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                            value: 'manual'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '873015bddb03409ca23ca7584449140e'
                        key: {
                            logical_table_name: 'x_1000748_cls_crash'
                            col_name_string: 'geocode_state'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '89c2ebeb803b4a739937f855fe824ed8'
                        key: {
                            name: 'x_1000748_cls_crash'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8e40f2f64e974d5285c6f9aa13e76e1b'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'resolved_route_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8eafaea5ff6646838227d3fdf9cb8662'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_route_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f0c395cbf7743e78f577d56696001c8'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9019b8369a314c66a61899f3026d2bda'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'street_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '91577e77a5864d5a987db874ecf4ef3a'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '926da67974334458a6f8428126e8c807'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '962dd2b618a645068de6204039a7447b'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c991734be9646fba10e9db71a6becea'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'longitude'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a2fb48e74aa54af0b57493a0d92903d1'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'resolved_measure'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a2fbf8ff431749da989976c953ccfba8'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'location_text'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a69f16cf2768428690599e0bc0f8dc81'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'reported_route'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a78c7f27254c48c2bb0e286b73df791a'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'aadcb60a71894736bba8d6e291405fbb'
                        key: {
                            logical_table_name: 'x_1000748_cls_crash'
                            col_name_string: 'route_id,measure'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b2475854dbfa44b9bff016ff43d1e30a'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'crash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b4d0241a2fec4b219fcfb031fac671da'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                            value: 'located'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6533b323b104720803493ee124381b8'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'municipality'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba86efbb4a7643e3b8d2259c4bf8fbf7'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'latitude'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bb01e2302d514a199d5489a24d84fc54'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                            value: 'ambiguous_route'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bb84dddbe47343caa321ea6cfc7ae940'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'longitude'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c04f3a2e8b00407d96b02473802c574c'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'route_direction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c0aaf8c59e2543d787781adc7e06b74a'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'c36bc30b1b234f68b333f2bd637a0b96'
                        key: {
                            category: 'x_1000748_cls_geocode_review'
                            prefix: 'GCR'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c77f0c01efb44d299d9866050f940c9f'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'route_direction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9b326210a0743a6b41b124f3a6f7035'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cbb9a01956c94e14b9d0a92bd2aaecd8'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_confidence'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cc47c4de0ca84bdeb4e21933ec668540'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'crash_datetime'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'd069aefbef914613bedc38e66a33a4b4'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd3ecd8ec07594ba291ca83b53efebe61'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                            value: 'low_confidence'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9dd2a97ea6d4f22a92f4315cfd1443c'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'candidate_route_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'dbde02fc54504a28bcb73539620f2fa6'
                        key: {
                            category: 'x_1000748_cls_crash'
                            prefix: 'CRSH'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e2035a41dab44267a9a7282c5a95c666'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'measure'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e359a886b06348fc960daefcaf35fdaa'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e53b63b0e93d49ce8543e585f85db850'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e6e126d927cc48ccb3df10baed77e488'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec4df71c86404539b8fd20f1ca9dc122'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_method'
                            value: 'gps_snap'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec60ceac829a4bbf81607b3a60e5dc51'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_state'
                            value: 'unlocatable'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ed5a0195b231430ba93bc7ee7d20f2a7'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'route_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f73a53a04c4c465a8ed633fbc4f325cb'
                        key: {
                            name: 'x_1000748_cls_crash'
                            element: 'geocode_confidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'fdcc393cab7a40eeb2602b39f89f352b'
                        key: {
                            logical_table_name: 'x_1000748_cls_geocode_review'
                            col_name_string: 'crash'
                        }
                    },
                ]
            }
        }
    }
}
