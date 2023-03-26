import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import { putName } from '../util'
import moment from 'moment'

export const ScrollableChat = ({ messages }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <ScrollableFeed style={{ height:"100vh" }}>
            {messages && messages.map((m,i) => (
                <div key={m._id} className={i===0 ? "mt-2 mb-1" : "mb-1"} style={{ textAlign:userInfo._id===m.sender._id ? "right" : "left"}} >
                    <div className={userInfo._id===m.sender._id ? "ml-auto py-1 px-2" : "px-2 py-1"} style={{ maxWidth:"19rem", width:"max-content", backgroundColor:"rgb(50,50,50)", borderRadius:"8px", flexWrap:"wrap" }}>
                        <div style={{ fontSize:10 }}>{putName(messages,m,i,userInfo._id) && m.sender.name.split(" ")[0]}</div>
                        <div style={{ wordWrap:"break-word" }} >{m.message}</div>
                        <div className='mt-1 text-right' style={{ fontSize:8 }}>{moment(m.createdAt).format("LT")}</div>
                    </div>
                </div>
            ))}
        </ScrollableFeed>
  )
}
