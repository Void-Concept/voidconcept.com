import React, { useState, useEffect } from 'react';
import { CalendarDisplay } from './CalendarDisplay';
import { CalendarDao } from './CalendarDao';
import { CalendarDate, getDateAtOffset, getWeekEpoch } from './util';
import MoonFullIcon from "mdi-react/MoonFullIcon";
import MoonNewIcon from "mdi-react/MoonNewIcon";
import MoonLastQuarterIcon from "mdi-react/MoonLastQuarterIcon";
import MoonFirstQuarterIcon from "mdi-react/MoonFirstQuarterIcon";
import MoneyIcon from "mdi-react/HomeCurrencyUsdIcon";
import { useCalendar } from './CalendarContext'
import { CalendarGrid } from './CalendarGrid'
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

interface InnPaymentIconProps {
    date: CalendarDate
}
const InnPaymentIcon = ({ date }: InnPaymentIconProps) => {
    const calendar = useCalendar()
    if (calendar.getWeekEpoch(date) % 2 === 1 && calendar.getDayOfWeek(date) === "Monday") {
        return <span title={"Inn Payment"}><MoneyIcon /></span>;
    } else {
        return null;
    }
}

interface CalendarProps {
    calendarDao: CalendarDao
}

type DisplayDate = {
    year: number
    month: number
}

export const CalendarComponent = ({ calendarDao }: CalendarProps) => {
    const calendar = useCalendar();

    const [date, setDate] = useState<CalendarDate | undefined>()
    const [displayDate, setDisplayDate] = useState<DisplayDate>()
    useEffect(() => {
        const fetchDate = async () => {
            const savedDate = await calendarDao.getDate()
            setDate(savedDate)
            setDisplayDate({
                year: savedDate.year,
                month: savedDate.month
            })
        }
        fetchDate();
    }, [calendarDao])
    if (!date || !displayDate) return <>Loading...</>;

    const nextDate = async () => {
        const nextDate = getDateAtOffset(date, 1);
        setDate(await calendarDao.setDate(nextDate))
    }

    const previousDate = async () => {
        const previousDate = getDateAtOffset(date, -1);
        setDate(await calendarDao.setDate(previousDate))
    }

    const onPreviousMonth = () => {
        let newYear = displayDate.year
        let newMonth = displayDate.month - 1
        if (newMonth < 0) {
            newMonth = calendar.months.length - 1
            newYear -= 1
        }
        setDisplayDate({
            year: newYear,
            month: newMonth
        })
    }

    const onNextMonth = () => {
        let newYear = displayDate.year
        let newMonth = displayDate.month + 1
        if (newMonth >= calendar.months.length) {
            newMonth = 0
            newYear += 1
        }
        setDisplayDate({
            year: newYear,
            month: newMonth
        })
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
                <InnPaymentIcon date={date} />
            </div>
            <CalendarGrid year={displayDate.year} month={displayDate.month} currentDay={date} onPreviousMonth={onPreviousMonth} onNextMonth={onNextMonth} />
        </div>
    );
};