import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { handler, Options } from './roll'
import { RequestOption, Request, CommandOptionType } from './types'

describe('roll', () => {
    const createRequest = (options: RequestOption[]): Request => ({
        type: InteractionType.APPLICATION_COMMAND,
        data: {
            options: options
        }
    } as Request)

    const rngReturns = (response: number) => (): number => response

    it('should correctly roll 1d20', async () => {
        const returnValues = new Array(21).fill(0).map((_, index) => index)

        const testRun = async (returnValue: number) => {
            const request = createRequest([{
                name: Options.dice,
                type: CommandOptionType.STRING,
                value: '1d20'
            }])
    
            const rng = rngReturns(returnValue)
    
            const response = await handler(rng)(request)
    
            expect(response.data.content).toEqual(`Rolling [1d20]: ${(returnValue % 20) + 1}`)
        }

        return Promise.all(returnValues.map(testRun))
    })

    it('should correctly roll 1d6', async () => {
        const returnValues = new Array(21).fill(0).map((_, index) => index)

        const testRun = async (returnValue: number) => {
            const request = createRequest([{
                name: Options.dice,
                type: CommandOptionType.STRING,
                value: '1d6'
            }])
    
            const rng = rngReturns(returnValue)
    
            const response = await handler(rng)(request)
    
            expect(response.data.content).toEqual(`Rolling [1d6]: ${(returnValue % 6) + 1}`)
        }

        return Promise.all(returnValues.map(testRun))
    })

    const rngChain = (rngs: number[]) => {
        let numCalls = 0

        return () => {
            const rng = rngs[numCalls]
            numCalls = (numCalls + 1) % rngs.length
            return rng
        }
    }
    
    it('should correctly roll 2d20', async () => {
        const returnValues = new Array(21).fill(0).map((_, index) => [index, index + 1])

        const testRun = async (returnValue: number[]) => {
            const request = createRequest([{
                name: Options.dice,
                type: CommandOptionType.STRING,
                value: '2d20'
            }])
    
            const rng = rngChain(returnValue)
    
            const response = await handler(rng)(request)
    
            expect(response.data.content).toEqual(`Rolling [2d20]: ${(returnValue[0] % 20) + 1}, ${(returnValue[1] % 20) + 1}`)
        }

        return Promise.all(returnValues.map(testRun))
    })
    
    it('should correctly roll 2d6', async () => {
        const returnValues = new Array(21).fill(0).map((_, index) => [index, index + 1])

        const testRun = async (returnValue: number[]) => {
            const request = createRequest([{
                name: Options.dice,
                type: CommandOptionType.STRING,
                value: '2d6'
            }])
    
            const rng = rngChain(returnValue)
    
            const response = await handler(rng)(request)
    
            expect(response.data.content).toEqual(`Rolling [2d6]: ${(returnValue[0] % 6) + 1}, ${(returnValue[1] % 6) + 1}`)
        }

        return Promise.all(returnValues.map(testRun))
    })
    
    it('should have a limit on number of dice', async () => {
        const request = createRequest([{
            name: Options.dice,
            type: CommandOptionType.STRING,
            value: '21d6'
        }])

        const rng = rngReturns(1)

        const response = await handler(rng)(request)

        expect(response.data.content).toEqual(`Invalid number of dice. Can only roll 20 maximum`)
    })
})