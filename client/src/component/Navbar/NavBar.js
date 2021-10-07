import React, { useState, useRef } from 'react'
import { AppBar, Toolbar, Typography, InputBase, Badge, Avatar, Container } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import { Cancel, Mail, Notifications, ArrowDropDownCircleRounded } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';

  const StyledToolBar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between"
  }));
  
  const SearchRightSide = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginRight:theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  }));
  const SearchSmaller = styled('div')(({ theme , open }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    // width: "50%",
    [theme.breakpoints.up("sm")]: {
        display: "none"
      },
    [theme.breakpoints.down("sm")]: {
      display: (open ? "flex" : "none"),
      width: "70%",
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //   paddingRight: `calc(1em + ${theme.spacing(5)})`,
      transition: theme.transitions.create('width'),
    //   width: '100%',
      [theme.breakpoints.up('sm')]: {
        // width: '12ch',
        // '&:focus': {
        //   width: '20ch',
        // },
      },
    },
  }));

    const StyledIcons = styled('div')(({ theme, open }) => ({
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
        },
        [theme.breakpoints.down("sm")]: {
            display: (open ? "none" : "flex"),
          },
        
      }));

      const StyledSearch = styled(SearchIcon)(({ theme }) => ({
        marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
      }));
      
      const CancelBtn = styled(Cancel)(({ theme }) => ({
        padding: "5px",
        [theme.breakpoints.up("sm")]: {
            display: "none",
          },
      }));

      const StyledBadge = styled(Badge)(({ theme }) => ({
        marginRight: theme.spacing(2)
      }));
      const StyledAvatar = styled(Avatar)(({ theme }) => ({
        marginRight: theme.spacing(2)
      }));
    function NavBar() {

    const [ open, setOpen ] = useState(false)
    const [ searchValue, setSearchValue ] = useState("")
    
    const handleClick = () => {
        setOpen(true);
    }

    const onSearchValChange = (event) => {
        setSearchValue(event.target.value)
    }
    return (
        <AppBar position="fixed">
            <StyledToolBar>
                <Typography variant="h6" style={{marginRight: "10px"}}>
                    FriendsBook
                </Typography>
                <SearchSmaller open={open}>
                    <SearchIconWrapper   >
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…" value={searchValue} onChange={event => onSearchValChange(event)}
                    />
                    <CancelBtn onClick={()=>setOpen(false)}/>
                </SearchSmaller>
                <StyledIcons open={open}>
                    <StyledSearch onClick={handleClick}/>
                    <SearchRightSide>
                    <SearchIconWrapper   >
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…" value={searchValue} onChange={event => onSearchValChange(event)}
                    />
                    <CancelBtn onClick={()=>setOpen(false)}/>
                    </SearchRightSide>
                    <StyledBadge badgeContent={4}>
                        <Mail/>
                    </StyledBadge>
                    <StyledBadge badgeContent={4}>
                        <Notifications />
                    </StyledBadge>
                    <StyledAvatar
                    alt="Remy Sharp"
                    src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    />
                    <ArrowDropDownCircleRounded/>
                </StyledIcons>
            </StyledToolBar>
        </AppBar>
    )
}

export default NavBar
