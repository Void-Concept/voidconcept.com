import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { SpellbookComponent } from './dnd/spellbook/SpellbookComponent';

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <Route path="/dnd/spellbook">
                <SpellbookComponent />
            </Route>
        </Router>
    );
}

export default App;
