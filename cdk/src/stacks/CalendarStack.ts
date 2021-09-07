import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cognito from '@aws-cdk/aws-cognito';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import { CognitoApiGatewayAuthorizer } from '../components/CognitoApiGatewayAuthorizer';

interface CalendarStackProps extends cdk.StackProps {
    hostedZone: route53.IHostedZone
    cognitoUserPool: cognito.IUserPool
    genericStorageTable: dynamodb.Table
}

export class CalendarStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: CalendarStackProps) {
        super(scope, id, props);
        const { hostedZone, cognitoUserPool, genericStorageTable } = props

        const domainName = `calendar.${hostedZone.zoneName}`

        const calendarTable = new dynamodb.Table(this, "CalendarStorage", {
            partitionKey: {
                name: "name",
                type: dynamodb.AttributeType.STRING
            }
        });

        const discordApiKeySecret = new secretsmanager.Secret(this, "Secret", {
            secretName: "discord-api-key"
        })

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone,
            domainName
        });

        const endpoint = new lambda.Function(this, "CalendarApiEndpoint", {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset(path.join(process.cwd(), "../calendarLambda/build")),
            environment: {
                calendarTableName: calendarTable.tableName,
                genericStorageTableName: genericStorageTable.tableName,
            }
        });
        calendarTable.grantReadWriteData(endpoint);
        genericStorageTable.grantReadWriteData(endpoint);
        discordApiKeySecret.grantRead(endpoint);

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
