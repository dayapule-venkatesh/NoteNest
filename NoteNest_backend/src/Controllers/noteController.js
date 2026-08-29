import { AllNotesService, EditService, FavoriteService, NewNoteService } from "../Services/noteServices.js";

export const NewNoteController=async(req,res,next)=>{

    try{
            const { title, label, note } = req.body;
            await NewNoteService({title,label,note})
            res.status(201).json({
                message:"saved Successful",
                status:true,
            })

    }catch(error){
        next(error)

    }

}

export const AllNotesController=async(req,res,next)=>{
  try{
     const notes=await AllNotesService()
     res.status(201).json({
        message:"Notes are present",
        status:true,
        notes

     })
  }
  catch(error){
    next(error)
  }
}


export const favoriteController=async(req,res,next)=>{
  try{
    const {id,favorite}=req.body;
    const data=await FavoriteService({id,favorite})
    res.status(201).json({
      message:"This note is your favorite",
      status:true,
      note:data
    })
  }catch(error){
    next(error)
  }
}


export const EditController=async(req,res,next)=>{
  try{
    const {id,title,label,note}=req.body;
    const update=await EditService({id,title,label,note});

    res.status(201).json({
      message:"note is edited",
      status:true,
      note:update,
    })

  }catch(error){next(error)}
}