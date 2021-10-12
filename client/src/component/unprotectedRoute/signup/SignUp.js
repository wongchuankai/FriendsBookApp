import React, { useState, useRef } from 'react'
import { Link, useHistory } from "react-router-dom";
import apis from '../../services/apis/unprotectedApi'
import { Container, Grid, Typography, Snackbar, Alert } from '@mui/material'
import {  makeStyles } from '@mui/styles'
import signup from '../../../images/static/signup.svg'
import { Form, Button, Row } from 'react-bootstrap'
import { Box } from '@mui/system'
import "./SignUp.css"

const useStyles = makeStyles((theme) => ({
    left: {
        display: 'flex',
        backgroundColor: '#1F41A9',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    right: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#264ECA',
            color: 'white',
            minHeight: '100vh'
        }
    },
}));

const LeftSide = () => {
    return <Container>
        <img src={signup} alt="Signup placeholder" className="staticimage"/>
    </Container>
}

const RightSide = () => {
    let history = useHistory()
    const [ openSnackBar, setOpenSnackBar ] = useState({
        open: false, message: "", severity: ""
    })
    const username = useRef("")
    const password = useRef("")

    const handleCloseSnackBar = () => {
        setOpenSnackBar({
            open: false, message: "", severity: ""
        })
    }
    
    const validateForm = () => {
        return true
    }
    const onSubmitFormHandler = (event) => {
        event.preventDefault()
        if(validateForm()) {
            const data = {
                username: username.current.value,
                password: password.current.value
            }
            apis.signup(data).then(res => {
                const data = res.data
                event.target.reset()
                setOpenSnackBar({
                    open: true, message: data.msg, severity: "success"
                })
            }).catch(err => {
                const data = err.response.data
                event.target.reset()
                console.log(data)
                setOpenSnackBar({
                    open: true, message: data.msg, severity: "error"
                })
            })
        }
    }
    
    const goToLoginPage = () => {
        history.push('/login')
    }
    return <Container>
        <Box component={Link} to={'/login'} sx={{display:'flex', justifyContent: 'end', paddingBottom: '100px', textDecoration: 'none'}}>
            Already Sign Up? Click here to login!
        </Box>
        <Box sx={{paddingBottom: '50px', textAlign: 'center'}}>
            <Typography variant="h4" gutterBottom>
                Welcome to FriendsBook!
            </Typography>
            <Typography variant='h6'>
                Sign up to FriendsBook
            </Typography>
        </Box>

        <Box >
            <Form className="form" onSubmit={(event) => onSubmitFormHandler(event)}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" ref={username}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={password}/>
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Row className="mb-3" style={{width: '100px', marginLeft:'auto', marginRight: 'auto'}}>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Row>
                <Row style={{width: '100px', marginLeft:'auto', marginRight: 'auto', paddingBottom: "50px"}}>
                    <Button variant="secondary" onClick={goToLoginPage}>
                        Login
                    </Button>
                </Row>
            </Form>
        </Box>
        <Snackbar anchorOrigin={{"vertical":'bottom', "horizontal": 'center'}} open={openSnackBar.open} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity={openSnackBar.severity} sx={{ width: '100%' }}>
                {openSnackBar.message}
            </Alert>
        </Snackbar>
    </Container>
}
function SignUp() {
    const classes = useStyles()

    return (
            <Grid container>
                <Grid item sm={7} className={classes.left}><LeftSide/></Grid>
                <Grid item sm={5} xs={12} className={classes.right}><RightSide/></Grid>
            </Grid>
        // </ThemeProvider>
    )
}

export default SignUp
