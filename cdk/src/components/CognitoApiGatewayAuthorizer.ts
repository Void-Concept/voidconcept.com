import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class CognitoApiGatewayAuthorizer extends apigateway.CfnAuthorizer implements apigateway.IAuthorizer {
    public readonly authorizerId: string

    constructor(scope: Construct, id: string, props: apigateway.CfnAuthorizerProps) {
        super(scope, id, props)

        this.authorizerId = this.ref
    }
}