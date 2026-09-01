import {NoteModel} from '../models/Notes.js'
import { UserModel } from '../models/Users.js';
export const NewNoteService=async({title,label, note,userid})=>{
    
 
    const send = new NoteModel({ title:title, label:label, note:note, userid:userid });
    await send.save();

}


export const AllNotesService=async(id)=>{
    const notes=await NoteModel.find({userid:id})
  

   if(notes) return notes;
   throw new Error("notes are not present ")
}

export const FavoriteService=async({id,favorite})=>{
    const note=await NoteModel.findByIdAndUpdate(
        {_id:id},{favorite:favorite}
    )
    if(note)return note;
    throw new Error("favorite is not updated")
}


export const EditService=async({id, title,label,note})=>{
    const notes=await NoteModel.findByIdAndUpdate({_id:id},{title:title,label:label,note:note})
    if(notes)return notes;
    throw new Error("note is not edited")
}


export const TrashService=async({id})=>{
    const notes=await NoteModel.findByIdAndUpdate({_id:id},{Trash:true});
    notes.save()
    if(notes)return notes;
    throw new Error("note is not deleted")
}

export const RestoreService=async({id})=>{
    const notes=await NoteModel.findByIdAndUpdate({_id:id},{Trash:false});
    notes.save()
    if(notes)return notes;
    throw new Error("unable to restore")
}

export const DeleteService=async({id})=>{
    const note=await NoteModel.findByIdAndDelete(id);
    
    if(note)return note;
    throw new Error("note is not deleted")
}