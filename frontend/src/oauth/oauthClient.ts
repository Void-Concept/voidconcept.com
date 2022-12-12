import ClientOAuth2, { Data, Token } from 'client-oauth2';
import appConfig from '../environments/appConfig';

export const clientOAuth2 = new ClientOAuth2({
    clientId: appConfig.clientId,
    authorizationUri: appConfig.authorizationUri,
    redirectUri: appConfig.redirectUri
})

export const storeToken = (token: Token) => {
    localStorage.setItem("oauthToken", token.accessToken)
    localStorage.setItem("oauthTokenData", JSON.stringify(token.data))
}

export const getToken = () => {
    return localStorage.getItem("oauthToken") || ""
}

export const getTokenData = (): Data | undefined => {
    const tokenData = localStorage.getItem("oauthTokenData") ?? undefined
    return tokenData && JSON.parse(tokenData)
}

export type UserInfo = {
    sub: string
    username: string
}

export const getUserInfo = async (): Promise<UserInfo> => {
    const userInfo = await fetch(appConfig.userInfoUri, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    })

    if (!userInfo.ok) {
        throw new Error("Failed to get user info")
    }

    return await userInfo.json()
}

export const safeGetUserInfo = async (): Promise<UserInfo | undefined> => {
    try {
        return await getUserInfo()
    } catch (err) {
        return undefined
    }
}

export const isSuperUser = (userInfo: UserInfo): boolean => {
    return userInfo.sub === '492af6f8-c3da-4422-8f22-7e8b58e2ef92'
}