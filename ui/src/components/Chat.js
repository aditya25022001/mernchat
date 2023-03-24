import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const Chat = ({ chat, handleFunction }) => {

    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin
    
    const user = !chat.isGroup ? chat.users.filter(e => e._id!==userInfo._id) : undefined

    const dummy = "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."

    return (
        <Box onClick={handleFunction} className='mx-1 mt-1 py-3 pl-2 chat' style={{ borderRadius:'5px', border:'1px solid rgb(59,59,59)', backgroundColor:"rgb(36, 36, 36)", color:"rgb(192,192,192)", cursor:'pointer', display:'flex', alignItems:'center' }} >
            <Avatar size="sm" className='mr-2' style={{ width: 35, height: 35, backgroundColor:"rgb(192,192,192)", color:"black" }} src={user ? user?.profilePic : ""}>{user!==undefined ? user[0].name[0] : chat?.name[0]}</Avatar>
            <Box>
                <Typography style={{ fontSize:16 }}>{user ? user[0].name : chat.name}</Typography>
                <Typography style={{ fontSize:14 }}>{chat?.latestMessage?.message}{dummy.slice(0,30)}...</Typography>
            </Box>
        </Box>
    )
}
