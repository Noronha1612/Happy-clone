import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Map from './pages/Map';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Landing } />
                <Route path="/map" component={ Map } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;