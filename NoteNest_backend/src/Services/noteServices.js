import {NoteModel} from '../models/Notes.js'
export const NewNoteService=async({title,label, note})=>{
 
    const send = new NoteModel({ title, label, note });
    await send.save();

}


export const AllNotesService=async()=>{
    const notes=await NoteModel.find()
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