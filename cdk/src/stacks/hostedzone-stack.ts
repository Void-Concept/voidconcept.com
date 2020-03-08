import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';

interface HostedZoneStackProps extends cdk.StackProps {
    domainName: string
}

export class HostedZoneStack extends cdk.Stack {
    hostedZone: route53.HostedZone

    constructor(scope: cdk.Construct, id: string, props: HostedZoneStackProps) {
        super(scope, id, props);

        this.hostedZone = new route53.HostedZone(this, "WebsiteHostedZone", {
            zoneName: props.domainName
        });
    }
}