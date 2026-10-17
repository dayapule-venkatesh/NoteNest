import mongoose from "mongoose";

const OTPSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
     type:Date,
     default:Date.now,
     expires:60*5
    }
    
})

 export const OTPModel =mongoose.model("otp",OTPSchema)
