import { APIGatewayProxyEvent } from "aws-lambda";
import { DndCalendar, DynamoHelper } from "./DynamoHelper";

export const doGetFactory = (dynamoHelper: DynamoHelper) => async (event: APIGatewayProxyEvent) => {
    const calendar = await dynamoHelper.getQuest("???");
    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}

const parseEventBody = (event: APIGatewayProxyEvent): DndCalendar => {
    if (!event.body) throw new Error("Invalid calendar payload")
    return JSON.parse(event.body.toString());
};