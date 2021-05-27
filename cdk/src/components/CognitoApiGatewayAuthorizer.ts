import * as path from 'path';

import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cognito from '@aws-cdk/aws-cognito';


export class CognitoApiGatewayAuthorizer extends apigateway.CfnAuthorizer implements apigateway.IAuthorizer {
    public readonly authorizerId: string

    constructor(scope: cdk.Construct, id: string, props: apigateway.CfnAuthorizerProps) {
        super(scope, id, props)

        this.authorizerId = this.ref
    }
}