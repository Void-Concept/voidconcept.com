import { APIGatewayProxyResult } from "aws-lambda";
import { InteractionResponseType } from 'discord-interactions';

export const commandSpec = {
    name: "time",
    description: "Translate time using discord's time format function",
}

type Request = any //TODO
type Response = any //TODO

export const commandImplementation = async (request: Request): Promise<Response> => {
    const now = new Date().getMilliseconds()

    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `It is currently <t:${now}:F>`
        }
    }
}
