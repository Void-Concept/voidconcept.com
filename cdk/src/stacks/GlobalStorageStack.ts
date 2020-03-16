import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';


interface GlobalStorageStackProps extends cdk.StackProps {
    domainName: string
    certificate: acm.ICertificate
    hostedZone: route53.IHostedZone
}

export class GlobalStorageStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: GlobalStorageStackProps) {
        super(scope, id, props);

        const table = new dynamodb.Table(this, "GenericStorage", {
            partitionKey: {
                name: "name",
                type: dynamodb.AttributeType.STRING
            }
        });

        const endpoint = new lambda.Function(this, "StorageApiEndpoint", {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset(path.join(__dirname, "../globalStorageLambda/build"))
        });
        table.grantReadWriteData(endpoint);

        const api = new apigateway.LambdaRestApi(this, "StorageApiGateway", {
            handler: endpoint,
            domainName: {
                domainName: `globals.${props.domainName}`,
                endpointType: apigateway.EndpointType.REGIONAL,
                certificate: props.certificate
            }
        });
        const dnd = api.root.addResource("dnd");
        const dndCalendar = dnd.addResource("calendar");
        dndCalendar.addMethod("GET");
        dndCalendar.addMethod("POST");

        new route53.ARecord(this, "StorageApiAlias", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api))
        })
    }
}