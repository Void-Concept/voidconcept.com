import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyEventMultiValueQueryStringParameters } from "aws-lambda";
import fetch from 'node-fetch';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response = withCors(event.headers.Origin, await dependencyInjectedHandler(event));
    console.log("responding with", response);
    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        console.log(JSON.stringify(event))
        const queryParams = stringifyParameters(event.multiValueQueryStringParameters)
        const requestPath = `https://apps.runescape.com${event.path}${queryParams}`

        const response = await fetch(requestPath)
        const body = await response.json()

        return {
            statusCode: response.status,
            body: JSON.stringify(body)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

const stringifyParameters = (queryParams: APIGatewayProxyEventMultiValueQueryStringParameters | null): string => {
    if (!queryParams) return ""

    const keys = Object.keys(queryParams)
    const queryString = keys.map(key => {
        const values = queryParams[key]
        return values?.map(value => `${key}=${value}`) || []
    }).reduce((previous, current) => [...previous, ...current])
        .join("&")
    return queryString.length > 0 ? `?${queryString}` : ''
}

const withCors = (origin: string | undefined, response: APIGatewayProxyResult) => {
    return Object.assign({
        headers: Object.assign({
            "Access-Control-Allow-Origin": "*"
        }, response.headers)
    }, response);
}
