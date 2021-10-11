import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Home from './Home/Home'
import JWTLocalStorage from '../services/JWTLocalStorage/JWTLocalStorage'

function ProtectedRoute({setLoading}) {
    return (
        <Switch>
            <Route exact path="/"> <Home content="Feed" setLoading={setLoading}/> </Route> 
            <Route exact path="/friends-list"> <Home content="Friendslist" setLoading={setLoading}/> </Route> 
            <Route path="/profile/:username"> <Home content="Profile" setLoading={setLoading}/> </Route> 
            <Redirect from="/login" to="/"/>
            <Redirect from="/signup" to="/"/>

        </Switch>
    )
}

export default ProtectedRoute
