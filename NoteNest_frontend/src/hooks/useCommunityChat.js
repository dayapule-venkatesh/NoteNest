import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { API_URL } from "../Features/API";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL;

const sortMessages = (messages) =>
  [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

const mergeMessages = (current, incoming) => {
  const map = new Map(current.map((message) => [message._id, message]));
  incoming.forEach((message) => map.set(message._id, message));
  return sortMessages([...map.values()]);
};

export const useCommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [presence, setPresence] = useState({ online: 0, users: [] });
  const [typingUsers, setTypingUsers] = useState({});
  const [connected, setConnected] = useState(false);
  const [connectionNote, setConnectionNote] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);
  const pollingRef = useRef(null);
  const typingTimers = useRef(new Map());

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/messages`, {
        withCredentials: true,
        params: { limit: 50 },
      });

      if (response.data.status) {
        setMessages((current) => mergeMessages(current, response.data.messages));
      }
    } catch {
      setConnectionNote("Chat is unavailable right now. Please try again soon.");
    } finally {
      setLoading(false);
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      window.clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    if (pollingRef.current) return;
    fetchMessages();
    pollingRef.current = window.setInterval(fetchMessages, 4000);
  }, [fetchMessages]);

  useEffect(() => {
    let active = true;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 3,
      reconnectionDelay: 1500,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setConnectionNote("");
      stopPolling();
    });

    socket.on("disconnect", () => {
      setConnected(false);
      setConnectionNote("Live connection paused. Messages will refresh automatically.");
      startPolling();
    });

    socket.on("connect_error", (error) => {
      setConnected(false);
      setConnectionNote(
        error?.message || "Live chat is unavailable. Using automatic refresh instead.",
      );
      startPolling();
    });

    socket.on("chat:history", (history) => {
      if (!active) return;
      setMessages((current) => mergeMessages(current, history || []));
      setLoading(false);
    });

    socket.on("chat:message", (message) => {
      if (!active) return;
      setMessages((current) => mergeMessages(current, [message]));
      setLoading(false);
    });

    socket.on("chat:deleted", ({ messageId }) => {
      setMessages((current) =>
        current.filter((message) => message._id !== messageId),
      );
    });

    socket.on("chat:presence", (data) => {
      setPresence(data || { online: 0, users: [] });
    });

    socket.on("chat:typing", ({ user, isTyping }) => {
      if (!user?._id) return;

      setTypingUsers((current) => {
        const next = { ...current };
        if (isTyping) next[user._id] = user;
        else delete next[user._id];
        return next;
      });

      const existingTimer = typingTimers.current.get(user._id);
      if (existingTimer) window.clearTimeout(existingTimer);

      if (isTyping) {
        const timer = window.setTimeout(() => {
          setTypingUsers((current) => {
            const next = { ...current };
            delete next[user._id];
            return next;
          });
        }, 3500);
        typingTimers.current.set(user._id, timer);
      }
    });

    socket.on("chat:error", ({ message }) => {
      if (message) setConnectionNote(message);
    });

    fetchMessages();

    const timers = typingTimers.current;

    return () => {
      active = false;
      stopPolling();
      socket.disconnect();
      socketRef.current = null;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [fetchMessages, startPolling, stopPolling]);

  const sendMessage = useCallback(async (text) => {
    const cleanText = String(text || "").trim();
    if (!cleanText) return false;

    const socket = socketRef.current;

    if (socket?.connected) {
      return new Promise((resolve) => {
        socket.timeout(8000).emit("chat:message", { text: cleanText }, (error, response) => {
          if (error || !response?.status) {
            setConnectionNote(response?.message || "Message could not be sent.");
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }

    // REST fallback for serverless deployments.
    try {
      const response = await axios.post(
        `${API_URL}/api/chat/messages`,
        { text: cleanText },
        { withCredentials: true },
      );

      if (response.data.status) {
        setMessages((current) => mergeMessages(current, [response.data.data]));
        return true;
      }
    } catch (error) {
      setConnectionNote(
        error?.response?.data?.message || "Message could not be sent.",
      );
    }

    return false;
  }, []);

  const deleteMessage = useCallback(async (messageId) => {
    const socket = socketRef.current;

    if (socket?.connected) {
      socket.emit("chat:delete", { messageId }, () => {});
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/chat/messages/${messageId}`, {
        withCredentials: true,
      });
      setMessages((current) =>
        current.filter((message) => message._id !== messageId),
      );
    } catch (error) {
      setConnectionNote(
        error?.response?.data?.message || "Message could not be deleted.",
      );
    }
  }, []);

  const setTyping = useCallback((isTyping) => {
    socketRef.current?.emit("chat:typing", { isTyping });
  }, []);

  return {
    messages,
    presence,
    typingUsers: Object.values(typingUsers),
    connected,
    connectionNote,
    clearConnectionNote: () => setConnectionNote(""),
    loading,
    sendMessage,
    deleteMessage,
    setTyping,
  };
};
