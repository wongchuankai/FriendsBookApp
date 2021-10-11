import React, { useState, useEffect, useRef } from 'react'
import { Container, Grid, Alert, Snackbar, Typography } from '@mui/material'
import { useHistory, Redirect } from 'react-router-dom'
import JWTLocalStorage from '../../../services/JWTLocalStorage/JWTLocalStorage'
import apis from '../../../services/apis/protectedApi'
import Post from '../Post/Post'
import {  makeStyles } from '@mui/styles'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import defaultprofilepic from '../../../../images/static/default_profile_pic.png'
import defaultprofilepic2 from '../../../../images/static/profilepic.jpg'

function FriendsRequest({username, friendUserID, setLoadFriendsList}) {
    let history = useHistory()
    
    const acceptFriendHandler = () => {
        const data = {
            requestSender: friendUserID,
            requestReceiver: JWTLocalStorage.getParsedUserData().userid
        }
        apis.acceptFriendRequest(data).then(res => {
            setLoadFriendsList(true)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const deleteFriendHandler = () => {
        const data = {
            requestSender: friendUserID,
            requestReceiver: JWTLocalStorage.getParsedUserData().userid
        }
        apis.rejectFriendRequest(data).then(res => {
            setLoadFriendsList(true)
        }).catch(error => {
            console.log(error.response)
        })
    }

    const goToProfile = () => {
        history.push(`/profile/${username}`)
    }
    
    return (
        <Card style={{ width: '15rem', marginRight: "5px", marginBottom: "10px", cursor:"pointer" }} onClick={goToProfile}>
            <Card.Img variant="top" src={defaultprofilepic} style={{height: "150px", maxWidth: "200px", marginLeft: "auto", marginRight: "auto"}}/>
            <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{username}</Card.Title>
                <Row className="mb-2" style={{paddingLeft:"30%", paddingRight:"30%"}}>
                    <Button onClick={acceptFriendHandler}>Accept</Button>
                </Row>
                <Row className="mb-2" style={{paddingLeft:"30%", paddingRight:"30%"}}>
                    <Button variant="danger" onClick={deleteFriendHandler}>Delete</Button>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default FriendsRequest
