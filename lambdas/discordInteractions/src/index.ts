import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as SecretsManager from 'aws-sdk/clients/secretsmanager';
import { DiscordService } from "./DiscordService";
import { SecretsManagerService } from "./SecretManagerService";
import { DiscordApi } from "./DiscordApi";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const secretsManager = new SecretsManager()
    const secretsManagerService = new SecretsManagerService(secretsManager)
    const discordApiKey = await secretsManagerService.getDiscordApiKey()

    const discordApi = new DiscordApi(discordApiKey)
    const discordService = new DiscordService(discordApi)

    const response = await withErrorHandling(dependencyInjectedHandler(event, discordService));
    console.log("responding with", response);

    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent,
    discordService: DiscordService,
): Promise<APIGatewayProxyResult> => {
    const payload = JSON.parse(event.body || "")
    if (payload.type === 1) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                type: 1
            })
        }
    }
    return {
        statusCode: 404,
        body: JSON.stringify("Operation not found")
    }
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
