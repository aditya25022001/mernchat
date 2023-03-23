import React, { useState, useEffect } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userRegisterAction } from '../auth/registerSlice'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';

export const SignUpScreen = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showP, setShowP] = useState(false)
    const [showCP, setShowCP] = useState(false)
    const [userError, setUserError] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error } = userRegister

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo){
            navigate('/')
        }
    },[userInfo, navigate])

    const registerHandler = (e) => {
        e.preventDefault()
        if(password===confirmPassword){
            dispatch(userRegisterAction({name, email, password}))
        }
        else{
            setUserError(true)
        }
    }

    if(userError){
        setTimeout(() => {
            setUserError(false)
        },2500)
    }
    
    return (
        <>
        {(error || userError) && <Message variant='error' message={error||"Passwords do not match"} />}
        {loading 
        ? <Loader/>
        :<Form onSubmit={registerHandler} className='formcomponent mx-auto mt-5'>
            <ListGroup style={{ backgroundColor:"rgb(25, 25, 25)", border:"1px solid rgb(37,37,37)" }} className='card p-3'>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <h4 className='d-flex' style={{ alignItems:'center' }}>
                        <PersonIcon style={{ fontSize:'2rem' }} className='mr-2'/>
                        <div>Sign Up</div>
                    </h4>
                    {/* <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                        Register to the MERN boilerplate project and get to know how and what all things are done and performed
                    </p> */}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>Name<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <Form.Control autoFocus={true} required value={name} type="text" onChange={e => setName(e.target.value)} />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>Email<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <Form.Control required value={email} type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>Password<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
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
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className='border-0'>
                    <Form.Group>
                        <Form.Label style={{ fontSize:'0.9rem' }}>Confirm Password<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                        <div className='d-flex' style={{ alignItems:'center' }}>   
                            <div className='mr-1' style={{ flex:1 }}>
                                <Form.Control required value={confirmPassword} type={showCP ? "text" :"password"} onChange={e => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='px-2 py-1 rounded' style={{ flex:0, backgroundColor:"rgb(36, 36, 36)",border: "1px solid rgb(59, 59, 59)" }}>
                                {!showCP ? <VisibilityOffIcon style={{ cursor:'pointer' }} onClick={e => setShowCP(!showCP)}/> : <VisibilityIcon style={{ cursor:'pointer' }} onClick={e => setShowCP(!showCP)}/>}
                            </div>
                        </div>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor:"rgb(25, 25, 25)" }} className="border-0 mt-1">
                    <Button className='w-100' variant='contained' type="submit">Signup</Button>
                    <div className='mt-3'>
                        <small>
                            <Link to='/login'>
                                Already registered? Sign in now
                            </Link>
                        </small>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Form>}
        </>
    )
}