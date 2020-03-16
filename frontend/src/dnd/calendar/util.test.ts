import { getDayOfWeek, daysOfWeek } from "./util"


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
});