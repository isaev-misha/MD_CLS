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
            }
        }
    }
}
