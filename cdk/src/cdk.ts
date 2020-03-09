#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FrontendStack } from './stacks/frontend-stack';
import { HostedZoneStack } from './stacks/hostedzone-stack';

import config from './config';
const { domainName } = config;

const app = new cdk.App();

const hostedZoneStack = new HostedZoneStack(app, "HostedZoneStack", {
    domainName: domainName,
    env: {
        region: "us-east-1"
    }
})

new FrontendStack(app, 'FrontendStack', {
    domainName: domainName,
    hostedZone: hostedZoneStack.hostedZone,
    env: {
        region: "us-east-1"
    }
});
