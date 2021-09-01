import React, { useMemo } from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory, History } from 'history';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';
import { LocalTimeComponent } from './time/local/LocalTimeComponent';
import { CalendarComponent, DndCalendar } from './dnd/calendar/CalendarComponent';
import { CalendarList } from './dnd/calendar/CalendarList';
import { NamesComponent } from './dnd/irilic/NamesComponent';
import { GenericStorageCalendarDao, InMemoryCalendarDao } from './dnd/calendar/CalendarDao';
import { NavComponent } from './nav';
import { OauthCallback } from './oauth';
import { QuestsComponent } from './runescape/quests/QuestsComponent'
import { CitadelComponent } from './runescape/citadel/CitadelComponent'
import * as R from 'ramda';
import { CalendarProvider } from './dnd/calendar/CalendarContext';
import { atagothCalendar, unnamedCalendar } from './dnd/calendar/calendar';

const getCalendarDao = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return new InMemoryCalendarDao();
    } else {
        return new GenericStorageCalendarDao();
    }
}

type RouteType = {
    category: string,
    name: string,
    path: string,
    render: () => React.ReactNode,
    exact?: boolean,
    showInNav?: boolean
}

const routes: RouteType[] = [{
    category: "DND",
    name: "Spellbook",
    path: "/dnd/spellbook",
    render: () => <SpellbookComponent />
}, {
    category: "DND",
    name: "Calendars",
    path: "/dnd/calendars",
    exact: true,
    render: () => (
        <CalendarList calendarDao={getCalendarDao()} />
    )
}, {
    category: "DND",
    name: "Calendar",
    path: "/dnd/calendar/:calendarName",
    showInNav: false,
    render: () => (
        <DndCalendar calendarDao={getCalendarDao()} />
    )
}, {
    category: "DND",
    name: "Irilic Names",
    path: "/dnd/irilic/names",
    render: () => <NamesComponent />
}, {
    category: "Time",
    name: "Local",
    path: "/time/local",
    render: () => <LocalTimeComponent />,
    exact: true
}, {
    category: "Time",
    name: "Local",
    path: "/time/local/:epochTime",
    render: () => <LocalTimeComponent />,
    showInNav: false
}, {
    category: "Oauth",
    name: "callback",
    path: "/oauth-callback",
    render: () => <OauthCallback />,
    showInNav: false
}, {
    category: "RS",
    name: "quests",
    path: "/rs/quests",
    render: () => <QuestsComponent />
}, {
    category: "RS",
    name: "citadel",
    path: "/rs/citadel",
    render: () => <CitadelComponent />
}]

const routesInNav = routes
    .filter(route => route.showInNav || route.showInNav === undefined)

const navRoutes = R.pipe(
    R.groupBy<RouteType>(route => route.category),
    R.mapObjIndexed((value, key) => {
        const routes = value.map(route => ({
            name: route.name,
            destination: route.path
        }))

        return {
            name: key,
            routes: routes
        }
    }),
    R.values
)(routesInNav)

interface AppProps {
    history: History
}
const App = ({ history }: AppProps) => {
    return (
        <Router history={history}>
            <NavComponent routes={navRoutes} />
            <Switch>
                {routes.map((route, index) =>
                    <Route key={index} path={route.path} exact={route.exact}>
                        {route.render()}
                    </Route>
                )}
            </Switch>
        </Router>
    );
}

export default App;
