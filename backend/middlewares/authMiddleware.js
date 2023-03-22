import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

export const authenticate = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password");
        } catch (error) {
            res.status(401).json({
                message:"Token failed, Sign in again",
                error
            })
        }
    }
    if(!token){
        res.status(401).json({
            message:"Not authorized",
        })
    }
    next();
})

export const admin = asyncHandler(async(req,res,next) => {
    if(req.user && req.user.isAdmin) next();
    else res.status(401).json({
        message:"Not an admin"
    })
})