import React from 'react';
import { useLocation, useHistory } from 'react-router';
import { useAsyncEffect } from '../hooks';
import { clientOAuth2, storeToken } from "./oauthClient"

export const OauthCallback = () => {
    const location = useLocation();
    const history = useHistory();

    useAsyncEffect(async () => {
        const token = await clientOAuth2.token.getToken(location);
        storeToken(token)
        history.push("/")
    }, [])

    return <></>
}