import fetch from 'node-fetch'

export class DiscordApi {
    constructor(private apiKey: string) {

    }

    sendMessage = async (channelId: string, message: string): Promise<void> => {
        const response = await fetch(`https://discordapp.com/api/channels/${channelId}/messages`, {
            headers: {
                "Authorization": `Bot ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                content: message
            })
        })

        const text = await response.text()
        console.log(`Got response ${response.status} with text ${text}`)
    }
}