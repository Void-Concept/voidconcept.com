import config = require('./config-file.json');

export interface AppConfig {
    domainName: string
}

export default config as AppConfig;