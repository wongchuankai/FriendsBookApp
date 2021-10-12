import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles'
import { Home, People, Chat, Description } from "@mui/icons-material";

// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

// import Cloud from '@mui/icons-material/Cloud';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
        color: "white",
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0,
        overflow: 'hidden',
        [theme.breakpoints.up("sm")]: {
            backgroundColor: "#F5F5F5",
            color: "#555",
            border: "1px solid #ece7e7",
        },
    },
    tabs: {
        display:"flex",
        alignItems: 'center',
        // paddingLeft: theme.spacing(5),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(3),
            cursor: "Pointer"
        }
    },
    tabsIcon: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}))

function LeftBar() {
    const classes = useStyles()
    let history = useHistory()
    
    const goToHomeHandler = () => {
        history.push('/')
    }

    const goToFriendsListHandler = () => {
        history.push('/friends-list')
        
    }

    const goToChatRoomHandler = () => {
        history.push('/chatroom')
        
    }

    const goToUserGuideHandler = () => {
        history.push('/userguide')
        
    }
    return (
        <Box className={classes.container}>
            <nav aria-label="main left navbar">
                <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={goToHomeHandler}>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home" className={classes.tabsIcon}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={goToFriendsListHandler}>
                        <ListItemIcon>
                            <People/>
                        </ListItemIcon>
                        <ListItemText primary="Friends List" className={classes.tabsIcon}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={goToChatRoomHandler}>
                        <ListItemIcon>
                            <Chat/>
                        </ListItemIcon>
                        <ListItemText primary="Chat Room" className={classes.tabsIcon}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={goToUserGuideHandler}>
                        <ListItemIcon>
                            <Description/>
                        </ListItemIcon>
                        <ListItemText primary="User Guide" className={classes.tabsIcon}/>
                    </ListItemButton>
                </ListItem>
                </List>
            </nav>
            <Divider />
        </Box>
        // <Container className={classes.container} >

        //     {/* <div className={classes.tabs}>
        //         <Home/>
        //         <Typography className={classes.typography}>Home</Typography>
        //     </div>
        //     <div className={classes.tabs}>
        //         <Home/>
        //         <Typography className={classes.typography}>Home</Typography>
        //     </div>
        //     <div className={classes.tabs}>
        //         <Home/>
        //         <Typography className={classes.typography}>Chat Room</Typography>
        //     </div> */}
        // </Container>
    )
}

export default LeftBar
