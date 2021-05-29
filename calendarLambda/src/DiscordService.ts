import { DiscordApi } from './DiscordApi';
import { DynamoHelper } from './DynamoHelper';

export class DiscordService {
    constructor(private discordApi: DiscordApi, private dynamoHelper: DynamoHelper) {

    }

    notifyCalendarUpdate = async (daysOffset: number) => {
        const channelsToNotify = await this.dynamoHelper.getNotificationChannels()
        console.log(`Got ${channelsToNotify} channels to notify`)

        const promises = channelsToNotify.map(channel => {
            console.log(`Notifying channel ${channel}`)
            return this.discordApi.sendMessage(channel.id, `<@&${channel.roleId}> Calendar changed by ${daysOffset} days. Subtract ${daysOffset * 5} gold.`)
        })

        await Promise.all(promises)
    }
}
