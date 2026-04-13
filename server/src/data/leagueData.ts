export interface Tournament {
  id: string;
  name: string;
  date: string;
  buyIn: number;
  players: number;
}

export interface TournamentResult {
  placement: number;
  playerId: string;
  playerName: string;
  points: number;
  bounties?: number;
}

export interface Player {
  id: string;
  name: string;
}

export interface Standing {
  rank: number;
  playerId: string;
  name: string;
  totalPoints: number;
  wins: number;
  finalTables: number;
  tournamentsPlayed: number;
  averagePlacement: number;
  pointsPerTournament: number;
}

export interface LeagueData {
  players: Player[];
  tournaments: Tournament[];
  results: Map<string, TournamentResult[]>;
}

// Points system: 1st=10pts, 2nd=8pts, 3rd=6pts, 4th=5pts, 5th=4pts, 6th=3pts, 7th=2pts, 8th=1pt
export const pointsByPlacement: Record<number, number> = {
  1: 10,
  2: 8,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
  7: 2,
  8: 1,
};

const players: Player[] = [
  { id: "1", name: "Alex Chen" },
  { id: "2", name: "Maria Garcia" },
  { id: "3", name: "James Mitchell" },
  { id: "4", name: "Sofia Rossi" },
  { id: "5", name: "David O'Connor" },
  { id: "6", name: "Emma Thompson" },
  { id: "7", name: "Lucas Fernandes" },
  { id: "8", name: "Nina Patel" },
  { id: "9", name: "Marcus Johnson" },
  { id: "10", name: "Olivia Brown" },
];

const tournaments: Tournament[] = [
  { id: "t1", name: "Tournament 1 - Season Opener", date: "2024-01-15", buyIn: 50, players: 10 },
  { id: "t2", name: "Tournament 2 - Winter Challenge", date: "2024-01-29", buyIn: 75, players: 10 },
  { id: "t3", name: "Tournament 3 - February Finals", date: "2024-02-12", buyIn: 50, players: 10 },
  { id: "t4", name: "Tournament 4 - Spring Fling", date: "2024-02-26", buyIn: 100, players: 10 },
  { id: "t5", name: "Tournament 5 - Midseason Classic", date: "2024-03-11", buyIn: 50, players: 10 },
  { id: "t6", name: "Tournament 6 - March Madness", date: "2024-03-25", buyIn: 75, players: 10 },
  { id: "t7", name: "Tournament 7 - Spring Stakes", date: "2024-04-08", buyIn: 50, players: 10 },
  { id: "t8", name: "Tournament 8 - Season Finale", date: "2024-04-22", buyIn: 100, players: 10 },
];

