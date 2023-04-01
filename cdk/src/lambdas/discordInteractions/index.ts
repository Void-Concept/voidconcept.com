import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import SecretsManager from 'aws-sdk/clients/secretsmanager';
import { SecretsManagerService } from "./SecretManagerService";
import { InteractionType, InteractionResponseType, verifyKey } from 'discord-interactions';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const secretsManager = new SecretsManager()
    const secretsManagerService = new SecretsManagerService(secretsManager)

    const response = await withErrorHandling(dependencyInjectedHandler(event, secretsManagerService));
    console.log("responding with", response);

    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent,
    secretsManagerService: SecretsManagerService,
): Promise<APIGatewayProxyResult> => {
    if (!await validRequest(event, secretsManagerService)) {
        return unauthorized({
            error: 'Bad request signature'
        })
    }

    const payload = JSON.parse(event.body || "")
    if (payload.type === InteractionType.PING) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                type: InteractionResponseType.PONG
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

const validRequest = async (event: APIGatewayProxyEvent, secretsManagerService: SecretsManagerService): Promise<boolean> => {
    const signature = event.headers['X-Signature-Ed25519']
    const timestamp = event.headers['X-Signature-Timestamp']
    return !!event.body && !!signature && !!timestamp && verifyKey(event.body, signature, timestamp, await secretsManagerService.getDiscordPublicKey())
}

const unauthorized = (body: {error: string}): APIGatewayProxyResult => ({
    statusCode: 401,
    body: JSON.stringify(body)
})