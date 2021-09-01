import { getToken } from "../../oauth/oauthClient";
import { atagothCalendar, Calendar, CalendarDate, unnamedCalendar } from "./calendar";

export interface CalendarDao {
    getCalendar: (calendarName: string) => Promise<Calendar | undefined>
    getCalendarNames: () => Promise<string[]>
    getDate: () => Promise<CalendarDate>
    setDate: (date: CalendarDate) => Promise<CalendarDate>
}

const calendars: { [key: string]: Calendar | undefined } = {
    "atagoth": atagothCalendar,
    "campaign2": unnamedCalendar
};

export class InMemoryCalendarDao implements CalendarDao {
    date: CalendarDate = {
        year: 4068,
        month: 1,
        day: 1
    };

    async getCalendar(calendarName: string): Promise<Calendar | undefined> {
        return calendars[calendarName]
    }

    async getCalendarNames(): Promise<string[]> {
        return Object.keys(calendars)
    }

    async getDate(): Promise<CalendarDate> {
        return this.date;
    }

    async setDate(date: CalendarDate): Promise<CalendarDate> {
        this.date = date;
        return this.date;
    }
}

export class GenericStorageCalendarDao implements CalendarDao {
    private calendarUrl = "https://calendar.voidconcept.com/dnd/calendar"

    async getCalendar(calendarName: string): Promise<Calendar | undefined> {
        return calendars[calendarName]
    }

    async getCalendarNames(): Promise<string[]> {
        return Object.keys(calendars)
    }

    async getDate() {
        const response = await fetch(this.calendarUrl, {
            method: "GET"
        })
        return await response.json();
    }

    async setDate(date: CalendarDate): Promise<CalendarDate> {
        const response = await fetch(this.calendarUrl, {
            method: "POST",
            headers: {
                Authorization: getToken()
            },
            body: JSON.stringify(date)
        })
        return await response.json();
    }
}