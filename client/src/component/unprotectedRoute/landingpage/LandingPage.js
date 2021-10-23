import React from 'react'
import {  makeStyles } from '@mui/styles'
import { Container, Nav, Navbar, Image, Button, Carousel, Row, Col } from 'react-bootstrap'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { width } from '@mui/system'
import landingpage1 from '../../../images/static/landingpage1.png'
import landingpage2 from '../../../images/static/landingpage2.jpg'
import landingpage3 from '../../../images/static/landingpage3.jpg'
import newsfeed from '../../../images/static/newsfeed.png'
import like from '../../../images/static/like.png'
import speechbubble from '../../../images/static/speech-bubble.png'
import { useHistory } from 'react-router'
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    padbottom: {
        paddingBottom: theme.spacing(2)
    },
    leftsection: {
        borderRight: "1px solid black",
        minHeight: "650px"
    },
    footer: {
        backgroundColor: "#538AB1",
        width:"100%",
        minHeight: "150px"
    },
    carousel: {
        [theme.breakpoints.down('md')]: {
            // marginLeft: "-35px", 
            // marginTop: "-50px", 
            height: "500px",

        }
    },
    imagebutton: {
        // position: "absolute", 
        // left:"50%", 
        // marginLeft: "-70px", 
        // marginTop: "-150px", 
        fontSize: "20px",
        [theme.breakpoints.down('md')]: {
            // marginLeft: "-35px", 
            // marginTop: "-50px", 
            fontSize: "11px",

        }
    },
    featureImage: {
        marginTop:"20px",
        width: "100px",
        height: "100px"
    },
    feature23: {
        [theme.breakpoints.down('md')]: {
            // marginLeft: "-35px", 
            // marginTop: "-50px", 
            paddingTop: theme.spacing(4)

        }
    }
    
}))

function LandingPage() {
    let history = useHistory()
    const classes = useStyles()

    const goToSignUp = () => {
        history.push('/signup')
    }
    const goToLogin = () => {
        history.push('/login')
    }
    const goToFeatures = () => {
        history.push('/features')
    }
    return (
        <div>
            <Navbar collapseOnSelect sticky="top" expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">FriendsBook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/features">Features</Nav.Link>
                            <Nav.Link href="/about-me">About Me</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                {/* <div style={{position: "relative"}}> 
                    <img src={landingpage1} style={{width:"100vw"}}/>
                    <Button className={classes.imagebutton} onClick={goToSignUp}>Register now!</Button>
                </div> */}

                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={landingpage1}
                        alt="First slide"
                        style={{opacity: "0.95", maxHeight: "600px"}}
                        />
                        <Carousel.Caption>
                        <h3>Connect with your friends!</h3>
                        <p>The most valuable gift you can receive is an honest friend.</p>
                        <Button className={classes.imagebutton} onClick={goToSignUp}>Register now!</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={landingpage2}
                        alt="Second slide"
                        style={{opacity: "0.95", maxHeight: "600px"}}
                        />
                        <Carousel.Caption>
                        <h3>Connect with your friends!</h3>
                        <p>The most valuable gift you can receive is an honest friend.</p>
                        <Button className={classes.imagebutton} onClick={goToLogin}>Login now!</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={landingpage3}
                        alt="Third slide"
                        style={{opacity: "0.95", maxHeight: "600px"}}
                        />

                        <Carousel.Caption>
                        <h3>Connect with your friends!</h3>
                        <p>The most valuable gift you can receive is an honest friend.</p>
                        <Button className={classes.imagebutton} onClick={goToFeatures}>Features</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            <div style={{ marginTop: "100px"}}>
                <Container >
                    <Row style={{textAlign:"center"}}>
                        <Typography variant="h5">Key Features</Typography>
                    </Row>
                    <Row style={{marginTop:"30px"}}>
                        <Col sm style={{display:"flex", justifyContent:"center", textAlign:"center"}}>
                            <Card sx={{ maxWidth: 300, }}>
                                <img
                                    className={classes.featureImage}
                                    src={newsfeed}
                                    alt="News Feed"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    News Feed
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Get latest updates about your friends via their posts!
                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        </Col>
                        <Col sm className={classes.feature23} style={{display:"flex", justifyContent:"center", textAlign:"center"}}>
                            <Card sx={{ maxWidth: 300 }}>
                                <img
                                    className={classes.featureImage}
                                    src={like}
                                    alt="News Feed"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Like Post
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Let your friends know you like their post by liking it!
                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        </Col>
                        <Col sm className={classes.feature23} style={{display:"flex", justifyContent:"center", textAlign:"center"}}>
                            <Card sx={{ maxWidth: 300 }}>
                                <img
                                    className={classes.featureImage}
                                    src={speechbubble}
                                    alt="News Feed"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Chat Room
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Chat with your friends via chatroom in real-time!
                                    </Typography>
                                </CardContent>
                                
                            </Card>
                        </Col>
                    </Row>
                </Container>
            <br />
      <br />
      <br />
      <br />
            </div>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>Sandwich: Keep Scrolling!</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>More Sandwich: Yum!</div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>You can scroll and see me!</div> */}
            </div>
            <div className={classes.footer}>
s
            </div>
        </div>
    )
}

export default LandingPage
