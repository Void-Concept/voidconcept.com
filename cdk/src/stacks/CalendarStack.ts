import * as path from 'path';

import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { CognitoApiGatewayAuthorizer } from '../components/CognitoApiGatewayAuthorizer';

interface CalendarStackProps extends StackProps {
    hostedZone: route53.IHostedZone
    cognitoUserPool: cognito.IUserPool
    discordSecrets: secretsmanager.ISecret
}

export class CalendarStack extends Stack {
    constructor(scope: Construct, id: string, props: CalendarStackProps) {
        super(scope, id, props);
        const { hostedZone, cognitoUserPool, discordSecrets } = props

        const domainName = `calendar.${hostedZone.zoneName}`

        const calendarTable = new dynamodb.Table(this, "CalendarStorage", {
            partitionKey: {
                name: "name",
                type: dynamodb.AttributeType.STRING
            }
        });

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone,
            domainName
        });

        const endpoint = new lambda_nodejs.NodejsFunction(this, "CalendarApiEndpoint", {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: "./src/lambdas/calendar/index.ts",
            handler: "handler",
            bundling: {
                sourceMap: true,
                externalModules: ["aws-sdk"],
            },
            environment: {
                calendarTableName: calendarTable.tableName,
                discordSecretName: discordSecrets.secretName,
            }
        })

        calendarTable.grantReadWriteData(endpoint);
        discordSecrets.grantRead(endpoint);

        const api = new apigateway.RestApi(this, "CalendarApiGateway", {
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

        const authorizer = new CognitoApiGatewayAuthorizer(this, "CognitoAuthorizer", {
            name: "CognitoAuthorizer",
            type: apigateway.AuthorizationType.COGNITO,
            providerArns: [cognitoUserPool.userPoolArn],
            identitySource: "method.request.header.Authorization",
            restApiId: api.restApiId
        })

        const dnd = api.root.addResource("dnd");
        const dndCalendars = dnd.addResource("calendar");
        const dndCalendar = dndCalendars.addResource("{calendarName}")

        dndCalendar.addMethod("GET");
        dndCalendar.addMethod("POST", undefined, {
            authorizationType: apigateway.AuthorizationType.COGNITO,
            authorizationScopes: ["openid"],
            authorizer
        });

        new route53.ARecord(this, "CalendarApiAlias", {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}
