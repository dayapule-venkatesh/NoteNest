import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profile:String,
})

export const UserModel=model("noteusers",userSchema)