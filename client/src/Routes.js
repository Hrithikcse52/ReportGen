import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
        </Switch>
    </Router>
);
export default Routes;
