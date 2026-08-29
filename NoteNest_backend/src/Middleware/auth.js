import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()


export const auth=(req,res,next)=>{
    try{
        const {token}=req.cookies
        const valid= jwt.verify(token,process.env.SECRET)
        if(valid){
            req.user=valid;
            next()
        }

    }catch(error){
       
        res.json({
            message:"invalid token",
            status:false
        })
     

    }



}