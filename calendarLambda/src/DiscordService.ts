import { DndCalendarEvent } from './calendar';
import { DiscordApi } from './DiscordApi';
import { DndCalendarDate, DynamoHelper, NotificationChannel } from './DynamoHelper';

export class DiscordService {
    constructor(private discordApi: DiscordApi, private dynamoHelper: DynamoHelper) {

    }

    notifyCalendarUpdate = async (channelsToNotify: NotificationChannel[], daysOffset: number, calendarDate: DndCalendarDate, events: DndCalendarEvent[]) => {
        const promises = channelsToNotify
            .filter(channel => !channel.disabled)
            .map(async (channel) => {
                console.log(`Notifying channel ${JSON.stringify(channel)}`)
                await this.discordApi.sendMessage(channel.id, `<@&${channel.roleId}> Calendar changed by ${daysOffset} days. Subtract ${daysOffset * 5} gold. Current day: ${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`)

                if (events.length > 0) {
                    await this.discordApi.sendMessage(channel.id, `Events for ${calendarDate.year}-${calendarDate.month}-${calendarDate.day}: ${events.map(event => event.name).join(", ")}`)
                }
            })

        return Promise.all(promises)
    }
}
