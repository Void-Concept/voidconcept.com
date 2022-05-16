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
    values: {
        priority: number
        value: string
    }[]
}

export interface AppConfig {
    domainPrefix: string
    domainName: string
    additionalDnsRecords: {
        cnames: CnameConfig[]
        txts: TxtConfig[],
        mxs: MxConfig[]
    }
}
