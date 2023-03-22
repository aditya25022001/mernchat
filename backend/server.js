import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/db.js'

dotenv.config();

const app = express()

connectDB();

const PORT = process.env.PORT || 5000

const ENV = process.env.NODE_ENV || "development"

app.use(cors({
    origin:process.env.ALLOWED.split(" "),
    methods:["GET","PUT","POST","DELETE","PATCH"]
}))

const __dirname = path.resolve();

console.timeLog(__dirname)


app.listen(PORT,()=>console.log(`Server running on ${PORT} in ${ENV} mode...`))