import { findOption, messageResponse } from "./helpers";
import { CommandSpec, Command, CommandOptionType, Request, ChannelMessageResponse } from "./types";
import { createDiceRoller, DiceRoller, BaseToken } from "@airjp73/dice-notation";

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

export const handler = (rollDice: (diceStr: string) => string) => async (request: Request): Promise<ChannelMessageResponse> => {
    const diceStringOption = request.data.options?.find(findOption(Options.dice))
    if (!diceStringOption) return messageResponse('Invalid option: dice')

    const diceRoll = rollDice(diceStringOption.value as string)

    return messageResponse(`${diceRoll}`)
}

export const defaultRollDice = ({tokenize, rollDice, tallyRolls, calculateFinalResult, roll}: DiceRoller) => (diceStr: string): string => {
    try {
        const tokens = tokenize(diceStr)
        const rolls = rollDice(tokens)
        const rollTotals = tallyRolls(tokens, rolls)
        const result = calculateFinalResult(tokens, rollTotals)

        const outputString = tokens.map((token, index) => {
            if (token.type === "DiceRoll") { //TODO: token types are exported in such a way that typescript does like it; is there a workaround?
                if (token.detailType === "_SimpleDieRoll") {
                    return `[${rolls[index]}]`
                } else if (token.detailType === "_Constant") {
                    return token.content
                } else {
                    return ""
                }
            } else if (token.type === "Operator") {
                return token.operator
            } else if (token.type === "OpenParen" || token.type === "CloseParen") {
                return token.content
            } else {
                return ""
            }
        }).join(" ")

        return `${diceStr}: ${outputString} = ${result}`
    } catch (e) {
        return "Error: invalid input"
    }
}

export const commandSpec: CommandSpec = {
    command,
    handler: handler(defaultRollDice(createDiceRoller())),
}
