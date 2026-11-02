# NoteNest Backend

Express 5 + MongoDB API for NoteNest.

## Architecture

```text
src/
├── Routes/        URL + middleware definitions
├── Controllers/   Request/response handling
├── Services/      Business logic and database access
├── models/        Mongoose schemas
├── Middleware/    Auth and error handling
├── sockets/       Socket.IO community chat
├── config/        Database, Cloudinary, Redis setup
├── app.js         Express app
└── Server.js      HTTP server + Socket.IO bootstrap
```

Flow for every feature: **Route -> Controller -> Service -> Model**.

## Run

```bash
npm install
cp .env.example .env
npm start
```

## API overview

| Area | Routes |
| --- | --- |
| Auth | `POST /api/auth/signup`, `POST /api/auth/checkotp`, `POST /api/auth/login`, `PATCH /api/auth/forgot`, `GET /api/auth/logout`, `GET /api/auth/valid` |
| Notes | `POST /api/note/newnote`, `GET /api/note/allnotes`, `PATCH /api/note/favorite`, `/edit`, `/Trash`, `/restore`, `DELETE /api/note/deleteNote` |
| User | `GET /api/user/userprofile`, `GET /api/user/userDetails` |
| Upload | `POST /api/upload/profileimg` |
| AI | `GET /api/ai/status`, `POST /api/ai/summary` |
| Community (REST fallback) | `GET /api/chat/messages`, `POST /api/chat/messages`, `DELETE /api/chat/messages/:id` |

All note, AI and chat routes require the `token` httpOnly cookie.

## AI summaries

`Services/aiServices.js` tries providers in this order:

1. Gemini (`GEMINI_API_KEY`)
2. OpenAI (`OPENAI_API_KEY`)
3. Built-in local extractive summarizer

If a provider fails, the service logs the error and returns a local summary instead of breaking the feature.

## Community chat

- Socket.IO is attached in `Server.js` via `sockets/chatSocket.js`.
- The socket handshake reads the same `token` cookie used by the REST API.
- Messages are persisted through `Services/chatServices.js`.
- REST endpoints remain available for deployments without persistent sockets.

## Environment

Copy `.env.example` to `.env` and fill in the values.
