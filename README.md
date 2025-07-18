# Real-Time Cursor Sharing App

![App Screenshot](client/public/Screenshot%202025-07-18%20145315.png)

This project is a real-time collaborative cursor sharing application built with React (client) and Node.js (server) using WebSockets. Multiple users can join, see each other's mouse movements live, and interact in real time.

## Features

- Real-time mouse cursor sharing between users
- Simple login with username
- Live updates using WebSockets
- Modern React frontend with Vite
- TypeScript for type safety

## Project Structure

```
realtime-cursor/
├── client/           # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── Home.tsx
│   │   ├── components/
│   │   │   ├── Cursor.tsx
│   │   │   └── Login.tsx
│   │   └── hooks/
│   │       └── usePerfectCursors.tsx
│   ├── public/
│   ├── index.html
│   └── ...
├── server/           # Node.js WebSocket backend
│   └── index.ts
└── ...
```

## How It Works

- Users enter a username to join.
- The client connects to the WebSocket server and sends mouse coordinates on movement (throttled for performance).
- The server tracks all connected users and their cursor positions, broadcasting updates to all clients.
- Each client renders all active users' cursors in real time.

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- Bun (for server, or use npm/yarn with minor adjustments)

### Install Dependencies

#### Client

```sh
cd client
bun install   # or npm install
```

#### Server

```sh
cd server
bun install   # or npm install
```

### Run the App

#### Start the Server

```sh
cd server
bun run index.ts   # or node index.ts
```

#### Start the Client

```sh
cd client
bun run dev   # or npm run dev
```

Open your browser at `http://localhost:5173` (or the port shown in the terminal).

## Usage

1. Enter a username to join.
2. Move your mouse—your cursor will be visible to all connected users.
3. See other users' cursors move in real time.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, react-use-websocket, lodash.throttle
- **Backend:** Node.js, ws (WebSocket), TypeScript, uuid

## Customization

- Update the UI in `client/src/components/` as needed.
- Extend the server logic in `server/index.ts` for more features (e.g., chat, user colors).

## License

MIT
