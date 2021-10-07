import { Container } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import Post from '../Post/Post'

const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10)
}))

function Feed() {
    return (
        <ContainerStyled>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>

        </ContainerStyled>
    )
}

export default Feed
