import React, { useState, useEffect, useRef } from 'react'
import {  makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import defaultprofilepic from '../../../images/static/default_profile_pic.png'
import defaultprofilepic2 from '../../../images/static/profilepic.jpg'

function Friend({username, friendUserID, setLoadFriendsList}) {
    let history = useHistory()
    const onClickFriend = () => {
        history.push('/profile/' + username)
        setLoadFriendsList(true)
    }
    return (
        <Card style={{ width: '15rem', marginRight: "5px", marginBottom: "10px", cursor: "pointer"}} onClick={onClickFriend}>
            <Card.Img variant="top" src={defaultprofilepic} style={{height: "150px", maxWidth: "200px", marginLeft: "auto", marginRight: "auto"}}/>
            <Card.Body>
                <Card.Title style={{textAlign:"center"}}>{username}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default Friend
