import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'




const Note_Schema=new mongoose.Schema(
    {
        title:String,
        label:String,
        note:String,
        favorite:{
            type:Boolean,
            default:false,
        }
        
    },
    {timestamps:true}
)

export const NoteModel=model('notes',Note_Schema)