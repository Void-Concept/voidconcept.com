export type CalendarDate = {
    year: number
    month: number
    day: number
}

export interface Calendar {
    name: string
    getDayOfWeek({ year, month, day }: CalendarDate): string
    getDayOfWeekIndex({ year, month, day }: CalendarDate): number
    getDateAtOffset(date: CalendarDate, offset: number): CalendarDate
    getDateEpoch({ year, month, day }: CalendarDate): number
    getWeekEpoch(date: CalendarDate): number
    getEpochDate(epoch: number): CalendarDate
    weekDays: string[]
    months: string[]
    daysInMonth: number
}

export class CalendarImpl implements Calendar {
    private daysInYear: number

    constructor(public name: string, public weekDays: string[], public months: string[], public daysInMonth: number, public epochOffset: number) {
        this.daysInYear = months.length * daysInMonth
    }

    getDayOfWeek = (calendarDate: CalendarDate): string => {
        return this.weekDays[this.getDayOfWeekIndex(calendarDate)];
    }

    getDayOfWeekIndex = ({ year, month, day }: CalendarDate): number => {
        return (this.getDateEpoch({ year, month, day }) + this.epochOffset) % this.weekDays.length;
    }

    getDateAtOffset = (date: CalendarDate, offset: number = 1): CalendarDate => {
        const epoch = this.getDateEpoch(date);
        return this.getEpochDate(epoch + offset);
    }

    getDateEpoch = ({ year, month, day }: CalendarDate): number => {
        return (year * this.daysInYear) + ((month - 1) * this.daysInMonth) + (day - 1)
    }

    getWeekEpoch = (date: CalendarDate): number => {
        const epoch = this.getDateEpoch(date)

        return Math.floor(epoch / 7);
    }

    getEpochDate = (epoch: number): CalendarDate => {
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
export const atagothCalendar = new CalendarImpl("atagoth", atagothWeekDays, atagothMonths, 30, 4)

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
export const unnamedCalendar = new CalendarImpl("campaign2", unnamedWeekDays, unnamedMonths, 26, 2)