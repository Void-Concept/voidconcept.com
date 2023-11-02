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

const rollNDice = (rng: () => number, numDice: number, upperBound: number): number[] => {
    return new Array(numDice).fill(0).map(() => (rng() % upperBound) + 1)
}

export const handler = (rng: () => number) => async (request: Request): Promise<ChannelMessageResponse> => {
    const diceStringOption = request.data.options?.find(findOption(Options.dice))
    if (!diceStringOption) return messageResponse('Invalid option: dice')
    
    const regex = /(\d+)d(\d+)/ //1 or more digit, d, 1 or more digit

    const diceRoll = regex.exec(diceStringOption.value as string)
    if (diceRoll === null) return messageResponse(`Invalid dice: ${diceStringOption.value}`)

    const numDice = parseInt(diceRoll[1])
    if (numDice > 20) return messageResponse('Invalid number of dice. Can only roll 20 maximum')

    const upperBound = parseInt(diceRoll[2])

    const randomNumbers = rollNDice(rng, numDice, upperBound)

    return messageResponse(`Rolling [${diceRoll[0]}]: ${randomNumbers.join(', ')}`)
}

const defaultRng = () => {
    return Math.random() * 1e16
}

export const commandSpec: CommandSpec = {
    command,
    handler: handler(defaultRng),
}
