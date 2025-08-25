import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient, NativeAttributeValue, QueryCommand } from '@aws-sdk/lib-dynamodb'

export type CombinedStorageKey = {
    partitionKey: string
    sortKey: string
}

export type CombinedStorageUpsertRequest = Record<string, NativeAttributeValue> & CombinedStorageKey

export type CombinedStorageReadResponse = Record<string, NativeAttributeValue> & CombinedStorageKey

export class CombinedStorageClient {
    private documentClient: DynamoDBDocumentClient
    constructor(
        dynamodb: DynamoDB, 
        private tableName: string, 
        private appName: string,
    ) {
        this.documentClient = DynamoDBDocumentClient.from(dynamodb)
    }

    private getPartitionKey = (partitionKey: string): string => `app#${this.appName}#${partitionKey}`

    upsert = async (requests: CombinedStorageUpsertRequest[]) => {
        const numOfPartitonKeys = requests.reduce((prev, curr) => prev.add(curr.partitionKey), new Set<string>())
        if (numOfPartitonKeys.size !== 1) return false

        const putRequests = requests.map(({partitionKey, ...request}) => ({
            PutRequest: {
                Item: {
                    partitionKey: this.getPartitionKey(partitionKey),
                    ...request,
                }
            }
        }))

        const command = new BatchWriteCommand({
            RequestItems: {
                [this.tableName]: putRequests,
            }
        })

        const output = await this.documentClient.send(command)

        console.log(output)

        return !output.UnprocessedItems || Object.keys(output.UnprocessedItems).length === 0
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