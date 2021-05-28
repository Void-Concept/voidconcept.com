import { SecretsManager } from "aws-sdk";

export class SecretsManagerService {
    constructor(private secretsManager: SecretsManager) {

    }

    getDiscordApiKey = async (): Promise<string> => {
        const secretManagerResponse = await this.secretsManager.getSecretValue({
            SecretId: "discord-api-key",
        }).promise()

        const secretString = secretManagerResponse.SecretString

        if (!secretString) throw new Error("Could not fetch discord api key")
        return secretString
    }
}