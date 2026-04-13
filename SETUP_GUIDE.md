# Teater Poker League - Setup & Usage Guide

A complete Texas Hold'em poker league standings web application built with React, TypeScript, Express, and Material-UI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Two terminal windows

### Setup Instructions

1. **Install Backend Dependencies**
```bash
cd /home/runner/work/teaterpoker/teaterpoker/server
npm install
```

2. **Install Frontend Dependencies**
```bash
cd /home/runner/work/teaterpoker/teaterpoker/client
npm install
```

### Running the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Output: 🃏 Teater Poker League API running on http://localhost:3001
```

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
# Output: Ready in xxx ms
# Local: http://localhost:5173
```

**Then open your browser:**
```
http://localhost:5173
```

---

## 📁 Project Structure

```
teaterpoker/
├── server/
│   ├── src/
│   │   ├── index.ts              # Express server with 3 API endpoints
│   │   └── data/
│   │       └── leagueData.ts     # Sample data & calculations
│   ├── dist/                     # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── client/
│   ├── src/
│   │   ├── main.tsx              # React entry with MUI theme
│   │   ├── App.tsx               # Main app with tabs
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── index.css             # Global styles
│   │   └── components/
│   │       ├── StandingsTable.tsx
│   │       └── TournamentResultsTable.tsx
│   ├── dist/                     # Production build
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── SETUP_GUIDE.md (this file)
```

---

## 🎮 API Endpoints

All endpoints run on `http://localhost:3001`

### 1. GET /api/standings
Returns league standings ranked by total points.

### 2. GET /api/tournaments
Returns all tournaments in the league.

### 3. GET /api/tournaments/:id/results
Returns results for a specific tournament.

Example: `GET /api/tournaments/t1/results`

---

## 🎨 Frontend Features

### Standings Tab
- Columns: Rank, Name, Total Points, Wins, Final Tables, Tournaments, Avg Placement
- Medal highlighting: 🥇 Gold, 🥈 Silver, 🥉 Bronze
- DataGrid with 10 rows per page

### Tournament Results Tab
- Tournament selector button group
- Info card with date, buy-in, players
- Results table with placements and bounties
- Medal highlighting for top finishers

### Theme
- Dark poker theme with gold accents
- Material-UI components
- Responsive design

---

## 🛠️ Build Commands

### Backend
```bash
cd server

# Development
npm run dev

# Production build
npm run build

# Production run
npm start
```

### Frontend
```bash
cd client

# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## 📊 Sample Data

### Players (10)
1. Alex Chen
2. Maria Garcia
3. James Mitchell
4. Sofia Rossi
5. David O'Connor
6. Emma Thompson
7. Lucas Fernandes
8. Nina Patel
9. Marcus Johnson
10. Olivia Brown

### Tournaments (8)
- Tournament 1-8 from Jan-Apr 2024
- Buy-ins: $50-$100
- 10 players per tournament

### Points System
- 1st: 10 points
- 2nd: 8 points
- 3rd: 6 points
- 4th: 5 points
- 5th: 4 points
- 6th: 3 points
- 7th: 2 points
- 8th: 1 point

---

## 🧪 Technologies Used

### Backend
- Node.js
- Express.js
- TypeScript
- CORS
- ts-node

### Frontend
- React
- TypeScript
- Vite
- Material-UI
- MUI X DataGrid
- Emotion

---

## ✅ Verification Checklist

- ✅ TypeScript compiles without errors
- ✅ Backend server starts on port 3001
- ✅ Frontend starts on port 5173
- ✅ API endpoints respond correctly
- ✅ CORS configured
- ✅ Production builds completed
- ✅ 358 npm packages installed
- ✅ Dark theme applied
- ✅ DataGrid components working
- ✅ Responsive design

---

## 🐛 Troubleshooting

### Port Already in Use
Vite will automatically use the next available port if 5173 is in use.

### CORS Errors
Ensure backend is running on port 3001 before starting frontend.

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

**Happy poker league tracking! 🃏**
