import { InteractionType } from 'discord-interactions'
import { defaultRollDice, handler, Options } from './roll'
import { RequestOption, Request, CommandOptionType } from './types'
import { createDiceRoller, withPlugins } from '@airjp73/dice-notation'
import { defaultPlugins } from '@airjp73/dice-notation/dist/createDiceRoller'

describe('roll', () => {
    const createRequest = (options: RequestOption[]): Request => ({
        type: InteractionType.APPLICATION_COMMAND,
        data: {
            options: options
        }
    } as Request)

    const roller = createDiceRoller(withPlugins(), {
        random: (min, max) => Math.floor((max + min) / 2)
    })

    const diceRollerFixedResult = defaultRollDice(roller)

    it('should return an error if given bad input', async () => {
        const request = createRequest([{
            name: Options.dice,
            type: CommandOptionType.STRING,
            value: 'lol'
        }])

        const response = await handler(diceRollerFixedResult)(request)

        expect(response.data.content).toEqual('Error: invalid input')
    })

    it('should return an error if given no input', async () => {
        const request = createRequest([])

        const response = await handler(diceRollerFixedResult)(request)

        expect(response.data.content).toEqual('Invalid option: dice')
    })

    it('should return the results of the DiceRoll library', async () => {
        const request = createRequest([{
            name: Options.dice,
            type: CommandOptionType.STRING,
            value: '1d20 + 1d10'
        }])

        const diceRoll = diceRollerFixedResult('1d20 + 1d10')

        const response = await handler(() => diceRoll)(request)

        expect(response.data.content).toEqual(diceRoll)
    })

    describe('defaultDiceRoll', () => {
        it("should roll 1d20", () => {
            const diceRoll = diceRollerFixedResult("1d20")

            expect(diceRoll).toEqual("1d20: [10] = 10")
        })

        it("should roll 2d20", () => {
            const diceRoll = diceRollerFixedResult("2d20")

            expect(diceRoll).toEqual("2d20: [10,10] = 20")
        })

        it("should roll 2d20 + 5", () => {
            const diceRoll = diceRollerFixedResult("2d20 + 5")

            expect(diceRoll).toEqual("2d20 + 5: [10,10] + 5 = 25")
        })

        it("should roll 2d20 + 3d8", () => {
            const diceRoll = diceRollerFixedResult("2d20 + 3d8")

            expect(diceRoll).toEqual("2d20 + 3d8: [10,10] + [4,4,4] = 32")
        })

        it.skip("should roll 4d6kh3", () => {
            const diceRoll = diceRollerFixedResult("4d6kh3")

            expect(diceRoll).toEqual("4d6kh3: ")
        })
    })
})