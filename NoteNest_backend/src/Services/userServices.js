import { UserModel } from "../models/Users.js";

export const UserDetails= async({email})=>{

    const data = await UserModel.findOne({ email: email }).select("-password");
    if(data) return data
    throw new Error("userDetails not found")
}


export const AllUsersService=async()=>{
    const data=await UserModel.find().select("name email profile")
    if(data) return data
    throw new Error("there is no user data")
}