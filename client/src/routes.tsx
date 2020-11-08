import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Map from './pages/Map';
import Create from './pages/Create';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ Landing } />
                <Route path="/map" component={ Map } />
                <Route path="/orphanages/create" component={ Create } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;