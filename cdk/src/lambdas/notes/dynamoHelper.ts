import { DynamoDB, AttributeValue } from "@aws-sdk/client-dynamodb";
import { v1 as uuidv1 } from 'uuid'

type Notes = {
    id: string
    name: string
    notes: string
}

export class DynamoHelper {
    constructor(private dynamoDb: DynamoDB, private notesTableName: string) {
    }

    getNotesList = async (): Promise<Notes[]> => {
        const response = await this.dynamoDb.scan({
            TableName: this.notesTableName,
        })
        if (!response.Items) {
            throw new Error("Could not find any notes")
        }
        const notes = response.Items

        return notes.map(this.fromDynamoNotes)
    }

    getNotes = async (id: string): Promise<Notes> => {
        const response = await this.dynamoDb.getItem({
            TableName: this.notesTableName,
            Key: {
                id: this.toDynamoString(id)
            }
        })
        if (!response.Item) {
            throw new Error("Could not find notes")
        }
        const notes = response.Item

        return this.fromDynamoNotes(notes)
    }

    updateNotes = async (id: string, name: string, notes: string): Promise<Notes> => {
        const newState = await this.dynamoDb.updateItem({
            TableName: this.notesTableName,
            Key: {
                id: this.toDynamoString(id)
            },
            AttributeUpdates: {
                name: {
                    Value: this.toDynamoString(name)
                },
                notes: {
                    Value: this.toDynamoString(notes)
                }
            },
            ReturnValues: "ALL_NEW"
        })
        if (!newState.Attributes) throw new Error("Could not update")

        return this.fromDynamoNotes(newState.Attributes)
    }

    createNotes = async (name: string): Promise<Notes> => {
        const generatedId = uuidv1()
        const newState = await this.dynamoDb.updateItem({
            TableName: this.notesTableName,
            Key: {
                id: this.toDynamoString(generatedId)
            },
            AttributeUpdates: {
                name: {
                    Value: this.toDynamoString(name)
                },
                notes: {
                    Value: this.toDynamoString("")
                }
            },
            ReturnValues: "ALL_NEW"
        })
        if (!newState.Attributes) throw new Error("Could not create")

        return this.fromDynamoNotes(newState.Attributes)
    }

    // ======== helpers ========

    private toDynamoNotes = (notes: Notes): Record<string, AttributeValue> => ({
        id: this.toDynamoString(notes.id),
        name: this.toDynamoString(notes.name),
        notes: this.toDynamoString(notes.notes),
    })

    private fromDynamoNotes = (notes: Record<string, AttributeValue>): Notes => ({
        id: this.fromDynamoString(notes.id),
        name: this.fromDynamoString(notes.name),
        notes: this.fromDynamoString(notes.notes),
    })

    private toDynamoString = (str: string): AttributeValue => ({
        S: str
    })

    private fromDynamoString = (str: AttributeValue): string => str.S!
}