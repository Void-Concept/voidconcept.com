type AppConfig = {
    clientId: string
    authorizationUri: string
    redirectUri: string
}

const appConfig: AppConfig = require("./appConfig.json")

export default appConfig;