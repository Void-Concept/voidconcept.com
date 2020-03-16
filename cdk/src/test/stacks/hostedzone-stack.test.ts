import { expect as expectCDK, matchTemplate, MatchStyle, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { HostedZoneStack } from '../../stacks/HostedZoneStack';

describe("HostedZoneStack", () => {
    it('should expose the hosted zone so other stacks can add routes', () => {
        const app = new cdk.App();

        const stack = new HostedZoneStack(app, "test-stack", {
            domainName: "example.com"
        });

        expectCDK(stack).to(haveResourceLike("AWS::Route53::HostedZone", {
            Name: "example.com."
        }));
        expect(stack.hostedZone).toBeDefined();
    });
});