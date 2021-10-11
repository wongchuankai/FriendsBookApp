import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from './landingpage/LandingPage';
import Login from './login/Login';
import SignUp from './signup/SignUp';

function UnProtectedRoute({setLoading}) {
    return (
        <Switch>
            <Route exact path="/signup" > <SignUp setLoading={setLoading}/> </Route>
            <Route exact path="/login" > <Login setLoading={setLoading}/> </Route>
            <Route exact path="/" > <LandingPage setLoading={setLoading}/> </Route>
            {/* <Route exact path="/signup" render={() => !localStorage.getItem("userToken") ? <SignUp setLoading={setLoading}/> : <Redirect to="/"/>}/>
            <Route exact path="/login" render={() => !localStorage.getItem("userToken") ? <Login setLoading={setLoading}/> : <Redirect to="/"/>}/> */}
            {/* <Route exact path="/" render={() => !localStorage.getItem("userToken") ? <LandingPage setLoading={setLoading}/> : <Redirect to="/"/>}/> */}
        </Switch>
    )
}

export default UnProtectedRoute
