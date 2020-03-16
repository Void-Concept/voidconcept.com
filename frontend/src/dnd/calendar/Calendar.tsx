import React from 'react';
import { CalendarDisplay } from './CalendarDisplay';

export const Calendar = () => {
    return (
        <CalendarDisplay
            year={4067}
            month={3}
            day={25}
        />
    );
}