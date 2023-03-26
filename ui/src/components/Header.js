import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { userLogoutAction } from '../reducers/loginSlice';

export const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const logoutHandler = () => {
        setTimeout(() => {
            navigate("/login")
            dispatch(userLogoutAction())
        },1500)
    }

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

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
                   <Tooltip arrow title="Logout">
                        <IconButton onClick={logoutHandler} size="small" sx={{ ml: 2 }} >
                            <Avatar sx={{ width: 32, height: 32, backgroundColor:"rgb(192,192,192)", color:"black" }} src={userInfo?.profilePic} >{userInfo.name[0]}</Avatar>
                        </IconButton>
                    </Tooltip> 
                </div>
                }
        </Navbar>
    )
}