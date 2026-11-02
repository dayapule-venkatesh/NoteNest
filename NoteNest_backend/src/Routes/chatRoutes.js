import express from "express";
import {
  CreateMessageController,
  DeleteMessageController,
  GetMessagesController,
} from "../Controllers/chatController.js";
import { auth } from "../Middleware/auth.js";

export const chatRouter = express.Router();

// REST fallback for deployments without long-lived socket connections.
chatRouter.get("/messages", auth, GetMessagesController);
chatRouter.post("/messages", auth, CreateMessageController);
chatRouter.delete("/messages/:id", auth, DeleteMessageController);
