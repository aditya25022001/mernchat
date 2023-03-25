import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { ListItemIcon, Avatar, Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { userLogoutAction } from '../reducers/loginSlice';

export const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dispatch = useDispatch()

    const logoutHandler = () => {
        setTimeout(() => {
            dispatch(userLogoutAction())
        },1500)
    }

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const paperProps = {
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
    }

    return (
        <Navbar collapseOnSelect style={{ borderBottom:'1px solid rgb(40,40,40)' }} expand="lg" variant="dark">
            <Navbar.Brand>
                <Link to={"/"} className='header_link_main d-flex' style={{ alignItems:'center', fontWeight:450 }}>
                    <SendIcon className="bubble" style={{ transform:"rotateZ(-45deg) translateY(-3px)" }} />MERNChat
                </Link>
            </Navbar.Brand>
                {!userInfo
                ? <Nav className="ml-auto">
                    <Link to='/login' className='header_link' style={{ fontWeight:450, fontSize:17 }}>
                        Login
                    </Link>
                </Nav>
                : <div className='ml-auto'>
                   <Tooltip arrow title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} >
                            <Avatar sx={{ width: 32, height: 32, backgroundColor:"rgb(192,192,192)", color:"black" }} src={userInfo?.profilePic} >{userInfo.name[0]}</Avatar>
                        </IconButton>
                    </Tooltip> 
                    <Menu PaperProps={paperProps} style={{}} anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        <MenuItem onClick={handleClose} style={{ color:"black" }}>
                            <ListItemIcon>
                                <ManageAccountsIcon style={{ color:"black" }}/> 
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <Divider/>
                        <MenuItem style={{ color:"black" }} onClick={logoutHandler}>
                            <ListItemIcon>
                                <PowerSettingsNewIcon style={{ color:"black" }}/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
                }
        </Navbar>
    )
}