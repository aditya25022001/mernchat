import { Schema, model } from "mongoose";

const messageSchema = Schema(
  {
    sender:{ 
        type: Schema.Types.ObjectId, 
        ref: "users" 
    },
    content:{ 
        type: String, 
        trim: true 
    },
    chat:{ 
        type: Schema.Types.ObjectId, 
        ref: "chats" 
    },
    readBy: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "users" 
        }
    ],
  },
  { timestamps: true }
);

const Message = model("messages", messageSchema);

export default Message;