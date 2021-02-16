import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';

interface AuthStackProps extends cdk.StackProps {
    domainPrefix: string
    domainName: string
    hostedZone: route53.HostedZone
}

export class AuthStack extends cdk.Stack {
    public userPool: cognito.UserPool

    constructor(scope: cdk.Construct, id: string, props: AuthStackProps) {
        super(scope, id, props);

        this.userPool = new cognito.UserPool(this, 'UserPool', {
            userPoolName: 'WebsiteUserPool',
            selfSignUpEnabled: true,
        });

        const loginDomainName = `login.${props.domainName}`
        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: props.hostedZone,
            domainName: loginDomainName
        });

        const domain = this.userPool.addDomain("CognitoDomain", {
            customDomain: {
                domainName: loginDomainName,
                certificate
            }
        })

        new route53.ARecord(this, "CognitoDomainRecord", {
            recordName: "login",
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias({
                bind: _record => ({
                    hostedZoneId: "Z2FDTNDATAQYW2",
                    dnsName: domain.cloudFrontDomainName
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