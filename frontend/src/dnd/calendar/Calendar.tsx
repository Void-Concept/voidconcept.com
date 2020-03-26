import React, { useState, useEffect } from 'react';
import { CalendarDisplay } from './CalendarDisplay';
import { CalendarDao } from './CalendarDao';
import { CalendarDate, getDateAtOffset } from './util';
import "./calendar.css"

interface CalendarProps {
    calendarDao: CalendarDao
}

export const Calendar = ({ calendarDao }: CalendarProps) => {
    const [date, setDate] = useState<CalendarDate | undefined>()
    useEffect(() => {
        const fetchDate = async () => {
            const savedDate = await calendarDao.getDate()
            setDate(savedDate)
        }
        fetchDate();
    }, [calendarDao])
    if (!date) return <></>;

    const nextDate = () => {
        const nextDate = getDateAtOffset(date, 1);
        setDate(nextDate)
        calendarDao.setDate(nextDate)
    }

    const previousDate = () => {
        const previousDate = getDateAtOffset(date, -1);
        setDate(previousDate)
        calendarDao.setDate(previousDate)
    }

    return (
        <div className="dnd-calendar-container">
            <div className="dnd-calendar-button-display">
                <button onClick={previousDate}>Previous</button>
                <CalendarDisplay
                    year={date.year}
                    month={date.month}
                    day={date.day}
                />
                <button onClick={nextDate}>Next</button>
            </div>
        </div>
    );
}