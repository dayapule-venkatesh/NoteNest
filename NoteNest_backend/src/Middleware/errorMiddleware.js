export const errorMiddleware=(err,req,res,next)=>{

    res.json({
        status:false,
        message:err.message
    })

}