import express from 'express'
import { AllNotesController, DeleteNoteController, EditController, favoriteController, NewNoteController, RestoreController, TrashController } from '../Controllers/noteController.js'

export const noteRouter=express.Router()

noteRouter.post('/newnote', NewNoteController)

noteRouter.get('/allnotes', AllNotesController)

noteRouter.patch('/favorite',favoriteController)

noteRouter.patch('/edit',EditController)

noteRouter.patch('/Trash',TrashController)

noteRouter.patch('/restore',RestoreController)

noteRouter.delete('/deleteNote',DeleteNoteController)


