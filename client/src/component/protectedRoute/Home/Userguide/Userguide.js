import React, { useState, useEffect, useRef } from 'react'
import { Container, Grid, Alert, Snackbar, FormControl, Select, MenuItem, FormHelperText } from '@mui/material'
import { useHistory, Redirect } from 'react-router-dom'
import JWTLocalStorage from '../../../services/JWTLocalStorage/JWTLocalStorage'
import apis from '../../../services/apis/protectedApi'
import Post from '../Post/Post'
import {  makeStyles } from '@mui/styles'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    
}))

function Userguide() {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            To Do userguide
        </Container>
    )
}

export default Userguide
