import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';

interface FrontendStackProps extends cdk.StackProps {
    domainName: string,
    hostedZone: route53.IHostedZone
    certificate: acm.ICertificate
}

export class FrontendStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: FrontendStackProps) {
        super(scope, id, props);

        const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "frontendOAI");
        const frontendBucket = new s3.Bucket(this, "frontendBucket", {
            websiteIndexDocument: "index.html",
            websiteErrorDocument: "index.html"
        });
        frontendBucket.grantRead(originAccessIdentity);

        const frontendCdn = new cloudfront.CloudFrontWebDistribution(this, "frontendDistribution", {
            originConfigs: [{
                s3OriginSource: {
                    s3BucketSource: frontendBucket,
                    originAccessIdentity: originAccessIdentity
                },
                behaviors: [{
                    isDefaultBehavior: true
                }]
            }],
            viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(props.certificate, {
                securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2018
            }),
            errorConfigurations: [{
                errorCode: 403,
                responseCode: 200,
                responsePagePath: "/index.html"
            }, {
                errorCode: 404,
                responseCode: 200,
                responsePagePath: "/index.html"
            }],
            priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        });

        new route53.ARecord(this, "frontendCdnRecord", {
            zone: props.hostedZone,
            target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(frontendCdn))
        });

        new cdk.CfnOutput(this, "FrontendBucketUri", {
            value: `s3://${frontendBucket.bucketName}`
        });
    }
}
