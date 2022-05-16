import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';

interface RunescapeProxyStackProps extends cdk.StackProps {
    hostedZone: route53.IHostedZone
}

export class RunescapeProxyStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: RunescapeProxyStackProps) {
        super(scope, id, props);

        const domainName = `runescape.${props.hostedZone.zoneName}`

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: props.hostedZone,
            domainName: domainName
        });

        const endpoint = new lambda.Function(this, "RunescapeProxyEndpoint", {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset(path.join(process.cwd(), "../lambdas/runescapeProxy/build")),
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
