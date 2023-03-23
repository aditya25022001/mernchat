import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import { generateToken } from '../config/generateToken.js'
import { welcomeEmail, sendLoginWarningEmail } from './emailController.js';

export const register = asyncHandler(async(req,res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if(userExists){
        res.status(400).json({
            message:"User with this email exists"
        })
    }
    else{
        const user = User.create({ email, password, name, lastLogin:Date.now() })
        if(user){
            welcomeEmail(name,email)
            res.status(201).json({
                message:"User registered successfully",
                _id:user._id,
                name:user.name,
                email:user.email,
                lastLogin:user.lastLogin,
                isAdmin:user.isAdmin,
                profilePic:user.profilePic,
                token:generateToken(user._id)
            })
        }
        else{
            res.status(400).json({
                message:"Invalid user data"
            })
        }
    }
})

export const login = asyncHandler(async (req,res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if(userExists){
        if(await userExists.matchPassword(password)) {
            await User.findOneAndUpdate({ email:email },{ lastLogin:Date.now() })
            res.status(200).json({
                _id: userExists._id,
                name:userExists.name,
                email:userExists.email,
                isAdmin:userExists.isAdmin,
                profilePic:userExists.profilePic,
                lastLogin : userExists.lastLogin,
                token: generateToken(userExists._id),
            })
        }
        else{
            sendLoginWarningEmail(userExists.name, email)
            res.status(401).json({
                message:"Bad credentials"
            })
        }
    }
    else{
        res.status(404).json({
            message:"User not found"
        })
    }
})

export const listUsers = asyncHandler(async(req,res) => {
    const users = await User.find({}).find({ _id: { $ne: req.user._id } }).select("-password")
    if(users) res.status(200).json({
        message:"Retrieved list of users",
        users
    })
    else{
        res.status(500).json({
            message:"Error in fetching users"
        })
    }
})