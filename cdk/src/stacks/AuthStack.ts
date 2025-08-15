import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

interface AuthStackProps extends StackProps {
    domainPrefix: string
    domainName: string
    hostedZone: route53.HostedZone
}

export class AuthStack extends Stack {
    public userPool: cognito.UserPool

    constructor(scope: Construct, id: string, props: AuthStackProps) {
        super(scope, id, props);

        this.userPool = new cognito.UserPool(this, 'UserPool', {
            userPoolName: 'WebsiteUserPool',
            selfSignUpEnabled: true,
        });

        const loginDomainName = `login.${props.domainName}`
        const certificate = new acm.Certificate(this, "certificate", {
            domainName: loginDomainName,
            validation: acm.CertificateValidation.fromDns(props.hostedZone),
        });

        const domain = this.userPool.addDomain("CognitoDomain", {
            customDomain: {
                domainName: loginDomainName,
                certificate
            }
        })

        this.exportValue(this.userPool.userPoolId)

        new route53.ARecord(this, "CognitoDomainRecord", {
            recordName: "login",
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias({
                bind: _record => ({
                    hostedZoneId: "Z2FDTNDATAQYW2",
                    dnsName: domain.cloudFrontEndpoint
                })
            })
        })

        //TODO export clientId and use elsewhere
        const client = this.userPool.addClient("app-client", {
            authFlows: {
                userPassword: true,
            },
            oAuth: {
                flows: {
                    implicitCodeGrant: true,
                },
                callbackUrls: [
                    `https://${props.domainName}/oauth-callback`,
                    `http://localhost:3000/oauth-callback`,
                ],
            }
        })
    }
}