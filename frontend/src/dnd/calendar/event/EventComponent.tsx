import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router';
import { Calendar } from '../calendar';
import { CalendarProvider, useCalendar } from '../CalendarContext';
import { CalendarDao } from '../CalendarDao';

type EventComponentProps = {
    date: number
}

export const EventComponent = ({ date }: EventComponentProps) => {
    const calendar = useCalendar()
    const currentEvents = calendar.getEventsFor(date)
    const thing = JSON.stringify(currentEvents)

    return (
        <>
            {thing}
        </>
    )
}

type DndCalendarProps = {
    calendarDao: CalendarDao
}
type DndCalendarEventParams = {
    date: string
    calendarName: string
}
export const DndCalendarEvent = ({ calendarDao }: DndCalendarProps) => {
    const match = useRouteMatch<DndCalendarEventParams>();
    const calendarName = match.params.calendarName
    const [calendar, setCalendar] = useState<Calendar | undefined>();
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        const getCalendar = async () => {
            const fetchedCalendar = await calendarDao.getCalendar(match.params.calendarName)
            setCalendar(fetchedCalendar)
            setFetching(false)
        }
        getCalendar().catch(console.error)
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
            <EventComponent date={parseInt(match.params.date)} />
        </CalendarProvider>
    )
}