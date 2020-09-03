import { CalendarDate } from "./util";

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
    async getDate() {
        const response = await fetch("https://globals.voidconcept.com/dnd/calendar", {
            method: "GET"
        })
        return await response.json();
    }

    async setDate(date: CalendarDate): Promise<CalendarDate> {
        const response = await fetch("https://globals.voidconcept.com/dnd/calendar", {
            method: "POST",
            body: JSON.stringify(date)
        })
        return await response.json();
    }
}