import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./DynamoHelper";
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { doGetFactory } from "./questListResolver";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const questTableName = process.env.tableName as string;

    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, questTableName);

    const response = withCors(event.headers.Origin, await withErrorHandling(dependencyInjectedHandler(event, dynamoHelper)));
    console.log("responding with", response);

    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        return doGetFactory(dynamoHelper)(event)
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
            body: JSON.stringify(`Internal server error: ${(error as Error).message}`)
        }
    }
}
