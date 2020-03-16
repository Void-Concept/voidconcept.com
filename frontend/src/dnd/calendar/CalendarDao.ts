import { CalendarDate } from "./util";

export interface CalendarDao {
    getDate: () => Promise<CalendarDate>
    setDate: (date: CalendarDate) => Promise<CalendarDate>
}

export class MemoryCalendarDao implements CalendarDao {
    date: CalendarDate

    constructor() {
        this.date = {
            year: 4067,
            month: 3,
            day: 25
        }
    }

    getDate() {
        return Promise.resolve(this.date);
    }

    setDate(date: CalendarDate): Promise<CalendarDate> {
        this.date = date;
        return Promise.resolve(this.date);
    }
}