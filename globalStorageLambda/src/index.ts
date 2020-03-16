import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return await dependencyInjectedHandler(event);
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log(event);
    return {
        statusCode: 200,
        body: JSON.stringify({})
    }
}

const parseEventBody = (event: APIGatewayProxyEvent): any => {
    if (!event.body) return {}
    return JSON.parse(event.body.toString());
};