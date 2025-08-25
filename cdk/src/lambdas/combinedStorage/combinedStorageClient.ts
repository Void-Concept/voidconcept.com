import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { BatchGetCommand, BatchWriteCommand, DynamoDBDocumentClient, NativeAttributeValue, QueryCommand } from '@aws-sdk/lib-dynamodb'

export type CombinedStorageKey = {
    partitionKey: string
    sortKey: string
}

export type CombinedStorageUpsertRequest = Record<string, NativeAttributeValue> & {
    sortKey: string
}

export type CombinedStorageReadResponse = Record<string, NativeAttributeValue> & CombinedStorageKey

export class CombinedStorageClient {
    private documentClient: DynamoDBDocumentClient
    constructor(
        dynamodb: DynamoDB, 
        private tableName: string, 
        private appName: string
    ) {
        this.documentClient = DynamoDBDocumentClient.from(dynamodb)
    }

    private getPartitionKey = (partitionKey: string): string => `app#${this.appName}#${partitionKey}`

    upsert = async (partitionKey: string, requests: CombinedStorageUpsertRequest[]) => {
        const putRequests = requests.map(request => ({
            PutRequest: {
                Item: {
                    partitonKey: this.getPartitionKey(partitionKey),
                    ...request,
                }
            }
        }))

        const command = new BatchWriteCommand({
            RequestItems: {
                [this.tableName]: putRequests
            }
        })

        const output = await this.documentClient.send(command)

        return !output.UnprocessedItems
    }

    read = async (partitionKey: string): Promise<CombinedStorageReadResponse[]> => {
        const command = new QueryCommand({
            TableName: this.tableName,
            KeyConditions: {
                partitionKey: {
                    ComparisonOperator: "EQ",
                    AttributeValueList: [this.getPartitionKey(partitionKey)],
                }
            }
        })

        const output = await this.documentClient.send(command)
        
        if (!output.Items) {
            return []
        } else {
            return output.Items as CombinedStorageReadResponse[]
        }
    }
}