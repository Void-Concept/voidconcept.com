import { DynamoDB } from "aws-sdk";

export interface DndCalendar {
    year: number
    month: number
    day: number
}

interface DynamoDndCalendar extends DynamoDB.AttributeMap {
    id: {
        S: "DndCalendar"
    },
    value: {
        M: {
            year: {
                N: string
            },
            month: {
                N: string
            },
            day: {
                N: string
            }
        }
    }
}

export class DynamoHelper {
    private dynamoDb: DynamoDB;
    private tableName: string;

    constructor(dynamodb: DynamoDB, tableName: string) {
        this.dynamoDb = dynamodb
        this.tableName = tableName
    }

    getDndCalendar = async (): Promise<DndCalendar> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.tableName,
            Key: {
                id: {
                    S: "DndCalendar"
                },
            }
        }).promise();
        if (!response.Item) {
            throw new Error("Could not find DnD calendar")
        }
        const dynamoCalendar = response.Item as DynamoDndCalendar;
        return {
            day: parseInt(dynamoCalendar.value.M.day.N),
            month: parseInt(dynamoCalendar.value.M.month.N),
            year: parseInt(dynamoCalendar.value.M.year.N),
        };
    }

    postDndCalendar = async (calendar: DndCalendar): Promise<DndCalendar> => {
        const request: DynamoDndCalendar = {
            id: {
                S: "DndCalendar"
            },
            value: {
                M: {
                    day: {
                        N: calendar.day.toString()
                    },
                    month: {
                        N: calendar.month.toString()
                    },
                    year: {
                        N: calendar.year.toString()
                    }
                }
            }
        };

        const response = await this.dynamoDb.batchWriteItem({
            RequestItems: {
                [this.tableName]: [{
                    PutRequest: {
                        Item: request
                    }
                }]
            }
        }).promise()

        if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
            throw new Error("Could not write Dnd calendar")
        }
        return this.getDndCalendar();
    }
}