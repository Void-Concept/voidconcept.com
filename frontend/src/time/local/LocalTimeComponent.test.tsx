import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LocalTimeComponent, LocalTimeComponentParams } from './LocalTimeComponent';
import moment from 'moment-timezone';
import { createMemoryHistory } from 'history';
import { match as Match } from 'react-router';

describe("LocalTimezoneComponent", () => {
    it("should display current time in local timezone", async () => {
        const match = {
            params: {
                epochTime: "1583804488000"
            }
        } as Match<LocalTimeComponentParams>;

        const wrapper = render(<LocalTimeComponent match={match} />);

        expect(await wrapper.findByDisplayValue("2020-03-09 06:03:00 PM")).toBeDefined();
    });

    it("should move path on change", async () => {
        const originalEpochTime = "1583804488000"

        const history = createMemoryHistory({
            initialEntries: [`/time/local/${originalEpochTime}`]
        });
        const match = {
            params: {
                epochTime: originalEpochTime
            }
        } as Match<LocalTimeComponentParams>;

        const wrapper = render(<LocalTimeComponent match={match} history={history} />);

        const expectedEpochTime = "1583804512000";

        const input = await wrapper.findByDisplayValue("2020-03-09 06:03:00 PM") as HTMLInputElement;
        fireEvent.change(input, {
            target: {
                value: moment(expectedEpochTime, 'x').toDate()
            }
        })

        expect(history.location.pathname).toEqual(`/time/local/${expectedEpochTime}`);
    });

    it("should still display with no initial time", async () => {
        const history = createMemoryHistory({
            initialEntries: [`/time/local`]
        });
        const match = {
            params: {}
        } as Match<LocalTimeComponentParams>;

        render(<LocalTimeComponent match={match} history={history} />);
    });

    it("should still display with invalid time", async () => {
        const history = createMemoryHistory({
            initialEntries: [`/time/local/notanumber`]
        });
        const match = {
            params: {
                epochTime: "notanumber"
            }
        } as Match<LocalTimeComponentParams>;

        render(<LocalTimeComponent match={match} history={history} />);
    });
});