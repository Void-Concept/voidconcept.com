import config = require('./config-file.json');

export interface AppConfig {
    domainName: string
    privateCName: {
        prefix: string
        target: string
    }
}

export default config as AppConfig;