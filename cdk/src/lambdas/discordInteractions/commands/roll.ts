import { findOption, messageResponse } from "./helpers";
import { CommandSpec, Command, CommandOptionType, Request, ChannelMessageResponse } from "./types";

export const Options = {
    dice: 'dice'
}

export const command: Command = {
    name: "roll",
    description: "Roll a dice",
    options: [{
        name: Options.dice,
        type: CommandOptionType.STRING,
        description: "The dice you want to roll. ie: 1d20",
        required: true,
        autocomplete: false,
    }]
}

export const handler = (rng: () => number) => async (request: Request): Promise<ChannelMessageResponse> => {
    const diceString = request.data.options?.find(findOption(Options.dice))
    if (!diceString) return messageResponse('Invalid option: dice')
    
    const upperBound = 20

    const randomNumber = (rng() % upperBound) + 1

    return messageResponse(`Rolling [1d20]: ${randomNumber}`)
}

const defaultRng = () => {
    return Math.random() * 1e16
}

export const commandSpec: CommandSpec = {
    command,
    handler: handler(defaultRng),
}
