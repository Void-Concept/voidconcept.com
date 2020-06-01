import React, { useState, useEffect } from 'react';
import { CalendarDisplay } from './CalendarDisplay';
import { CalendarDao } from './CalendarDao';
import { CalendarDate, getDateAtOffset } from './util';
import MoonFullIcon from "mdi-react/MoonFullIcon";
import MoonNewIcon from "mdi-react/MoonNewIcon";
import MoonLastQuarterIcon from "mdi-react/MoonLastQuarterIcon";
import MoonFirstQuarterIcon from "mdi-react/MoonFirstQuarterIcon";
import CowIcon from "mdi-react/CowIcon";
import { getDayOfWeek } from './util';
import "./calendar.css"

interface MoonPhaseIconProps {
    date: CalendarDate
}
const MoonPhaseIcon = ({ date }: MoonPhaseIconProps) => {
    switch (date.day) {
        case 2:
            return <span title="Waning Half Moon"><MoonLastQuarterIcon /></span>
        case 10:
            return <span title="New Moon"><MoonNewIcon /></span>
        case 17:
            return <span title="Waxing Half Moon"><MoonFirstQuarterIcon /></span>
        case 25:
            return <span title="Full Moon"><MoonFullIcon /></span>

        default:
            return null
    }
};

interface CowGloriaIconProps {
    date: CalendarDate
}
const CowGloriaIcon = ({ date }: CowGloriaIconProps) => {
    if (getDayOfWeek(date.year, date.month, date.day) !== "Wednesday") {
        return null;
    }

    return <span title={"Cow Gloria"}><CowIcon /></span>
}

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
            <div className="dnd-calendar-status">
                <MoonPhaseIcon date={date} />
                <CowGloriaIcon date={date} />
            </div>
        </div>
    );
};