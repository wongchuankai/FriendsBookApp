import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar, IconButton} from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import {  makeStyles } from '@mui/styles'
import moment from 'moment'
import { useHistory } from 'react-router';
import apis from '../../../services/apis/protectedApi';
import JWTLocalStorage from '../../../services/JWTLocalStorage/JWTLocalStorage';

const useStyles = makeStyles((theme) => ({
    cardComponent: {
        marginBottom: theme.spacing(2),
    },
    likeCounter: {
        paddingRight: "20px"
    },
    likepost: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: "20px"
    }
}))

function Post({postid, postusername, postText, likeCount, isUserLike, createdAt, setLoadFeed}) {
    let history = useHistory()
    const classes = useStyles()
    const likeHandler = () => {
      const data = {
        postid, username: JWTLocalStorage.getParsedUserData().username
      }
      apis.userlikepost(data).then(res=> {
        setLoadFeed(true)
      }).catch(error => {
        console.log(error)
      })
    }

    const unlikeHandler = () => {
      const data = {
        postid, username: JWTLocalStorage.getParsedUserData().username
      }
      apis.userUnlikePost(data).then(res=> {
        setLoadFeed(true)
      }).catch(error => {
        console.log(error)
      })
    }

    const goToProfile = (postusername) => {
      history.push('/profile/' + postusername)
    }

    return (
        <Card className={classes.cardComponent}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="username-pic">
            R
          </Avatar>
        }
        title={postusername}
        subheader={moment(createdAt).fromNow()}//"September 14, 2016"
        style={{cursor: "pointer"}}
        onClick={()=>goToProfile(postusername)}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.likepost}>
          <Typography className={classes.likeCounter}>{likeCount} Likes</Typography>
          { isUserLike ? <Button onClick={unlikeHandler}><ThumbUp/> &nbsp; Like</Button> : 
          <Button color="primary" style={{color:"grey"}} onClick={likeHandler}><ThumbUp/> &nbsp; Like</Button> }
      </CardActions>
    </Card>
        // <CardComponent>
        //     <CardActionArea>
        //         <CardMedia
        //             height={100}
        //             // style={{height: "200x"}} 
        //             component='img'
        //             image="https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png"
        //             title="My post"
        //         /> 
        //         <CardContent>
        //             <Typography gutterBottom variant="h5">My First Post</Typography>
        //             <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
        //         </CardContent>
        //     </CardActionArea>
        //     <CardActions>
        //         <Button size="small">Share</Button>
        //         <Button size="small">Like</Button>
        //     </CardActions>
        // </CardComponent>
    )
}

export default Post
