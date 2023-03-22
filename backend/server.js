import express from "express";
import cors from 'cors'
import path from 'path'
import authRoutes from './routes/authRoutes.js'
import { config } from 'dotenv'
import { connectDB } from './config/db.js'
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

const __dirname = path.resolve();

console.timeLog(__dirname)

app.use("/api/v1/auth",authRoutes);

app.use(notFound)

app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server running on ${PORT} in ${ENV} mode...`))