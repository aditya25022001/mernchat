import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Tooltip, Typography } from '@mui/material';
import { Form } from 'react-bootstrap';
import { getUsersAction } from '../reducers/getUsersSlice'
import { getUserChatsAction } from '../reducers/getUserChatsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from './Loader'
import { Message } from './Message'
import { User } from './User'
import { Chat } from './Chat';

export const LeftPanel = () => {

    const dispatch = useDispatch()

    const userGetUsers = useSelector(state=>state.userGetUsers)
    const { loading, error, users } = userGetUsers

    const userGetChats = useSelector(state=>state.userGetChats)
    const { loading : loadingC, error:errorC, chats } = userGetChats

    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState("")
  
    const handleDrawerOpen = () => setOpen(true);
  
    const handleDrawerClose = () => setOpen(false);

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0),
        justifyContent: 'space-between',
    }));

    useEffect(() => {
        dispatch(getUserChatsAction())
    },[dispatch])


    return (
        <>
            <IconButton color="inherit" onClick={handleDrawerOpen} style={{ position:'fixed', bottom:'1rem', left:'1rem', zIndex:'1001', backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(59,59,59)" }}>
                <ChatIcon />
            </IconButton>
            <Drawer sx={{ width: 260, flexShrink:0, '& .MuiDrawer-paper': { width: window.innerWidth>560 ? 270 : "100%", marginTop:"58.8px" } }} variant="persistent" anchor="left" open={open}>
            <DrawerHeader>
                <Form.Control autoFocus={true} value={search} onChange={e => {setSearch(e.target.value); dispatch(getUsersAction({keyword:e.target.value}))}} placeholder="Add/Search chat" type="text" className="mx-1 mt-1" />
                <Tooltip title="Close" placement="right" arrow>
                    <Button  className='mt-1 mr-1 py-1' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(59,59,59)" }} onClick={handleDrawerClose}>
                        <CloseIcon style={{ color:"rgb(192,192,192)" }} />
                    </Button>
                </Tooltip>
            </DrawerHeader>
            <DrawerHeader>
                <Typography className='mx-auto' style={{ fontSize:"20px" }}>My Chats</Typography>
                <Tooltip placement="bottom" title="Create New Group" arrow>
                    <Button  className='my-1 mr-1 py-1' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(59,59,59)" }}>
                        <GroupAddIcon style={{ color:"rgb(192,192,192)" }} />
                    </Button>
                </Tooltip>
            </DrawerHeader>
            <Divider style={{ backgroundColor:"#515151" }}/>
                {error && <Message variant='error' message={error} />}
                {search==="" ?
                    <>  
                        {errorC && <Message variant='error' message={errorC}/>}
                        {loadingC 
                        ? <Loader/>
                        : chats && chats.map(each => (
                            <Chat chat={each} />
                        ))
                        }
                    </>
                : loading 
                ? <Loader/>
                : users &&users.length===0 
                ? <Typography style={{ position:"fixed", top:"50%", fontWeight:500, fontSize:"20px" }} className="nouser">No Users Found</Typography>
                : users && users.map(each => (
                    <User user={each} />
                ))
                }
            </Drawer>
        </>
  )
}
