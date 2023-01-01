import React, { useState, MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { useAsyncEffect } from '../../hooks';
import { CalendarDao } from './CalendarDao';
import "./calendarList.css";

interface CalendarListProps {
    calendarDao: CalendarDao
}
export const CalendarList = ({ calendarDao }: CalendarListProps) => {
    const [fetching, setFetching] = useState<boolean>(true);
    const [calendarNames, setCalendarNames] = useState<string[]>([]);

    useAsyncEffect(async () => {
        setCalendarNames(await calendarDao.getCalendarNames());
        setFetching(false);
    }, [])

    if (fetching) return <>Loading...</>

    return (
        <CalendarListView calendarNames={calendarNames} />
    )
}

interface CalendarListViewProps {
    calendarNames: string[]
}

const CalendarListView = ({ calendarNames }: CalendarListViewProps) => {
    const history = useHistory();

    const getDestination = (calendarName: string) => `/dnd/calendar/${calendarName}`

    const onNameClicked = (calendarName: string): MouseEventHandler<HTMLAnchorElement> => (event) => {
        event.preventDefault()
        history.push(getDestination(calendarName))
    }

    return (
        <div className="dnd-calendar-list-container">
            <h1>Choose a calendar</h1>
            <div>
                {calendarNames.map((calendarName, index) => {
                    return (
                        <div key={index}>
                            <a onClick={onNameClicked(calendarName)} href={getDestination(calendarName)}>{calendarName}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}