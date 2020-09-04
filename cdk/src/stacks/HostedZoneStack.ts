import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';
import { CnameConfig, TxtConfig, MxConfig } from '../config';

interface HostedZoneStackProps extends cdk.StackProps {
    domainName: string
    cnames?: CnameConfig[]
    txts?: TxtConfig[]
    mxs?: MxConfig[]
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

        props.cnames && props.cnames.forEach(cname => {
            new route53.CnameRecord(this, cname.id, {
                recordName: cname.prefix,
                domainName: cname.target,
                zone: this.hostedZone,
            });
        })
        props.txts && props.txts.forEach(txt => {
            new route53.TxtRecord(this, txt.id, {
                values: txt.values,
                zone: this.hostedZone,
            })
        })
        props.mxs && props.mxs.forEach(mxs => {
            new route53.MxRecord(this, mxs.id, {
                values: mxs.values.map(value => ({
                    hostName: value.value,
                    priority: value.priority
                })),
                zone: this.hostedZone
            })
        })
    }
}