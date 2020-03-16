import { CalendarDate } from "./util";

export interface CalendarDao {
    getDate: () => Promise<CalendarDate>
    setDate: (date: CalendarDate) => Promise<CalendarDate>
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