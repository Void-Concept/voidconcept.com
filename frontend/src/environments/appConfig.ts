type AppConfig = {
    clientId: string
    authorizationUri: string
    userInfoUri: string
    redirectUri: string
}

const file = process.env.REACT_APP_ENV === 'local' ? 'local' : 'prod';

const appConfig: AppConfig = require(`./${file}.json`)

export default appConfig;