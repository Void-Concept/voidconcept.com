import { InteractionResponseType } from 'discord-interactions';
import { Command, CommandOptionType, CommandType, Request, Response } from './types'
import { zonedTimeToUtc } from 'date-fns-tz'

export const commandSpec: Command = {
    name: "time",
    description: "Translate time using discord's time format function",
    options: [{
        name: "timezone",
        type: CommandOptionType.STRING,
        description: "Timezone you are translating from",
        required: true,
    }, {
        name: "time",
        type: CommandOptionType.STRING,
        description: "Time string. ie: 10:00am",
        required: true,
    }]
}

export const commandImplementation = async (request: Request): Promise<Response> => {
    const timezone = request.data.options?.find(option => option.name === 'timezone')
    const time = request.data.options?.find(option => option.name === 'time')

    const utcTime = zonedTimeToUtc(time!.value, timezone!.value as string)
    const utcTimeNum = Math.floor(utcTime.getTime() / 1000)

    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `That time is <t:${utcTimeNum}:F>`
        }
    }
}
