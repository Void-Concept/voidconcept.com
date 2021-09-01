import React from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';
import { LocalTimeComponent } from './time/local/LocalTimeComponent';
import { CalendarComponent as DndCalendar } from './dnd/calendar/CalendarComponent';
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

const routes = [{
    category: "DND",
    name: "Spellbook",
    path: "/dnd/spellbook",
    render: () => <SpellbookComponent />
}, {
    category: "DND",
    name: "Calendar",
    path: "/dnd/calendar",
    exact: true,
    render: () => (
        <Redirect to="/dnd/calendar/atagoth" />
    )
}, {
    category: "DND",
    name: "Atagoth Calendar",
    path: "/dnd/calendar/atagoth",
    showInNav: false,
    render: () => (
        <CalendarProvider value={atagothCalendar}>
            <DndCalendar calendarDao={getCalendarDao()} />
        </CalendarProvider>
    )
}, {
    category: "DND",
    name: "Campaign 2 Calendar",
    path: "/dnd/calendar/campaign2",
    showInNav: false,
    render: () => (
        <CalendarProvider value={unnamedCalendar}>
            <DndCalendar calendarDao={getCalendarDao()} />
        </CalendarProvider>
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

const App = () => {
    return (
        <Router history={createBrowserHistory()}>
            <NavComponent routes={navRoutes} />
            <Switch>
                {routes.map((route, index) =>
                    <Route key={index} path={route.path} exact={route.exact}>
                        {route.render()}
                        {console.log("Rendering", route.path)}
                    </Route>
                )}
            </Switch>
        </Router>
    );
}

export default App;
