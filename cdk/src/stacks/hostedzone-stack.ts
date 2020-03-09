import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';

interface HostedZoneStackProps extends cdk.StackProps {
    domainName: string
    privateCName?: {
        prefix: string
        target: string
    }
}

export class HostedZoneStack extends cdk.Stack {
    hostedZone: route53.HostedZone
    certificate: acm.Certificate

    constructor(scope: cdk.Construct, id: string, props: HostedZoneStackProps) {
        super(scope, id, props);

        this.hostedZone = new route53.HostedZone(this, "WebsiteHostedZone", {
            zoneName: props.domainName
        });

        this.certificate = new acm.DnsValidatedCertificate(this, "certificate", {
            hostedZone: this.hostedZone,
            domainName: props.domainName
        });

        new route53.CnameRecord(this, "OldGHPagesCname", {
            domainName: `old.${props.domainName}`,
            recordName: "http://void-concept.github.io",
            zone: this.hostedZone,
        });

        if (props.privateCName) {
            new route53.CnameRecord(this, "PrivateCname", {
                domainName: `${props.privateCName.prefix}.${props.domainName}`,
                recordName: props.privateCName.target,
                zone: this.hostedZone,
            });
        }
    }
}