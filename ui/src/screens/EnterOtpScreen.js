import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { Form, ListGroup } from 'react-bootstrap'
import { Button } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import bcrypt from 'bcryptjs'

export const EnterOtpScreen = () => {

    const navigate = useNavigate()

    const userSendOtp = useSelector(state => state.userSendOtp)
    const { otp:reqdOtp, email } = userSendOtp

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [otp, setOtp] = useState("")

    const verifyOTP = (e) => {
        e.preventDefault()
        setLoading(true)
        bcrypt.compare(otp, reqdOtp).then((res) => {
            if(res){
                setTimeout(() => {
                    setSuccess(true)
                },1500)
                setTimeout(() => {
                    navigate(`/reset/${bcrypt.hashSync(email,10).replace("/","||")}`)
                },3000)        
            }
            else{
                setError(true)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {error && <Message variant='error' message="Invalid OTP entered" />}
            {success && <Message variant='success' message="Verified!" />}
            {loading 
            ? <Loader/> 
            : <Form onSubmit={verifyOTP} className='formcomponent mx-auto mt-5'>
                <ListGroup style={{ backgroundColor:"rgb(25, 25, 25)", border:"1px solid rgb(37,37,37)" }} className='p-3'>
                    <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                        <h4 className='d-flex' style={{ alignItems:'center' }}>
                            <LockIcon className='mr-2'/>
                            <div>Enter OTP</div>
                        </h4>
                        <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                            We have sent an email to with the otp to {email && email} be entered if want to reset your password.
                            Please do the same
                            <br/>
                            It will be a 6 digit alpha-numeric OTP
                            <br/>
                            <br/>
                            For example : <strong>AGPGT3</strong>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                        <Form.Group>
                            <Form.Label style={{ fontSize:'0.9rem' }}>OTP<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                            <Form.Control style={{ backgroundColor:'#f1f1f1' }} required value={otp} type="text" onChange={e => setOtp(e.target.value)} />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0 mt-1'>
                        <Button className='w-100' variant='contained' type="submit">Verify OTP</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Form>}
        </>
    )
}
