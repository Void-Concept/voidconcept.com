import { InteractionResponseType } from 'discord-interactions';
import { AutoCompleteChoice, AutoCompleteResponse, Command, CommandOptionType, CommandType, Request, Response } from './types'
import { zonedTimeToUtc } from 'date-fns-tz'
import { getTimeZones } from '@vvo/tzdb';

export const command: Command = {
    name: "time",
    description: "Translate time using discord's time format function",
    options: [{
        name: "time",
        type: CommandOptionType.STRING,
        description: "Time string. ie: 10:00am",
        required: true,
    }, {
        name: "timezone",
        type: CommandOptionType.STRING,
        description: "Timezone you are translating from",
        required: true,
        autocomplete: true,
    }]
}

export const handler = async (request: Request): Promise<Response> => {
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

const autoCompleteResult = (choices: AutoCompleteChoice[]): AutoCompleteResponse => ({
    type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
    data: {
        choices
    }
})

const hardCodedimeZones = [{
    name: "UTC",
    value: "UTC"
}, {
    name: "Eastern",
    value: "America/New_York"
}, {
    name: "Central",
    value: "America/Chicago"
}, {
    name: "Mountain",
    value: "America/Denver"
}, {
    name: "Pacific",
    value: "America/Los_Angeles"
}, {
    name: "Hawaii",
    value: "Pacific/Honolulu"
}]

const tzdbZones = getTimeZones({
    includeUtc: true
})
  
const canonicalNameOptions = tzdbZones.map(zone => ({
    name: zone.name,
    value: zone.name,
}))

const allTimeZones = [...hardCodedimeZones, ...canonicalNameOptions]

export const autoCompleteHandler = async (request: Request): Promise<AutoCompleteResponse> => {
    const focusedField = request.data.options?.find(option => option.focused)
    
    if (!focusedField) return autoCompleteResult([])

    if (focusedField.name === 'timezone') {
        const suggestions = allTimeZones
            .filter(timeZone => timeZone.name.toLowerCase().startsWith((focusedField.value as string).toLowerCase()))

        return autoCompleteResult(suggestions.slice(0, 25))
    }

    return autoCompleteResult([])
}


export const commandSpec = {
    command,
    handler,
    autoCompleteHandler,
}