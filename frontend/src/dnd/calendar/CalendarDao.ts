import { getToken } from "../../oauth/oauthClient";
import { atagothCalendar, Calendar, DndCalendarDate, CalendarImpl, unnamedCalendar } from "./calendar";

export interface CalendarDao {
    getCalendar: (calendarName: string) => Promise<Calendar | undefined>
    getCalendarNames: () => Promise<string[]>
    getDate: (calendarName: string) => Promise<DndCalendarDate>
    setDate: (calendarName: string, date: DndCalendarDate) => Promise<DndCalendarDate>
}

const calendars: { [key: string]: Calendar | undefined } = {
    "atagoth": atagothCalendar,
    "campaign2": unnamedCalendar
};

export class InMemoryCalendarDao implements CalendarDao {
    date: DndCalendarDate = {
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

    async getDate(calendarName: string): Promise<DndCalendarDate> {
        return this.date;
    }

    async setDate(name: string, date: DndCalendarDate): Promise<DndCalendarDate> {
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
        return new CalendarImpl(apiCalendar.name, apiCalendar.weekDays, apiCalendar.months, apiCalendar.daysInMonth, apiCalendar.epochOffset, apiCalendar.events || []);
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

    async setDate(calendarName: string, date: DndCalendarDate): Promise<DndCalendarDate> {
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