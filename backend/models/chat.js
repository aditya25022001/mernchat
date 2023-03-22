import { Schema, model } from 'mongoose'

const chatSchema = Schema({
    chatName: { 
        type: String, 
        trim: true 
    },
    isGroupChat: { 
        type: Boolean, 
        default: false 
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messages",
    },
    groupAdmin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users" 
    }},
    { timestamps: true }
)

const Chat = model("chats",chatSchema)

export default Chat