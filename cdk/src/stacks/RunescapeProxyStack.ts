import * as path from 'path';

import { StackProps, Stack, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

interface RunescapeProxyStackProps extends StackProps {
    hostedZone: route53.IHostedZone
}

export class RunescapeProxyStack extends Stack {
    constructor(scope: Construct, id: string, props: RunescapeProxyStackProps) {
        super(scope, id, props);

        const domainName = `runescape.${props.hostedZone.zoneName}`

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: props.hostedZone,
            domainName: domainName
        });

        const endpoint = new lambda_nodejs.NodejsFunction(this, "RunescapeProxyEndpoint", {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: "handler",
            entry: "./src/lambdas/runescapeProxy/index.ts",
            bundling: {
                sourceMap: true,
                externalModules: ["aws-sdk"],
            },
            timeout: Duration.seconds(30),
        });

        const api = new apigateway.RestApi(this, "RunescapeProxyGateway", {
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

        const userQuests = api.root.addResource("userQuests");
        userQuests.addMethod("GET");

        const clanMembers = api.root.addResource("clanMembers");
        clanMembers.addMethod("GET");

        new route53.ARecord(this, "RunescapeProxyAlias", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}
