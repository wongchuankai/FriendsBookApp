import { Container } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10)
}))


function RightBar() {
    return (
        <ContainerStyled>
            Right
        </ContainerStyled>
    )
}

export default RightBar
