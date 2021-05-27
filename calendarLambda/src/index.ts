import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./dynamoHelper";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const genericStorageTableName = process.env.genericStorageTableName as string;
    const calendarTableName = process.env.calendarTableName as string;
    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, genericStorageTableName, calendarTableName);

    const response = withCors(event.headers.Origin, await withErrorHandling(dependencyInjectedHandler(event, dynamoHelper)));
    console.log("responding with", response);
    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper
): Promise<APIGatewayProxyResult> => {
    if (event.path === "/dnd/calendar") {
        return handleCalendarEvent(event, dynamoHelper)
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

export const handleCalendarEvent = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        const calendar = await dynamoHelper.getDndCalendar();
        return {
            statusCode: 200,
            body: JSON.stringify(calendar)
        };
    } else if (event.httpMethod === "POST") {
        const calendar = await dynamoHelper.postDndCalendar(parseEventBody(event))
        return {
            statusCode: 200,
            body: JSON.stringify(calendar)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

const withCors = (origin: string | undefined, response: APIGatewayProxyResult) => {
    return Object.assign({
        headers: Object.assign({
            "Access-Control-Allow-Origin": "*"
        }, response.headers)
    }, response);
}

const withErrorHandling = async (resolver: Promise<APIGatewayProxyResult>): Promise<APIGatewayProxyResult> => {
    try {
        return await resolver
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(`Internal server error: ${error.message}`)
        }
    }
}

const parseEventBody = (event: APIGatewayProxyEvent): any => {
    if (!event.body) return {}
    return JSON.parse(event.body.toString());
};