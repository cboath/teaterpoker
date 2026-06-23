import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import {
  getLeagueData,
  calculateStandings,
  addTournament,
  updateTournament,
  deleteTournament,
  setTournamentResults,
  addPlayer,
  updatePlayer,
  deletePlayer,
  playerHasResults,
  TournamentResult,
} from "./data/leagueData";
import { login, requireAdmin } from "./auth";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

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
    const tournaments = Array.from(getLeagueData().tournaments);
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
    const data = getLeagueData();

    // Find tournament
    const tournament = data.tournaments.find((t) => t.id === id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Get results for this tournament
    const results = data.results.get(id);
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

/**
 * POST /api/admin/login
 * Exchanges the admin password for a session token
 */
app.post("/api/admin/login", login);

// All routes below require a valid admin token
app.use("/api/admin", requireAdmin);

/**
 * POST /api/admin/tournaments
 * Creates a new tournament
 */
app.post("/api/admin/tournaments", (req: Request, res: Response) => {
  const { name, date, buyIn, players } = req.body as {
    name?: string;
    date?: string;
    buyIn?: number;
    players?: number;
  };

  if (!name || !date || typeof buyIn !== "number" || typeof players !== "number") {
    return res.status(400).json({ error: "name, date, buyIn, and players are required" });
  }

  const tournament = addTournament({ name, date, buyIn, players });
  res.status(201).json(tournament);
});

/**
 * PUT /api/admin/tournaments/:id
 * Updates an existing tournament
 */
app.put("/api/admin/tournaments/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, date, buyIn, players } = req.body as {
    name?: string;
    date?: string;
    buyIn?: number;
    players?: number;
  };

  const tournament = updateTournament(id, { name, date, buyIn, players });
  if (!tournament) {
    return res.status(404).json({ error: "Tournament not found" });
  }
  res.json(tournament);
});

/**
 * DELETE /api/admin/tournaments/:id
 * Deletes a tournament and its results
 */
app.delete("/api/admin/tournaments/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = deleteTournament(id);
  if (!deleted) {
    return res.status(404).json({ error: "Tournament not found" });
  }
  res.status(204).send();
});

/**
 * PUT /api/admin/tournaments/:id/results
 * Replaces the full results list for a tournament
 */
app.put("/api/admin/tournaments/:id/results", (req: Request, res: Response) => {
  const { id } = req.params;
  const results = req.body as TournamentResult[];

  if (!Array.isArray(results)) {
    return res.status(400).json({ error: "Body must be an array of results" });
  }

  const updated = setTournamentResults(id, results);
  if (!updated) {
    return res.status(404).json({ error: "Tournament not found" });
  }
  res.json(updated);
});

/**
 * POST /api/admin/players
 * Creates a new player
 */
app.post("/api/admin/players", (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const player = addPlayer(name);
  res.status(201).json(player);
});

/**
 * PUT /api/admin/players/:id
 * Renames an existing player
 */
app.put("/api/admin/players/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body as { name?: string };
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  const player = updatePlayer(id, name);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.json(player);
});

/**
 * DELETE /api/admin/players/:id
 * Deletes a player, unless they already have tournament results
 */
app.delete("/api/admin/players/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  if (playerHasResults(id)) {
    return res.status(409).json({ error: "Cannot delete a player who has tournament results" });
  }
  const deleted = deletePlayer(id);
  if (!deleted) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`🃏 Teater Poker League API running on http://localhost:${PORT}`);
  console.log(`📊 Standings: http://localhost:${PORT}/api/standings`);
  console.log(`🎯 Tournaments: http://localhost:${PORT}/api/tournaments`);
});
