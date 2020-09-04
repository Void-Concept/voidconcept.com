import React from 'react';
import './App.css';
import { Router, Route, Redirect, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';
import { LocalTimeComponent } from './time/local/LocalTimeComponent';
import { Calendar as DndCalendar } from './dnd/calendar/Calendar';
import { NamesComponent } from './dnd/irilic/NamesComponent';
import { GenericStorageCalendarDao, InMemoryCalendarDao } from './dnd/calendar/CalendarDao';
import { NavComponent } from './nav';

const getCalendarDao = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return new InMemoryCalendarDao();
    } else {
        return new GenericStorageCalendarDao();
    }
}

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <NavComponent routes={[{
                name: "DnD",
                routes: [{
                    name: "Spellbook",
                    destination: "/dnd/spellbook"
                }, {
                    name: "Calendar",
                    destination: "/dnd/calendar"
                }, {
                    name: "Irilic Names",
                    destination: "/dnd/irilic/names"
                }]
            }, {
                name: "Time",
                routes: [{
                    name: "Local",
                    destination: "/time/local"
                }]
            }]} />
            <Switch>
                <Route path="/dnd">
                    <Route path="/dnd/spellbook">
                        <SpellbookComponent />
                    </Route>
                    <Route path="/dnd/calendar">
                        <DndCalendar calendarDao={getCalendarDao()} />
                    </Route>
                    <Route path="/dnd/irilic/names">
                        <NamesComponent />
                    </Route>
                </Route>
                <Route path="/time/local/" render={LocalTimeComponent} exact />
                <Route path="/time/local/:epochTime" render={LocalTimeComponent} />
            </Switch>
        </Router>
    );
}

export default App;
