import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import {  makeStyles } from '@mui/styles'
import login from '../../../images/static/login.svg'
import "./Login.css"
import { Form, Button, Row } from 'react-bootstrap'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
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

const RightSide = () => {
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
            <Form className="form">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                    <Row style={{width: '100px', marginLeft:'auto', marginRight: 'auto'}}>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Row>
                {/* </Row> */}
            </Form>
        </Box>
    </Container>
}
function Login() {
    const classes = useStyles()

    return (
            <Grid container>
                <Grid item sm={7} className={classes.left}><LeftSide/></Grid>
                <Grid item sm={5} xs={12} className={classes.right}><RightSide/></Grid>
            </Grid>
        // </ThemeProvider>
    )
}

export default Login
