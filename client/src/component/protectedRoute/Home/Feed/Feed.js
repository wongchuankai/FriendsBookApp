import React, { useState, useEffect, useRef } from 'react'
import { Container, Grid, Alert, Snackbar } from '@mui/material'
import { useHistory, Redirect } from 'react-router-dom'
import JWTLocalStorage from '../../../services/JWTLocalStorage/JWTLocalStorage'
import apis from '../../../services/apis/protectedApi'
import Post from '../Post/Post'
import {  makeStyles } from '@mui/styles'
import { Form, Card, Button, Row, Col } from 'react-bootstrap'
import "./Feed.css"

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10)
    },
    uploadNewPost: {
        padding: "1px solid black"
    },
    postBtnWrapper: {
        
    }
}))

function Feed({setLoading}) {
    let history = useHistory()
    const classes = useStyles()
    const [ loadFeed, setLoadFeed ] = useState(true);
    const userPost = useRef("")
    const [ isPublic, setPublic ] = useState("");
    const [ postResult, setPostResult] = useState({
        open: false, severity: "", message: ""
    })
    const [ posts, setPosts ] = useState([])
    const [ imagePost, setImagePost ] = useState()
    useEffect(() => {
        if(loadFeed) {
            const username =  JWTLocalStorage.getParsedUserData().username
            apis.getPublicPostWithUser( {
                username
            }).then(res => {
                const data = res.data
                const posts = data.results
                console.log(posts)
                setPosts(posts)
            }).catch(err=> {

            })
            setLoadFeed(false)
        }
    }, [loadFeed])
    const closeSnackBar = () => {
        setPostResult({
            open: false, severity: "", message: ""
        })
    }
    const imageInputHandler = (event) => {
        setImagePost(URL.createObjectURL(event.target.files[0]))
    }
    const publicOptionHandler = (event) => {
        console.log(event.target.value)
        if(event.target.value === "public") {
            setPublic("public")
        } else {
            setPublic("private")
        }
    }
    const postNewHandler = (event) => {
        event.preventDefault()
        try {
            const post = {
                username: JWTLocalStorage.getParsedUserData().username,
                postText: userPost.current.value,
                isPublic: isPublic === "public"
            }
            apis.newpost(post).then((res)=> {
                setLoadFeed(true)
                setPostResult({
                    open: true, severity: "success", message: res.data.msg
                })
            }).catch(err=> {
                const errorData = err.response
                console.log(errorData)
                if (errorData.msg === "Invalid Token" || errorData.msg === "A token is required for authentication") {
                    JWTLocalStorage.clearToken()
                    window.location.href()   
                }
                setPostResult({
                    open: true, severity: "error", message: errorData.msg
                })
            })
            event.target.reset()
        } catch(error) {
            JWTLocalStorage.clearToken()
            window.location.href()
        }
    }
    return (
        <Container className={classes.container}>
            <Card className="new-status-section">
                <Card.Body>
                    <Card.Title className="mb-3">What is on your mind?</Card.Title>
                    <Form onSubmit={(event) => postNewHandler(event)}>
                        <Form.Control required ref={userPost} className="mb-3" placeholder="Write your story here"/>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload photo here</Form.Label>
                                <Col sm={7} className="mb-3">
                                    <Form.Control type="file" onChange={(event) => imageInputHandler(event)}/>
                                    {/* <img src={imagePost}/> */}
                                </Col>
                        </Form.Group>
                                <Row className="mb-3">
                                    <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check required onChange={(event)=> publicOptionHandler(event)} value="public" type="radio" name="sharepublic" label="Share with everyone in FriendsBook." />
                                        <Form.Check required onChange={(event)=> publicOptionHandler(event)} value="private" type="radio" name="sharepublic" label="Only Friends can see my post." />
                                    </Form.Group>
                                    </Col>
                                    <Col/>
                                    <Col>                                    
                                        <Button className="postbtn" type="submit" style={{width: "100px"}}>Post</Button>
                                    </Col>
                                </Row>
                    </Form>
                </Card.Body>
            </Card>
            <div>
                {posts.length > 0 && posts.map((post) => {
                    return <Post key={post.postid} postid={post.postid} postusername={post.username} postText={post.post_text} likeCount={post.like_count} isUserLike={post.isuserlike} createdAt={post.created_at} setLoadFeed={setLoadFeed}/>
                })}
            </div>
            <Snackbar anchorOrigin={{"vertical":'bottom', "horizontal": 'center'}} open={postResult.open} autoHideDuration={6000} onClose={closeSnackBar}>
                <Alert onClose={closeSnackBar} severity={postResult.severity} sx={{ width: '100%', padding: "10px" }}>
                    {postResult.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Feed
