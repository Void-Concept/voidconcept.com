import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./DynamoHelper";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as SecretsManager from 'aws-sdk/clients/secretsmanager';
import { DiscordService } from "./DiscordService";
import { SecretsManagerService } from "./SecretManagerService";
import { doGetFactory, doPostFactory } from "./calendarDateResolver";
import { DiscordApi } from "./DiscordApi";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const genericStorageTableName = process.env.genericStorageTableName as string;
    const calendarTableName = process.env.calendarTableName as string;

    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, genericStorageTableName, calendarTableName);

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
    //TODO: handle path params
    if (event.path === "/dnd/calendar") {
        return handleCalendarEvent(event, dynamoHelper, discordService)
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

export const handleCalendarEvent = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
    discordService: DiscordService,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        return doGetFactory(dynamoHelper)(event)
    } else if (event.httpMethod === "POST") {
        return doPostFactory(dynamoHelper, discordService)(event)
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
