import User from '../models/user.js'
import asyncHandler from 'express-async-handler'
import { sendOtpEmail } from './emailController.js'
import { generateHash } from '../config/generateHash.js'
import { ulid } from 'ulid'

export const sendOtp = asyncHandler(async (req,res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if(user){
        const otp = ulid().slice(10,16)
        sendOtpEmail(user.name, email, otp)
        res.status(200).json({
            _id: user._id,
            otp:generateHash(otp),
            email: user.email
        })
    }
    else{
        res.status(404).json({ message:"User with that email not found" })
    }
})

export const resetPassword = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(user){
        user.name = user.name
        user.email = user.email
        user.password = password
        user.isAdmin = user.isAdmin
        user.lastLogin = user.lastLogin
        user.profilePic = user.profilePic
        const updatedUser = await user.save()
        res.json({
            _id:updatedUser._id,
            email: updatedUser.email,
            message:"Password Reset Successful"
        })
    }
    else{
        res.status(404).json({ message:"User with that email not found" })
    }
})
