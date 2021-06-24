import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoHelper } from "./DynamoHelper";

export const doGetFactory = (dynamoHelper: DynamoHelper) => async (event: APIGatewayProxyEvent) => {
    const questName = event.queryStringParameters?.questName
    event.pathParameters
    if (!questName) {
        return {
            statusCode: 400,
            body: JSON.stringify("Missing questName parameter")
        }
    }
    const calendar = await dynamoHelper.getQuest(questName);
    return {
        statusCode: 200,
        body: JSON.stringify(calendar)
    };
}
