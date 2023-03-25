import React from 'react'
import { Skeleton } from '@mui/material'

export const ChatLoader = () => {
  
    return (
    <>
        {[...Array.from("123456789")].map(each => (
            <Skeleton animation="wave" variant="rounded" style={{ backgroundColor:"rgb(40,40,40)", height:"78px", borderRadius:"8px" }} className="mx-2 mt-2" key={each} />
        ))}
    </>
  )
}
