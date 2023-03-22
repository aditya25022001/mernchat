import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`MongoDB connected successfully at ${connection.connection.host}...`)
    }
    catch(err){
        console.error(`Error connecting to MongoDB - ${err.message}`)
        process.exit(1)
    }
}