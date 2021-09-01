import { DynamoDB } from "aws-sdk";

interface DndCalendarEvent {
    name: string
    date: DndCalendarDate
    repeat?: "yearly" | "monthly" | "weekly" | "daily" //TODO: is this all that's needed?
}

//TODO: use this interface
interface DndCalendar {
    months: string[]
    weekDays: string[]
    daysInMonth: number
    epochOffset: number

    currentDate: DndCalendarDate //TODO: should just store epoch?
    notificationChannels: NotificationChannel[]
    events: DndCalendarEvent[]
}

export interface DndCalendarDate {
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
            M: {
                name: {
                    S: string
                }
                id: {
                    S: string
                },
                roleId: {
                    S: string
                },
                disabled: {
                    BOOL: boolean
                }
            }
        }[]
    }
}

interface NotificationChannel {
    name: string
    id: string
    roleId: string
    disabled: boolean
}
export class DynamoHelper {

    constructor(private dynamoDb: DynamoDB, private genericStorageTableName: string, private calendarTableName: string) {
    }

    //TODO: take a calendarName parameter
    //TODO: use calendar dynamoDb table
    getNotificationChannels = async (): Promise<NotificationChannel[]> => {
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
        return notificationChannels.value.L.map(channel => ({
            name: channel.M.name.S,
            id: channel.M.id.S,
            roleId: channel.M.roleId.S,
            disabled: !!channel.M.disabled?.BOOL
        })).filter(list => !list.disabled)
    }

    //TODO: take a calendarName parameter
    //TODO: use calendar dynamoDb table
    getDndCalendar = async (): Promise<DndCalendarDate> => {
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

    //TODO: take a calendarName parameter
    //TODO: use calendar dynamoDb table
    postDndCalendar = async (calendar: DndCalendarDate): Promise<DndCalendarDate> => {
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