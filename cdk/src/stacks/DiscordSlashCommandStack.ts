import { StackProps, Stack, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

interface DiscordSlashCommandStackProps extends StackProps {
    hostedZone: route53.IHostedZone
    discordSecrets: secretsmanager.ISecret
}

export class DiscordSlashCommandStack extends Stack {
    constructor(scope: Construct, id: string, props: DiscordSlashCommandStackProps) {
        super(scope, id, props);

        const { discordSecrets, hostedZone } = props

        const domainName = `discord.${hostedZone.zoneName}`

        const certificate = new acm.Certificate(this, "certificate", {
            domainName,
            validation: acm.CertificateValidation.fromDns(hostedZone),
        })

        const endpoint = new lambda_nodejs.NodejsFunction(this, "DiscordSlashCommandEndpoint", {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: "handler",
            entry: "./src/lambdas/discordInteractions/index.ts",
            bundling: {
                externalModules: ["@aws-sdk/client-dynamodb", "@aws-sdk/client-secrets-manager"],
                minify: true,
            },
            timeout: Duration.minutes(1),
            environment: {
                discordSecretName: discordSecrets.secretName
            }
        });
        discordSecrets.grantRead(endpoint);

        const api = new apigateway.RestApi(this, "DiscordSlashGateway", {
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

        const slash = api.root.addResource("slash");
        slash.addMethod("GET");
        slash.addMethod("POST");

        new route53.ARecord(this, "DiscordSlashCommandAlias", {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}
