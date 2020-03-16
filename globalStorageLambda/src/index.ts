import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./dynamoHelper";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dynamoDbTableName = process.env.tableName as string;
    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, dynamoDbTableName);

    return await dependencyInjectedHandler(event, dynamoHelper);
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
        return {
            statusCode: 501,
            body: "Not implemented"
        }
    } else {
        return {
            statusCode: 404,
            body: "Operation not found"
        }
    }
}

const parseEventBody = (event: APIGatewayProxyEvent): any => {
    if (!event.body) return {}
    return JSON.parse(event.body.toString());
};