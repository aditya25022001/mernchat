import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Button, Modal, Tooltip, Typography } from '@mui/material';
import { Form } from 'react-bootstrap';
import { getUsersAction } from '../reducers/getUsersSlice'
import { getUserChatsAction } from '../reducers/getUserChatsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from './Message'
import { User } from './User'
import { Chat } from './Chat';
import { ChatLoader } from './ChatLoader';
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import { Loader } from './Loader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export const LeftPanel = () => {

    const { setSelectedChat, setLeftOpen, notification, setNotification } = ChatState();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const userGetUsers = useSelector(state=>state.userGetUsers)
    const { loading, error, users } = userGetUsers

    const userGetChats = useSelector(state=>state.userGetChats)
    const { loading : loadingC, error:errorC, chats } = userGetChats

    const [open, setOpen] = useState(true);
    const [openM, setOpenM] = useState(false);
    const [search, setSearch] = useState("")
    const [cE, setCE] = useState({l:false,e:false, m:""})
    const [name, setName] = useState("")
    const [uf, setUF] = useState("")
    const [u,setU] = useState([])
  
    const handleDrawerOpen = () => {setOpen(true); setLeftOpen(true)}
  
    const handleDrawerClose = () => {setOpen(false); setLeftOpen(false)}

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0),
        justifyContent: 'space-between',
    }));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgb(50,50,50)',
        borderRadius:"8px",
        paddingRight:4,
        paddingTop:3,
        paddingLeft:3,
        paddingBottom:3,
        textAlign: 'center',
      };

    useEffect(() => {
        dispatch(getUserChatsAction())
    },[dispatch])
    
    const createChat = async(id) => {
        if(userInfo){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }
            try {
                const { data } = await axios.post(`https://mernchat-w0n3.onrender.com/api/v1/chat/p2p`,{ userID:id }, config)
                setCE({l:true})
                if(data){
                    setSelectedChat(data.chat)
                    dispatch(getUserChatsAction())
                    setCE({l:false,e:false,m:""})
                    setSearch("")
                    if(window.innerWidth<575) handleDrawerClose()
                }
            } catch (err) {
                console.log(err);
                setCE({l:false,e:true,m:err.response.data})
            }
        }
    }

    const createGroupChat = async() => {
        if(userInfo){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }
            try {
                setU([...u.map(e => e._id)])
                setOpenM(false)
                const { data } = await axios.post(`https://mernchat-w0n3.onrender.com/api/v1/chat/groupChat`,{ name, users:u }, config)
                setCE({l:true})
                if(data){
                    setSelectedChat(data.chat)
                    dispatch(getUserChatsAction())
                    setCE({l:false,e:false,m:""})
                    setName("") 
                    setUF("") 
                    setU([])
                    if(window.innerWidth<575) handleDrawerClose()
                }
            } catch (err) {
                console.log(err);
                setCE({l:false,e:true,m:err.response.data})
            }
        }
    }

    const addMember = (user) => {
        if(u.find(e => e._id===user._id)) setCE({l:false,e:true,m:"already added"})
        else{
            setU([...u,user])
            setCE({})
        }
    }

    const deleteMember = (user) => {
        setU([...u.filter(e => e._id!==user._id)])
    }

    const selectChat = (each) => {
        setSelectedChat(each); 
        if(window.innerWidth<575) handleDrawerClose()
        if(notification.find(one => one.chat._id===each._id)){
            setNotification([...notification.filter(e => e.chat._id!==each._id)])
            localStorage.setItem("notification",JSON.stringify([...notification.filter(e => e.chat._id!==each._id)]))
        }
    }

    const showDot = (id) => {
        if(userInfo){
            let counter = 0;
            notification.map(e => (e.chat._id===id && counter++));
            return {show:notification.find(one => one.chat._id===id && one.sender._id!==userInfo?._id), counter}
        }
    }

    return (
        <>
            {!open && <IconButton color="inherit" onClick={handleDrawerOpen} style={{ position:'fixed', top:'4.5rem', right:'1rem', zIndex:'100', backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(59,59,59)" }}>
                <ChatIcon />
            </IconButton>}
            <div style={{ borderRight:'1px solid rgb(40,40,40)', display: open ? "block" : "none", zIndex:"1001" }} className="left" anchor="left" open={open}>
            <DrawerHeader>
                <Form.Control autoFocus={openM ? false : true} value={search} onChange={e => {setSearch(e.target.value); dispatch(getUsersAction({keyword:e.target.value}))}} placeholder="Add/Search chat" type="text" className="mx-2 mt-2" />
                <Tooltip title="Close" placement="right" arrow>
                    <Button  className='mt-2 mr-2 py-1 close' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }} onClick={handleDrawerClose}>
                        <CloseIcon style={{ color:"rgb(192,192,192)" }} />
                    </Button>
                </Tooltip>
            </DrawerHeader>
            <DrawerHeader>
                <Typography className='mx-auto' style={{ fontSize:"20px" }}>My Chats</Typography>
                <Tooltip placement="bottom" title="Create New Group" arrow>
                    <Button onClick={e => setOpenM(true)} className='mt-2 mb-1 mr-2 py-1' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }}>
                        <GroupAddIcon style={{ color:"rgb(192,192,192)" }} />
                    </Button>
                </Tooltip>
            </DrawerHeader>
            <Divider className='mt-1' style={{ backgroundColor:"rgb(40,40,40)" }}/>
                {error && <Message variant='error' message={error} />}
                {cE.e && <Message variant='error' message={cE.m} />}
                {search==="" ?
                    <div style={{ overflowY:"scroll", marginBottom:"68px" }}>  
                        {errorC && <Message variant='error' message={errorC}/>}
                        {loadingC 
                        ? <ChatLoader/>
                        : chats && chats.map(each => (
                            <Chat key={each._id} handleFunction={() => selectChat(each)} dot={showDot(each._id)?.show} counter={showDot(each._id)?.counter} chat={each} />
                        ))
                        }
                    </div>
                : loading || cE.l
                ? <ChatLoader/>
                : users &&users.length===0 
                ? <Typography style={{ position:"fixed", top:"50%", fontWeight:500, fontSize:"20px" }} className="nouser">No Users Found</Typography>
                : users && users.map(each => (
                    <User key={each._id} user={each} handleFunction={() => createChat(each._id)} />
                    ))
                }
            </div>
            <Modal open={openM} onClose={e=>setOpenM(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">Create Group</Typography>
                    <Form.Control placeholder="Group Name" value={name} onChange={e => setName(e.target.value)}autoFocus={openM ? true : false} type="text" className="mx-2 mt-3" />
                    <Form.Control value={uf} autoComplete="off" autoFocus={openM ? true : false} placeholder="Add Users" onChange={e => {setUF(e.target.value); dispatch(getUsersAction({keyword:e.target.value}))}} type="text" className="mx-2 mt-3" />
                    <Stack direction="row" style={{ flexWrap:"wrap" }} spacing={1} className="mt-2 ml-2">
                        {u.map(each => (
                            <Chip className="my-1" label={each.name} onDelete={() => deleteMember(each)} variant="outlined"></Chip>
                        ))}
                    </Stack>
                    {loading 
                    ? <Loader/> 
                    : uf!=="" && users && users.map(each => 
                        <div className="mt-2 py-2 pl-2 ml-2 user" style={{ borderRadius:'8px', backgroundColor:"rgb(36, 36, 36)", color:"rgb(192,192,192)", cursor:'pointer', display:'flex', alignItems:'center', width:'100%' }} key={each._id} onClick={() => addMember(each)}>
                            <Avatar size="sm" className='mr-2' style={{ width: 35, height: 35, backgroundColor:"rgb(192,192,192)", color:"black" }} src={each?.profilePic} >{each.name[0]}</Avatar>{each.name}
                        </div>)}
                    <Button className="mt-3" variant="contained" style={{ float:"right", backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }} onClick={e => setOpenM(false)}>Close</Button>
                    <Button className="mr-2 mt-3" disabled={name==="" || u.length<2} variant="contained" style={{ float:"right", backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }} onClick={createGroupChat}>Create Group</Button>
                </Box>
                </Modal>
        </>
  )
}
