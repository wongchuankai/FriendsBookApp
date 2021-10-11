import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import UnProtectedRoute from './component/unprotectedRoute/UnProtectedRoute';
import apis from './component/services/apis/protectedApi'
import JWTLocalStorage from './component/services/JWTLocalStorage/JWTLocalStorage';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';

function App() {
  const [ auth, setAuth] = useState(false)
  const [ isLoading, setLoading ] = useState(true)

  useEffect( () => {
    if(isLoading) {
      if(JWTLocalStorage.isTokenSet()) {
        setAuth(true)

        // apis.verification().then(() => {
        //   setAuth(true)
        // }).catch(error=> {
        //   setAuth(false)
        // })
      }
      setLoading(false)
    }
  }, [isLoading])

  return (
    <div>
      <Router>
        <Switch>
          {
            auth ? <ProtectedRoute setLoading={setLoading}/> : <UnProtectedRoute setLoading={setLoading}/>
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
