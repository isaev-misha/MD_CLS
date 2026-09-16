import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'a0db6f4ab5ce40b7941e79cfa5ab8358'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'a4606e89c3aa4707b0c899d0f69b13e5'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '012264856c8f445784be73a8829ae560'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'crash_datetime'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '04f3b494d0ba41798ce855c1eae7c552'
                        key: {
                            logical_table_name: 'x_2133493_cls_crash'
                            col_name_string: 'geocode_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07e530bb1c4f4210aef6e6b498a5df80'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'resolved_route_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '08e3c84ed72e4d0fad69c9af13e9d9bf'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'route_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '11ae2d1efa1e47d0913beeb353d3336b'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                            value: 'gps_snap'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '150cd4c742f54a3fa535eeba8a6e5bb5'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'snap_distance_m'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '19a7a2ed9c51449d8ec87f1fee6de06c'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_measure'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1a51d83a4e874c778dcda58b489366db'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '2079864646254bb5b2c90f207213a2f4'
                        key: {
                            logical_table_name: 'x_2133493_cls_crash'
                            col_name_string: 'route_id,measure'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '20fba7cd33014c7f954d525d7bd8c005'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                            value: 'low_confidence'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '284b3ef13f2b4543bbcece875a09e8a7'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'longitude'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2977882144e34466b27c36aadbe42b89'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_measure'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29abfc24afd6438ba22b990d9e62e494'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'municipality'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29c1c97d787b47da88526ea3ace495d8'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'reported_route'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '2b4e0538787f489888be644d9999b7c6'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c20ef4e35d94d5fb523258259a9b0dd'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'crash_datetime'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c5f6aa99e214dd4973d03a16153772c'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'municipality'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31ab55c55f31471c91b9ca9c10d1c976'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'latitude'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '337b4ed77803409f8d4088b9efdf33af'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36bd2f7d8a46493b9ac83c3fc1aac8cc'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'resolution_note'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '37c9c018b9fa49bbbe9262a8d924fba9'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'crash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '388b062009ae41f6baa58e248bce868f'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'route_direction'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '40ad79d4d37a4fe4a3349b026a80430a'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41b72df231c34af29c4e1733aa267e35'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'street_name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '43acc51fd5294ba8b355b353c7e2cb01'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'resolution_note'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b1158b5cbcf405887c6455f0eb8fd19'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'latitude'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d2c642af15845e6a143c542d3b793ee'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'resolved_measure'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4f91109685c0478597f7a89b4cb2859f'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'snap_distance_m'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5226fc3e76524b558126e76e88f9077c'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                            value: 'officer_lrs'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '53ab4519fc2546dc97e6475f73a7761d'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'longitude'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53ec9ca2a7cc442b8b0372f673ede3f7'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '595c1e5fe95544e6a62d1f5d3a2b1b20'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_confidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c9ba7d315bf4e32885549046492dc6c'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'measure'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f3e08a87ed64a2db5ef2086ff3d527f'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_street'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '62e005e768144c45b17fdcb959dde1c7'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'location_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6311a7b58ddc49d18fe30f7b3bd6f0de'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'route_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71900e753b404a729d717fc185cf75e6'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_route_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72e4cca2768b4383afc0f982b8084aca'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7417725dd5114163b25ff28c0a42f98c'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7752367a232a4f08bcf092833dd7aad1'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                            value: 'manual'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '78a4a774184a47eda8839446a751a59c'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'resolved_measure'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '87be3bc9bf924022a8255aa5abf38c59'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'resolved_route_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8a11af6401e342fea175f961b081d162'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                            value: 'conflicting_sources'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '8b7cd5e4f7c441178a68f5e146e36d83'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '8d83763b01d142e7bda0f51346025d3c'
                        key: {
                            logical_table_name: 'x_2133493_cls_geocode_review'
                            col_name_string: 'crash'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f9db2aab9714ba688ffeafb74ceb56b'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '94fc5b4749604b7b824fae525bc1e87b'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                            value: 'unlocatable'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96689a42d5f0468e858fc9692a4a5005'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9db41c5eac074a17accf6f9113fa5b95'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                            value: 'address_geocode'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9fa6d5dfbbdd4143801858a1e552c96d'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aa98909445aa46b793f25b3426bb879d'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_confidence'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af656d274c664f8a8b57dea0ba340fee'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'reported_route'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'b0eae962e2c5446b9addf0b97a5a8206'
                        key: {
                            category: 'x_2133493_cls_geocode_review'
                            prefix: 'GCR'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b5c23c8867654cee8e5a6195d5c02b5c'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'measure'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bad4e5349e8b4165afdf7d1352192ccb'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_street'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'baff35e3bb124f3fbb59c0d2f92408e6'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'bbe8f28c54ca494689d47f5281992110'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c1e559858358407b85573e154cdf287a'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c50b53c1cfad4533adbde201568dfa59'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_message'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6506c0ef2e54209a145aca359152636'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6f369a19e0b42f288b7cb92db4bcd56'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'reported_milemarker'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c6fa0d990c064c9b9910d361d22eb851'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                            value: 'no_location_data'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c85be229b98b4dd381830e1b5be9e4cd'
                        key: {
                            name: 'x_2133493_cls_crash'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'caaf3861282c4e4e98e64f25a2c2e49f'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'location_text'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd3596e254bf4cb59588fa599eb7602a'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce09dac8563c46549085643540f90b83'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                            value: 'needs_review'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd004a5e3353845428e1b7448cb2213a1'
                        key: {
                            name: 'x_2133493_cls_crash'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5f91db5665d4c24864e39fd37bc54ed'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_route_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd900ac59c2414c618f03f26a555461b9'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'reported_milemarker'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df35671d55b34182ba45c2892bee9f26'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'street_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dfc2dbb0495741709f1169943f6f0b44'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                            value: 'off_network'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e06547b7bcac456dbe9f06e016e454f7'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'route_direction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3582cb9b5cd4f43850ca0446300bc1c'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'crash'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e4df0ed19026477b97714ba710ada1b8'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'reason'
                            value: 'ambiguous_route'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e8f087288eaa465887596795fc2af6a3'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                            value: 'located'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9d7a3ac8a4543539cecfe9d3d22516f'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_method'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb72279e2fac48fab11c80c2e91ac13d'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ecf3d8b7b42d457684eb28651075b323'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f48b744a0d194002b4839a06162549ad'
                        key: {
                            name: 'x_2133493_cls_geocode_review'
                            element: 'candidate_score'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'f6435b1f5073494797a71f1e3614a76d'
                        key: {
                            category: 'x_2133493_cls_crash'
                            prefix: 'CRSH'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fb17bfee6e1a4f61a55ffa991df0f8bc'
                        key: {
                            name: 'x_2133493_cls_crash'
                            element: 'geocode_state'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                ]
            }
        }
    }
}
