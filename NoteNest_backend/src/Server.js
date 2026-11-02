import http from "http";
import dotenv from "dotenv";
import { app } from "./app.js";
import { Connect_db } from "./config/Connect_db.js";
import { initChatSocket } from "./sockets/chatSocket.js";

dotenv.config();

await Connect_db();

const server = http.createServer(app);
initChatSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
