import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./dynamoHelper";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dynamoDbTableName = process.env.tableName as string;
    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, dynamoDbTableName);

    const response = withCors(event.headers.Origin, await dependencyInjectedHandler(event, dynamoHelper));
    console.log("responding with", response);
    return response
}

export const dependencyInjectedHandler = async (
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

const withCors = (origin: string, response: APIGatewayProxyResult) => {
    return Object.assign({
        headers: Object.assign({
            "Access-Control-Allow-Origin": "*"
        }, response.headers)
    }, response);
}

const parseEventBody = (event: APIGatewayProxyEvent): any => {
    if (!event.body) return {}
    return JSON.parse(event.body.toString());
};