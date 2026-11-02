import express from "express";
import {
  AIStatusController,
  SummarizeNoteController,
} from "../Controllers/aiController.js";
import { auth } from "../Middleware/auth.js";

export const aiRouter = express.Router();

aiRouter.get("/status", auth, AIStatusController);
aiRouter.post("/summary", auth, SummarizeNoteController);
