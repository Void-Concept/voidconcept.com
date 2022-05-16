export type DndCalendarDate = {
    year: number
    month: number
    day: number
}

type DndCalendarRepeatUnit = "year" | "month" | "week" | "day"

type DndCalendarRepeat = {
    frequency: number
    timeUnit: DndCalendarRepeatUnit
}

export interface DndCalendarEvent {
    name: string
    date: number
    repeat?: DndCalendarRepeat
}

export interface Calendar {
    name: string
    getDayOfWeek({ year, month, day }: DndCalendarDate): string
    getDayOfWeekIndex({ year, month, day }: DndCalendarDate): number
    getDateAtOffset(date: DndCalendarDate, offset: number): DndCalendarDate
    getDateEpoch({ year, month, day }: DndCalendarDate): number
    getWeekEpoch(date: DndCalendarDate): number
    getEpochDate(epoch: number): DndCalendarDate
    getEventsFor(epoch: number): DndCalendarEvent[]
    weekDays: string[]
    months: string[]
    daysInMonth: number
    events: DndCalendarEvent[]
}

export class CalendarImpl implements Calendar {
    private daysInYear: number

    constructor(public name: string, public weekDays: string[], public months: string[], public daysInMonth: number, public epochOffset: number, public events: DndCalendarEvent[]) {
        this.daysInYear = months.length * daysInMonth
    }

    getDayOfWeek = (calendarDate: DndCalendarDate): string => {
        return this.weekDays[this.getDayOfWeekIndex(calendarDate)];
    }

    getDayOfWeekIndex = ({ year, month, day }: DndCalendarDate): number => {
        return (this.getDateEpoch({ year, month, day }) + this.epochOffset) % this.weekDays.length;
    }

    getDateAtOffset = (date: DndCalendarDate, offset: number = 1): DndCalendarDate => {
        const epoch = this.getDateEpoch(date);
        return this.getEpochDate(epoch + offset);
    }

    getDateEpoch = ({ year, month, day }: DndCalendarDate): number => {
        return (year * this.daysInYear) + ((month - 1) * this.daysInMonth) + (day - 1)
    }

    getWeekEpoch = (date: DndCalendarDate): number => {
        const epoch = this.getDateEpoch(date)

        return Math.floor(epoch / 7);
    }

    getEpochDate = (epoch: number): DndCalendarDate => {
        const year = Math.floor(epoch / (this.daysInYear))

        const yearRemainder = epoch - (year * this.daysInYear)
        const month = Math.floor(yearRemainder / this.daysInMonth) + 1

        const monthRemainder = yearRemainder - (month - 1) * this.daysInMonth
        const day = monthRemainder + 1

        return {
            year,
            month,
            day
        }
    }

    private timeUnitMap = {
        "year": this.months.length * this.daysInMonth,
        "month": this.daysInMonth,
        "week": this.weekDays.length,
        "day": 1
    }

    private getTimeUnitLength = (timeUnit: DndCalendarRepeatUnit): number => {
        return this.timeUnitMap[timeUnit]
    }

    getEventsFor = (epoch: number): DndCalendarEvent[] => {
        return this.events.filter(event => {
            if (event.date === epoch) return true

            if (event.repeat) {
                const repeatDays = event.repeat.frequency * this.getTimeUnitLength(event.repeat.timeUnit)
                return Math.abs(event.date - epoch) % repeatDays === 0
            }

            return false
        })
    }
}


const standardWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const atagothWeekDays = standardWeekDays;
export const atagothMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
export const atagothCalendar = new CalendarImpl("atagoth", atagothWeekDays, atagothMonths, 30, 4, [{
    date: 1464480,
    name: "Inn Payment",
    repeat: {
        frequency: 2,
        timeUnit: "week"
    }
}, {
    date: 1464504,
    name: "Full Moon",
    repeat: {
        frequency: 1,
        timeUnit: "month"
    }
}])

export const unnamedWeekDays = standardWeekDays;
export const unnamedMonths = [
    "Esetaliel",
    "Iribetaliel",
    "Tietaliel",
    "Daretaliel",
    "Ururade",
    "Niavurade",
    "Iadurade",
    "Kiurade",
    "Vivisara",
    "Gaalisara",
    "Glosisara",
    "Taraldreda",
    "Kaihaldreda",
    "Levaldreda",
    "Veraldreda"
]
export const unnamedCalendar = new CalendarImpl("campaign2", unnamedWeekDays, unnamedMonths, 26, 1, [])