import { APIGatewayProxyEvent } from "aws-lambda";
import { DiscordService } from "./DiscordService";
import { DndCalendarDate, DynamoHelper } from "./DynamoHelper";

export const doGetFactory = (dynamoHelper: DynamoHelper) => async (event: APIGatewayProxyEvent) => {
    const calendar = await dynamoHelper.getDndCalendar();
    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}

export const doPostFactory = (dynamoHelper: DynamoHelper, discordService: DiscordService) => async (event: APIGatewayProxyEvent) => {
    const oldCalendar = await dynamoHelper.getDndCalendar();
    const calendar = await dynamoHelper.postDndCalendar(parseEventBody(event))

    const totalDays = calendar.year * 12 * 30 + calendar.month * 30 + calendar.day
    const oldTotalDays = oldCalendar.year * 12 * 30 + oldCalendar.month * 30 + oldCalendar.day

    const daysChanged = totalDays - oldTotalDays
    if (daysChanged !== 0) {
        await discordService.notifyCalendarUpdate(daysChanged, calendar)
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