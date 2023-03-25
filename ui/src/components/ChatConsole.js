import { Avatar, Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ChatState } from '../context/ChatProvider'
import { getSender } from '../util'
import SendIcon from '@mui/icons-material/Send';

export const ChatConsole = () => {
  
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [message,setMessage] = useState("")

    const { selectedChat:sc } = ChatState()

    return (
        <>
            {sc 
            ? <Box height={"100%"}>
                <div className="d-flex py-3 pl-3" style={{ alignItems:'center', borderBottom:"1px solid rgb(40,40,40)" }}>
                    <Avatar style={{ cursor:"pointer", width: 38, height: 38, backgroundColor:"rgb(192,192,192)", color:"black" }} src={!sc.isGroup ? getSender(userInfo,sc.users)?.profilePic : ""} className="mr-3">{sc.isGroup ? sc.name[0] : getSender(userInfo,sc.users)[0]}</Avatar>
                    <Typography variant="h6">{(sc.isGroup ? sc.name : getSender(userInfo,sc.users)).toUpperCase()}</Typography>
                </div>
                <div className="m-2 p-2 chatc" style={{ backgroundColor:"rgb(30,30,30)", borderRadius:"5px", overflowY:"scroll" }}></div>
                <Stack direction="row">
                    <Form.Control value={message} type="text" autoFocus={true} onChange={e => setMessage(e.target.value)} style={{ width:"92.5%" }} className='mx-2' placeholder="Type message"/>
                    <Button className='py-1 mr-2' style={{ backgroundColor:'rgb(36, 36, 36)', color:"rgb(192, 192, 192)", border:"1px solid rgb(43,43,43)" }} >
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
