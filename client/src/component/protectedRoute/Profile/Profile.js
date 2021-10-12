import React, { useState, useEffect, useRef } from 'react'
import { Container, Grid, Alert, Snackbar, Typography, Avatar, Box, Tabs, Tab } from '@mui/material'
import { useHistory, Redirect, useParams } from 'react-router-dom'
import JWTLocalStorage from '../../services/JWTLocalStorage/JWTLocalStorage'
import apis from '../../services/apis/protectedApi'
import {  makeStyles } from '@mui/styles'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import defaultProfilePic from '../../../images/static/default_profile_pic.png'
import Post from '../Home/Post/Post'
import Friend from './Friend'

const styles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(15)
    },
    profilepic: {
        width: '12rem',
        height: "150px",
    },
    profilepicwrapper: {
        paddingLeft: "10px",
        paddingBottom: "10px"
    },
    title: {
        paddingLeft: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0'
        }
    },
    padBottom: {
        paddingBottom:"10px"
    }
}))

function Profile() {
    const classes = styles()
    let history = useHistory()
    const [ tabvalue, setTabValue ] = useState(0)
    const [ posts, setPosts ] = useState([])
    const [ loadPosts, setLoadPosts ] = useState(false)
    const [ friendsList, setFriendsList ] = useState([])
    const [ loadFriends, setLoadFriends ] = useState(false)
    const [ loadProfile, setLoadProfile ] = useState(true)
    const [ userStatus, setUserStatus ] = useState("")
    const { username } = useParams();
    const [ isValidUser, setValidUser ] = useState(false)
    const [ profileUserID, setProfileUserID ] = useState()

    useEffect(()=> {
        if(loadProfile) {
            const data = {
                username: username
            }
            apis.getUserIDbyUsername(data).then( res => {
                const result = res.data.results
                if(result.length === 0) {
                    setValidUser(false)
                } else {
                    setValidUser(true)
                    const data = {
                        userid: JWTLocalStorage.getParsedUserData().userid,
                        userid1: JWTLocalStorage.getParsedUserData().userid,
                        userid2: result[0].userid
                    }
                    setProfileUserID(result[0].userid)
                    if(data.userid1 !== data.userid2) {
                        apis.getStatusBetween2Users(data).then(res=> {
                            if(res.data.results.length === 0) {
                                setUserStatus("notfriend")
                            } else{
                                setUserStatus(res.data.results[0].relationshipstatus)
                            }
                        }).catch(res => {
                            console.log(res.response)
                        })
                    } 
                    setTabValue(0)
                    setLoadPosts(true)
                    setLoadFriends(true)
                    setLoadProfile(false)
                }
            }).catch(error => setValidUser(false))
        }
    }, [loadProfile])

    useEffect(()=> {
        if(loadPosts) {
            const data = {
                myusername: JWTLocalStorage.getParsedUserData().username,
                visitingusername: username,
                myuserid: JWTLocalStorage.getParsedUserData().userid
            }
            apis.retrieveProfilePostsUser(data).then(res=> {
                setPosts(res.data.results)
            }).catch(error=> {
                console.log(error.response)
            })

            setLoadPosts(false)
        }
    }, [loadPosts])

    useEffect(()=> {
        if(loadFriends) {
            const data = {
                username: username
            }
            apis.findUserFriendsByUsername(data).then(res=> {
                setFriendsList(res.data.results)
            }).catch(error=> {
                console.log(error.response)
            })

            setLoadFriends(false)
        }
    }, [loadFriends])

    const tabOnChangeHandler = (event, newVal) => {
        setTabValue(newVal)
    }

    const sendFriendRequestHandler = () => {
        const data = {
            requestSender: JWTLocalStorage.getParsedUserData().userid,
            requestReceiver: profileUserID
        }
        apis.sendFriendRequest(data).then(res => {
            setLoadProfile(true)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const acceptFriendHandler = () => {
        const data = {
            requestSender: profileUserID,
            requestReceiver: JWTLocalStorage.getParsedUserData().userid
        }
        apis.acceptFriendRequest(data).then(res => {
            setLoadProfile(true)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const deleteFriendHandler = () => {
        const data = {
            requestSender: profileUserID,
            requestReceiver: JWTLocalStorage.getParsedUserData().userid
        }
        apis.rejectFriendRequest(data).then(res => {
            setLoadProfile(true)
        }).catch(error => {
            console.log(error.response)
        })
    }

    if(!isValidUser) {
        return (
            <Container fluid className={classes.container}>
                User profile not found
            </Container>
        )
    }
    return (
        <Container fluid className={classes.container}>
            <Container sx={{display: "flex", alignItems: 'center', paddingBottom: "25px"}}>
                <Grid container>
                    <Grid className={classes.profilepicwrapper}>
                        <Card>
                            <Card.Img variant="top" src={defaultProfilePic} className={classes.profilepic}/>
                        </Card>    
                    </Grid>
                    <Grid>
                        <div className={classes.title}>
                            <Typography variant="h5" className={classes.padBottom}>{username}</Typography>
                            {
                                userStatus==="receive" && (
                                    <Container style={{border:"1px solid black", borderRadius: "10px"}}>
                                        <Typography variant="body1">{username} has sent you a friend request</Typography>
                                        <Container className={classes.padBottom} style={{display:"flex", justifyContent:"center"}}>
                                            <Button onClick={acceptFriendHandler}>Accept</Button>
                                        </Container>
                                        <Container className={classes.padBottom} style={{display:"flex", justifyContent:"center"}}>
                                            <Button variant="danger" onClick={deleteFriendHandler}>Delete</Button>
                                        </Container>
                                    </Container>
                                )
                            }
                            {
                                userStatus==="send" && (
                                    <Typography variant="body1">You have sent a friend request.</Typography>
                                )
                            }
                            {
                                userStatus==="notfriend" && (
                                    <Button onClick={sendFriendRequestHandler}>Add friend</Button>
                                )
                            }
                            {
                                userStatus==="friend" && (
                                    <Typography variant="body1">Your friend</Typography>

                                )
                            }
                            {
                                userStatus==="rejected" && (
                                    <Typography variant="body1">Friend request rejected.</Typography>

                                )
                            }
                        </div>

                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "20px" }}>
                <Tabs value={tabvalue} onChange={tabOnChangeHandler} aria-label="basic tabs example">
                    <Tab label="Posts"/>
                    <Tab label={`Friends (${friendsList.length})`}/>
                </Tabs>
            </Box>
            {
                tabvalue === 0 && 
                <Container sx={{paddingBottom: "50px"}}>
                    {posts.length > 0 && posts.map((post) => {
                    return <Post key={post.postid} postid={post.postid} postusername={post.username} postText={post.post_text} likeCount={post.like_count} isUserLike={post.isuserlike} createdAt={post.created_at} setLoadFeed={setLoadProfile}/>
                })}
                </Container>
            }
            {
                tabvalue === 1 && 
                <Container sx={{paddingBottom: "50px"}}>
                    <Row xs="auto">
                        {
                            friendsList.length > 0 && friendsList.map(user => {
                                return <Friend key={user.userid} username={user.username} friendUserID={user.userid} setLoadFriendsList={setLoadProfile}/>
                            })
                        }
                    </Row>
                </Container>
            }
        </Container>
    )
}

export default Profile
