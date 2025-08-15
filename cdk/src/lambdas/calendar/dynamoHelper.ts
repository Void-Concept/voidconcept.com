import { DynamoDB, PutRequest, AttributeValue } from "@aws-sdk/client-dynamodb";

type DndCalendarRepeatUnit = "year" | "month" | "week" | "day"

type DndCalendarRepeat = {
    frequency: number
    timeUnit: DndCalendarRepeatUnit
}

interface DndCalendarEvent {
    name: string
    date: number
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

export interface NotificationChannel {
    name: string
    id: string
    roleId: string
    disabled: boolean
}

export class DynamoHelper {
    constructor(private dynamoDb: DynamoDB, private calendarTableName: string) {
    }

    getDndCalendar = async (calendarName: string): Promise<DndCalendar> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.calendarTableName,
            Key: {
                name: this.toDynamoString(calendarName)
            }
        });
        if (!response.Item) {
            throw new Error("Could not find DnD calendar")
        }
        const dynamoCalendar = response.Item;
        return this.fromDynamoCalendar(dynamoCalendar);
    }

    postDndCalendar = async (calendarName: string, calendar: DndCalendar): Promise<DndCalendar> => {
        const request: PutRequest = {
            Item: this.toDynamoCalendar(calendar)
        };

        const response = await this.dynamoDb.batchWriteItem({
            RequestItems: {
                [this.calendarTableName]: [{
                    PutRequest: request
                }]
            }
        })

        if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
            throw new Error("Could not write Dnd calendar")
        }
        return this.getDndCalendar(calendarName);
    }

    private toDynamoCalendar = (dndCalendar: DndCalendar): Record<string, AttributeValue> => ({
        name: this.toDynamoString(dndCalendar.name),
        months: this.toDynamoList(dndCalendar.months, this.toDynamoString),
        weekDays: this.toDynamoList(dndCalendar.weekDays, this.toDynamoString),
        daysInMonth: this.toDynamoNumber(dndCalendar.daysInMonth),
        epochOffset: this.toDynamoNumber(dndCalendar.epochOffset),
        currentDate: this.toDynamoCalendarDate(dndCalendar.currentDate),
        notificationChannels: this.toDynamoList(dndCalendar.notificationChannels, this.toDynamoNotificationChannel),
        events: this.toDynamoList(dndCalendar.events, this.toDynamoEvent)
    })

    private fromDynamoCalendar = (dndCalendar: Record<string, AttributeValue>): DndCalendar => ({
        name: this.fromDynamoString(dndCalendar.name),
        months: this.fromDynamoList(dndCalendar.months, this.fromDynamoString),
        weekDays: this.fromDynamoList(dndCalendar.weekDays, this.fromDynamoString),
        daysInMonth: this.fromDynamoNumber(dndCalendar.daysInMonth),
        epochOffset: this.fromDynamoNumber(dndCalendar.epochOffset),
        currentDate: this.fromDynamoCalendarDate(dndCalendar.currentDate),
        notificationChannels: this.fromDynamoList(dndCalendar.notificationChannels, this.fromDynamoNotificationChannel),
        events: this.fromDynamoList(dndCalendar.events, this.fromDynamoEvent)
    })

    private toDynamoList = <T>(list: T[], elementMapper: (elem: T) => AttributeValue): AttributeValue => ({
        L: list.map(elementMapper)
    })

    private fromDynamoList = <T>(list: AttributeValue, elementMapper: (elem: AttributeValue) => T): T[] => (
        list.L!.map(elementMapper)
    )

    private toDynamoString = (str: string): AttributeValue => ({
        S: str
    })

    private fromDynamoString = (str: AttributeValue): string => str.S!

    private toDynamoNumber = (num: number): AttributeValue => ({
        N: num.toString()
    })

    private fromDynamoNumber = (num: AttributeValue): number => parseInt(num.N!)

    private toDynamoBoolean = (bool: boolean): AttributeValue => ({
        BOOL: bool
    })

    private fromDynamoBoolean = (bool: AttributeValue): boolean => bool.BOOL!

    private toDynamoCalendarDate = (currentDate: DndCalendarDate): AttributeValue => ({
        M: {
            year: this.toDynamoNumber(currentDate.year),
            month: this.toDynamoNumber(currentDate.month),
            day: this.toDynamoNumber(currentDate.day),
        }
    })

    private fromDynamoCalendarDate = (currentDate: AttributeValue): DndCalendarDate => ({
        year: this.fromDynamoNumber(currentDate.M!.year),
        month: this.fromDynamoNumber(currentDate.M!.month),
        day: this.fromDynamoNumber(currentDate.M!.day),
    })

    private toDynamoNotificationChannel = (notificationChannel: NotificationChannel): AttributeValue => ({
        M: {
            name: this.toDynamoString(notificationChannel.name),
            id: this.toDynamoString(notificationChannel.id),
            roleId: this.toDynamoString(notificationChannel.roleId),
            disabled: this.toDynamoBoolean(notificationChannel.disabled),
        }
    })

    private fromDynamoNotificationChannel = (notificationChannel: AttributeValue): NotificationChannel => ({
        name: this.fromDynamoString(notificationChannel.M!.name),
        id: this.fromDynamoString(notificationChannel.M!.id),
        roleId: this.fromDynamoString(notificationChannel.M!.roleId),
        disabled: this.fromDynamoBoolean(notificationChannel.M!.disabled),
    })

    private toDynamoEventRepeat = (repeat: DndCalendarRepeat): AttributeValue => ({
        M: this.withoutUndefined({
            frequency: this.toDynamoNumber(repeat.frequency),
            timeUnit: this.toDynamoString(repeat.timeUnit)
        })
    })

    private fromDynamoEventRepeat = (repeat: AttributeValue): DndCalendarRepeat => ({
        frequency: this.fromDynamoNumber(repeat.M!.frequency),
        timeUnit: this.fromDynamoString(repeat.M!.timeUnit) as DndCalendarRepeatUnit
    })

    private toDynamoEvent = (event: DndCalendarEvent): AttributeValue => ({
        M: this.withoutUndefined({
            name: this.toDynamoString(event.name),
            date: this.toDynamoNumber(event.date),
            repeat: event.repeat && this.toDynamoEventRepeat(event.repeat)
        })
    })

    private fromDynamoEvent = (event: AttributeValue): DndCalendarEvent => ({
        name: this.fromDynamoString(event.M!.name),
        date: this.fromDynamoNumber(event.M!.date),
        repeat: event.M!.repeat && this.fromDynamoEventRepeat(event.M!.repeat)
    })

    private withoutUndefined = (obj: { [key: string]: AttributeValue | undefined }): { [key: string]: AttributeValue } => {
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