import { DynamoDB, AttributeValue } from "@aws-sdk/client-dynamodb";


export type ChildQuest = {
    name: string
    id: string | undefined
    href: string | undefined
}

export type ChildQuestList = ChildQuest[]


export type QuestDifficulty = 'Novice' | 'Intermediate' | 'Experienced' | 'Master' | 'Grandmaster' | 'Special'

export type QuestAge = 'Fifth Age' | 'Sixth Age' | 'Ambiguous'

export type Quest = {
    id: string
    name: string
    href: string
    members: boolean
    difficulty: QuestDifficulty
    length: string
    age: QuestAge
    questPoints: number
    series: string
    questRequirements: ChildQuestList
}

interface DynamoQuest extends Record<string, AttributeValue> {
    id: AttributeValue.SMember,
    name: AttributeValue.SMember,
    href: AttributeValue.SMember,
    members: AttributeValue.BOOLMember,
    difficulty: AttributeValue.SMember,
    length: AttributeValue.SMember,
    age: AttributeValue.SMember,
    questPoints: AttributeValue.NMember,
    series: AttributeValue.SMember,
    questRequirements: {
        L: {
            M: {
                name: AttributeValue.SMember,
                id: AttributeValue.SMember | AttributeValue.NULLMember,
                href: AttributeValue.SMember | AttributeValue.NULLMember,
            }
        }[]
    }
}
export class DynamoHelper {

    constructor(private dynamoDb: DynamoDB, private questTableName: string) {
    }

    getQuest = async (id: string): Promise<Quest | null> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.questTableName,
            Key: {
                id: {
                    S: id.toLowerCase()
                },
            }
        });
        if (!response.Item) {
            return null
        }
        const dynamoQuest = response.Item as DynamoQuest;
        return {
            id: dynamoQuest.id.S,
            name: dynamoQuest.name.S,
            href: dynamoQuest.href.S,
            members: dynamoQuest.members.BOOL,
            difficulty: dynamoQuest.difficulty.S as QuestDifficulty,
            length: dynamoQuest.length.S,
            age: dynamoQuest.age.S as QuestAge,
            questPoints: parseInt(dynamoQuest.questPoints.N),
            series: dynamoQuest.series.S,
            questRequirements: dynamoQuest.questRequirements.L.map(req => ({
                name: req.M.name.S,
                id: req.M.id?.S,
                href: req.M.href?.S
            }))
        };
    }
}