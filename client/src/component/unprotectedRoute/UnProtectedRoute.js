import React from 'react'
import { Switch, Route, Link } from "react-router-dom";
import LandingPage from './landingpage/LandingPage';
import Login from './login/Login';
import SignUp from './signup/SignUp';

function UnProtectedRoute() {
    return (
        <Switch>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/login" component={Login}/>  
            <Route exact path="/" component={LandingPage}/>    
        </Switch>
    )
}

export default UnProtectedRoute
