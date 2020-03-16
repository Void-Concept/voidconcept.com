import { getDayOfWeek, daysOfWeek, getDateAtOffset, getDateEpoch, getEpochDate } from "./util"


describe("util", () => {
    describe("getDayOfWeek", () => {
        it("should get the correct day of the week given initial time", () => {
            const year = 4067;
            const month = 3;
            const day = 25;

            const dayOfWeek = getDayOfWeek(year, month, day);
            expect(dayOfWeek).toEqual("Friday")
        });

        it("should get the correct day of the week", () => {
            const year = 4067;
            const month = 3;
            const day = 28;

            [...Array(7)].map((_, index) => {
                const dayOfWeek = getDayOfWeek(year, month, day + index);
                expect(dayOfWeek).toEqual(daysOfWeek[index])
            });
        });
    });

    describe("getNextDate", () => {
        it("should increment day by 1 if middle of month", () => {
            const date = {
                year: 4067,
                month: 3,
                day: 25,
            };

            const nextDate = getDateAtOffset(date);

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

            const nextDate = getDateAtOffset(date);

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

            const nextDate = getDateAtOffset(date);

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

            const nextDate = getDateAtOffset(date, -1);

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

            const nextDate = getDateAtOffset(date, -1);

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

            const nextDate = getDateAtOffset(date, -1);

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

            const dateEpoch = getDateEpoch(date);

            expect(dateEpoch).toEqual(1464204)
        });

        it("should get the correct date epoch another date", () => {
            const date = {
                year: 4067,
                month: 4,
                day: 20,
            };

            const dateEpoch = getDateEpoch(date);

            expect(dateEpoch).toEqual(1464229)
        });

        it("should get the correct date epoch another date", () => {
            const date = {
                year: 1,
                month: 4,
                day: 20,
            };

            const dateEpoch = getDateEpoch(date);

            expect(dateEpoch).toEqual(469)
        });

        it("should be 0 at 0-01-01", () => {
            const date = {
                year: 0,
                month: 1,
                day: 1,
            };

            const dateEpoch = getDateEpoch(date);

            expect(dateEpoch).toEqual(0)
        });

        it("should be 360 at 1-01-01", () => {
            const date = {
                year: 1,
                month: 1,
                day: 1,
            };

            const dateEpoch = getDateEpoch(date);

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

            const date = getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should get the correct date epoch for another date", () => {
            const dateEpoch = 1464229
            const expectedDate = {
                year: 4067,
                month: 4,
                day: 20,
            };

            const date = getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should get the correct date epoch for smaller year", () => {
            const dateEpoch = 469
            const expectedDate = {
                year: 1,
                month: 4,
                day: 20,
            };

            const date = getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should be 0-1-1 at 0", () => {
            const dateEpoch = 0
            const expectedDate = {
                year: 0,
                month: 1,
                day: 1,
            };

            const date = getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });

        it("should be 1-1-1 at 360", () => {
            const dateEpoch = 0
            const expectedDate = {
                year: 0,
                month: 1,
                day: 1,
            };

            const date = getEpochDate(dateEpoch);

            expect(date).toEqual(expectedDate)
        });
    });
});