const results: Map<string, TournamentResult[]> = new Map([
  [
    "t1",
    [
      { placement: 1, playerId: "3", playerName: "James Mitchell", points: 10, bounties: 2 },
      { placement: 2, playerId: "1", playerName: "Alex Chen", points: 8, bounties: 0 },
      { placement: 3, playerId: "8", playerName: "Nina Patel", points: 6, bounties: 1 },
      { placement: 4, playerId: "2", playerName: "Maria Garcia", points: 5, bounties: 0 },
      { placement: 5, playerId: "6", playerName: "Emma Thompson", points: 4, bounties: 0 },
      { placement: 6, playerId: "9", playerName: "Marcus Johnson", points: 3, bounties: 0 },
      { placement: 7, playerId: "5", playerName: "David O'Connor", points: 2, bounties: 1 },
      { placement: 8, playerId: "4", playerName: "Sofia Rossi", points: 1, bounties: 0 },
      { placement: 9, playerId: "7", playerName: "Lucas Fernandes", points: 0, bounties: 0 },
      { placement: 10, playerId: "10", playerName: "Olivia Brown", points: 0, bounties: 0 },
    ],
  ],
  [
    "t2",
    [
      { placement: 1, playerId: "1", playerName: "Alex Chen", points: 10, bounties: 1 },
      { placement: 2, playerId: "2", playerName: "Maria Garcia", points: 8, bounties: 2 },
      { placement: 3, playerId: "5", playerName: "David O'Connor", points: 6, bounties: 0 },
      { placement: 4, playerId: "7", playerName: "Lucas Fernandes", points: 5, bounties: 1 },
      { placement: 5, playerId: "3", playerName: "James Mitchell", points: 4, bounties: 0 },
      { placement: 6, playerId: "4", playerName: "Sofia Rossi", points: 3, bounties: 1 },
      { placement: 7, playerId: "10", playerName: "Olivia Brown", points: 2, bounties: 0 },
      { placement: 8, playerId: "6", playerName: "Emma Thompson", points: 1, bounties: 0 },
      { placement: 9, playerId: "9", playerName: "Marcus Johnson", points: 0, bounties: 0 },
      { placement: 10, playerId: "8", playerName: "Nina Patel", points: 0, bounties: 0 },
    ],
  ],
  [
    "t3",
    [
      { placement: 1, playerId: "8", playerName: "Nina Patel", points: 10, bounties: 3 },
      { placement: 2, playerId: "3", playerName: "James Mitchell", points: 8, bounties: 1 },
      { placement: 3, playerId: "1", playerName: "Alex Chen", points: 6, bounties: 0 },
      { placement: 4, playerId: "6", playerName: "Emma Thompson", points: 5, bounties: 0 },
      { placement: 5, playerId: "2", playerName: "Maria Garcia", points: 4, bounties: 1 },
      { placement: 6, playerId: "9", playerName: "Marcus Johnson", points: 3, bounties: 0 },
      { placement: 7, playerId: "4", playerName: "Sofia Rossi", points: 2, bounties: 2 },
      { placement: 8, playerId: "5", playerName: "David O'Connor", points: 1, bounties: 0 },
      { placement: 9, playerId: "7", playerName: "Lucas Fernandes", points: 0, bounties: 0 },
      { placement: 10, playerId: "10", playerName: "Olivia Brown", points: 0, bounties: 1 },
    ],
  ],
  [
    "t4",
    [
      { placement: 1, playerId: "2", playerName: "Maria Garcia", points: 10, bounties: 2 },
      { placement: 2, playerId: "7", playerName: "Lucas Fernandes", points: 8, bounties: 1 },
      { placement: 3, playerId: "8", playerName: "Nina Patel", points: 6, bounties: 0 },
      { placement: 4, playerId: "1", playerName: "Alex Chen", points: 5, bounties: 0 },
      { placement: 5, playerId: "3", playerName: "James Mitchell", points: 4, bounties: 1 },
      { placement: 6, playerId: "4", playerName: "Sofia Rossi", points: 3, bounties: 0 },
      { placement: 7, playerId: "10", playerName: "Olivia Brown", points: 2, bounties: 0 },
      { placement: 8, playerId: "5", playerName: "David O'Connor", points: 1, bounties: 1 },
      { placement: 9, playerId: "6", playerName: "Emma Thompson", points: 0, bounties: 0 },
      { placement: 10, playerId: "9", playerName: "Marcus Johnson", points: 0, bounties: 0 },
    ],
  ],
  [
    "t5",
    [
      { placement: 1, playerId: "6", playerName: "Emma Thompson", points: 10, bounties: 1 },
      { placement: 2, playerId: "3", playerName: "James Mitchell", points: 8, bounties: 0 },
      { placement: 3, playerId: "2", playerName: "Maria Garcia", points: 6, bounties: 1 },
      { placement: 4, playerId: "8", playerName: "Nina Patel", points: 5, bounties: 2 },
      { placement: 5, playerId: "1", playerName: "Alex Chen", points: 4, bounties: 0 },
      { placement: 6, playerId: "7", playerName: "Lucas Fernandes", points: 3, bounties: 0 },
      { placement: 7, playerId: "5", playerName: "David O'Connor", points: 2, bounties: 1 },
      { placement: 8, playerId: "9", playerName: "Marcus Johnson", points: 1, bounties: 0 },
      { placement: 9, playerId: "4", playerName: "Sofia Rossi", points: 0, bounties: 0 },
      { placement: 10, playerId: "10", playerName: "Olivia Brown", points: 0, bounties: 0 },
    ],
  ],
  [
    "t6",
    [
      { placement: 1, playerId: "4", playerName: "Sofia Rossi", points: 10, bounties: 0 },
      { placement: 2, playerId: "1", playerName: "Alex Chen", points: 8, bounties: 2 },
      { placement: 3, playerId: "3", playerName: "James Mitchell", points: 6, bounties: 0 },
      { placement: 4, playerId: "6", playerName: "Emma Thompson", points: 5, bounties: 1 },
      { placement: 5, playerId: "2", playerName: "Maria Garcia", points: 4, bounties: 1 },
      { placement: 6, playerId: "8", playerName: "Nina Patel", points: 3, bounties: 0 },
      { placement: 7, playerId: "10", playerName: "Olivia Brown", points: 2, bounties: 0 },
      { placement: 8, playerId: "5", playerName: "David O'Connor", points: 1, bounties: 0 },
      { placement: 9, playerId: "7", playerName: "Lucas Fernandes", points: 0, bounties: 1 },
      { placement: 10, playerId: "9", playerName: "Marcus Johnson", points: 0, bounties: 0 },
    ],
  ],
  [
    "t7",
    [
      { placement: 1, playerId: "5", playerName: "David O'Connor", points: 10, bounties: 1 },
      { placement: 2, playerId: "8", playerName: "Nina Patel", points: 8, bounties: 1 },
      { placement: 3, playerId: "1", playerName: "Alex Chen", points: 6, bounties: 0 },
      { placement: 4, playerId: "2", playerName: "Maria Garcia", points: 5, bounties: 2 },
      { placement: 5, playerId: "3", playerName: "James Mitchell", points: 4, bounties: 0 },
      { placement: 6, playerId: "7", playerName: "Lucas Fernandes", points: 3, bounties: 1 },
      { placement: 7, playerId: "6", playerName: "Emma Thompson", points: 2, bounties: 0 },
      { placement: 8, playerId: "4", playerName: "Sofia Rossi", points: 1, bounties: 0 },
      { placement: 9, playerId: "10", playerName: "Olivia Brown", points: 0, bounties: 0 },
      { placement: 10, playerId: "9", playerName: "Marcus Johnson", points: 0, bounties: 0 },
    ],
  ],
  [
    "t8",
    [
      { placement: 1, playerId: "3", playerName: "James Mitchell", points: 10, bounties: 2 },
      { placement: 2, playerId: "1", playerName: "Alex Chen", points: 8, bounties: 1 },
      { placement: 3, playerId: "2", playerName: "Maria Garcia", points: 6, bounties: 0 },
      { placement: 4, playerId: "8", playerName: "Nina Patel", points: 5, bounties: 1 },
      { placement: 5, playerId: "6", playerName: "Emma Thompson", points: 4, bounties: 0 },
      { placement: 6, playerId: "4", playerName: "Sofia Rossi", points: 3, bounties: 0 },
      { placement: 7, playerId: "7", playerName: "Lucas Fernandes", points: 2, bounties: 1 },
      { placement: 8, playerId: "5", playerName: "David O'Connor", points: 1, bounties: 0 },
      { placement: 9, playerId: "9", playerName: "Marcus Johnson", points: 0, bounties: 0 },
      { placement: 10, playerId: "10", playerName: "Olivia Brown", points: 0, bounties: 0 },
    ],
  ],
]);

