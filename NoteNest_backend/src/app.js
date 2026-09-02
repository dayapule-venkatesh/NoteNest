import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./Middleware/errorMiddleware.js";
import { authRouter } from "./Routes/authRoutes.js";
import { userRouter } from "./Routes/userRoutes.js";
import { noteRouter } from "./Routes/noteRoutes.js";
import { uploadRouter } from "./Routes/uploadRoutes.js";
import dotenv from 'dotenv'

dotenv.config()
export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/note',noteRouter)
app.use('/api/upload',uploadRouter)
app.use(errorMiddleware);
