import { MessageModel } from "../models/Message.js";

const SENDER_FIELDS = "name email profile";

/**
 * Chat service layer.
 * Controllers and sockets only deal with HTTP/socket concerns; all database
 * access for the community room lives here.
 */

export const GetMessagesService = async ({
  room = "community",
  limit = 50,
  before,
} = {}) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);
  const filter = { room };

  if (before) {
    const beforeDate = new Date(before);
    if (!Number.isNaN(beforeDate.getTime())) {
      filter.createdAt = { $lt: beforeDate };
    }
  }

  const messages = await MessageModel.find(filter)
    .sort({ createdAt: -1 })
    .limit(safeLimit)
    .populate("sender", SENDER_FIELDS)
    .lean();

  // Query is newest-first so pagination is cheap, but the UI reads oldest-first.
  return messages.reverse();
};

export const CreateMessageService = async ({
  sender,
  text,
  room = "community",
}) => {
  const cleanText = String(text || "").trim();

  if (!cleanText) {
    const error = new Error("Message cannot be empty");
    error.status = 400;
    throw error;
  }

  if (cleanText.length > 1000) {
    const error = new Error("Message cannot be longer than 1000 characters");
    error.status = 400;
    throw error;
  }

  const message = await MessageModel.create({
    sender,
    room,
    text: cleanText,
  });

  return message.populate("sender", SENDER_FIELDS);
};

export const DeleteMessageService = async ({ id, sender }) => {
  const message = await MessageModel.findOneAndDelete({
    _id: id,
    sender,
  }).populate("sender", SENDER_FIELDS);

  if (!message) {
    const error = new Error("Message not found or you cannot delete it");
    error.status = 404;
    throw error;
  }

  return message;
};
