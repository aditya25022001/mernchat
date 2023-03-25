import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { LeftPanel } from '../components/LeftPanel'
import { RightPanel } from '../components/RightPanel'

export const HomeScreen = () => {

  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo) navigate("/login")
  },[userInfo,navigate])

  return (
    <div className="d-flex">
      <LeftPanel/>
      <RightPanel/>
    </div>
  )
}
