import React from 'react'
import { Container } from '@mui/material'
import { styled } from '@mui/system'
import { useHistory} from 'react-router-dom'
import { Home, People, Chat } from "@mui/icons-material";
import { Description } from '@mui/icons-material';
const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10)
}))


function RightBar() {
    return (
        <ContainerStyled>
            {/* <Description/> */}
        </ContainerStyled>
    )
}

export default RightBar
