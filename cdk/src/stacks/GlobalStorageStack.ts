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
import { CognitoApiGatewayAuthorizer } from '../components/CognitoApiGatewayAuthorizer';

interface GlobalStorageStackProps extends StackProps {
    hostedZone: route53.IHostedZone
    cognitoUserPool: cognito.IUserPool
}

export class GlobalStorageStack extends Stack {
    genericStorageTable: dynamodb.Table;

    constructor(scope: Construct, id: string, props: GlobalStorageStackProps) {
        super(scope, id, props);

        const domainName = `globals.${props.hostedZone.zoneName}`

        this.genericStorageTable = new dynamodb.Table(this, "GenericStorage", {
            partitionKey: {
                name: "name",
                type: dynamodb.AttributeType.STRING
            }
        });

        const certificate = new acm.Certificate(this, "certificate", {
            domainName,
            validation: acm.CertificateValidation.fromDns(props.hostedZone),
        })

        const endpoint = new lambda_nodejs.NodejsFunction(this, "StorageApiEndpoint", {
            runtime: lambda.Runtime.NODEJS_22_X,
            handler: "handler",
            entry: "./src/lambdas/globalStorage/index.ts",
            bundling: {
                sourceMap: true,
                externalModules: [],
            },
            environment: {
                tableName: this.genericStorageTable.tableName
            }
        });
        this.genericStorageTable.grantReadWriteData(endpoint);

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

        const authorizer = new CognitoApiGatewayAuthorizer(this, "CognitoAuthorizer", {
            name: "CognitoAuthorizer",
            type: apigateway.AuthorizationType.COGNITO,
            providerArns: [props.cognitoUserPool.userPoolArn],
            identitySource: "method.request.header.Authorization",
            restApiId: api.restApiId
        })

        const dnd = api.root.addResource("dnd");
        const dndCalendar = dnd.addResource("calendar");
        dndCalendar.addMethod("GET");
        dndCalendar.addMethod("POST", undefined, {
            authorizationType: apigateway.AuthorizationType.COGNITO,
            authorizationScopes: ["openid"],
            authorizer
        });

        new route53.ARecord(this, "StorageApiAlias", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(api)),
            recordName: domainName
        })
    }
}
