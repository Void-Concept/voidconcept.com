import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoHelper } from "./dynamoHelper";
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dynamoDbTableName = process.env.tableName as string;
    const dynamoDb = new DynamoDB();
    const dynamoHelper = new DynamoHelper(dynamoDb, dynamoDbTableName);

    const response = withCors(event.headers.Origin, await dependencyInjectedHandler(event, dynamoHelper));
    console.log("responding with", response);
    return response
}

export const dependencyInjectedHandler = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
): Promise<APIGatewayProxyResult> => {
    if (event.path === "/notes") {
        return handleNotesListEvent(event, dynamoHelper)
    } else if (event.path.startsWith("/notes/")) {
        return handleNotesEvent(event, dynamoHelper)
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

export const handleNotesEvent = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
): Promise<APIGatewayProxyResult> => {
    const notesId = event.pathParameters?.notesId
    if (!notesId) throw new Error("Path setup incorrectly")

    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(await dynamoHelper.getNotes(notesId))
        }
    } else if (event.httpMethod === "POST") {
        const { name, notes } = parseEventBody(event)
        await dynamoHelper.updateNotes(notesId, name, notes)

        return {
            statusCode: 200,
            body: JSON.stringify("inserted")
        }
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

type NotesBody = {
    name: string
    notes: string
}
const parseEventBody = (event: APIGatewayProxyEvent): NotesBody => {
    if (!event.body) throw new Error("Invalid calendar payload")
    return JSON.parse(event.body.toString());
};

export const handleNotesListEvent = async (
    event: APIGatewayProxyEvent,
    dynamoHelper: DynamoHelper,
): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(await dynamoHelper.getNotesList())
        }
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify("Operation not found")
        }
    }
}

const withCors = (origin: string | undefined, response: APIGatewayProxyResult) => {
    return Object.assign({
        headers: Object.assign({
            "Access-Control-Allow-Origin": "*"
        }, response.headers)
    }, response);
}