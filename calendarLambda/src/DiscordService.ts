import { DiscordApi } from './DiscordApi';
import { DndCalendar, DynamoHelper } from './DynamoHelper';

export class DiscordService {
    constructor(private discordApi: DiscordApi, private dynamoHelper: DynamoHelper) {

    }

    notifyCalendarUpdate = async (daysOffset: number, calendar: DndCalendar) => {
        const channelsToNotify = await this.dynamoHelper.getNotificationChannels()

        const promises = channelsToNotify.map(channel => {
            console.log(`Notifying channel ${JSON.stringify(channel)}`)
            return this.discordApi.sendMessage(channel.id, `<@&${channel.roleId}> Calendar changed by ${daysOffset} days. Subtract ${daysOffset * 5} gold. Current day: ${calendar.year}-${calendar.month}-${calendar.day}`)
        })

        await Promise.all(promises)
    }
}
