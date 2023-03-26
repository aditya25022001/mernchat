import { Avatar, Box, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState, useEffect, useCallback } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ChatState } from '../context/ChatProvider'
import { getSender } from '../util'
import SendIcon from '@mui/icons-material/Send';
import { Message } from './Message'
import { Loader } from './Loader'
import { ScrollableChat } from './ScrollableChat'
import io from "socket.io-client";
import axios from 'axios'

const ENDPOINT = "http://127.0.0.1:5000";
let socket, selectedChatCompare;
const apiBaseURL = "http://127.0.0.1:5000"

export const ChatConsole = () => {
    
    const { selectedChat:sc, notification, setNotification } = ChatState()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const [message,setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [cE, setCE] = useState({l:false,e:false, m:""})
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT);
        if(userInfo) socket.emit("setup",userInfo)
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    },[userInfo])

    const getMessages = useCallback(async() => {
        if(userInfo && sc){
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
                setCE({l:false,e:true,m:err?.response?.data})
            }
        }
    },[userInfo,sc])

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
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
                if(!notification.includes(newMessageRecieved)){
                    setNotification([newMessageRecieved,...notification]);
                    localStorage.setItem("notification",JSON.stringify([newMessageRecieved,...notification]))
                }
            }
            else setMessages([...messages,newMessageRecieved])
        })
    })

    useEffect(() => {
        getMessages()
        selectedChatCompare = sc;
    },[sc,getMessages])

    const userTypingMessage = (e) => {
        setMessage(e.target.value)
        if(!socketConnected) return;
        if(!typing){
            setTyping(true)
            socket.emit("typing",sc._id)
        }
        let typingStart = new Date().getTime();
        let timer = 3000;
        setTimeout(() => {
            let currTime = new Date().getTime();
            let timeDiff = currTime-typingStart;
            if(timeDiff>=timer && typing) {
                socket.emit("stop typing",sc._id)
                setTyping(false)
            }
        },timer)
    }

    return (
        <>
        {cE.e && <Message message={cE.m} variant="error" />}
            {sc 
            ? <Box height={"100%"}>
                <div className="d-flex py-3 pl-3" style={{ alignItems:'center', borderBottom:"1px solid rgb(40,40,40)" }}>
                    <Avatar style={{ cursor:"pointer", width: 38, height: 38, backgroundColor:"rgb(192,192,192)", color:"black" }} src={!sc.isGroup ? userInfo && getSender(userInfo,sc.users)?.profilePic : ""} className="mr-3">{sc && sc.isGroup ? sc?.name[0] : userInfo ? getSender(userInfo,sc.users)[0] : ""}</Avatar>
                    <div>
                        <div style={{ margin:0, padding:0, lineHeight:1.5 }}>{(sc.isGroup ? sc.name : getSender(userInfo,sc.users))}</div>
                        <span className="typing" style={{ display:isTyping ? "block" : "none" }}>typing...</span>
                    </div>
                </div>
                <div className="my-2 p-2 chatc" style={{ overflowY:"scroll" }}>
                {cE.e && <Message variant='error' message={cE.m} />}
                {cE.l ? <Loader/> : <ScrollableChat messages={messages} />}
                </div>
                <Form onSubmit={sendHandler}>
                    <Stack direction="row">
                        <Form.Control value={message} type="text" autoFocus={true} onChange={userTypingMessage} style={{ width:"92.5%" }} className='mx-2' placeholder="Type message"/>
                        <Button type="submit" onClick={sendHandler} disabled={message===""} className='py-1 mr-2' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }} >
                            <SendIcon/>
                        </Button>
                    </Stack>
                </Form>
            </Box> 
            : <div style={{ position:"absolute", top:"50%", fontSize:20 }} className='nochat'>No Chat Selected
            </div>
            } 
        </>
    )
}
