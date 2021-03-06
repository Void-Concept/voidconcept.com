import { CalendarDate } from "./util";
import { getToken } from "../../oauth/oauthClient";

export interface CalendarDao {
    getDate: () => Promise<CalendarDate>
    setDate: (date: CalendarDate) => Promise<CalendarDate>
}

export class InMemoryCalendarDao implements CalendarDao {
    date: CalendarDate = {
        year: 4067,
        month: 6,
        day: 1
    };


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