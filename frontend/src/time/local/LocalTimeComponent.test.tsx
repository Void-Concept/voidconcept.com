import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LocalTimeComponent, LocalTimeComponentParams } from './LocalTimeComponent';
import moment from 'moment-timezone';
import { createMemoryHistory, History } from 'history';
import { match as Match, Router, Route } from 'react-router';

describe("LocalTimezoneComponent", () => {
    const renderComponent = (history: History) => {
        const wrapper = render(
            <Router history={history}>
                <Route path="/time/local/:epochTime">
                    <LocalTimeComponent />
                </Route>
                <Route path="/time/local/" exact>
                    <LocalTimeComponent />
                </Route>
            </Router>
        );
        return wrapper;
    }

    it("should display current time in local timezone", async () => {
        const history = createMemoryHistory({
            initialEntries: [`/time/local/1583804488000`]
        });

        const wrapper = renderComponent(history);

        expect(await wrapper.findByDisplayValue("2020-03-09 06:41:00 PM")).toBeDefined();
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

        const wrapper = renderComponent(history);

        const expectedEpochTime = "1583804512000";

        const input = await wrapper.findByDisplayValue("2020-03-09 06:41:00 PM") as HTMLInputElement;
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

        renderComponent(history);
    });

    it("should still display with invalid time", async () => {
        const history = createMemoryHistory({
            initialEntries: [`/time/local/notanumber`]
        });

        renderComponent(history);
    });
});