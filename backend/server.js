import express from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from "./middlewares/errorMidleware.js";
import { Server } from 'socket.io'

const app = express()

config();

connectDB();

const PORT = process.env.PORT || 5000

const ENV = process.env.NODE_ENV || "development"

app.use(express.json());

app.use(cors({
    origin:process.env.ALLOWED.split(" "),
    methods:["GET","PUT","POST","DELETE","PATCH"]
}))

app.use("/api/v1/user",userRoutes);

app.use("/api/v1/chat",chatRoutes);

app.use("/api/v1/message",messageRoutes);

app.get("/",(req,res) => res.send(process.env.ALLOWED.split(" ")))

app.use(notFound)

app.use(errorHandler)

const socketServer = app.listen(PORT,()=>console.log(`Server running on ${PORT} in ${ENV} mode...`))

const io = new Server(socketServer,{
    pingTimeout:100000,
    cors:{
        origin:process.env.ALLOWED.split(" "),
    }
})

io.on("connection", (socket) => {
    
    //initial connection
    console.log("Connected to socket.io");
    
    //each user when logging into application create an instance of their socket
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });

    //when logged in user enters a chat
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });


    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    //user sent a message
    socket.on("new message", (newMessageRecieved) => {

        //which chat it belongs to
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        
        //send to everyone apart from sender
        chat?.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
  
    //logged off from app
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });