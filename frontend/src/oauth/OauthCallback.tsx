import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { clientOAuth2, storeToken } from "./oauthClient"

export const OauthCallback = () => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const internal = async () => {
            const token = await clientOAuth2.token.getToken(location);
            storeToken(token)
            history.push("/")
        }
        internal().catch(console.error)
    })

    return <></>
}