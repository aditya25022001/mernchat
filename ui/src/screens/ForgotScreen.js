import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Form, ListGroup } from 'react-bootstrap'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock';
import { sendOtpAction, resetStateSuccess } from '../reducers/sendOtpSlice'

export const ForgotScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userSendOtp = useSelector(state => state.userSendOtp)
    const { loading, error, success } = userSendOtp

    useEffect(() => {
        if(userInfo) navigate("/")
        if(success){
            dispatch(resetStateSuccess({id:"user"}))
            navigate("/otp")
        }
    },[userInfo,navigate,success,dispatch])

    const sendOtpHandler = (e) => {
        e.preventDefault()
        dispatch(sendOtpAction({ email }))
    }

    return (
        <>
        {error && <Message variant='error' message={error} />}
        {loading 
        ? <Loader/> 
        : <Form onSubmit={sendOtpHandler} className='formcomponent mx-auto mt-5'>
            <ListGroup style={{ backgroundColor:"rgb(25, 25, 25)", border:"1px solid rgb(37,37,37)" }} className='p-3'>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <h4 className='d-flex' style={{ alignItems:'center' }}>
                        <LockIcon className='mr-2'/>
                        <div>Send OTP</div>
                    </h4>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label>Email<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <Form.Control autoFocus={true} required value={email} type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className="border-0 mt-1">
                    <Button className='w-100' variant='contained' type="submit">Send</Button>
                    <div className='mt-3'>
                        <small>
                            <Link to='/login'>
                                Remembered password ?
                            </Link>
                        </small>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Form>}

        </>
    )
}
