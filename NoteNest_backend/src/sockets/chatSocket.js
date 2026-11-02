import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/Users.js";
import {
  CreateMessageService,
  DeleteMessageService,
  GetMessagesService,
} from "../Services/chatServices.js";

dotenv.config();

const COMMUNITY_ROOM = "community";

const parseCookies = (cookieHeader = "") =>
  cookieHeader.split(";").reduce((cookies, part) => {
    const separator = part.indexOf("=");
    if (separator === -1) return cookies;

    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();

    if (key) {
      try {
        cookies[key] = decodeURIComponent(value);
      } catch {
        cookies[key] = value;
      }
    }

    return cookies;
  }, {});

const toPublicUser = (user) => ({
  _id: String(user._id),
  name: user.name,
  email: user.email,
  profile: user.profile || "",
});

/**
 * Socket.IO layer. Authentication uses the same httpOnly JWT cookie as the
 * REST API, so the browser never needs to expose the token to JavaScript.
 */
export const initChatSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  // userId -> { user, socketIds:Set }
  const onlineUsers = new Map();

  const presence = () => ({
    online: onlineUsers.size,
    users: [...onlineUsers.values()].map((entry) => entry.user),
  });

  const broadcastPresence = () => {
    io.to(COMMUNITY_ROOM).emit("chat:presence", presence());
  };

  const addPresence = (socket) => {
    const id = String(socket.user._id);
    const existing = onlineUsers.get(id);

    if (existing) {
      existing.socketIds.add(socket.id);
    } else {
      onlineUsers.set(id, {
        user: toPublicUser(socket.user),
        socketIds: new Set([socket.id]),
      });
    }
  };

  const removePresence = (socket) => {
    const id = String(socket.user._id);
    const existing = onlineUsers.get(id);
    if (!existing) return;

    existing.socketIds.delete(socket.id);
    if (existing.socketIds.size === 0) {
      onlineUsers.delete(id);
    }
  };

  io.use(async (socket, next) => {
    try {
      const cookies = parseCookies(socket.handshake.headers.cookie);
      const token = cookies.token;

      if (!token) {
        return next(new Error("Please log in to join the community"));
      }

      const payload = jwt.verify(token, process.env.SECRET);
      const user = await UserModel.findOne({ email: payload.email }).select(
        "name email profile",
      );

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user.toObject();
      next();
    } catch {
      next(new Error("Session expired. Please log in again."));
    }
  });

  io.on("connection", async (socket) => {
    addPresence(socket);
    socket.join(COMMUNITY_ROOM);
    broadcastPresence();

    try {
      const history = await GetMessagesService({
        room: COMMUNITY_ROOM,
        limit: 50,
      });
      socket.emit("chat:history", history);
    } catch (error) {
      socket.emit("chat:error", { message: error.message });
    }

    socket.on("chat:message", async (payload, acknowledge) => {
      try {
        const message = await CreateMessageService({
          sender: socket.user._id,
          text: payload?.text,
          room: COMMUNITY_ROOM,
        });

        io.to(COMMUNITY_ROOM).emit("chat:message", message);
        acknowledge?.({ status: true });
      } catch (error) {
        acknowledge?.({ status: false, message: error.message });
        socket.emit("chat:error", { message: error.message });
      }
    });

    socket.on("chat:typing", (payload) => {
      socket.to(COMMUNITY_ROOM).emit("chat:typing", {
        user: toPublicUser(socket.user),
        isTyping: Boolean(payload?.isTyping),
      });
    });

    socket.on("chat:delete", async (payload, acknowledge) => {
      try {
        const deleted = await DeleteMessageService({
          id: payload?.messageId,
          sender: socket.user._id,
        });

        io.to(COMMUNITY_ROOM).emit("chat:deleted", {
          messageId: String(deleted._id),
        });
        acknowledge?.({ status: true });
      } catch (error) {
        acknowledge?.({ status: false, message: error.message });
      }
    });

    socket.on("disconnect", () => {
      removePresence(socket);
      broadcastPresence();
    });
  });

  return io;
};
