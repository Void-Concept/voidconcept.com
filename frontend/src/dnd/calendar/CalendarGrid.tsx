import React from 'react';
import { Calendar, CalendarDate } from './calendar';
import "./calendarGrid.css"
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";

interface CalendarGridProps {
    calendar: Calendar
    year: number
    month: number
    currentDay: CalendarDate
    onPreviousMonth?: () => void
    onNextMonth?: () => void
}

export const CalendarGrid = ({ calendar, year, month, currentDay, onPreviousMonth, onNextMonth }: CalendarGridProps) => {
    const rows = Math.ceil(calendar.daysInMonth / calendar.weekDays.length) + 1
    const startDayOfWeek = calendar.getDayOfWeekIndex({ year, month, day: 1 })
    return (
        <div>
            <div className="calendar-title">
                <span className="calendar-title-text">{`${calendar.months[month]} ${year}`}</span>
                <span className="calendar-title-buttons">
                    <ChevronUpIcon className="calendar-month-button" onClick={onPreviousMonth} />
                    <ChevronDownIcon className="calendar-month-button" onClick={onNextMonth} />
                </span>
            </div>
            <table className="calendar-table">
                <CalendarHeader calendar={calendar} startDayOfWeek={startDayOfWeek} />
                <tbody>
                    {new Array(rows).fill(0).map((z, index) => (
                        <CalendarRow key={index} calendar={calendar} row={index} startDayOfWeek={startDayOfWeek} currentDay={currentDay} year={year} month={month} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface CalendarHeaderProps {
    calendar: Calendar
    startDayOfWeek: number
}
const CalendarHeader = ({ calendar }: CalendarHeaderProps) => {
    return (
        <thead>
            <tr>
                {calendar.weekDays.map(weekDay => (
                    <td key={weekDay} className={"calendar-header-cell"}>
                        {weekDay}
                    </td>
                ))}
            </tr>
        </thead>
    )
}

interface CalendarRowProps {
    calendar: Calendar
    row: number
    startDayOfWeek: number
    currentDay: CalendarDate
    year: number
    month: number
}
const CalendarRow = ({ calendar, row, startDayOfWeek, currentDay, month, year }: CalendarRowProps) => {
    return (
        <tr>
            {calendar.weekDays.map((_, column) => (
                <CalendarCell key={column} calendar={calendar} row={row} column={column} startDayOfWeek={startDayOfWeek} currentDay={currentDay} year={year} month={month} />
            ))}
        </tr>
    )
}

interface CalendarCellProps {
    calendar: Calendar
    row: number
    column: number
    startDayOfWeek: number
    currentDay: CalendarDate
    year: number
    month: number
}
const CalendarCell = ({ calendar, row, column, startDayOfWeek, currentDay, month, year }: CalendarCellProps) => {
    const day = (calendar.weekDays.length * row) + column - startDayOfWeek;
    const isInMonth = 0 <= day && day < calendar.daysInMonth
    const displayDate = (calendar.daysInMonth + day) % calendar.daysInMonth + 1
    const maybeGrayStyle = isInMonth ? "" : "calendar-cell-gray";
    const maybeCurrentDay = currentDay.month === month && currentDay.year === year && currentDay.day === displayDate && isInMonth ? "calendar-cell-highlight" : "";
    return (
        <td className={`calendar-cell ${maybeGrayStyle} ${maybeCurrentDay}`}>
            {displayDate}
        </td>
    )
}