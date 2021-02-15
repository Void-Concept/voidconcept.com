import ClientOAuth2, { Token } from 'client-oauth2';
import appConfig from '../environments/appConfig';

export const clientOAuth2 = new ClientOAuth2({
    clientId: appConfig.clientId,
    authorizationUri: appConfig.authorizationUri,
    redirectUri: appConfig.redirectUri
})

export const storeToken = (token: Token) => {
    localStorage.setItem("oauthToken", token.accessToken)
}

export const getToken = () => {
    return localStorage.getItem("oauthToken") || ""
}
