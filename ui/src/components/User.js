import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

export const User = ({ user, handleFunction }) => {

    return (
        <Box className='mx-2 mt-2 py-3 pl-2 user' onClick={handleFunction} style={{ borderRadius:'8px', backgroundColor:"rgb(36, 36, 36)", color:"rgb(192,192,192)", cursor:'pointer', display:'flex', alignItems:'center' }} >
            <Avatar size="sm" className='mr-2' style={{ width: 35, height: 35, backgroundColor:"rgb(192,192,192)", color:"black" }} src={user?.profilePic} >{user.name[0]}</Avatar>
            <Box>
                <Typography style={{ fontSize:16 }}>{user.name}</Typography>
                <Typography style={{ fontSize:14 }}>{user.email}</Typography>
            </Box>
        </Box>
    )
}
