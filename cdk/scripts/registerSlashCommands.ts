import fetch from "node-fetch";
import { timeCommandSpec } from '../src/lambdas/discordInteractions/commands/index'
import { SecretsManagerService } from '../src/lambdas/discordInteractions/SecretManagerService'
import SecretsManager from 'aws-sdk/clients/secretsmanager';

const register = async () => {
    const secretsManager = new SecretsManager({
        region: "us-east-1"
    })
    const secretsManagerService = new SecretsManagerService(secretsManager)
    
    const token = await secretsManagerService.getDiscordApiKey()
    const applicationId = await secretsManagerService.getApplicationId()

    const response = await fetch(
        `https://discord.com/api/v8/applications/${applicationId}/commands`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${token}`,
          },
          method: "PUT",
          body: JSON.stringify([timeCommandSpec]),
        }
      );
      
      if (response.ok) {
        console.log("Registered all commands");
      } else {
        console.error("Error registering commands");
        const text = await response.text();
        console.error(text);
      }
}

register().catch(console.error)
