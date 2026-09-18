import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'ann-candidate': {
                        table: 'sys_ui_annotation'
                        id: 'fcc77716cbb7462c9e6e1d38b4ea0486'
                    }
                    'ann-crash-reported': {
                        table: 'sys_ui_annotation'
                        id: '0967d3174128423e8cef7785b148179f'
                    }
                    'ann-crash-resolved': {
                        table: 'sys_ui_annotation'
                        id: '34eff3312d324c9d9edba50bd68043e2'
                    }
                    'ann-resolved': {
                        table: 'sys_ui_annotation'
                        id: '20dcbab4e2784e669d1dafbb93fdcb51'
                    }
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
                    'csp-glide-properties': {
                        table: 'sys_scope_privilege'
                        id: '634bced0c37745e9931af116839a149a'
                    }
                    'csp-glide-scripting': {
                        table: 'sys_scope_privilege'
                        id: 'a1b677bd40c2446db7dd85f86e199592'
                    }
                    'csp-gr-delete': {
                        table: 'sys_scope_privilege'
                        id: 'd17c739adf044c16926c200b85af4a7a'
                    }
                    'csp-gr-insert': {
                        table: 'sys_scope_privilege'
                        id: 'b83882dff5854348af021955ff6c3583'
                    }
                    'csp-gr-setvalue': {
                        table: 'sys_scope_privilege'
                        id: '603de3478b8b41a3bc1d01f9f4f91f89'
                    }
                    'csp-gr-update': {
                        table: 'sys_scope_privilege'
                        id: 'ec357ae602fe4e01be60aed802f778fa'
                    }
                    'csp-resource-support': {
                        table: 'sys_scope_privilege'
                        id: '54937e54fec34dbd80607eef653726e3'
                    }
                    'csp-rest-body': {
                        table: 'sys_scope_privilege'
                        id: '6d90d78c20d0480299e858194c74f839'
                    }
                    'csp-rest-endpoint': {
                        table: 'sys_scope_privilege'
                        id: '353a0895b2614cd69ac1bff116ba08c2'
                    }
                    'csp-rest-execute': {
                        table: 'sys_scope_privilege'
                        id: 'b1afa40f2cea45dbbc286a12655b3c8c'
                    }
                    'csp-rest-method': {
                        table: 'sys_scope_privilege'
                        id: 'ec547cac9b74416a9611c2a5a44037c7'
                    }
                    'csp-rest-status': {
                        table: 'sys_scope_privilege'
                        id: '054f148784c94792a1dfb060860b8a00'
                    }
                    'csp-rest-timeout': {
                        table: 'sys_scope_privilege'
                        id: '70331bdd98fd4de8b99518cf351c2efb'
                    }
                    'menu-cls': {
                        table: 'sys_app_application'
                        id: 'c4cff3d20bd241c8a027469ee766d0b4'
                    }
                    'mod-crashes': {
                        table: 'sys_app_module'
                        id: '990f96583181463a9ba64a4531b0d3ca'
                    }
                    'mod-crashes-located': {
                        table: 'sys_app_module'
                        id: 'cb8da7e519544f6db763061269d8b1e5'
                    }
                    'mod-crashes-pending': {
                        table: 'sys_app_module'
                        id: 'c430febb507e4555b5c070b7a5495527'
                    }
                    'mod-reviews-all': {
                        table: 'sys_app_module'
                        id: 'eba7ae50b58d49d6afe2fe85f1bceb1e'
                    }
                    'mod-reviews-mine': {
                        table: 'sys_app_module'
                        id: '0b802f08d1c34cf7bc322a76aa036331'
                    }
                    'mod-reviews-open': {
                        table: 'sys_app_module'
                        id: '95e57ef314e042be9be42f1e7fbc5f3e'
                    }
                    'mod-sep-reviews': {
                        table: 'sys_app_module'
                        id: '8dbba4c56b1941d789e0fd7b2ea4675d'
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
                    'ws-applicability': {
                        table: 'sys_ux_applicability'
                        id: 'e4d4b5c36d7f4259ae10a2898da9a50a'
                    }
                    'ws-cat-crashes': {
                        table: 'sys_ux_list_category'
                        id: '039fe023f8d749fcb4b635f0f98cf90c'
                    }
                    'ws-cat-reviews': {
                        table: 'sys_ux_list_category'
                        id: '6682a33de60c4f07932075542cd8d68c'
                    }
                    'ws-crash-location': {
                        table: 'sys_ux_page_registry'
                        id: 'fffb7fa087b24309a6851ae5ab940e54'
                    }
                    'ws-crash-location_sys_ux_app_config_workspace': {
                        table: 'sys_ux_app_config'
                        id: 'd9dac8ac12604cdea76aae9972950731'
                    }
                    'ws-crash-location_sys_ux_app_route_home': {
                        table: 'sys_ux_app_route'
                        id: '2efdadce17a64877ace680ac58411243'
                    }
                    'ws-crash-location_sys_ux_app_route_list': {
                        table: 'sys_ux_app_route'
                        id: '9f2fb05789c54f538615af8a4ccf8a5a'
                    }
                    'ws-crash-location_sys_ux_app_route_record': {
                        table: 'sys_ux_app_route'
                        id: '1db69db73449448c8fb08f05e841dfa2'
                    }
                    'ws-crash-location_sys_ux_app_route_simple-list': {
                        table: 'sys_ux_app_route'
                        id: '5f1bb99113c349cd98f08901f704a583'
                    }
                    'ws-crash-location_sys_ux_macroponent_record': {
                        table: 'sys_ux_macroponent'
                        id: '308fd35795e64037873f95e821d820a1'
                    }
                    'ws-crash-location_sys_ux_page_property_chrome_footer': {
                        table: 'sys_ux_page_property'
                        id: 'ab1e9a5cedcc46039bbfe67f73b8b5ea'
                    }
                    'ws-crash-location_sys_ux_page_property_chrome_header': {
                        table: 'sys_ux_page_property'
                        id: '2362a658671b44c5bb26f8abb25813a8'
                    }
                    'ws-crash-location_sys_ux_page_property_chrome_tab': {
                        table: 'sys_ux_page_property'
                        id: '1f3040f5ad594404b54b9848c33c79d0'
                    }
                    'ws-crash-location_sys_ux_page_property_chrome_toolbar': {
                        table: 'sys_ux_page_property'
                        id: '2601d5185ac9416fbc5bb9dced581d27'
                    }
                    'ws-crash-location_sys_ux_page_property_listConfigId': {
                        table: 'sys_ux_page_property'
                        id: '6b74aecc26744d4f80ed5df25da2fde2'
                    }
                    'ws-crash-location_sys_ux_page_property_view': {
                        table: 'sys_ux_page_property'
                        id: 'd615866a2e034e319aee4d9dedea8da7'
                    }
                    'ws-crash-location_sys_ux_page_property_wbApplicabilityConfigId': {
                        table: 'sys_ux_page_property'
                        id: 'b87fee3f10dd433ba609c622df70c175'
                    }
                    'ws-crash-location_sys_ux_registry_m2m_category_unifiedNav': {
                        table: 'sys_ux_registry_m2m_category'
                        id: '4c8056c7a2684acaac16a8f113f49dd0'
                    }
                    'ws-crash-location_sys_ux_screen_home': {
                        table: 'sys_ux_screen'
                        id: '7a1feb1f85854258ae81f617e43805de'
                    }
                    'ws-crash-location_sys_ux_screen_list': {
                        table: 'sys_ux_screen'
                        id: '0960dab94967414180f44eea503544e8'
                    }
                    'ws-crash-location_sys_ux_screen_record': {
                        table: 'sys_ux_screen'
                        id: '4e0fe1e93002470c9707f8f53f98b5f1'
                    }
                    'ws-crash-location_sys_ux_screen_simple-list': {
                        table: 'sys_ux_screen'
                        id: 'a5c5f458232b432fb7a54e329e657bde'
                    }
                    'ws-crash-location_sys_ux_screen_type_home': {
                        table: 'sys_ux_screen_type'
                        id: '438a4e9beec7470f9e2d10afa4ac79a6'
                    }
                    'ws-crash-location_sys_ux_screen_type_list': {
                        table: 'sys_ux_screen_type'
                        id: '36f2de1b49784bad8a025a10a6660d21'
                    }
                    'ws-crash-location_sys_ux_screen_type_record': {
                        table: 'sys_ux_screen_type'
                        id: 'e6c39baf054a4fecb1c55c407942061d'
                    }
                    'ws-crash-location_sys_ux_screen_type_simple-list': {
                        table: 'sys_ux_screen_type'
                        id: 'd92b673073854807aff69fe3dfa0407e'
                    }
                    'ws-crash-location-acl': {
                        table: 'sys_security_acl'
                        id: '78cbeffaf3814a53bf19364582b3204f'
                    }
                    'ws-dash-tab-overview': {
                        table: 'par_dashboard_tab'
                        id: '296499f53c52415da75f5bf5d497c119'
                    }
                    'ws-dashboard': {
                        table: 'par_dashboard'
                        id: '335266305bf243bb9cc5ccf022d83e82'
                    }
                    'ws-list-config': {
                        table: 'sys_ux_list_menu_config'
                        id: '70515d7749f74dbd8e77f5b4c49cad10'
                    }
                    'ws-list-crashes-all': {
                        table: 'sys_ux_list'
                        id: '6c7d820df48c41b0be2269ab984d4f43'
                    }
                    'ws-list-crashes-all-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: 'a743174feae24bb1bdacacd501aabd22'
                    }
                    'ws-list-crashes-located': {
                        table: 'sys_ux_list'
                        id: 'cea61eaa0460499ea7877f5b4a0b1178'
                    }
                    'ws-list-crashes-located-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: 'c2fe86a56eda45148718ba06925b0f11'
                    }
                    'ws-list-crashes-needs-review': {
                        table: 'sys_ux_list'
                        id: 'c71267c064c04cfd83b74d74b3254272'
                    }
                    'ws-list-crashes-needs-review-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: '0d02c2f1a5e2481d98b7bd711e8d2425'
                    }
                    'ws-list-crashes-pending': {
                        table: 'sys_ux_list'
                        id: '08aef491b6c04fde8d0f7f018b7671c3'
                    }
                    'ws-list-crashes-pending-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: '0b5ab47145c54dd8b9a3dd0fe2c29156'
                    }
                    'ws-list-reviews-all': {
                        table: 'sys_ux_list'
                        id: 'e3fa1e80502740cab39fa0d8b969add8'
                    }
                    'ws-list-reviews-all-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: '5c8cf84013004f9989257ddd094bb0a5'
                    }
                    'ws-list-reviews-mine': {
                        table: 'sys_ux_list'
                        id: 'b31d78066c544ba88df89ed36557f9d7'
                    }
                    'ws-list-reviews-mine-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: 'e26ebef5fac14be38d96001955591e02'
                    }
                    'ws-list-reviews-open': {
                        table: 'sys_ux_list'
                        id: '652af20a658c4745b0692daba5e941a6'
                    }
                    'ws-list-reviews-open-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: '74d4eb89e3e849398ba624be252d53cf'
                    }
                    'ws-list-reviews-unassigned': {
                        table: 'sys_ux_list'
                        id: 'a9f4b87322c542968b68662fc748a97b'
                    }
                    'ws-list-reviews-unassigned-app': {
                        table: 'sys_ux_applicability_m2m_list'
                        id: '58a3840fedb844518cf7f74dc2ffa773'
                    }
                    'ws-w-crashes-by-method': {
                        table: 'par_dashboard_widget'
                        id: 'c738b4a04c8f4cd2b0fedba35739e01f'
                    }
                    'ws-w-crashes-by-state': {
                        table: 'par_dashboard_widget'
                        id: '7e6ace3d44094b01bfabc4677ca14d2c'
                    }
                    'ws-w-located': {
                        table: 'par_dashboard_widget'
                        id: '1931a6dcdf184f139c81ad37ea63a3c6'
                    }
                    'ws-w-needs-review': {
                        table: 'par_dashboard_widget'
                        id: '34948e87af514c5881ce66710a805541'
                    }
                    'ws-w-open-reviews': {
                        table: 'par_dashboard_widget'
                        id: '2c906c68dea740c491bbe638ef7cf51b'
                    }
                    'ws-w-reviews-by-reason': {
                        table: 'par_dashboard_widget'
                        id: '2776c6f857a548919738288423fcadea'
                    }
                }
                composite: [
                    {
                        table: 'sys_ui_list_element'
                        id: '02b3dacf5c06483cafe71904277f4fe8'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'geocode_state'
                        }
                    },
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
                        table: 'sys_ui_element'
                        id: '04d61a71c6c5405fa649ffaa1134479a'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'short_description'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '05bfccf1f77947e7b70fa5e7657b7204'
                        key: {
                            name: 'x_1000748_cls_crash'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '063c0d357dc1428e8ba203bbc3a59812'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '1'
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
                        table: 'sys_ui_element'
                        id: '07c02eed460c4b2b8ec2116b180ecfa1'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '097f2924e0b74f4e84d280e22ac52acd'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '0c1db6195e864d9caf4126ca35ad0e2b'
                        key: {
                            sys_ui_form: {
                                id: 'acb6f396f62b4bc98b971e3691cdfd95'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
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
                        table: 'sys_ui_list_element'
                        id: '0d4b7f20e05e45b6bb57500ea91db513'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '0d4d762e5ef64ba9938cf6ac06855141'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'number'
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
                        table: 'sys_ui_list_element'
                        id: '1483d4c3dacb447987384ff029669007'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'geocode_confidence'
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
                        table: 'sys_ui_element'
                        id: '1ed7b38b40d34e3ea852cf2ba2479c46'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
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
                        table: 'sys_ui_list_element'
                        id: '1fe7c181e82f4aac815c9b711365fabc'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '244f85c94fef41948bc094a357c780ee'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '255f05f5a5f34d76ae3a7f08c74e2757'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
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
                        table: 'sys_ui_element'
                        id: '292f49d531dc4224b03df211edf35f25'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'candidate_measure'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '296339756e744f4794c7ea86463bcb55'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'route_id'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2dc9f42b962141d590e07d42dd779ab3'
                        key: {
                            sys_security_acl: '78cbeffaf3814a53bf19364582b3204f'
                            sys_user_role: {
                                id: '448d6ceebe6048a2988fbfc0d89a5e3c'
                                key: {
                                    name: 'x_1000748_cls.reviewer'
                                }
                            }
                        }
                    },
                    {
                        table: 'par_dashboard_canvas'
                        id: '2fac13e0b4e948b78beed3d8d830e1cc'
                        key: {
                            dashboard: '335266305bf243bb9cc5ccf022d83e82'
                            dashboard_tab: '296499f53c52415da75f5bf5d497c119'
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
                        table: 'sys_ui_form_section'
                        id: '367aa86cd6374e2bb278bc4dfac5b925'
                        key: {
                            sys_ui_form: {
                                id: 'acb6f396f62b4bc98b971e3691cdfd95'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '7c605f6005ba45bca8ffea87ab4d7041'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: '374618f1fa4542a1bc943bc960fbcebf'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'priority'
                            position: '8'
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
                        table: 'sys_ui_form_section'
                        id: '3a28ccd41e5c4edf9c8a9361f92a3f68'
                        key: {
                            sys_ui_form: {
                                id: '05bfccf1f77947e7b70fa5e7657b7204'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
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
                        table: 'sys_ui_form_section'
                        id: '3bd26d701179402897cdcdce7c4f4176'
                        key: {
                            sys_ui_form: {
                                id: 'acb6f396f62b4bc98b971e3691cdfd95'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: '41171d7bef1b438bacf2fb5186e4607b'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '413892fb6e3a49789bd3aa75f8bed6ee'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '418cbba22b844f43aa42c2bd584c60d0'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'candidate_street'
                            position: '3'
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
                        table: 'sys_user_role'
                        id: '448d6ceebe6048a2988fbfc0d89a5e3c'
                        key: {
                            name: 'x_1000748_cls.reviewer'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '4499596df6be4e0fbcf7de965a21d560'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'crash'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4aa0759351ef410381d86d1d4529edb5'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '1'
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
                        table: 'sys_ui_element'
                        id: '4c73ca20c48d4c89bc98d459348947db'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'state'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4d70463f97b645b8b688f4712cb8408c'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'location_text'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '502e6a6a84284e11a13a9c0caadaafde'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'measure'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '51ef556fefbb4bb8bc117ec2f17339dc'
                        key: {
                            sys_ui_form: {
                                id: '05bfccf1f77947e7b70fa5e7657b7204'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '522747749a2940c0a2e196496caba2d9'
                        key: {
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'geocode_method'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '528459fc270b430293549bf01d43e992'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'route_direction'
                            position: '4'
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
                        table: 'sys_ui_element'
                        id: '580db4f2d42349018a8b67acfa620a62'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'candidate_score'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '584a64cc946842e3a4634080df9c8a3e'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'municipality'
                            position: '7'
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
                        table: 'sys_ui_section'
                        id: '59ff7ad0af5d493c8f03a7dec25b7235'
                        key: {
                            name: 'x_1000748_cls_crash'
                            caption: 'How it was located'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '5ab4e55f3d064dce87714fee51e5740e'
                        key: {
                            name: 'x_1000748_cls_crash'
                            caption: 'Crash'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5bb48acaa5fc4f65a4ed2185e6726a02'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '34eff3312d324c9d9edba50bd68043e2'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '5cc4ec044bbf4c129f954b595567a689'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'opened_at'
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
                        table: 'sys_ui_element'
                        id: '5e9d319ac6fd43bb9f48ed1211231f10'
                        key: {
                            sys_ui_section: {
                                id: '7c605f6005ba45bca8ffea87ab4d7041'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '1'
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
                        table: 'sys_ui_element'
                        id: '5f8c7c1518c84cafa50414f14066647c'
                        key: {
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
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
                        table: 'sys_ui_element'
                        id: '6383fdcdd30f40fa9957bec491f3859d'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '6'
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
                        table: 'sys_ui_element'
                        id: '685c30625b5d40a789130a5959440a9c'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'candidate_route_id'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6b26f1595af24c2a8ec3f7ff42857ff3'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'reported_milemarker'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6d055c1755ac47faa8bd4c87ca32a20e'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'assigned_to'
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: '7092ea5a9d1b41cc9c3f3704fe9fdae7'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '0967d3174128423e8cef7785b148179f'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '713da24f5a364780a520353d386217f1'
                        key: {
                            sys_ui_section: {
                                id: '7c605f6005ba45bca8ffea87ab4d7041'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '0'
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
                        table: 'sys_ui_element'
                        id: '7317b59409c24cbe844ad7756f68108c'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '736dd2e1c7a04fef803f23f5f1c965bb'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '74c07521d4984477bb4885952fb6c07d'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
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
                        table: 'sys_user_role_contains'
                        id: '76311da79ade410a8b26b8aea5935b98'
                        key: {
                            role: {
                                id: '448d6ceebe6048a2988fbfc0d89a5e3c'
                                key: {
                                    name: 'x_1000748_cls.reviewer'
                                }
                            }
                            contains: {
                                id: 'a49757f1f00142d883c1878d40aee351'
                                key: {
                                    name: 'canvas_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '763183065b3f477db4c138ecef04cb0a'
                        key: {
                            name: 'x_1000748_cls_crash'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '7b7302e97c924016889c5d38be3cdb74'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '7c605f6005ba45bca8ffea87ab4d7041'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            caption: 'Notes'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7d20ca6a63a241358f30b2d1c928d898'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'opened_at'
                            position: '9'
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
                        table: 'sys_ui_list_element'
                        id: '7f64e223894b42988780ea206763f62f'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'measure'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '804f256175ec47d9be3687e62d3b39cf'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'reported_route'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '84286866e4e040fda3e9c8663720334a'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'latitude'
                            position: '6'
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
                        table: 'sys_ui_element'
                        id: '85e6bcb2fcc4478cb996c50806f954d5'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'fcc77716cbb7462c9e6e1d38b4ea0486'
                            position: '0'
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
                        table: 'sys_user_role_contains'
                        id: '8932ea706c16411c9593d46a7b12b042'
                        key: {
                            role: {
                                id: 'be2f37f557434266902276a4b42e18b4'
                                key: {
                                    name: 'x_1000748_cls.workspace_admin'
                                }
                            }
                            contains: {
                                id: 'bfaee3938fc546b481a427a8c4810a72'
                                key: {
                                    name: 'canvas_admin'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: '8ab2da4547a842619316d8f885903a77'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '8cecf19e7ffa463fb77b5f334d218301'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '8dfe49b620c24fe28b8b13e06a25eba4'
                        key: {
                            list_id: {
                                id: '8cecf19e7ffa463fb77b5f334d218301'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'assigned_to'
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
                        table: 'sys_ui_element'
                        id: '8ecdb996364f45359a6aaab035f0dc00'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
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
                        table: 'sys_ui_form_section'
                        id: '9221a5ad8d584c6ba2b211a99ec4d973'
                        key: {
                            sys_ui_form: {
                                id: '05bfccf1f77947e7b70fa5e7657b7204'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: '95ceb89b3fce4c889454cac26f29d688'
                        key: {
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
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
                        table: 'sys_ui_element'
                        id: '9eed360b6b7241bd85b101875e5023d0'
                        key: {
                            sys_ui_section: {
                                id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the geocoder proposed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9f74ba4062094395a6bdadad6d3fedf9'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'crash'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a0a2718fc3f84f2c9d429ee3ba92ef51'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'crash_datetime'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a0f9a48804044f359ffed55a5cf7d25c'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'geocode_state'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a12f4cc6f7ec4b24a26b35a7d68f1fa9'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '20dcbab4e2784e669d1dafbb93fdcb51'
                            position: '0'
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
                        table: 'sys_ui_element'
                        id: 'a55684707005419aa75738e894879c6d'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '1'
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
                        table: 'sys_ui_list_element'
                        id: 'a6a3cc1e44724d6d80714a795568e95b'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'location_text'
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
                        table: 'sys_ui_form'
                        id: 'acb6f396f62b4bc98b971e3691cdfd95'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'ace4d2439dac4681a0d88bc97c91af6e'
                        key: {
                            sys_ui_form: {
                                id: 'acb6f396f62b4bc98b971e3691cdfd95'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ae450bb1305444bf886e9bac2079e0d0'
                        key: {
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'b05a58b02106492a86e0e41769dc8158'
                        key: {
                            name: 'x_1000748_cls_crash'
                            caption: 'Resolved location'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b1152cd12839449695b5fe41a3f69084'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'reason'
                            position: '3'
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
                        table: 'sys_ui_element'
                        id: 'b34ea82e917342b6b73a3b204d25f9bd'
                        key: {
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'snap_distance_m'
                            position: '3'
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
                        table: 'sys_ui_list_element'
                        id: 'b56e05e0a0a245b18bb54839ba0e9087'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'route_id'
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
                        table: 'sys_ui_element'
                        id: 'b8771e8704914a3a8cff5a11abe5793e'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'resolved_route_id'
                            position: '2'
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
                        table: 'sys_ui_section'
                        id: 'baaf911e70154c3e8655a2e2315e50d9'
                        key: {
                            name: 'x_1000748_cls_crash'
                            caption: 'As reported'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
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
                        table: 'sys_ui_element'
                        id: 'bc5a1686aa5a463c84ae770f9d425126'
                        key: {
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'street_name'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'be22135620904474b5185e90e1b17e67'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'be2f37f557434266902276a4b42e18b4'
                        key: {
                            name: 'x_1000748_cls.workspace_admin'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bfd778d012bf4f949aedd493c5009c2d'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'longitude'
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: 'c14a4c7f05ef4dfc8dfd2168204c6641'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'resolution_note'
                            position: '3'
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
                        table: 'sys_ui_element'
                        id: 'caf1bdbd7c1e4658bb2921c17d765138'
                        key: {
                            sys_ui_section: {
                                id: 'fe0453c88d074d12a039646aea40ca46'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'What the reviewer decided'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'resolved_measure'
                            position: '5'
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
                        table: 'sys_ui_list_element'
                        id: 'd491eb9a46194aaca1ae4ed7b24d3fe9'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'snap_distance_m'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd49c217a19244f01b0ac81f9ae34c7da'
                        key: {
                            sys_ui_section: {
                                id: 'baaf911e70154c3e8655a2e2315e50d9'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'As reported'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
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
                        table: 'sys_ui_list_element'
                        id: 'ded1c4849ff044c99f1211082196dc73'
                        key: {
                            list_id: {
                                id: '763183065b3f477db4c138ecef04cb0a'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'crash_datetime'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e1437185731d4b118e6eadf0ebfc5451'
                        key: {
                            sys_security_acl: '78cbeffaf3814a53bf19364582b3204f'
                            sys_user_role: {
                                id: 'be2f37f557434266902276a4b42e18b4'
                                key: {
                                    name: 'x_1000748_cls.workspace_admin'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: 'e2f2daa98bb84fbb8cc59247a4eef982'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'geocode_confidence'
                            position: '5'
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
                        table: 'sys_ui_element'
                        id: 'e3bc2f94b3f64ae49f20526839fd9321'
                        key: {
                            sys_ui_section: {
                                id: 'ea392c4b269043a18119d7917454fa29'
                                key: {
                                    name: 'x_1000748_cls_geocode_review'
                                    caption: 'Review'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
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
                        table: 'sys_ui_section'
                        id: 'ea392c4b269043a18119d7917454fa29'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            caption: 'Review'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'ebbadbf19f614aba9a6b4fd8a24a6ddc'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            caption: 'What the geocoder proposed'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
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
                        table: 'par_dashboard_visibility'
                        id: 'eea97ac5d35b46c6a7d43864dbd967d2'
                        key: {
                            dashboard: '335266305bf243bb9cc5ccf022d83e82'
                            experience: 'fffb7fa087b24309a6851ae5ab940e54'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'f00ea5d6c6b44a76a344b9808cdd4753'
                        key: {
                            sys_ui_form: {
                                id: '05bfccf1f77947e7b70fa5e7657b7204'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'b05a58b02106492a86e0e41769dc8158'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Resolved location'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
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
                        table: 'sys_ui_element'
                        id: 'f78e08b1534f41abb6eba1aa60dd14f8'
                        key: {
                            sys_ui_section: {
                                id: '5ab4e55f3d064dce87714fee51e5740e'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'Crash'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
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
                    {
                        table: 'sys_ui_section'
                        id: 'fe0453c88d074d12a039646aea40ca46'
                        key: {
                            name: 'x_1000748_cls_geocode_review'
                            caption: 'What the reviewer decided'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fe7ff5faab7547968a075471cd14cf56'
                        key: {
                            sys_ui_section: {
                                id: '59ff7ad0af5d493c8f03a7dec25b7235'
                                key: {
                                    name: 'x_1000748_cls_crash'
                                    caption: 'How it was located'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'geocode_message'
                            position: '5'
                        }
                    },
                ]
            }
        }
    }
}
