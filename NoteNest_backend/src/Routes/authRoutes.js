import express from 'express'
import {  Signup,Login,Forgot,Logout} from '../Controllers/authController.js';
import { Validator } from '../Validators/Validators.js';
import {auth} from "../Middleware/auth.js"

import { UserModel } from '../models/Users.js';

export const authRouter= express.Router()

authRouter.post("/signup",Signup);

authRouter.post('/login',Login);

authRouter.patch('/forgot',Forgot);

authRouter.get("/logout",Logout);

authRouter.get("/valid",auth,Validator)



