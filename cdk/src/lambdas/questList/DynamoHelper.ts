import DynamoDB from "aws-sdk/clients/dynamodb";


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

interface DynamoQuest extends DynamoDB.AttributeMap {
    id: {
        S: string
    },
    name: {
        S: string
    },
    href: {
        S: string
    },
    members: {
        BOOL: boolean
    },
    difficulty: {
        S: string
    },
    length: {
        S: string
    },
    age: {
        S: string
    },
    questPoints: {
        N: string
    },
    series: {
        S: string
    },
    questRequirements: {
        L: {
            M: {
                name: {
                    S: string
                },
                id: {
                    S?: string
                },
                href: {
                    S?: string
                }
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
        }).promise();
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