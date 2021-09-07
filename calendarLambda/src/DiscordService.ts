import { DiscordApi } from './DiscordApi';
import { DndCalendarDate, DynamoHelper, NotificationChannel } from './DynamoHelper';

export class DiscordService {
    constructor(private discordApi: DiscordApi, private dynamoHelper: DynamoHelper) {

    }

    legacyNotifyCalendarUpdate = async (daysOffset: number, calendarDate: DndCalendarDate) => {
        const channelsToNotify = await this.dynamoHelper.legacyGetNotificationChannels()

        return this.notifyCalendarUpdate(channelsToNotify, daysOffset, calendarDate)
    }

    notifyCalendarUpdate = async (channelsToNotify: NotificationChannel[], daysOffset: number, calendarDate: DndCalendarDate) => {
        const promises = channelsToNotify
            .filter(channel => !channel.disabled)
            .map(channel => {
                console.log(`Notifying channel ${JSON.stringify(channel)}`)
                return this.discordApi.sendMessage(channel.id, `<@&${channel.roleId}> Calendar changed by ${daysOffset} days. Subtract ${daysOffset * 5} gold. Current day: ${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`)
            })

        return Promise.all(promises)
    }
}
