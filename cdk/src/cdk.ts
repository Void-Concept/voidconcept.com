#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FrontendStack } from './stacks/FrontendStack';
import { HostedZoneStack } from './stacks/HostedZoneStack';

import config from './config';
import { GlobalStorageStack } from './stacks/GlobalStorageStack';
import { AuthStack } from './stacks/AuthStack';

const app = new cdk.App();

const hostedZoneStack = new HostedZoneStack(app, "HostedZoneStack", {
    domainName: config.domainName,
    ...config.additionalDnsRecords,
    env: {
        region: "us-east-1"
    },
})

new AuthStack(app, "AuthStack", {
    domainPrefix: config.domainPrefix,
    domainName: config.domainName,
    hostedZone: hostedZoneStack.hostedZone,
    env: {
        region: "us-east-1"
    },
})

new FrontendStack(app, 'FrontendStack', {
    hostedZone: hostedZoneStack.hostedZone,
    certificate: hostedZoneStack.certificate,
    env: {
        region: "us-east-1"
    },
});

new GlobalStorageStack(app, "GlobalStorageStack", {
    hostedZone: hostedZoneStack.hostedZone,
    env: {
        region: "us-east-1"
    },
})