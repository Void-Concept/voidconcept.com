import React from 'react';
import './App.css';
import { Router, Route, Redirect, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/dnd/spellbook">
                    <SpellbookComponent />
                </Route>
                <Route>
                    <Redirect to="/dnd/spellbook" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
