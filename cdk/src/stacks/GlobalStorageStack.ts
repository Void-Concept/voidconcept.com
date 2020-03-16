import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';

interface GlobalStorageStackProps extends cdk.StackProps {
    hostedZone: route53.IHostedZone
}

export class GlobalStorageStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: GlobalStorageStackProps) {
        super(scope, id, props);

        const domainName = `globals.${props.hostedZone.zoneName}`

        const table = new dynamodb.Table(this, "GenericStorage", {
            partitionKey: {
                name: "name",
                type: dynamodb.AttributeType.STRING
            }
        });

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: props.hostedZone,
            domainName: domainName
        });

        const endpoint = new lambda.Function(this, "StorageApiEndpoint", {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset(path.join(process.cwd(), "../globalStorageLambda/build")),
            environment: {
                tableName: table.tableName
            }
        });
        table.grantReadWriteData(endpoint);

        const api = new apigateway.RestApi(this, "StorageApiGateway", {
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
        const dnd = api.root.addResource("dnd");
        const dndCalendar = dnd.addResource("calendar");
        dndCalendar.addMethod("GET");
        dndCalendar.addMethod("POST");

        new route53.ARecord(this, "StorageApiAlias", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}