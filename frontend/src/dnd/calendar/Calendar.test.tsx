import React from 'react';
import { Calendar } from './Calendar';
import { render, fireEvent } from '@testing-library/react';
import { CalendarDao } from './CalendarDao';
import { CalendarDate } from './util';

describe("Calendar", () => {
    it('should display a calendar with current dnd date', async () => {
        const calendarDao = {
            getDate: jest.fn().mockResolvedValue({
                year: 4067,
                month: 3,
                day: 25
            }),
            setDate: jest.fn().mockImplementation((nextDate: CalendarDate) => {
                return Promise.resolve(nextDate);
            })
        } as CalendarDao;

        const wrapper = render(
            <Calendar calendarDao={calendarDao} />
        );

        expect(await wrapper.findByText("Friday 4067-03-25"));
    });

    it('should increment date when next date is pressed', async () => {
        const calendarDao = {
            getDate: jest.fn().mockResolvedValue({
                year: 4067,
                month: 3,
                day: 25
            }),
            setDate: jest.fn().mockImplementation((nextDate: CalendarDate) => {
                return Promise.resolve(nextDate);
            })
        } as CalendarDao;

        const wrapper = render(
            <Calendar calendarDao={calendarDao} />
        );

        const nextButton = await wrapper.findByText("Next") as HTMLButtonElement;
        await fireEvent.click(nextButton)

        expect(calendarDao.setDate).toHaveBeenCalledWith({
            year: 4067,
            month: 3,
            day: 26
        });
        expect(await wrapper.findByText("Saturday 4067-03-26"));
    });

    it('should decrement date when previous date is pressed', async () => {
        const calendarDao = {
            getDate: jest.fn().mockResolvedValue({
                year: 4067,
                month: 3,
                day: 25
            }),
            setDate: jest.fn().mockImplementation((newDate: CalendarDate) => {
                return Promise.resolve(newDate);
            })
        } as CalendarDao;

        const wrapper = render(
            <Calendar calendarDao={calendarDao} />
        );

        const previousButton = await wrapper.findByText("Previous") as HTMLButtonElement;
        await fireEvent.click(previousButton)

        expect(calendarDao.setDate).toHaveBeenCalledWith({
            year: 4067,
            month: 3,
            day: 24
        });
        expect(await wrapper.findByText("Thursday 4067-03-24"));
    });
})