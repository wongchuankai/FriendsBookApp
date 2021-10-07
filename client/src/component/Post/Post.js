import React from 'react'
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import { styled } from '@mui/system'

const CardComponent = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3)
}))

function Post() {
    return (
        <CardComponent>
            <CardActionArea>
                <CardMedia
                    height={100}
                    // style={{height: "200x"}} 
                    component='img'
                    image="https://www.wpbeginner.com/wp-content/uploads/2020/03/ultimate-small-business-resource-coronavirus.png"
                    title="My post"
                /> 
                <CardContent>
                    <Typography gutterBottom variant="h5">My First Post</Typography>
                    <Typography variant="body2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Like</Button>
            </CardActions>
        </CardComponent>
    )
}

export default Post
