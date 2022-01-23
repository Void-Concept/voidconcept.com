import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as iam from '@aws-cdk/aws-iam';

interface DynDnsStackProps extends cdk.StackProps {
    hostedZone: route53.HostedZone
    domainName: string
}

export class DynDnsStack extends cdk.Stack {
    hostedZone: route53.HostedZone
    certificate: acm.Certificate

    constructor(scope: cdk.Construct, id: string, props: DynDnsStackProps) {
        super(scope, id, props);
    
        const user = new iam.User(this, "DynDns", {})
        const accessKey = new iam.AccessKey(this, "AccessKey", {
            user: user,
            serial: 1
        })

        const policy = new iam.Policy(this, "ChangeDnsRecordPolicy", {
            statements: [
                new iam.PolicyStatement({
                    resources: [props.hostedZone.hostedZoneArn],
                    effect: iam.Effect.ALLOW,
                    actions: [
                        "route53:GetHostedZone",
                        "route53:ChangeResourceRecordSets",
                        "route53:ListResourceRecordSets",
                        "route53:TestDNSAnswer"
                    ]
                }),
            ]
        })

        policy.attachToUser(user)
        
        new cdk.CfnOutput(this, "DynDnsAccessKey", { value: accessKey.accessKeyId })
        new cdk.CfnOutput(this, "DynDnsSecretKey", { value: accessKey.secretAccessKey.toString() })
    }
}