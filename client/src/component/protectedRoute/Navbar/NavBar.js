import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar } from '@mui/material'
import { Cancel, Mail, Notifications, ArrowDropDownCircleRounded, Search, Logout, AccountCircle, Settings, WindowSharp } from "@mui/icons-material";
import { Dropdown } from 'react-bootstrap'
import { useHistory, Link, Redirect } from 'react-router-dom'
import {  makeStyles } from '@mui/styles'
import { alpha } from '@mui/system'
import JWTLocalStorage from '../../services/JWTLocalStorage/JWTLocalStorage';
import apis from '../../services/apis/protectedApi';
import defaultProfilePic from '../../../images/static/default_profile_pic.png'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
  searchRightSide: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginRight:theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  },
  searchSmaller : {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    // width: "50%",
    [theme.breakpoints.up("sm")]: {
        display: "none"
      },
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      // display: "flex",
      width: "70%",
    },
  },
  searchIconWrapper : {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //   paddingRight: `calc(1em + ${theme.spacing(5)})`,
      transition: theme.transitions.create('width'),
    //   width: '100%',
      [theme.breakpoints.up('sm')]: {
        // width: '12ch',
        // '&:focus': {
        //   width: '20ch',
        // },
      },
    }
  },
  icons: {
    alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open  ? "none" : "flex"),
          },
  }, 
  searchIcon: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        display: "none !important"
    }
  },
  cancelBtn: {
    padding: "5px",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
  },
  badge: {
    marginRight: theme.spacing(2),
    cursor: "pointer"
  },
  avatar: {
    marginRight: theme.spacing(1),
    cursor: "pointer"
  },

}));

    function NavBar({setLoading}) {
        let history = useHistory()
        const [ open, setOpen ] = useState(false)
        const [ searchValue, setSearchValue ] = useState("")
        const [ countFriendRequest, setCountFriendRequest ] = useState(0)
        const classes = useStyles({open})

        useEffect(()=> {
          const data = {
            userid: JWTLocalStorage.getParsedUserData().userid
          }
          apis.getFriendRequestToUser(data).then(res=> {
            setCountFriendRequest(res.data.results.length)
          }).catch(error => {

          })
        }, [])

        const handleClick = () => {
            setOpen(true);
        }

        const onSearchValChange = (event) => {
            setSearchValue(event.target.value)
        }
        const onSearchEnter = (event) => {
          if(event.key === 'Enter'){
            history.push(`/profile/${searchValue}`)
            window.location.reload()
            setSearchValue("")
            // return <Redirect to={`/profile/${searchValue}`}/>
            // setLoading(true)
          }
        }
        const LogoutHandler = () => {
            JWTLocalStorage.clearToken()
            history.push('/')
            window.location.reload()
        }
        const goToFriendList = () => {
          history.push(`/friends-list`)
        }
        const goToHome = () => {
          history.push(`/`)
        }
        return (
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" style={{marginRight: "10px", cursor: "pointer"}} onClick={goToHome}>
                        FriendsBook
                    </Typography>
                    <div open={open} className={classes.searchSmaller}>
                        <div className={classes.searchIconWrapper}>
                            <Search />
                        </div>
                        <InputBase className={classes.inputBase}
                            placeholder="Search…" value={searchValue} onChange={event => onSearchValChange(event)}
                            onKeyPress={onSearchEnter}
                        />
                        <Cancel className={classes.cancelBtn} onClick={()=>setOpen(false)}/>
                    </div>
                    <div className={classes.icons} open={open}>
                        <div className={classes.searchRightSide}>
                        <div className={classes.searchIconWrapper}>
                            <Search />
                        </div>
                        <InputBase className={classes.inputBase}
                            placeholder="Search…" value={searchValue} onChange={event => onSearchValChange(event)}
                            onKeyPress={onSearchEnter}
                        />
                        </div>
                        <Search className={classes.searchIcon} open={open} onClick={handleClick}/>
                        <Badge className={classes.badge} badgeContent={0} color="error">
                            <Mail/>
                        </Badge>
                        <Badge className={classes.badge} badgeContent={countFriendRequest} color="error">
                            <Notifications onClick={goToFriendList}/>
                        </Badge>
                        <a href={`/profile/${JWTLocalStorage.getParsedUserData().username}`}>
                          <Avatar className={classes.avatar}
                            alt="Remy Sharp"
                            // onClick={goToProfile}
                            src={defaultProfilePic}
                          />
                        </a>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor: "transparent"}}>
                                <ArrowDropDownCircleRounded/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href={`/profile/${JWTLocalStorage.getParsedUserData().username}`}><AccountCircle/> Profile</Dropdown.Item>
                                <Dropdown.Item href="/settings"><Settings/> Settings</Dropdown.Item>
                                <Dropdown.Item onClick={LogoutHandler}><Logout/> Logout </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <ArrowDropDownCircleRounded onClick={LogoutHandler}/> */}
                    </div>
                </Toolbar>
            </AppBar>
        )
}

export default NavBar
