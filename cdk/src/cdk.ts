#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FrontendStack } from './stacks/frontend-stack';
import { HostedZoneStack } from './stacks/hostedzone-stack';

import config from './config';

const app = new cdk.App();

const hostedZoneStack = new HostedZoneStack(app, "HostedZoneStack", {
    domainName: config.domainName,
    privateCName: config.privateCName,
    env: {
        region: "us-east-1"
    }
})

new FrontendStack(app, 'FrontendStack', {
    domainName: config.domainName,
    hostedZone: hostedZoneStack.hostedZone,
    certificate: hostedZoneStack.certificate,
    env: {
        region: "us-east-1"
    }
});
