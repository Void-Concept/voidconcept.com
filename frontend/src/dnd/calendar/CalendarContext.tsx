import React, { useContext } from 'react'
import { Calendar } from './calendar'

const calendarContext = React.createContext<Calendar>(undefined as unknown as Calendar)

export const CalendarProvider = calendarContext.Provider
export const CalendarConsumer = calendarContext.Consumer

export const useCalendar = () => useContext(calendarContext)