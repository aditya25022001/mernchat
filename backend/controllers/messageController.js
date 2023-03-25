import asyncHandler from 'express-async-handler'
import Chat from '../models/chat.js'
import Message from '../models/message.js'
import User from '../models/user.js'

export const allMessages = asyncHandler(async(req,res) => {
    const chatId = req.params.chatId
    if(!chatId) res.status(400).json({ message:"chatid required" });
    const chat = await Message.find({ chat:chatId }).populate("sender","name profilePic email").populate("chat")
    if(chat)
        res.status(200).json({
        message:"success",
        chat
        })
    else res.status(404).json({ message:"chat not found" })
})

export const sendMessage = asyncHandler(async(req,res) => {
    const { message, chatId } = req.body
    if(!chatId) res.status(400).json({ message:"chatid required" })
    else{
        let newMessage = await Message.create({ 
            sender : req.user._id,
            message,
            chat:chatId
        })
        newMessage = await newMessage.populate("sender","name profilePic");
        newMessage = await newMessage.populate("chat");
        newMessage = await User.populate(newMessage,{
            path:"chat.users",
            select:"name profilePic email"
        })
        await Chat.findByIdAndUpdate(chatId,{ latestMessage:newMessage }) 
        res.status(201).json({
            message:"Success",
            newMessage
        })
    }
})
