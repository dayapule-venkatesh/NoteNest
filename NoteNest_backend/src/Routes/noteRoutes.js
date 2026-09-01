import express from 'express'
import { AllNotesController, DeleteNoteController, EditController, favoriteController, NewNoteController, RestoreController, TrashController } from '../Controllers/noteController.js'
import { auth } from '../Middleware/auth.js'

export const noteRouter=express.Router()

noteRouter.post('/newnote',auth, NewNoteController)

noteRouter.get('/allnotes',auth, AllNotesController)

noteRouter.patch('/favorite',auth,favoriteController)

noteRouter.patch('/edit',auth,EditController)

noteRouter.patch('/Trash',auth,TrashController)

noteRouter.patch('/restore',auth,RestoreController)

noteRouter.delete('/deleteNote',auth,DeleteNoteController)


