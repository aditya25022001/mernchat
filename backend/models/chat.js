import { Schema, model } from 'mongoose'

const chatSchema = Schema({
    name: { 
        type: String, 
        trim: true 
    },
    isGroup: { 
        type: Boolean, 
        default: false 
    },
    users: [{ type: Schema.Types.ObjectId, ref: "users" }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "messages"
    },
    groupAdmin: { 
        type: Schema.Types.ObjectId, 
        ref: "users" 
    }},
    { timestamps: true }
)

const Chat = model("chats",chatSchema)

export default Chat