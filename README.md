# Teater Poker League 🃏

A Texas Hold'em poker league standings and scores web application built with Node.js, React, TypeScript, and Material UI.

## Features

- **League Standings** — Sortable data table showing rank, total points, wins, final tables, tournaments played, average placement, and points per tournament
- **Tournament Results** — Per-tournament results with placement, player name, points earned, and bounties
- **Dark Poker Theme** — MUI dark theme with gold/amber accents and medal highlighting (🥇🥈🥉)
- **REST API** — Express backend serving league data via JSON endpoints

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Material UI v5, MUI X DataGrid
- **Backend**: Node.js, Express, TypeScript
- **Points System**: 1st=10pts, 2nd=8pts, 3rd=6pts, 4th=5pts, 5th=4pts, 6th=3pts, 7th=2pts, 8th=1pt

## Quick Start

### Install dependencies

```bash
npm run install:all
```

### Run in development

```bash
# Terminal 1 — start the API server (port 3001)
npm run dev:server

# Terminal 2 — start the React dev server (port 5173)
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/standings` | League standings sorted by total points |
| GET | `/api/tournaments` | List of all tournaments |
| GET | `/api/tournaments/:id/results` | Results for a specific tournament |
| GET | `/api/health` | Health check |

## Project Structure

```
teaterpoker/
├── client/               # React + TypeScript frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── StandingsTable.tsx
│       │   └── TournamentResultsTable.tsx
│       ├── App.tsx
│       ├── main.tsx
│       └── types.ts
└── server/               # Node.js + Express backend
    └── src/
        ├── data/
        │   └── leagueData.ts
        └── index.ts
```