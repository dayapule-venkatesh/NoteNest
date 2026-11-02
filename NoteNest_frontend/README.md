# NoteNest Frontend

React 19 + Vite + Tailwind CSS 4 client for NoteNest.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend API URL |
| `VITE_SOCKET_URL` | Optional Socket.IO URL (defaults to `VITE_API_URL`) |

## Structure

```text
src/
├── Pages/        Route-level screens (Dashboard, AllNotes, Community, ...)
├── Components/   Shared UI (AuthShell, PageHeader, NoteCard, AISummary, ...)
├── Features/     Redux slices and API thunks
├── Routes/       Router and protected layout
├── Store/        Redux store
├── actions/      React Router form actions
├── hooks/        useCommunityChat (Socket.IO + REST fallback)
├── utils/        Date, note text and toast helpers
└── index.css     Tailwind theme + design system + rich-text styles
```

## Community chat

`hooks/useCommunityChat.js` connects to Socket.IO with the auth cookie. If the
socket cannot connect (for example on a serverless host), it automatically
falls back to REST polling every 4 seconds, so the page stays usable.
