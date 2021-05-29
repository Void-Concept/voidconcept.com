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
            return this.discordApi.sendMessage(channel, `Calendar changed by ${daysOffset} days; remember to subtract gold`)
        })

        await Promise.all(promises)
    }
}
