import { Avatar, Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { ChatState } from '../context/ChatProvider'
import { getSender } from '../util'
import SendIcon from '@mui/icons-material/Send';
import { getMessagesAction } from '../reducers/getMessagesSlice'
import { Message } from './Message'
import { Loader } from './Loader'
import { ScrollableChat } from './ScrollableChat'
import io from "socket.io-client";
import axios from 'axios'

const ENDPOINT = "http://127.0.0.1:5000";
let socket, selectedChatCompare;
const apiBaseURL = "http://127.0.0.1:5000"

export const ChatConsole = () => {
    
    const { selectedChat:sc } = ChatState()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const [message,setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [cE, setCE] = useState({l:false,e:false, m:""})
    const [socketConnected, setSocketConnected] = useState(false);
    // const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT);
        if(userInfo) socket.emit("setup",userInfo)
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    },[userInfo])

    const getMessages = async() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        try {
            setCE({l:true})
            const { data } = await axios.get(`${apiBaseURL}/api/v1/message/${sc._id}`, config)
            setMessages(data.chat)
            setCE({l:false})
            socket.emit("join chat",sc._id)
        } catch (err) {
            setCE({l:false,e:true,m:err.response.data})
        }
    }

    const sendHandler = async() => {
        try{
            socket.emit("stop typing", sc._id);
            setMessage("")
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`${apiBaseURL}/api/v1/message`,{ message, chatId:sc._id }, config)
            socket.emit("new message", data.newMessage);
            setMessages([...messages,data.newMessage])
        }
        catch(err){
            setCE({l:false,e:true,m:err.response.data})
        }
    }

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) console.log("notification");
            else setMessages([...messages,newMessageRecieved])
        })
    })

    useEffect(() => {
        getMessages()
        selectedChatCompare = sc;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sc])

    return (
        <>
        {cE.e && <Message message={cE.m} variant="error" />}
            {sc 
            ? <Box height={"100%"}>
                <div className="d-flex py-3 pl-3" style={{ alignItems:'center', borderBottom:"1px solid rgb(40,40,40)" }}>
                    <Avatar style={{ cursor:"pointer", width: 38, height: 38, backgroundColor:"rgb(192,192,192)", color:"black" }} src={!sc.isGroup ? getSender(userInfo,sc.users)?.profilePic : ""} className="mr-3">{sc.isGroup ? sc.name[0] : getSender(userInfo,sc.users)[0]}</Avatar>
                    <Typography variant="h6">{(sc.isGroup ? sc.name : getSender(userInfo,sc.users)).toUpperCase()}</Typography>
                </div>
                <div className="m-2 p-2 chatc" style={{ backgroundColor:"rgb(30,30,30)", borderRadius:"5px", overflowY:"scroll" }}>
                {cE.e && <Message variant='error' message={cE.m} />}
                {cE.l ? <Loader/> : <ScrollableChat messages={messages} />}
                </div>
                <Stack direction="row">
                    <Form.Control value={message} type="text" autoFocus={true} onChange={e => setMessage(e.target.value)} style={{ width:"92.5%" }} className='mx-2' placeholder="Type message"/>
                    <Button onClick={sendHandler} disabled={message===""} className='py-1 mr-2' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }} >
                        <SendIcon/>
                    </Button>
                </Stack>
            </Box> 
            : <div style={{ position:"absolute", top:"50%", fontSize:20 }} className='nochat'>No Chat Selected
            </div>
            } 
        </>
    )
}
