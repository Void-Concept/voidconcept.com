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

    describe("moon phase", () => {
        it('should display an icon when the current day is a full moon (25th)', async () => {
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

            expect(await wrapper.findByTitle("Full Moon")).toBeDefined();
        });

        it('should display an icon when the current day is a new moon (10th)', async () => {
            const calendarDao = {
                getDate: jest.fn().mockResolvedValue({
                    year: 4067,
                    month: 3,
                    day: 10
                }),
                setDate: jest.fn().mockImplementation((newDate: CalendarDate) => {
                    return Promise.resolve(newDate);
                })
            } as CalendarDao;

            const wrapper = render(
                <Calendar calendarDao={calendarDao} />
            );

            expect(await wrapper.findByTitle("New Moon")).toBeDefined();
        });

        it('should display an icon when the current day is a waning half moon (2th)', async () => {
            const calendarDao = {
                getDate: jest.fn().mockResolvedValue({
                    year: 4067,
                    month: 3,
                    day: 2
                }),
                setDate: jest.fn().mockImplementation((newDate: CalendarDate) => {
                    return Promise.resolve(newDate);
                })
            } as CalendarDao;

            const wrapper = render(
                <Calendar calendarDao={calendarDao} />
            );

            expect(await wrapper.findByTitle("Waning Half Moon")).toBeDefined();
        });

        it('should display an icon when the current day is a waxing half moon (17th)', async () => {
            const calendarDao = {
                getDate: jest.fn().mockResolvedValue({
                    year: 4067,
                    month: 3,
                    day: 17
                }),
                setDate: jest.fn().mockImplementation((newDate: CalendarDate) => {
                    return Promise.resolve(newDate);
                })
            } as CalendarDao;

            const wrapper = render(
                <Calendar calendarDao={calendarDao} />
            );

            expect(await wrapper.findByTitle("Waxing Half Moon")).toBeDefined();
        });
    });

    describe("Gloria Icon", () => {
        it("should display an icon for Cowloria on Wednesdays", async () => {
            const calendarDao = {
                getDate: jest.fn().mockResolvedValue({
                    year: 4067,
                    month: 3,
                    day: 23
                }),
                setDate: jest.fn().mockImplementation((newDate: CalendarDate) => {
                    return Promise.resolve(newDate);
                })
            } as CalendarDao;

            const wrapper = render(
                <Calendar calendarDao={calendarDao} />
            );

            expect(await wrapper.findByTitle("Cow Gloria")).toBeDefined();
        });
    })
});