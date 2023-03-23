import asyncHandler from 'express-async-handler';
import Chat from '../models/chat.js';
import User from '../models/user.js';

export const p2pChat = asyncHandler(async(req,res) => {
    const userID = req.params.id
    if(!userID) res.status(400).json({ message:"userID variable not sent" })
    let isChat = await Chat.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userID } } },
        ],
    })
    .populate("users", "-password")
    .populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name profilePic email",
    });
    if (isChat.length > 0){
        res.status(200).json({
            message:"chat retrieved successfully",
            chat:isChat[0]
        })
    } else{
        const createdChat = await Chat.create({ name:"sender", users:[req.user._id, userID] })
        const chat = await Chat.findOne({ _id:createdChat._id }).populate("users","-password")
        if(createdChat && chat){
            res.status(201).json({
                message:"Chat created successfully",
                chat
            })
        }
        else{
            res.status(500).json({
                message:"error creating chat"
            })
        }
    }
})

export const getUserChats = asyncHandler(async(req,res) => {
    const uid = req.user._id;
    let chats = await Chat.find({ users:{ $elemMatch: { $eq:uid } } })
                .populate("users","-password")
                .populate("groupAdmin","-password")
                .populate("latestMessage")
                .sort({ updatedAt:-1 });
    if(chats){
        chats = await User.populate(chats,{
            path:"latestMessage.sender",
            select:"name profilePic email"
        })
        res.status(200).json({
            message:"chats retrieved successfully",
            chats
        })
    }
    else{
        if(!uid) res.status(401).json({ message:"Not authorized, login first" })
        else res.status(500).json({ message:"Error finding chats" });
    }
})

export const createGroupChat = asyncHandler(async(req,res) => {
    let { name, users } = req.body
    users = [...users, req.user]
    const groupChat = await Chat.create({ name, isGroup:true, users, groupAdmin:req.user })
    if(groupChat){
        const result = await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");
        if(result){
            res.status(201).json({
                message:"Group created successfully",
                groupChat:result
            })
        }
    }
    else{
        res.status(500).json({
            message:"Error creating group"
        })
    }
})

export const modifyGroup = asyncHandler(async(req,res) => {
    const { gid, name, users } = req.body
    const gChat = await Chat.findById(gid)
    if(gChat){
        gChat.name = name || gChat.name
        gChat.isGroup = gChat.isGroup
        gChat.users = users ? [...users,req.user] : gChat.users
        gChat.latestMessage = gChat.latestMessage
        gChat.groupAdmin = gChat.groupAdmin
        const updatedGroup = await gChat.save()
        if(updatedGroup){
            const gData = await Chat.findById(updatedGroup._id).populate("users","-password").populate("groupAdmin","-password")
            res.status(200).json({
                message:"Group details altered successfully",
                groupData:gData
            })
        }
    }
    else{
        res.status(404).json({
            message:"Group not found"
        })
    }
})