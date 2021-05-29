import { DynamoHelper } from './DynamoHelper';
import { Client, TextChannel } from 'discord.js'

export class DiscordService {
    constructor(
        private discordClient: Client,
        private dynamoHelper: DynamoHelper,
    ) {

    }

    notifyCalendarUpdate = async (daysOffset: number) => {
        const channelsToNotify = await this.dynamoHelper.getNotificationChannels()
        console.log(`Got ${channelsToNotify} channels to notify`)

        const promises = channelsToNotify.map(async (channelId) => {
            console.log(`Notifying channel ${channelId}`)
            const channel = await this.discordClient.channels.fetch(channelId)
            if (channel instanceof TextChannel) {
                await channel.send(`Calendar changed by ${daysOffset} days; remember to subtract gold`)
            }
        })

        await Promise.all(promises)
    }
}
