import { AllNotesService, DeleteService, EditService, FavoriteService, NewNoteService, RestoreService, TrashService } from "../Services/noteServices.js";

export const NewNoteController=async(req,res,next)=>{

    try{
            const { title, label, note} = req.body;
          
            const userid=req.user._id;
            

            await NewNoteService({title,label,note,userid})
            res.status(201).json({
                message:"saved Successful",
                status:true,
            })

    }catch(error){
        next(error)

    }

}

export const  AllNotesController=async(req,res,next)=>{
  try{

     const notes=await AllNotesService(req.user._id)
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

export const TrashController=async(req,res,next)=>{
  try{
    const {id}=req.body
    const trashData=await TrashService({id});
    res.status(201).json({
      message:"sucessfully note is Trashed",
      status:true,
      note:trashData,
    })


  }catch(error){next(error)}
}

export const RestoreController=async(req,res,next)=>{
  try{
    const {id}=req.body
    const restoreData=await RestoreService({id});
    res.status(201).json({
      message:"Restored Sucessfully",
      status:true,
      note:restoreData,
    })
  }catch(error){next(error)}
}


export const DeleteNoteController=async(req,res,next)=>{
  try{
    const {id}=req.body;
    const deleteNote=await DeleteService({id});
    res.status(201).json({
      message:"Note deleted permanently",
      status:true,
    })
  }
  
  catch(error){
    next(error)
  }
}