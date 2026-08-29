import express from 'express'
import { auth } from '../Middleware/auth.js'
import { AllUsersController, UserDetailController } from '../Controllers/userController.js'


export const  userRouter=express.Router()

userRouter.get("/userprofile",auth,UserDetailController)

userRouter.get('/userDetails',AllUsersController)