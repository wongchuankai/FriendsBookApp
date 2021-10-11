import React, { useRef, useState } from 'react'
import { Container, Grid, Typography, Snackbar, Alert } from '@mui/material'
import apis from '../../services/apis/unprotectedApi'
import {  makeStyles } from '@mui/styles'
import login from '../../../images/static/login.svg'
import "./Login.css"
import { Form, Button, Row } from 'react-bootstrap'
import { Box } from '@mui/system'
import { Link, useHistory } from 'react-router-dom'
import JWTLocalStorage from '../../services/JWTLocalStorage/JWTLocalStorage'

const useStyles = makeStyles((theme) => ({
    left: {
        display: 'flex',
        backgroundColor: '#1F41A9',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    right: {
        display: 'flex',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#264ECA',
            color: 'white',
            height: '100vh'
        }
    },
}));

const LeftSide = () => {
    return <Container>
        <img src={login} alt="Login placeholder" className="staticimage"/>
    </Container>
}

const RightSide = ({setOpenSnackBar, setLoading}) => {
    let history = useHistory()
    const username = useRef("")
    const password = useRef("")

    const validateForm = () => {
        return (username.current.value !== "" && password.current.value !== "" )
        // return true
    }
    const onSubmitFormHandler = (event) => {
        event.preventDefault()
        if(validateForm()) {
            const data = {
                username: username.current.value,
                password: password.current.value
            }
            apis.login(data).then(res => {
                const data = res.data
                event.target.reset()
                setOpenSnackBar({
                    open: true, message: data.msg, severity: "success"
                })
                JWTLocalStorage.setToken(data.token)
                history.push('/')
                setLoading(true)
            }).catch(err => {
                const data = err.response.data
                console.log(data)
                event.target.reset()
                setOpenSnackBar({
                    open: true, message: data.msg, severity: "error"
                })
            })
        } else {
            setOpenSnackBar({
                open: true, message: "Username or password cannot be blank.", severity: "error"
            })
        }
    }

    const goToSignUp = () => {
        history.push('/signup')
    }

    return <Container>
        <Box component={Link} to={'/signup'} sx={{display:'flex', justifyContent: 'end', paddingBottom: '100px', textDecoration: 'none'}}>
            Haven't sign up? Click here to Sign Up!
        </Box>
        <Box sx={{paddingBottom: '50px', textAlign: 'center'}}>
            <Typography variant="h4" gutterBottom>
                Welcome to FriendsBook!
            </Typography>
            <Typography variant='h6'>
                Login to FriendsBook
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
                            Login
                        </Button>
                    </Row>
                    <Row style={{width: '100px', marginLeft:'auto', marginRight: 'auto'}}>
                        <Button variant="secondary" onClick={goToSignUp}>
                            Sign Up
                        </Button>
                    </Row>
                {/* </Row> */}
            </Form>
        </Box>
    </Container>
}
function Login({setLoading}) {
    const classes = useStyles()
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false, message: "", severity: ""
    });
    const handleCloseSnackBar = () => {
        setOpenSnackBar({
            open: false, message: "", severity: ""
        })
    }

    return (
            <Grid container>
                <Grid item sm={7} className={classes.left}><LeftSide/></Grid>
                <Grid item sm={5} xs={12} className={classes.right}><RightSide setOpenSnackBar={setOpenSnackBar} setLoading={setLoading}/></Grid>
                <Snackbar anchorOrigin={{"vertical":'bottom', "horizontal": 'center'}} open={openSnackBar.open} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity={openSnackBar.severity} sx={{ width: '100%' }}>
                        {openSnackBar.message}
                    </Alert>
                </Snackbar>
            </Grid>
        // </ThemeProvider>
    )
}

export default Login
