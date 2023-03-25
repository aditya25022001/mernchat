import { Schema, model } from "mongoose";

const messageSchema = Schema({
    sender:{ 
        type: Schema.Types.ObjectId, 
        ref: "users" 
    },
    message:{ 
        type: String, 
        trim: true 
    },
    chat:{ 
        type: Schema.Types.ObjectId, 
        ref: "chats" 
    },
  },
  { timestamps: true }
);

const Message = model("messages", messageSchema);

export default Message;