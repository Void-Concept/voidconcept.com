import { atagothCalendar, atagothWeekDays, DndCalendarEvent, unnamedCalendar, unnamedWeekDays } from './calendar'

describe("atagothCalendar", () => {
    describe("getDayOfWeek", () => {
        it("should get the correct day of the week given initial time", () => {
            const year = 4067;
            const month = 3;
            const day = 25;

            const dayOfWeek = atagothCalendar.getDayOfWeek({ year, month, day });
            expect(dayOfWeek).toEqual("Friday")
        });

        it("should get the correct day of the week", () => {
            const year = 4067;
            const month = 3;
            const day = 28;

            [...Array(7)].map((_, index) => {
                const dayOfWeek = atagothCalendar.getDayOfWeek({ year, month, day: day + index });
                expect(dayOfWeek).toEqual(atagothWeekDays[index])
            });
        });

        it("should work across year boundaries", () => {
            const previousDate = atagothCalendar.getDayOfWeek({ year: 4067, month: 12, day: 30 })
            const nextDate = atagothCalendar.getDayOfWeek({ year: 4068, month: 1, day: 1 })
            expect(previousDate).toEqual("Sunday")
            expect(nextDate).toEqual("Monday")
        });
    });

    describe("getNextDate", () => {
        it("should increment day by 1 if middle of month", () => {
            const date = {
                year: 4067,
                month: 3,
                day: 25,
            };

            const nextDate = atagothCalendar.getDateAtOffset(date);

            expect(nextDate).toEqual({
                year: 4067,
                month: 3,
                day: 26,
            });
        });

        it("should increment month correctly if end of month", () => {
            const date = {
                year: 4067,
                month: 3,
                day: 30,
            };

            const nextDate = atagothCalendar.getDateAtOffset(date);

            expect(nextDate).toEqual({
                year: 4067,
                month: 4,
                day: 1,
            });
        });

        it("should increment year correctly if end of year", () => {
            const date = {
                year: 4067,
                month: 12,
                day: 30,
            };

            const nextDate = atagothCalendar.getDateAtOffset(date);

            expect(nextDate).toEqual({
                year: 4068,
                month: 1,
                day: 1,
            });
        });

        it("should decrement day by 1 if middle of month", () => {
            const date = {
                year: 4067,
                month: 3,
                day: 25,
            };

            const nextDate = atagothCalendar.getDateAtOffset(date, -1);

            expect(nextDate).toEqual({
                year: 4067,
                month: 3,
                day: 24,
            });
        });

        it("should decrement month correctly if beginning of month", () => {
            const date = {
                year: 4067,
                month: 3,
                day: 1,
            };

            const nextDate = atagothCalendar.getDateAtOffset(date, -1);

            expect(nextDate).toEqual({
                year: 4067,
                month: 2,
                day: 30,
            });
        });

        it("should decrement year correctly if beginning of year", () => {
            const date = {
                year: 4067,
                month: 1,
                day: 1,
            };

            const nextDate = atagothCalendar.getDateAtOffset(date, -1);

            expect(nextDate).toEqual({
                year: 4066,
                month: 12,
                day: 30,
            });
        });
    });

    describe("getDateEpoch", () => {
        it("should get the correct date epoch for given date", () => {
            const date = {
                year: 4067,
                month: 3,
                day: 25,
            };

            const dateEpoch = atagothCalendar.getDateEpoch(date);

            expect(dateEpoch).toEqual(1464204)
        });

        it("should get the correct date epoch another date", () => {
            const date = {
                year: 4067,
                month: 4,
                day: 20,
            };

            const dateEpoch = atagothCalendar.getDateEpoch(date);

            expect(dateEpoch).toEqual(1464229)
        });

        it("should get the correct date epoch another date", () => {
            const date = {
                year: 1,
                month: 4,
                day: 20,
            };

            const dateEpoch = atagothCalendar.getDateEpoch(date);

            expect(dateEpoch).toEqual(469)
        });

        it("should be 0 at 0-01-01", () => {
            const date = {
                year: 0,
                month: 1,
                day: 1,
            };

            const dateEpoch = atagothCalendar.getDateEpoch(date);

            expect(dateEpoch).toEqual(0)
        });

        it("should be 360 at 1-01-01", () => {
            const date = {
                year: 1,
                month: 1,
                day: 1,
            };

            const dateEpoch = atagothCalendar.getDateEpoch(date);

            expect(dateEpoch).toEqual(360)
        });
    });

    describe("getEpochDate", () => {
        it("should get the correct date epoch for given date", () => {
            const dateEpoch = 1464204
            const expectedDate = {
                year: 4067,
                month: 3,
                day: 25,
            };

            const date = atagothCalendar.getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should get the correct date epoch for another date", () => {
            const dateEpoch = 1464229
            const expectedDate = {
                year: 4067,
                month: 4,
                day: 20,
            };

            const date = atagothCalendar.getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should get the correct date epoch for smaller year", () => {
            const dateEpoch = 469
            const expectedDate = {
                year: 1,
                month: 4,
                day: 20,
            };

            const date = atagothCalendar.getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should be 0-1-1 at 0", () => {
            const dateEpoch = 0
            const expectedDate = {
                year: 0,
                month: 1,
                day: 1,
            };

            const date = atagothCalendar.getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should be 1-1-1 at 360", () => {
            const dateEpoch = 0
            const expectedDate = {
                year: 0,
                month: 1,
                day: 1,
            };

            const date = atagothCalendar.getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });
    });

    describe("getEventsFor", () => {
        it("should inn payment event on correct day", () => {
            const testRuns = [{
                date: {
                    year: 4068,
                    month: 1,
                    day: 1
                },
                events: ["Inn Payment"]
            }, {
                date: {
                    year: 4068,
                    month: 1,
                    day: 2
                },
                events: []
            }, {
                date: {
                    year: 4068,
                    month: 1,
                    day: 8
                },
                events: []
            }, {
                date: {
                    year: 4068,
                    month: 1,
                    day: 15
                },
                events: ["Inn Payment"]
            }]

            testRuns.forEach(({ date, events }) => {
                const actualEvents = atagothCalendar.getEventsFor(atagothCalendar.getDateEpoch(date))

                expect(actualEvents.map(event => event.name)).toEqual(events)
            })
        })
    })
})

describe("UnnamedCalendar", () => {
    describe("getDayOfWeek", () => {
        it("should get the correct day of the week given initial time", () => {
            const year = 1;
            const month = 1;
            const day = 1;

            const dayOfWeek = unnamedCalendar.getDayOfWeek({ year, month, day });
            expect(dayOfWeek).toEqual("Sunday")
        });

        it("should get the correct day of the week", () => {
            const year = 1;
            const month = 1;
            const day = 15;

            [...Array(7)].map((_, index) => {
                const dayOfWeek = unnamedCalendar.getDayOfWeek({ year, month, day: day + index });
                expect(dayOfWeek).toEqual(unnamedWeekDays[(index + unnamedWeekDays.length - 1) % 7])
            });
        });

        it("should work across year boundaries", () => {
            const previousDate = unnamedCalendar.getDayOfWeek({ year: 1, month: 15, day: 26 })
            const nextDate = unnamedCalendar.getDayOfWeek({ year: 2, month: 1, day: 1 })
            expect(previousDate).toEqual("Thursday")
            expect(nextDate).toEqual("Friday")
        });
    });
})
