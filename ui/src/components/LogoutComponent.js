import React from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux'
import { userLogoutAction } from '../actions/authActions'

export const LogoutComponent = () => {
    
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        setTimeout(() => {
            dispatch(userLogoutAction())
        },2500)
    }
    
    return (
        <div style={{ zIndex:'1001', backgroundColor:'white' }} onClick={logoutHandler}>
            <Tooltip title="Logout" placement="top" arrow>
                <IconButton className='border' variant='contained' color="primary" style={{ position:'fixed', bottom:'1rem', right:'1rem', zIndex:'1001', backgroundColor:'white'  }} >
                    <PowerSettingsNewIcon style={{ fontSize:'1.8rem' }}/>
                </IconButton>
            </Tooltip>
        </div>
    )
}