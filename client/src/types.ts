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

export interface TournamentDetails {
  tournament: Tournament;
  results: TournamentResult[];
}
