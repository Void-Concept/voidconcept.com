import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as appsync from 'aws-cdk-lib/aws-appsync';

interface GraphQLStackProps extends StackProps {
    globalStorageTable: dynamodb.ITable;
}

export class GraphQLStack extends Stack {
    constructor(scope: Construct, id: string, props: GraphQLStackProps) {
        super(scope, id, props);

    }
}
