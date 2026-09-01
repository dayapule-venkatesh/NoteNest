import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'




const Note_Schema = new mongoose.Schema(
    {
        title: String,
        label: String,
        note: String,
        favorite: {
            type: Boolean,
            default: false,
        },
        Trash: {
            type: Boolean,
            default: false,
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "noteusers",
            required: true
        },
    },
    { timestamps: true }
)

export const NoteModel = model('notes', Note_Schema)