import React from 'react';
import { getDayOfWeek } from './util';

interface CalendarDisplayProps {
    day: number
    month: number
    year: number
}

export const CalendarDisplay = ({ day, month, year }: CalendarDisplayProps) => {
    const pad = (toPad: number) => toPad.toString().padStart(2, "0")

    const dateStr = `${year}-${pad(month)}-${pad(day)}`;
    const dayOfWeek = getDayOfWeek(year, month, day)

    return (
        <div>
            {dayOfWeek} {dateStr}
        </div>
    );
}