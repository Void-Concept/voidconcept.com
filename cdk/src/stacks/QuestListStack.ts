import * as path from 'path';

import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

interface QuestListStackProps extends StackProps {
    hostedZone: route53.IHostedZone
}

export class QuestListStack extends Stack {
    constructor(scope: Construct, id: string, props: QuestListStackProps) {
        super(scope, id, props);

        const questTable = new dynamodb.Table(this, "QuestListStorage", {
            tableName: "QuestListStorage",
            partitionKey: {
                name: "id",
                type: dynamodb.AttributeType.STRING
            }
        });

        const domainName = `quests.${props.hostedZone.zoneName}`

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: props.hostedZone,
            domainName: domainName
        });

        const endpoint = new lambda_nodejs.NodejsFunction(this, "QuestListEndpoint", {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: "handler",
            entry: "./src/lambdas/questList/index.ts",
            bundling: {
                sourceMap: true,
                externalModules: ["aws-sdk"],
            },
            environment: {
                tableName: questTable.tableName
            }
        });
        questTable.grantReadData(endpoint)

        const api = new apigateway.RestApi(this, "QuestListGateway", {
            domainName: {
                domainName: domainName,
                endpointType: apigateway.EndpointType.REGIONAL,
                certificate: certificate
            },
            defaultIntegration: new apigateway.LambdaIntegration(endpoint),
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            }
        });

        const userQuests = api.root.addResource("quest");
        userQuests.addMethod("GET");

        new route53.ARecord(this, "QuestListAlias", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}
