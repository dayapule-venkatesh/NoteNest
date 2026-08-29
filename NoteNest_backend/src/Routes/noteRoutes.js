import express from 'express'
import { AllNotesController, EditController, favoriteController, NewNoteController } from '../Controllers/noteController.js'

export const noteRouter=express.Router()

noteRouter.post('/newnote', NewNoteController)

noteRouter.get('/allnotes', AllNotesController)

noteRouter.patch('/favorite',favoriteController)

noteRouter.patch('/edit',EditController)


