import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./Middleware/errorMiddleware.js";
import { authRouter } from "./Routes/authRoutes.js";
import { userRouter } from "./Routes/userRoutes.js";
import { noteRouter } from "./Routes/noteRoutes.js";
import { uploadRouter } from "./Routes/uploadRoutes.js";

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// app.use("/uploads", express.static("uploads"));

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/note',noteRouter)
app.use('/api/upload',uploadRouter)
app.use(errorMiddleware);
