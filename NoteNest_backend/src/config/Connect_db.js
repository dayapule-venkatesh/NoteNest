import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const Connect_db=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGODB)
        console.log("mongodb connected")

    }
    catch(error){
        console.log(error)
    }
}