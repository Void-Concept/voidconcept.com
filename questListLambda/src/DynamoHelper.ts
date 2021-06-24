import { DynamoDB } from "aws-sdk";


export type ChildQuest = {
    name: string
    href: string | null
}

export type ChildQuestList = ChildQuest[]


export type QuestDifficulty = 'Novice' | 'Intermediate' | 'Experienced' | 'Master' | 'Grandmaster' | 'Special'

export type QuestAge = 'Fifth Age' | 'Sixth Age' | 'Ambiguous'

export type Quest = {
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
                href: {
                    S: string
                }
            }
        }[]
    }
}
export class DynamoHelper {

    constructor(private dynamoDb: DynamoDB, private questTableName: string) {
    }

    getQuest = async (href: string): Promise<Quest> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.questTableName,
            Key: {
                href: {
                    S: href
                },
            }
        }).promise();
        if (!response.Item) {
            throw new Error("Could not find quest")
        }
        const dynamoQuest = response.Item as DynamoQuest;
        return {
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
                href: req.M.href.S
            }))
        };
    }
}