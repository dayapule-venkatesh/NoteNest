import express from 'express'

import { ProfileImageController } from '../Controllers/uploadController.js';
import multer from 'multer';
import { auth } from '../Middleware/auth.js';

export const uploadRouter=express.Router();


const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
});

uploadRouter.post("/profileimg",auth, upload.single("profileImage"),ProfileImageController)