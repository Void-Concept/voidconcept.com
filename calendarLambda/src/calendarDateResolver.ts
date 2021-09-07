import { APIGatewayProxyEvent } from "aws-lambda";
import { DiscordService } from "./DiscordService";
import { DndCalendarDate, DynamoHelper } from "./DynamoHelper";

export const doLegacyGet = (dynamoHelper: DynamoHelper) => async (event: APIGatewayProxyEvent) => {
    const calendar = await dynamoHelper.legacyGetDndCalendar();
    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}

export const doLegacyPost = (dynamoHelper: DynamoHelper, discordService: DiscordService) => async (event: APIGatewayProxyEvent) => {
    const oldCalendar = await dynamoHelper.legacyGetDndCalendar();
    const calendar = await dynamoHelper.legacyPostDndCalendar(parseEventBody(event))

    const totalDays = calendar.year * 12 * 30 + calendar.month * 30 + calendar.day
    const oldTotalDays = oldCalendar.year * 12 * 30 + oldCalendar.month * 30 + oldCalendar.day

    const daysChanged = totalDays - oldTotalDays
    if (daysChanged !== 0) {
        await discordService.legacyNotifyCalendarUpdate(daysChanged, calendar)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}

export const doGet = (dynamoHelper: DynamoHelper) => async (event: APIGatewayProxyEvent) => {
    const calendarName = getCalendarName(event)
    const calendar = await dynamoHelper.getDndCalendar(calendarName);
    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}

export const doPost = (dynamoHelper: DynamoHelper, discordService: DiscordService) => async (event: APIGatewayProxyEvent) => {
    const calendarName = getCalendarName(event)
    const oldCalendar = await dynamoHelper.getDndCalendar(calendarName);
    const oldCalendarDate = oldCalendar.currentDate
    const newCalendar = { ...oldCalendar, currentDate: parseEventBody(event) }

    const calendar = await dynamoHelper.postDndCalendar(calendarName, newCalendar)
    const calendarDate = calendar.currentDate

    const totalDays = calendarDate.year * calendar.months.length * calendar.daysInMonth + calendarDate.month * calendar.daysInMonth + calendarDate.day
    const oldTotalDays = oldCalendarDate.year * calendar.months.length * calendar.daysInMonth + oldCalendarDate.month * calendar.daysInMonth + oldCalendarDate.day

    const daysChanged = totalDays - oldTotalDays
    if (daysChanged !== 0) {
        await discordService.notifyCalendarUpdate(calendar.notificationChannels, daysChanged, calendarDate)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}

const parseEventBody = (event: APIGatewayProxyEvent): DndCalendarDate => {
    if (!event.body) throw new Error("Invalid calendar payload")
    return JSON.parse(event.body.toString());
};

const getCalendarName = (event: APIGatewayProxyEvent): string => {
    if (!!event.pathParameters?.calendarName) {
        return event.pathParameters.calendarName
    } else {
        throw new Error("Calendar name not found")
    }
}