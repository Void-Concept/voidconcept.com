import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';

interface FrontendStackProps extends cdk.StackProps {
    domainName: string,
    hostedZone: route53.IHostedZone
}

export class FrontendStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: FrontendStackProps) {
        super(scope, id, props);

        const frontendBucket = new s3.Bucket(this, "frontendBucket");

        const certificate = new acm.Certificate(this, "certificate", {
            domainName: props.domainName
        });

        const frontendCdn = new cloudfront.CloudFrontWebDistribution(this, "frontendDistribution", {
            originConfigs: [{
                s3OriginSource: {
                    s3BucketSource: frontendBucket
                },
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }],
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
                securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2018
            })
        });

        new route53.ARecord(this, "frontendCdnRecord", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(frontendCdn))
        });
    }
}
