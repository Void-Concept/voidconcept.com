import React from 'react';
import { useCalendar } from './CalendarContext';

interface CalendarDisplayProps {
    day: number
    month: number
    year: number
    className?: string
}

export const CalendarDisplay = ({ day, month, year, className }: CalendarDisplayProps) => {
    const pad = (toPad: number) => toPad.toString().padStart(2, "0")
    const calendar = useCalendar()

    const dateStr = `${year}-${pad(month)}-${pad(day)}`;
    const dayOfWeek = calendar.getDayOfWeek({ year, month, day })

    return (
        <div className={className}>
            {dayOfWeek} {dateStr}
        </div>
    );
}