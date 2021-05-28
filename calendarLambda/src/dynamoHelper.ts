import { DynamoDB } from "aws-sdk";

export interface DndCalendar {
    year: number
    month: number
    day: number
}

interface DynamoDndCalendar extends DynamoDB.AttributeMap {
    name: {
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

interface DynamoDndCalendarNotificationChannels extends DynamoDB.AttributeMap {
    name: {
        S: "DndCalendarNotificationChannels"
    },
    value: {
        L: {
            S: string
        }[]
    }
}

export class DynamoHelper {

    constructor(private dynamoDb: DynamoDB, private genericStorageTableName: string, private calendarTableName: string) {
    }

    getNotificationChannels = async (): Promise<string[]> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.genericStorageTableName,
            Key: {
                name: {
                    S: "DndCalendarNotificationChannels"
                },
            }
        }).promise();
        if (!response.Item) {
            throw new Error("Could not find DnD calendar notification channels")
        }
        const notificationChannels = response.Item as DynamoDndCalendarNotificationChannels;
        return notificationChannels.value.L.map(list => list.S)
    }

    getDndCalendar = async (): Promise<DndCalendar> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.genericStorageTableName,
            Key: {
                name: {
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
            name: {
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
                [this.genericStorageTableName]: [{
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