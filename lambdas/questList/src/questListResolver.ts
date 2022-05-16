import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoHelper } from "./DynamoHelper";

export const doGetFactory = (dynamoHelper: DynamoHelper) => async (event: APIGatewayProxyEvent) => {
    const questId = event.queryStringParameters?.questId
    if (!questId) {
        return {
            statusCode: 400,
            body: JSON.stringify("Missing questId parameter")
        }
    }
    const quest = await dynamoHelper.getQuest(questId);

    if (quest) {
        return {
            statusCode: 200,
            body: JSON.stringify(quest)
        }
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: `Quest ${questId} not found` })
        }
    }
}
