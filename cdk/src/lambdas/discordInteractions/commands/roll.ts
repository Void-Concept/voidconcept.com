import { ECS_DISABLE_EXPLICIT_DEPLOYMENT_CONTROLLER_FOR_CIRCUIT_BREAKER } from "aws-cdk-lib/cx-api";
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
    const diceStringOption = request.data.options?.find(findOption(Options.dice))
    if (!diceStringOption) return messageResponse('Invalid option: dice')
    
    const regex = /(\d+)d(\d+)/ //1 or more digit, d, 1 or more digit

    const diceRoll = regex.exec(diceStringOption.value as string)
    if (diceRoll === null) return messageResponse(`Invalid dice: ${diceStringOption.value}`)

    const numDice = parseInt(diceRoll[1])
    const upperBound = parseInt(diceRoll[2])

    const randomNumber = (rng() % upperBound) + 1

    return messageResponse(`Rolling [${diceStringOption.value}]: ${randomNumber}`)
}

const defaultRng = () => {
    return Math.random() * 1e16
}

export const commandSpec: CommandSpec = {
    command,
    handler: handler(defaultRng),
}
