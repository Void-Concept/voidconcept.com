import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

interface CombinedStorageStackProps extends StackProps {

}

export class CombinedStorageStack extends Stack {
    combinedStorageTable: dynamodb.ITable;

    constructor(scope: Construct, id: string, props: CombinedStorageStackProps) {
        super(scope, id, props);

        this.combinedStorageTable = new dynamodb.Table(this, "CombinedStorage", {
            tableName: "CombinedStorage",
            partitionKey: {
                name: "partitionKey",
                type: dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: "sortKey",
                type: dynamodb.AttributeType.STRING
            }
        });
    }
}
