export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type DayOfWeek = ElementType<typeof daysOfWeek>

export const DAYS_IN_MONTH = 30
export const MONTHS_IN_YEAR = 12

export const getDayOfWeek = (year: number, month: number, day: number): DayOfWeek => {
    const index = ((year * MONTHS_IN_YEAR * DAYS_IN_MONTH) + (month * DAYS_IN_MONTH) + day + 1) % daysOfWeek.length;

    return daysOfWeek[index];
}