import React from 'react'
import Grid from '@mui/material/Grid';
import NavBar from '../Navbar/NavBar'
import LeftBar from '../Navbar/LeftBar'
import RightBar from '../Navbar/RightBar'
import Feed from '../Home/Feed/Feed'
import FriendsList from './FriendsList/FriendsList';
import { makeStyles } from '@mui/styles'
import Profile from '../Profile/Profile';

const useStyles = makeStyles((theme) => ({
    rightGrid: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}))

function Home({setLoading, content}) {
    const classes = useStyles()
    return (
        <div>
        <NavBar setLoading={setLoading}/>
        <Grid container>
            <Grid item sm={3} xs={2}><LeftBar setLoading={setLoading}/></Grid>
            {
                content === "Feed" && <Grid item sm={6} xs={10}><Feed setLoading={setLoading}/></Grid>
            }
            {
                content === "Friendslist" && <Grid item sm={6} xs={10}><FriendsList setLoading={setLoading}/></Grid>
            }
            {
                content === "Profile" && <Grid item sm={6} xs={10}><Profile setLoading={setLoading}/></Grid>
            }
            <Grid item sm={3} className={classes.rightGrid}><RightBar/></Grid>
    </Grid> 
        </div>
    )
}

export default Home
