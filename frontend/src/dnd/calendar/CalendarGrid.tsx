import React from 'react';
import { Calendar, CalendarDate } from './calendar';
import "./calendarGrid.css"
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import { useCalendar } from './CalendarContext';

interface CalendarGridProps {
    year: number
    month: number
    currentDay: CalendarDate
    onPreviousMonth?: () => void
    onNextMonth?: () => void
}

export const CalendarGrid = ({ year, month, currentDay, onPreviousMonth, onNextMonth }: CalendarGridProps) => {
    const calendar = useCalendar();
    const rows = Math.ceil(calendar.daysInMonth / calendar.weekDays.length) + 1
    return (
        <div>
            <div className="calendar-title">
                <span className="calendar-title-text">{`${calendar.months[(month - 1 + calendar.months.length) % calendar.months.length]} ${year}`}</span>
                <span className="calendar-title-buttons">
                    <ChevronUpIcon className="calendar-month-button" onClick={onPreviousMonth} />
                    <ChevronDownIcon className="calendar-month-button" onClick={onNextMonth} />
                </span>
            </div>
            <table className="calendar-table">
                <CalendarHeader />
                <tbody>
                    {new Array(rows).fill(0).map((z, index) => (
                        <CalendarRow key={index} row={index} currentDay={currentDay} year={year} month={month} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

interface CalendarHeaderProps {

}
const CalendarHeader = ({ }: CalendarHeaderProps) => {
    const calendar = useCalendar();
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
    row: number
    currentDay: CalendarDate
    year: number
    month: number
}
const CalendarRow = ({ row, currentDay, month, year }: CalendarRowProps) => {
    const calendar = useCalendar()
    return (
        <tr>
            {calendar.weekDays.map((_, column) => (
                <CalendarCell key={column} row={row} column={column} currentDay={currentDay} year={year} month={month} />
            ))}
        </tr>
    )
}

interface CalendarCellProps {
    row: number
    column: number
    currentDay: CalendarDate
    year: number
    month: number
}
const CalendarCell = ({ row, column, currentDay, month, year }: CalendarCellProps) => {
    const calendar = useCalendar()

    const startDayOfWeek = calendar.getDayOfWeekIndex({ year, month, day: 1 })
    const day = (calendar.weekDays.length * row) + column - startDayOfWeek;
    const cellDate = calendar.getEpochDate(calendar.getDateEpoch({ year, month: month, day: day + 1 }))

    const maybeGrayStyle = cellDate.month % calendar.months.length === month % calendar.months.length ? "" : "calendar-cell-gray";
    const maybeCurrentDay = currentDay.month === cellDate.month && currentDay.year === cellDate.year && currentDay.day === cellDate.day ? "calendar-cell-highlight" : "";

    return (
        <td className={`calendar-cell ${maybeGrayStyle} ${maybeCurrentDay}`}>
            {cellDate.day}
        </td>
    )
}