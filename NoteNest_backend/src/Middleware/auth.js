import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../models/Users.js'


dotenv.config()


export const auth=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        const valid= jwt.verify(token,process.env.SECRET)
        
        if(valid){
            const user=await UserModel.findOne({email:valid.email})
            
            req.user=user;
            next()
        }

    }catch(error){
       
        res.json({
            message:"invalid token",
            status:false
        })
     

    }



}