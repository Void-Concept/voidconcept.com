import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';

interface QuestListStackProps extends cdk.StackProps {
    hostedZone: route53.IHostedZone
}

export class QuestListStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: QuestListStackProps) {
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

        const endpoint = new lambda.Function(this, "QuestListEndpoint", {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset(path.join(process.cwd(), "../questListLambda/build")),
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
