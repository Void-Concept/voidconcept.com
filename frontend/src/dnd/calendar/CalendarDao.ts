import { getToken } from "../../oauth/oauthClient";
import { atagothCalendar, Calendar, CalendarDate, CalendarImpl, unnamedCalendar } from "./calendar";

export interface CalendarDao {
    getCalendar: (calendarName: string) => Promise<Calendar | undefined>
    getCalendarNames: () => Promise<string[]>
    getDate: (calendarName: string) => Promise<CalendarDate>
    setDate: (calendarName: string, date: CalendarDate) => Promise<CalendarDate>
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

    async getDate(calendarName: string): Promise<CalendarDate> {
        return this.date;
    }

    async setDate(name: string, date: CalendarDate): Promise<CalendarDate> {
        this.date = date;
        return this.date;
    }
}

export class GenericStorageCalendarDao implements CalendarDao {
    private calendarUrl = "https://calendar.voidconcept.com/dnd/calendar"

    async getCalendar(calendarName: string): Promise<Calendar | undefined> {
        const response = await fetch(`${this.calendarUrl}/${calendarName}`, {
            method: "GET"
        })
        const apiCalendar = await response.json()
        return new CalendarImpl(apiCalendar.name, apiCalendar.weekDays, apiCalendar.months, apiCalendar.daysInMonth, apiCalendar.epochOffset);
    }

    async getCalendarNames(): Promise<string[]> {
        return Object.keys(calendars)
    }

    async getDate(calendarName: string) {
        const response = await fetch(`${this.calendarUrl}/${calendarName}`, {
            method: "GET"
        })
        const apiCalendar = await response.json()
        return apiCalendar.currentDate
    }

    async setDate(calendarName: string, date: CalendarDate): Promise<CalendarDate> {
        const response = await fetch(`${this.calendarUrl}/${calendarName}`, {
            method: "POST",
            headers: {
                Authorization: getToken()
            },
            body: JSON.stringify(date)
        })
        const apiCalendar = await response.json()
        return apiCalendar.currentDate
    }
}