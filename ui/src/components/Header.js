import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import CallIcon from '@mui/icons-material/Call';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import FolderCopyIcon from '@mui/icons-material/FolderCopy';
// import HomeIcon from '@mui/icons-material/Home';
// import { Tooltip } from '@mui/material';

export const Header = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    return (
        <Navbar collapseOnSelect style={{ borderBottom:'1px solid black' }} expand="lg" variant="dark">
            <Navbar.Brand>
                <Link to={"/"} className='header_link_main d-flex' style={{ alignItems:'center', fontWeight:450 }}>
                    <SendIcon className="bubble" style={{ transform:"rotateZ(-45deg) translateY(-3px)" }} />MERNChat
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle className='border-0' aria-controls="responsive-navbar-nav">
                <span>
                    <MenuOpenIcon style={{ color:'black' }}/>
                </span>
            </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={window && window.innerWidth>992 ? 'ml-auto mr-5' : 'ml-auto border-bottom py-1'}>
                    {userInfo && <Link className='header_link' style={{ fontWeight:450, fontSize:17 }}  to={"/"}>
                        {/* <Tooltip title="Home" placement='bottom-start' arrow>
                            <HomeIcon style={{ fontSize:28 }} />
                        </Tooltip> */}
                        Home
                    </Link>}
                </Nav>
                <Nav className={window && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' style={{ fontWeight:450, fontSize:17 }} to={"/docs"}>Documents
                        {/* <Tooltip arrow placement="bottom-start" title="Documents">
                            <FolderCopyIcon/>{"  "}
                        </Tooltip> */}
                    </Link>
                </Nav>
                <Nav className={window && window.innerWidth>992 ? 'mr-5' : 'border-bottom py-1'}>
                    <a className='header_link' style={{ fontWeight:450, fontSize:17 }} href='https://github.com/aditya25022001/mernchat ' target='_blank' rel='noopener noreferrer'>
                        {/* <Tooltip arrow placement="bottom-start" title="Source Github">
                            <GitHubIcon/>
                        </Tooltip> */}
                        Source Code
                    </a>
                </Nav>
                <Nav className={window && window.innerWidth>992 && userInfo ? 'mr-2' : window && window.innerWidth>992 && !userInfo ? 'mr-5' : 'border-bottom py-1'}>
                    <Link className='header_link' style={{ fontWeight:450, fontSize:17 }} to={'/contact'}>
                        {/* <Tooltip arrow placement="bottom-start" title="Contact">
                            <CallIcon/>
                        </Tooltip> */}
                        Contact
                    </Link>
                </Nav>
                {!userInfo && <Nav className={window && window.innerWidth>992 ? 'mr-2' : 'mr-2 pt-2'}>
                    <Link to='/login' className='header_link' style={{ fontWeight:450, fontSize:17 }}>
                        {/* <Tooltip arrow placement="bottom-start" title="Signup / login">
                            <PowerSettingsNewIcon/>
                        </Tooltip> */}
                        Login
                    </Link>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    )
}