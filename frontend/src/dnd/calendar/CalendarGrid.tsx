import React from 'react';
import { Calendar } from './calendar';
import "./calendarGrid.css"

interface CalendarGridProps {
    calendar: Calendar
    year: number
    month: number
}

export const CalendarGrid = ({ calendar, year, month }: CalendarGridProps) => {
    const rows = Math.ceil(calendar.daysInMonth / calendar.weekDays.length) + 1
    const startDayOfWeek = calendar.getDayOfWeekIndex({ year, month, day: 1 })
    return (
        <div>
            <div className="calendar-title">
                {`${calendar.months[month]} ${year}`}
            </div>
            <table className="calendar-table">

                <CalendarHeader calendar={calendar} startDayOfWeek={startDayOfWeek} />
                {new Array(rows).fill(0).map((z, index) => {
                    console.log(z, index)
                    return <CalendarRow calendar={calendar} row={index} startDayOfWeek={startDayOfWeek} />
                })}
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
        <tr>
            {calendar.weekDays.map(weekDay => (
                <td className={"calendar-header-cell"}>
                    {weekDay}
                </td>
            ))}
        </tr>
    )
}

interface CalendarRowProps {
    calendar: Calendar
    row: number
    startDayOfWeek: number
}
const CalendarRow = ({ calendar, row, startDayOfWeek }: CalendarRowProps) => {
    return (
        <tr>
            {calendar.weekDays.map((_, column) => (
                <CalendarCell calendar={calendar} row={row} column={column} startDayOfWeek={startDayOfWeek} />
            ))}
        </tr>
    )
}

interface CalendarCellProps {
    calendar: Calendar
    row: number
    column: number
    startDayOfWeek: number
}
const CalendarCell = ({ calendar, row, column, startDayOfWeek }: CalendarCellProps) => {
    const day = (calendar.weekDays.length * row) + column - startDayOfWeek;
    const isInMonth = 0 <= day && day < calendar.daysInMonth
    const displayDate = (calendar.daysInMonth + day) % calendar.daysInMonth + 1
    const maybeGrayStyle = isInMonth ? "" : "calendar-cell-gray";
    return (
        <td className={`calendar-cell ${maybeGrayStyle}`}>
            {displayDate}
        </td>
    )
}