import { DynamoDB } from "aws-sdk";

type DndCalendarRepeat = "yearly" | "monthly" | "weekly" | "daily" //TODO: is this all that's needed?

interface DndCalendarEvent {
    name: string
    date: DndCalendarDate
    repeat?: DndCalendarRepeat
}

interface DndCalendar {
    name: string

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

interface DynamoDndCalendarDate extends DynamoDB.AttributeMap {
    name: {
        S: string
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

export interface NotificationChannel {
    name: string
    id: string
    roleId: string
    disabled: boolean
}
export class DynamoHelper {
    constructor(private dynamoDb: DynamoDB, private genericStorageTableName: string, private calendarTableName: string) {
    }

    //TODO: remove
    legacyGetNotificationChannels = async (): Promise<NotificationChannel[]> => {
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

    //TODO: remove
    legacyGetDndCalendar = async (): Promise<DndCalendarDate> => {
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
        const dynamoCalendar = response.Item as DynamoDndCalendarDate;
        return {
            day: parseInt(dynamoCalendar.value.M.day.N),
            month: parseInt(dynamoCalendar.value.M.month.N),
            year: parseInt(dynamoCalendar.value.M.year.N),
        };
    }

    //TODO: remove
    legacyPostDndCalendar = async (calendar: DndCalendarDate): Promise<DndCalendarDate> => {
        const request: DynamoDndCalendarDate = {
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
        return this.legacyGetDndCalendar();
    }

    getDndCalendar = async (calendarName: string): Promise<DndCalendar> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.calendarTableName,
            Key: {
                name: this.toDynamoString(calendarName)
            }
        }).promise();
        if (!response.Item) {
            throw new Error("Could not find DnD calendar")
        }
        const dynamoCalendar = response.Item;
        return this.fromDynamoCalendar(dynamoCalendar);
    }

    postDndCalendar = async (calendarName: string, calendar: DndCalendar): Promise<DndCalendar> => {
        const request: DynamoDB.PutItemInputAttributeMap = {
            Item: this.toDynamoCalendar(calendar)
        };

        const response = await this.dynamoDb.batchWriteItem({
            RequestItems: {
                [this.calendarTableName]: [{
                    PutRequest: {
                        Item: request
                    }
                }]
            }
        }).promise()

        if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
            throw new Error("Could not write Dnd calendar")
        }
        return this.getDndCalendar(calendarName);
    }

    private toDynamoCalendar = (dndCalendar: DndCalendar): DynamoDB.AttributeMap => ({
        name: this.toDynamoString(dndCalendar.name),
        months: this.toDynamoList(dndCalendar.months, this.toDynamoString),
        weekDays: this.toDynamoList(dndCalendar.weekDays, this.toDynamoString),
        daysInMonth: this.toDynamoNumber(dndCalendar.daysInMonth),
        epochOffset: this.toDynamoNumber(dndCalendar.epochOffset),
        currentDate: this.toDynamoCalendarDate(dndCalendar.currentDate),
        notificationChannels: this.toDynamoList(dndCalendar.notificationChannels, this.toDynamoNotificationChannel),
        events: this.toDynamoList(dndCalendar.events, this.toDynamoEvent)
    })

    private fromDynamoCalendar = (dndCalendar: DynamoDB.AttributeMap): DndCalendar => ({
        name: this.fromDynamoString(dndCalendar.name),
        months: this.fromDynamoList(dndCalendar.months, this.fromDynamoString),
        weekDays: this.fromDynamoList(dndCalendar.weekDays, this.fromDynamoString),
        daysInMonth: this.fromDynamoNumber(dndCalendar.daysInMonth),
        epochOffset: this.fromDynamoNumber(dndCalendar.epochOffset),
        currentDate: this.fromDynamoCalendarDate(dndCalendar.currentDate),
        notificationChannels: this.fromDynamoList(dndCalendar.notificationChannels, this.fromDynamoNotificationChannel),
        events: this.fromDynamoList(dndCalendar.events, this.fromDynamoEvent)
    })

    private toDynamoList = <T>(list: T[], elementMapper: (elem: T) => DynamoDB.AttributeValue): DynamoDB.AttributeValue => ({
        L: list.map(elementMapper)
    })

    private fromDynamoList = <T>(list: DynamoDB.AttributeValue, elementMapper: (elem: DynamoDB.AttributeValue) => T): T[] => (
        list.L!.map(elementMapper)
    )

    private toDynamoString = (str: string): DynamoDB.AttributeValue => ({
        S: str
    })

    private fromDynamoString = (str: DynamoDB.AttributeValue): string => str.S!

    private toDynamoNumber = (num: number): DynamoDB.AttributeValue => ({
        N: num.toString()
    })

    private fromDynamoNumber = (num: DynamoDB.AttributeValue): number => parseInt(num.N!)

    private toDynamoBoolean = (bool: boolean): DynamoDB.AttributeValue => ({
        BOOL: bool
    })

    private fromDynamoBoolean = (bool: DynamoDB.AttributeValue): boolean => bool.BOOL!

    private toDynamoCalendarDate = (currentDate: DndCalendarDate): DynamoDB.AttributeValue => ({
        M: {
            year: this.toDynamoNumber(currentDate.year),
            month: this.toDynamoNumber(currentDate.month),
            day: this.toDynamoNumber(currentDate.day),
        }
    })

    private fromDynamoCalendarDate = (currentDate: DynamoDB.AttributeValue): DndCalendarDate => ({
        year: this.fromDynamoNumber(currentDate.M!.year),
        month: this.fromDynamoNumber(currentDate.M!.month),
        day: this.fromDynamoNumber(currentDate.M!.day),
    })

    private toDynamoNotificationChannel = (notificationChannel: NotificationChannel): DynamoDB.AttributeValue => ({
        M: {
            name: this.toDynamoString(notificationChannel.name),
            id: this.toDynamoString(notificationChannel.id),
            roleId: this.toDynamoString(notificationChannel.roleId),
            disabled: this.toDynamoBoolean(notificationChannel.disabled),
        }
    })

    private fromDynamoNotificationChannel = (notificationChannel: DynamoDB.AttributeValue): NotificationChannel => ({
        name: this.fromDynamoString(notificationChannel.M!.name),
        id: this.fromDynamoString(notificationChannel.M!.id),
        roleId: this.fromDynamoString(notificationChannel.M!.roleId),
        disabled: this.fromDynamoBoolean(notificationChannel.M!.disabled),
    })

    private toDynamoEvent = (event: DndCalendarEvent): DynamoDB.AttributeValue => ({
        M: this.withoutUndefined({
            name: this.toDynamoString(event.name),
            date: this.toDynamoCalendarDate(event.date),
            repeat: event.repeat && this.toDynamoString(event.repeat)
        })
    })

    private fromDynamoEvent = (event: DynamoDB.AttributeValue): DndCalendarEvent => ({
        name: this.fromDynamoString(event.M!.name),
        date: this.fromDynamoCalendarDate(event.M!.date),
        repeat: event.M!.repeat && (event.M!.repeat as DndCalendarRepeat)
    })

    private withoutUndefined = (obj: { [key: string]: DynamoDB.AttributeValue | undefined }): { [key: string]: DynamoDB.AttributeValue } => {
        const keys = Object.keys(obj)
        return keys.reduce((prev, curr) => {
            if (typeof obj[curr] === "undefined") {
                return prev
            } else {
                return { ...prev, [curr]: obj[curr] }
            }
        }, {})
    }
}