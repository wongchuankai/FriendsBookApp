import { useState } from 'react';
import Grid from '@mui/material/Grid';
import LeftBar from './component/Navbar/LeftBar';
import NavBar from './component/Navbar/NavBar';
import Feed from './component/Feed/Feed'
import RightBar from './component/Navbar/RightBar';
import { Container } from '@mui/material'
import { styled } from '@mui/system'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UnProtectedRoute from './component/unprotectedRoute/UnProtectedRoute';

const RightBarComponent = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
}
}))

function App() {
  const [isLogin, setLogin] = useState(false)

  return (
    <div>
      <Router>
        <Switch>
          {
            !isLogin && <UnProtectedRoute/>
          }
        </Switch>
      </Router>
      {/* <NavBar/>
      <Grid container>
        <Grid item sm={2} xs={2}><LeftBar/></Grid>
        <Grid item sm={7} xs={10}><Feed/></Grid>
        <RightBarComponent item sm={3}><RightBar/></RightBarComponent>
      </Grid> */}
    </div>
  );
}

export default App;