export function getLeagueData(): LeagueData {
  return {
    players,
    tournaments,
    results,
  };
}

export function calculateStandings(): Standing[] {
  const playerStats: Record<string, { totalPoints: number; wins: number; finalTables: number; placements: number[] }> = {};

  // Initialize stats for all players
  players.forEach((player) => {
    playerStats[player.id] = {
      totalPoints: 0,
      wins: 0,
      finalTables: 0,
      placements: [],
    };
  });

  // Aggregate results from all tournaments
  results.forEach((tournamentResults) => {
    tournamentResults.forEach((result) => {
      const stats = playerStats[result.playerId];
      stats.totalPoints += result.points;
      stats.placements.push(result.placement);

      if (result.placement === 1) {
        stats.wins++;
      }

      if (result.placement <= 5) {
        stats.finalTables++;
      }
    });
  });

  // Create standings
  const standings: Standing[] = players.map((player) => {
    const stats = playerStats[player.id];
    const tournamentsPlayed = stats.placements.length;
    const averagePlacement = tournamentsPlayed > 0 ? stats.placements.reduce((a, b) => a + b, 0) / tournamentsPlayed : 0;
    const pointsPerTournament = tournamentsPlayed > 0 ? stats.totalPoints / tournamentsPlayed : 0;

    return {
      rank: 0, // Will be set after sorting
      playerId: player.id,
      name: player.name,
      totalPoints: stats.totalPoints,
      wins: stats.wins,
      finalTables: stats.finalTables,
      tournamentsPlayed,
      averagePlacement: parseFloat(averagePlacement.toFixed(2)),
      pointsPerTournament: parseFloat(pointsPerTournament.toFixed(2)),
    };
  });

  // Sort by total points (descending)
  standings.sort((a, b) => b.totalPoints - a.totalPoints);

  // Set rank
  standings.forEach((standing, index) => {
    standing.rank = index + 1;
  });

  return standings;
}
