import { History } from 'history';
import * as R from 'ramda';
import React, { useState } from 'react';
import { Route, Router, Switch } from 'react-router';
import './App.css';
import { DndCalendar } from './dnd/calendar/CalendarComponent';
import { GenericStorageCalendarDao, InMemoryCalendarDao } from './dnd/calendar/CalendarDao';
import { CalendarList } from './dnd/calendar/CalendarList';
import { DndCalendarEvent } from './dnd/calendar/event';
import { NamesComponent } from './dnd/irilic/NamesComponent';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';
import { NavComponent } from './nav';
import { NotesDaoImpl } from './notes/NotesDao';
import { NotesEditor } from './notes/NotesEditor';
import { NotesList } from './notes/NotesList';
import { OauthCallback } from './oauth';
import { isSuperUser, safeGetUserInfo, UserInfo } from './oauth/oauthClient';
import { CitadelComponent } from './runescape/citadel/CitadelComponent';
import { QuestsComponent } from './runescape/quests/QuestsComponent';
import { LocalTimeComponent } from './time/local/LocalTimeComponent';
import { Goals } from './private/goals';
import { useAsyncEffect } from './hooks';

const getCalendarDao = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return new InMemoryCalendarDao();
    } else {
        return new GenericStorageCalendarDao();
    }
}

const notesDao = new NotesDaoImpl()

type RouteType = {
    category: string,
    name: string,
    path: string,
    render: () => React.ReactNode,
    exact?: boolean,
    showInNav?: boolean,
    private?: boolean,
    requireSuperUser?: boolean,
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
    exact: true,
    render: () => (
        <DndCalendar calendarDao={getCalendarDao()} />
    )
}, {
    category: "DND",
    name: "Calendar Event",
    path: "/dnd/calendar/:calendarName/:date",
    showInNav: false,
    render: () => (
        <DndCalendarEvent calendarDao={getCalendarDao()} />
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
}, {
    category: "Notes",
    name: "notes",
    path: "/notes",
    exact: true,
    render: () => <NotesList notesDao={notesDao} />
}, {
    category: "Notes",
    name: "notes",
    path: "/notes/:id",
    showInNav: false,
    render: () => <NotesEditor notesDao={notesDao} />
}, {
    category: "Private",
    name: "Goals",
    path: "/private/goals",
    private: true,
    requireSuperUser: true,
    render: () => <Goals />
}]

const navRoutesPipe = R.pipe(
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
)

interface AppProps {
    history: History
}
const App = ({ history }: AppProps) => {
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
    useAsyncEffect(async () => {
        setUserInfo(await safeGetUserInfo())
    }, [])

    const nonHiddenRoutes = routes
        .filter((route) => {
            if (!!userInfo) {
                if (route.requireSuperUser && !isSuperUser(userInfo)) {
                    return false
                }
                return true
            } else {
                return !route.private
            }
        })

    const routesInNav = nonHiddenRoutes
        .filter(route => route.showInNav || route.showInNav === undefined)
    const navRoutes = navRoutesPipe(routesInNav)

    return (
        <Router history={history}>
            <NavComponent routes={navRoutes} />
            <Switch>
                {routes
                .map((route, index) =>
                    <Route key={index} path={route.path} exact={route.exact}>
                        {route.render()}
                    </Route>
                )}
            </Switch>
        </Router>
    );
}

export default App;
