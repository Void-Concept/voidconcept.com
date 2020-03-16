import React from 'react';
import './App.css';
import { Router, Route, Redirect, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';
import { LocalTimeComponent } from './time/local/LocalTimeComponent';
import { Calendar as DndCalendar } from './dnd/calendar/Calendar';
import { GenericStorageCalendarDao } from './dnd/calendar/CalendarDao';

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/dnd">
                    <Route path="/dnd/spellbook">
                        <SpellbookComponent />
                    </Route>
                    <Route path="/dnd/calendar">
                        <DndCalendar calendarDao={new GenericStorageCalendarDao()} />
                    </Route>
                </Route>
                <Route path="/time/local/" render={LocalTimeComponent} exact />
                <Route path="/time/local/:epochTime" render={LocalTimeComponent} />
                <Route>
                    <Redirect to="/dnd/spellbook" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
