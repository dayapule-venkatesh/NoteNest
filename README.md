# NoteNest

NoteNest is a notes workspace with a rich-text editor, AI-powered note summaries, favorites, trash recovery and a live community chat.

## Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React 19, Vite, React Router, Redux Toolkit, Tailwind CSS 4, TipTap |
| Backend | Node.js, Express 5, MongoDB/Mongoose, JWT cookies, Socket.IO |
| Services | Cloudinary (profile photos), Nodemailer (email OTP), Gemini/OpenAI (optional AI summaries) |

## Project structure

```text
NoteNest/
├── NoteNest_backend/
│   ├── api/index.js          # Vercel serverless entry (REST only)
│   └── src/
│       ├── Routes/           # URL definitions only
│       ├── Controllers/      # HTTP request/response handling
│       ├── Services/         # Business logic + database access
│       ├── models/           # Mongoose schemas
│       ├── Middleware/       # Auth + error handling
│       ├── Validators/       # Auth validation response
│       ├── sockets/          # Socket.IO community chat
│       ├── config/           # Mongo, Cloudinary, Redis
│       ├── app.js            # Express app + route registration
│       └── Server.js         # HTTP server + Socket.IO bootstrap
└── NoteNest_frontend/
    └── src/
        ├── Pages/            # Route-level screens
        ├── Components/       # Reusable UI + feature components
        ├── Features/         # Redux slices / API thunks
        ├── Routes/           # Router + protected layout
        ├── Store/            # Redux store
        ├── actions/          # React Router form actions
        ├── hooks/            # Socket.IO chat hook + REST fallback
        └── utils/            # Dates, note text, toast helpers
```

## MVC flow

Every backend feature follows the same path:

```text
Route -> Controller -> Service -> Model
```

- **Route** declares the URL and attaches middleware (`auth`).
- **Controller** reads `req`, calls a service, and returns a JSON response.
- **Service** contains business rules and all database queries.
- **Model** describes the MongoDB document.

Examples added in this version:

```text
Routes/chatRoutes.js
  -> Controllers/chatController.js
  -> Services/chatServices.js
  -> models/Message.js

Routes/aiRoutes.js
  -> Controllers/aiController.js
  -> Services/aiServices.js
  -> models/Notes.js (read-only)
```

## New features

### AI note summaries

- `POST /api/ai/summary` with `{ noteId }`.
- Uses Gemini when `GEMINI_API_KEY` exists, then OpenAI when `OPENAI_API_KEY` exists.
- Falls back to a built-in extractive summarizer when no key is configured or a provider fails.
- Notes are HTML from TipTap, so the service converts them to plain text first.
- Ownership is checked: a user can only summarize their own notes.

### Community chat

- Real-time room (`#general`) powered by Socket.IO.
- Messages are stored in MongoDB (`Message` model) and authenticated with the same JWT cookie as the REST API.
- Typing indicators, online member list, message deletion and REST history.
- REST endpoints (`GET/POST/DELETE /api/chat/messages`) act as a fallback when a persistent socket cannot be used (for example on Vercel serverless).

### UI redesign

- Warm editorial design system (paper, forest green and clay) in `src/index.css`.
- Shared components: `AuthShell`, `PageHeader`, `EmptyState`, `ConfirmDialog`, `AISummary`, `Toaster`.
- Redesigned landing page, auth flow, dashboard, notes library, favorites, trash, note detail, editor, profile and community.
- Responsive sidebar/topbar and toast notifications instead of browser alerts.

## Local setup

### 1. Backend

```bash
cd NoteNest_backend
npm install
cp .env.example .env   # fill in your own values
npm start
```

The API runs at `http://localhost:3000`.

### 2. Frontend

```bash
cd NoteNest_frontend
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment variables

### Backend

See `NoteNest_backend/.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB` | yes | MongoDB connection string |
| `SECRET` | yes | JWT signing secret |
| `FRONTEND_URL` | yes | Allowed CORS + Socket.IO origin |
| `COMPANY_EMAIL`, `COMPANY_PASSWORD` | yes | Nodemailer Gmail account for OTP email |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | yes | Profile photo uploads |
| `GEMINI_API_KEY` | optional | Gemini summaries |
| `OPENAI_API_KEY` | optional | OpenAI summaries |
| `GEMINI_MODEL`, `OPENAI_MODEL` | optional | Override default AI models |
| `AI_PROVIDER` | optional | Force `gemini` or `openai` |

If no AI key is present, AI summaries still work with the local summarizer.

### Frontend

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend URL used by Axios |
| `VITE_SOCKET_URL` | Optional Socket.IO URL; defaults to `VITE_API_URL` |

## Deployment note

Socket.IO needs a long-running Node process (Render, Railway, Fly.io, etc.). Vercel serverless functions can only serve the REST endpoints, so the community page automatically switches to REST polling when the socket cannot connect.
