import { AllUsersService, UserDetails } from "../Services/userServices.js"

export const UserDetailController =async(req, res,next)=>{
    try{
        const email = req.user.email;
        
        const data=await UserDetails({email})
        res.status(201).json({
            message:data,
            status:true
        })


    }catch(error){
        next(error)
    }
}


export const AllUsersController=async(req,res,next)=>{
    try{
        const data=await AllUsersService()
        res.status(201).json({
            message:data,
            status:true
        })
    }catch(error){
        next(error)
    }
}