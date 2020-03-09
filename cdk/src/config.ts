import config = require('./config-file.json');

export interface CnameConfig {
    id: string
    prefix: string
    target: string
}

export interface TxtConfig {
    id: string
    values: string[]
}

export interface MxConfig {
    id: string
    values: string[]
}

export interface AppConfig {
    domainName: string
    additionalDnsRecords: {
        cnames: CnameConfig[]
        txts: TxtConfig[],
        mxs: MxConfig[]
    }
}

export default config as AppConfig;