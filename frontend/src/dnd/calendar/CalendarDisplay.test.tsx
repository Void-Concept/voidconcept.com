import { render } from '@testing-library/react';
import React from 'react';
import { CalendarDisplay } from './CalendarDisplay';

describe("CalendarDisplay", () => {
    it("should display current date name", async () => {
        const wrapper = render(
            <CalendarDisplay
                day={25}
                month={3}
                year={4067}
            />
        );

        expect(await wrapper.findByText("Friday 4067-03-25"));
    });
});