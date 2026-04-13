import express, { Request, Response } from "express";
import cors from "cors";
import { getLeagueData, calculateStandings, Tournament, TournamentResult } from "./data/leagueData";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Initialize data
const leagueData = getLeagueData();

// Routes

/**
 * GET /api/standings
 * Returns player standings sorted by total points
 */
app.get("/api/standings", (_req: Request, res: Response) => {
  try {
    const standings = calculateStandings();
    res.json(standings);
  } catch (error) {
    console.error("Error fetching standings:", error);
    res.status(500).json({ error: "Failed to fetch standings" });
  }
});

/**
 * GET /api/tournaments
 * Returns list of all tournaments
 */
app.get("/api/tournaments", (_req: Request, res: Response) => {
  try {
    const tournaments = Array.from(leagueData.tournaments);
    res.json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

/**
 * GET /api/tournaments/:id/results
 * Returns results for a specific tournament
 */
app.get("/api/tournaments/:id/results", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find tournament
    const tournament = leagueData.tournaments.find((t) => t.id === id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Get results for this tournament
    const results = leagueData.results.get(id);
    if (!results) {
      return res.status(404).json({ error: "Results not found for this tournament" });
    }

    res.json({
      tournament,
      results,
    });
  } catch (error) {
    console.error("Error fetching tournament results:", error);
    res.status(500).json({ error: "Failed to fetch tournament results" });
  }
});

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🃏 Teater Poker League API running on http://localhost:${PORT}`);
  console.log(`📊 Standings: http://localhost:${PORT}/api/standings`);
  console.log(`🎯 Tournaments: http://localhost:${PORT}/api/tournaments`);
});
