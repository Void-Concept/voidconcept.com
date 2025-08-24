import { RollConfig } from "@airjp73/dice-notation/dist/util/rollConfig";
import { findOption, messageResponse } from "./helpers";
import { CommandSpec, Command, CommandOptionType, Request, ChannelMessageResponse } from "./types";
import { createDiceRoller, DiceRoller, BaseToken, withPlugins, DiceRule, Rolls } from "@airjp73/dice-notation";

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

export type KeepHighestToken = {
    count: number
    numSides: number
    numToKeep: number
}

export const keepHighestRule: DiceRule<KeepHighestToken> = {
    regex: /\d+d\d+kh\d+/,
    typeConstant: "KeepHighest",
    tokenize: (raw: string, _config: RollConfig): KeepHighestToken => {
        const regex = /(\d+)d(\d+)kh(\d+)/
        const match = raw.match(regex)
        if (match === null || match.length !== 4) throw new Error("Didn't match correctly")
        
        const [count, numSides, numToKeep] = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
        return { count, numSides, numToKeep }
    },
    roll: ({count, numSides, numToKeep}: KeepHighestToken, {generateRolls}: RollConfig): Rolls => {
        const rolls = generateRolls(count, numSides)
        const [droppedRolls, keptRolls] = rolls.reduce<[number[], number[]]>(([low, high], curr) => {
            if (high.length < numToKeep) {
                return [low, [...high, curr].sort()]
            } else {
                if (curr > high[0]) {
                    const [lowestFromHigh, ...highDropLowest] = high 
                    return [[...low, lowestFromHigh], [...highDropLowest, curr].sort()]
                } else {
                    return [[...low, curr].sort(), high]
                }
            }
        }, [[], []])

        const negativeDroppedRolls = droppedRolls.map(r => -r)

        return [...negativeDroppedRolls, ...keptRolls]
    },
    calculateValue: (_token: KeepHighestToken, rolls: Rolls, _config: RollConfig): number => {
        return rolls.filter(r => r > 0).reduce((agg, roll) => agg + roll, 0)
    }
}

export const defaultRollDice = ({tokenize, rollDice, tallyRolls, calculateFinalResult}: DiceRoller) => 
    (diceStr: string): string => {
        try {
            const tokens = tokenize(diceStr)
            const rolls = rollDice(tokens)
            const rollTotals = tallyRolls(tokens, rolls)
            const result = calculateFinalResult(tokens, rollTotals)

            const outputString = tokens.map((token, index) => {
                if (token.type === "DiceRoll") { //TODO: token types are exported in such a way that typescript does like it; is there a workaround?
                    if (token.detailType === "_SimpleDieRoll" || token.detailType === "KeepHighest") {
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
    handler: handler(defaultRollDice(createDiceRoller(withPlugins(keepHighestRule)))),
}
