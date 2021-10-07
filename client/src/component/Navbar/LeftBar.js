import { Container } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { Home } from "@mui/icons-material";

// import Cloud from '@mui/icons-material/Cloud';

const ContainerStyled = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    color: "white",
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
        backgroundColor: "#F5F5F5",
        color: "#555",
        border: "1px solid #ece7e7",
      },
}))


const Tabs = styled('div')(({ theme }) => ({
    display:"flex",
    alignItems: 'center',
    // paddingLeft: theme.spacing(5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(3),
        cursor: "Pointer"
    }
}))

const Text = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

function LeftBar() {
    return (
        <ContainerStyled >
            <Tabs>
                <Home/>
                <Text>Home</Text>
            </Tabs>
            <Tabs>
                <Home/>
                <Text>Chat Room</Text>
            </Tabs>
        </ContainerStyled>
    )
}

export default LeftBar
