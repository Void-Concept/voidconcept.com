import React, { useState } from 'react';
import { CalendarDisplay } from './CalendarDisplay';
import { CalendarDao } from './CalendarDao';
import MoonFullIcon from "mdi-react/MoonFullIcon";
import MoonNewIcon from "mdi-react/MoonNewIcon";
import MoonLastQuarterIcon from "mdi-react/MoonLastQuarterIcon";
import MoonFirstQuarterIcon from "mdi-react/MoonFirstQuarterIcon";
import MoneyIcon from "mdi-react/HomeCurrencyUsdIcon";
import { CalendarProvider, useCalendar } from './CalendarContext'
import { CalendarGrid } from './CalendarGrid'
import "./calendar.css"
import { Calendar, DndCalendarDate } from './calendar';
import { useRouteMatch } from 'react-router';
import { useAsyncEffect } from '../../hooks';

interface MoonPhaseIconProps {
    date: DndCalendarDate
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
    date: DndCalendarDate
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

    const [date, setDate] = useState<DndCalendarDate | undefined>()
    const [displayDate, setDisplayDate] = useState<DisplayDate>()
    useAsyncEffect(async () => {
        const savedDate = await calendarDao.getDate(calendar.name)
        setDate(savedDate)
        setDisplayDate({
            year: savedDate.year,
            month: savedDate.month
        })
    }, [calendarDao])
    if (!date || !displayDate) return <>Loading...</>;

    const nextDate = async () => {
        const nextDate = calendar.getDateAtOffset(date, 1);
        setDate(await calendarDao.setDate(calendar.name, nextDate))
        setDisplayDate({
            year: nextDate.year,
            month: nextDate.month
        })
    }

    const previousDate = async () => {
        const previousDate = calendar.getDateAtOffset(date, -1);
        setDate(await calendarDao.setDate(calendar.name, previousDate))
        setDisplayDate({
            year: previousDate.year,
            month: previousDate.month
        })
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
                    className="dnd-calendar-display"
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

interface DndCalendarParams {
    calendarName: string
}
interface DndCalendarProps {
    calendarDao: CalendarDao
}
export const DndCalendar = ({ calendarDao }: DndCalendarProps) => {
    const match = useRouteMatch<DndCalendarParams>();
    const calendarName = match.params.calendarName
    const [calendar, setCalendar] = useState<Calendar | undefined>();
    const [fetching, setFetching] = useState<boolean>(true);

    useAsyncEffect(async () => {
        const fetchedCalendar = await calendarDao.getCalendar(match.params.calendarName)
        setCalendar(fetchedCalendar)
        setFetching(false)
    }, [calendarName])

    if (!calendar) {
        if (fetching) {
            return <>Loading...</>
        } else {
            return <>No calendar named {calendarName} found</>
        }
    }

    return (
        <CalendarProvider value={calendar}>
            <CalendarComponent calendarDao={calendarDao} />
        </CalendarProvider>
    )
}