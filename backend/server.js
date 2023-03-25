import express from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from "./middlewares/errorMidleware.js";

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

app.listen(PORT,()=>console.log(`Server running on ${PORT} in ${ENV} mode...`))