import * as cdk from '@aws-cdk/core';
import { UserPool } from '@aws-cdk/aws-cognito';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

interface AuthStackProps extends cdk.StackProps {
    domainPrefix: string
    domainName: string
    hostedZone: route53.HostedZone
}

export class AuthStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: AuthStackProps) {
        super(scope, id, props);

        const pool = new UserPool(this, 'UserPool', {
            userPoolName: 'WebsiteUserPool',
            selfSignUpEnabled: true,
        });

        const loginDomainName = `login.${props.domainName}`
        const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: props.hostedZone,
            domainName: loginDomainName
        });

        const domain = pool.addDomain("CognitoDomain", {
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

        const client = pool.addClient("app-client", {
            authFlows: {
                userPassword: true,
                refreshToken: true
            },
            oAuth: {
                flows: {
                    implicitCodeGrant: true,
                },
                callbackUrls: [`https://${props.domainName}/oauth-callback`],
            }
        })
    }
}