import React, { useState, useEffect, useRef } from 'react'
import { Container, Grid, Alert, Snackbar, Typography } from '@mui/material'
import { useHistory, Redirect } from 'react-router-dom'
import JWTLocalStorage from '../../../services/JWTLocalStorage/JWTLocalStorage'
import apis from '../../../services/apis/protectedApi'
import Post from '../Post/Post'
import {  makeStyles } from '@mui/styles'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import FriendsRequest from './FriendsRequest'
import UnknownFriend from './UnknownFriend'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    Typography: {
        paddingBottom: theme.spacing(2)

    },
    TypographyBold: {
        paddingBottom: theme.spacing(2),
        fontWeight: 'bold'
    },
    TypographyItalic: {
        paddingBottom: theme.spacing(2),
        fontStyle: 'italic'
    },
}))
function FriendsList() {
    const classes = useStyles()
    const [ loadFriendsRequest, setLoadFriendsRequest ] = useState(true)
    const [ loadPeopleYouMayKnow, setLoadPeopleYouMayKnow ] = useState(true)
    const [ friendsRequestList, setFriendsRequestList ] = useState([])
    const [ peopleYouMayKnow, setPeopleYouMayKnow ] = useState([])

    useEffect(() => {
        if(loadFriendsRequest) {
            const data = {
                userid: JWTLocalStorage.getParsedUserData().userid
            }
            apis.getFriendRequestToUser(data).then(res=> {
                console.log(res.data)
                setFriendsRequestList(res.data.results)
            }).catch(error => {
                console.log(error.response)
            })
            setLoadFriendsRequest(false)
        }
    }, [loadFriendsRequest])

    useEffect(() => {
        if(loadPeopleYouMayKnow) {
            const data = {
                userid: JWTLocalStorage.getParsedUserData().userid
            }
            apis.getPeopleYouMayKnow(data).then(res=> {
                console.log(res.data)
                setPeopleYouMayKnow(res.data.results)
            }).catch(error => {
                console.log(error.response)
            })
            setLoadPeopleYouMayKnow(false)
        }
    }, [loadPeopleYouMayKnow])
    return (
        <Container className={classes.container}>
            <Typography variant="h3" className={classes.TypographyBold}>Friends</Typography>
            <Typography variant="h6" className={classes.Typography}>Friends request</Typography>
            <Row xs="auto">
                {
                    friendsRequestList.length > 0 && friendsRequestList.map(user => {
                        return <FriendsRequest key={user.userid} username={user.username} friendUserID={user.userid} setLoadFriendsList={setLoadFriendsRequest}/>
                    })
                }
                {
                    friendsRequestList.length === 0 && 
                    <Typography variant="body1" className={classes.TypographyItalic}> You do not have any incoming friend request.</Typography>
                }

            </Row>
            <Typography variant="h6" className={classes.Typography}>People you may know</Typography>
            <Row xs="auto">
            {
                    peopleYouMayKnow.length > 0 && peopleYouMayKnow.map(user => {
                        return <UnknownFriend key={user.userid} username={user.username} friendUserID={user.userid} setLoadFriendsList={setLoadPeopleYouMayKnow}/>
                    })
                }
                {
                    peopleYouMayKnow.length === 0 && 
                    <Typography variant="body1" className={classes.TypographyItalic}> There isn't any friend you might know.</Typography>
                }                   

            </Row>
        </Container>
    )
}

export default FriendsList
