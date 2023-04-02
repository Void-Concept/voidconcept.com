import { InteractionType, InteractionResponseType } from 'discord-interactions';

export enum CommandType {
    // Slash commands; a text-based command that shows up when a user types /
    CHAT_INPUT = 1,
    
    // A UI-based command that shows up when you right click or tap on a user
    USER = 2,
    
    // A UI-based command that shows up when you right click or tap on a message
    MESSAGE = 3,
}

export enum CommandOptionType {
    SUB_COMMAND = 1,
    
    SUB_COMMAND_GROUP = 2,
    
    STRING = 3,

    // Any integer between -2^53 and 2^53
    INTEGER = 4,
    
    BOOLEAN = 5,
    
    USER = 6,
    
    // Includes all channel types + categories
    CHANNEL = 7,
    
    ROLE = 8,
    
    // Includes users and roles
    MENTIONABLE = 9,
    
    // Any double between -2^53 and 2^53
    NUMBER = 10,
    
    // attachment object
    ATTACHMENT = 11,
}

export type CommandOptionChoice = {
    name: string
    value: string | number
}

export type CommandOption = {
    type: CommandOptionType
    name: string
    description: string
    required?: boolean
    choices?: CommandOptionChoice
    options?: CommandOption[]
    min_value?: number
    max_value?: number
    min_length?: number
    max_length?: number
}

export type Command = {
    name: string,
    type?: CommandType
    description?: string
    options?: CommandOption[]
}

export type RequestOption = {
    type: CommandOptionType
    name: string
    value: string | number
}

export type RequestData = {
    id: string
    name: string
    type: CommandType
    options?: RequestOption[]
}

export type Request = {
    type: InteractionType.APPLICATION_COMMAND
    data: RequestData
}

export type ResponseData = {
    content: string
}

export type Response = {
    type: InteractionResponseType
    data: ResponseData
}