import React from 'react';
import { Calendar } from './Calendar';
import { render } from '@testing-library/react';

describe("Calendar", () => {
    it('should display a calendar with current dnd date', async () => {
        //TODO: pass in some sort of dao to get this date; hard-coded for now
        const wrapper = render(
            <Calendar />
        );

        expect(await wrapper.findByText("Friday 4067-03-25"));
    });
})