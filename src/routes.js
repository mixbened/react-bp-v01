import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home'
// import necessary Components here


export default (
    <Switch>
        <Route component={ Home } from exact path='/'/>
    </Switch>
)
