import { Template } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import { HostedZoneStack } from '../../stacks/HostedZoneStack';

describe("HostedZoneStack", () => {
    it('should expose the hosted zone so other stacks can add routes', () => {
        const app = new cdk.App();

        const stack = new HostedZoneStack(app, "test-stack", {
            domainName: "example.com"
        });

        const template = Template.fromStack(stack)

        template.hasResourceProperties("AWS::Route53::HostedZone", {
            Name: "example.com."
        });
        expect(stack.hostedZone).toBeDefined();
    });
});