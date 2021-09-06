import { render } from '@testing-library/react';
import React from 'react';
import { atagothCalendar } from './calendar';
import { CalendarProvider } from './CalendarContext';
import { CalendarDisplay } from './CalendarDisplay';

describe("CalendarDisplay", () => {
    it("should display current date name", async () => {
        const wrapper = render(
            <CalendarProvider value={atagothCalendar}>
                <CalendarDisplay
                    day={25}
                    month={3}
                    year={4067}
                />
            </CalendarProvider>
        );

        expect(await wrapper.findByText("Friday 4067-03-25"));
    });
});