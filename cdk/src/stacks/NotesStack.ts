import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cognito from '@aws-cdk/aws-cognito';
import { CognitoApiGatewayAuthorizer } from '../components/CognitoApiGatewayAuthorizer';

interface NotesStackProps extends cdk.StackProps {
    hostedZone: route53.IHostedZone
    cognitoUserPool: cognito.IUserPool
}

export class NotesStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: NotesStackProps) {
        super(scope, id, props);
        const { hostedZone, cognitoUserPool } = props

        const domainName = `notes.${hostedZone.zoneName}`

        const notesTable = new dynamodb.Table(this, "NotesStorage", {
            partitionKey: {
                name: "id",
                type: dynamodb.AttributeType.STRING
            }
        });

        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone,
            domainName
        });

        const endpoint = new lambda.Function(this, "NotesApiEndpoint", {
            runtime: lambda.Runtime.NODEJS_12_X,
            handler: "index.handler",
            code: lambda.Code.fromAsset(path.join(process.cwd(), "../notesLambda/build")),
            environment: {
                notesTableName: notesTable.tableName,
            }
        });
        notesTable.grantReadWriteData(endpoint);

        const api = new apigateway.RestApi(this, "NotesApiGateway", {
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

        const notes = api.root.addResource("notes");
        const notesId = notes.addResource("{notesId}");

        notesId.addMethod("GET");
        notesId.addMethod("POST", undefined, {
            authorizationType: apigateway.AuthorizationType.COGNITO,
            authorizationScopes: ["openid"],
            authorizer
        });

        new route53.ARecord(this, "NotesApiAlias", {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}