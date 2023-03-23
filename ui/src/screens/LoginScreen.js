import React, { useState, useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../actions/authActions'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'

export const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showP, setShowP] = useState(false)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(userLoginAction(email, password))
    }

    useEffect(() => {
        if(userInfo){
            navigate('/')
        }
    },[userInfo, navigate])
    
    return (
        <>
        {error && <Message variant='error' message={error} />}
        {loading 
        ? <Loader/> 
        : <Form onSubmit={loginHandler} className='formcomponent mx-auto mt-5'>
            <ListGroup style={{ backgroundColor:"rgb(25, 25, 25)", border:"1px solid rgb(37,37,37)" }} className='p-3'>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <h4 className='d-flex' style={{ alignItems:'center' }}>
                        <LockIcon className='mr-2'/>
                        <div>Login</div>
                    </h4>
                    {/* <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>Login to the MERN boilerplate project and get to know how and what all things are done and performed</p> */}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label>Email<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <Form.Control autoFocus={true} required value={email} type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label>Password<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <div className='d-flex' style={{ alignItems:'center' }}>   
                            <div className='mr-1' style={{ flex:1 }}>
                                <Form.Control required value={password} type={showP ? "text" :"password"} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className='px-2 py-1 rounded' style={{ flex:0, backgroundColor:"rgb(36, 36, 36)",border: "1px solid rgb(59, 59, 59)" }}>
                                {!showP ? <VisibilityOffIcon style={{ cursor:'pointer' }} onClick={e => setShowP(!showP)}/> : <VisibilityIcon style={{ cursor:'pointer' }} onClick={e => setShowP(!showP)}/>}
                            </div>
                        </div>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className="border-0 mt-1">
                    <Button className='w-100' variant='contained' type="submit">Login</Button>
                    <div className='mt-3'>
                        <small>
                            <Link to='/signup'>
                                New to MERNChat? Sign up now
                            </Link>
                        </small>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Form>}
        </>
    )
}