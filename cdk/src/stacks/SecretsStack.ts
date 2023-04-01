import { StackProps, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

interface SecretsStackProps extends StackProps {

}

export class SecretsStack extends Stack {
    discordSecrets: secretsmanager.ISecret

    constructor(scope: Construct, id: string, props: SecretsStackProps) {
        super(scope, id, props);

        this.discordSecrets = new secretsmanager.Secret(this, "DiscordSecret", {
            secretName: "discord-secrets"
        })
    }
}
