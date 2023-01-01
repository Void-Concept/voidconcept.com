import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./dynamoHelper";
import DynamoDB from 'aws-sdk/clients/dynamodb';
import SecretsManager from 'aws-sdk/clients/secretsmanager';
import { DiscordService } from "./DiscordService";
import { SecretsManagerService } from "./SecretManagerService";
import { doGet, doPost } from "./calendarDateResolver";
import { DiscordApi } from "./DiscordApi";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const genericStorageTableName = process.env.genericStorageTableName as string;
    const calendarTableName = process.env.calendarTableName as string;

    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, calendarTableName);

    const secretsManager = new SecretsManager()
    const secretsManagerService = new SecretsManagerService(secretsManager)
    const discordApiKey = await secretsManagerService.getDiscordApiKey()

    const discordApi = new DiscordApi(discordApiKey)
    const discordService = new DiscordService(discordApi, dynamoHelper)

    const response = withCors(event.headers.Origin, await withErrorHandling(dependencyInjectedHandler(event, dynamoHelper, discordService)));
    console.log("responding with", response);

    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
    discordService: DiscordService,
): Promise<APIGatewayProxyResult> => {
    if (event.path === "/dnd/calendar") {
        return handleCalendarListEvent(event, dynamoHelper, discordService)
    } else if (event.path.startsWith("/dnd/calendar/")) {
        return handleCalendarEvent(event, dynamoHelper, discordService)
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

export const handleCalendarListEvent = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
    discordService: DiscordService,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 501,
            body: JSON.stringify("Operation not yet implemented")
        }
    } else if (event.httpMethod === "POST") {
        return {
            statusCode: 501,
            body: JSON.stringify("Operation not yet implemented")
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify("Method Not Allowed")
        }
    }
}

export const handleCalendarEvent = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
    discordService: DiscordService,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        return doGet(dynamoHelper)(event)
    } else if (event.httpMethod === "POST") {
        return doPost(dynamoHelper, discordService)(event)
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
        const message = error instanceof Error ? error.message : error
        return {
            statusCode: 500,
            body: JSON.stringify(`Internal server error: ${message}`)
        }
    }
}
