export type CalendarDate = {
    year: number
    month: number
    day: number
}

export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type DayOfWeek = ElementType<typeof daysOfWeek>

export const DAYS_IN_MONTH = 30
export const MONTHS_IN_YEAR = 12

export const getDayOfWeek = ({ year, month, day }: CalendarDate): DayOfWeek => {
    const index = ((year * MONTHS_IN_YEAR * DAYS_IN_MONTH) + (month * DAYS_IN_MONTH) + day + 1) % daysOfWeek.length;

    return daysOfWeek[index];
}

export const getDateAtOffset = (date: CalendarDate, offset: number = 1): CalendarDate => {
    const epoch = getDateEpoch(date);
    return getEpochDate(epoch + offset);
}

export const getDateEpoch = ({ year, month, day }: CalendarDate): number => {
    return (year * MONTHS_IN_YEAR * DAYS_IN_MONTH) + ((month - 1) * DAYS_IN_MONTH) + (day - 1)
}

export const getWeekEpoch = (date: CalendarDate): number => {
    const epoch = getDateEpoch(date)

    return Math.floor(epoch / 7);
}

export const getEpochDate = (epoch: number): CalendarDate => {

    const year = Math.floor(epoch / (MONTHS_IN_YEAR * DAYS_IN_MONTH))

    const yearRemainder = epoch - (year * MONTHS_IN_YEAR * DAYS_IN_MONTH)
    const month = Math.floor(yearRemainder / DAYS_IN_MONTH) + 1

    const monthRemainder = yearRemainder - (month - 1) * DAYS_IN_MONTH
    const day = monthRemainder + 1

    return {
        year,
        month,
        day
    }
}
