import { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Tournament, TournamentDetails, TournamentResult } from '../types'

interface TournamentResultsTableProps {
  tournaments: Tournament[]
}

export default function TournamentResultsTable({
  tournaments,
}: TournamentResultsTableProps) {
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(
    tournaments.length > 0 ? tournaments[0].id : null
  )
  const [results, setResults] = useState<TournamentResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedTournament = useMemo(
    () => tournaments.find((t) => t.id === selectedTournamentId),
    [tournaments, selectedTournamentId]
  )

  useEffect(() => {
    if (selectedTournamentId) {
      fetchTournamentResults(selectedTournamentId)
    }
  }, [selectedTournamentId])

  const fetchTournamentResults = async (tournamentId: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/tournaments/${tournamentId}/results`)
      if (!response.ok) {
        throw new Error('Failed to fetch tournament results')
      }

      const data: TournamentDetails = await response.json()
      setResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching tournament results:', err)
    } finally {
      setLoading(false)
    }
  }

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'placement',
        headerName: 'Placement',
        width: 100,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const placement = params.value as number
          const medals: Record<number, string> = {
            1: '🥇',
            2: '🥈',
            3: '🥉',
          }
          return `${medals[placement] || placement}`
        },
      },
      {
        field: 'playerName',
        headerName: 'Player Name',
        width: 180,
        sortable: false,
      },
      {
        field: 'points',
        headerName: 'Points',
        width: 120,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'bounties',
        headerName: 'Bounties',
        width: 120,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const bounties = params.row.bounties || 0
          return bounties > 0 ? `💰 ${bounties}` : '-'
        },
      },
      {
        field: 'eliminationPosition',
        headerName: 'Elimination #',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => params.row.eliminationPosition ?? '-',
      },
    ],
    []
  )

  const rows = useMemo(
    () =>
      results.map((result) => ({
        id: `${result.playerId}-${result.placement}`,
        ...result,
      })),
    [results]
  )

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Tournament Selector */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#d4a574', fontWeight: 600 }}>
          Select Tournament
        </Typography>
        <ButtonGroup
          variant="outlined"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            '& .MuiButton-outlined': {
              borderColor: '#d4a574',
              color: '#999',
              '&:hover': {
                backgroundColor: 'rgba(212, 165, 116, 0.1)',
                borderColor: '#d4a574',
              },
              '&.active': {
                backgroundColor: 'rgba(212, 165, 116, 0.2)',
                color: '#d4a574',
                borderColor: '#d4a574',
              },
            },
          }}
        >
          {tournaments.map((tournament) => (
            <Button
              key={tournament.id}
              onClick={() => setSelectedTournamentId(tournament.id)}
              className={selectedTournamentId === tournament.id ? 'active' : ''}
              sx={{
                backgroundColor:
                  selectedTournamentId === tournament.id
                    ? 'rgba(212, 165, 116, 0.2)'
                    : 'transparent',
                color:
                  selectedTournamentId === tournament.id ? '#d4a574' : '#999',
              }}
            >
              {tournament.name}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Tournament Info Card */}
      {selectedTournament && (
        <Card
          sx={{
            mb: 4,
            backgroundColor: '#2d2d44',
            border: '1px solid #3d3d54',
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography color="textSecondary" variant="caption">
                  Date
                </Typography>
                <Typography variant="body1" sx={{ color: '#d4a574', fontWeight: 600 }}>
                  {new Date(selectedTournament.date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography color="textSecondary" variant="caption">
                  Buy-in
                </Typography>
                <Typography variant="body1" sx={{ color: '#d4a574', fontWeight: 600 }}>
                  ${selectedTournament.buyIn}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography color="textSecondary" variant="caption">
                  Players
                </Typography>
                <Typography variant="body1" sx={{ color: '#d4a574', fontWeight: 600 }}>
                  {selectedTournament.players}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography color="textSecondary" variant="caption">
                  Results
                </Typography>
                <Typography variant="body1" sx={{ color: '#d4a574', fontWeight: 600 }}>
                  {results.length} finishes
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#d4a574' }} />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            '& .MuiDataGrid-root': {
              border: '1px solid #2d2d44',
              borderRadius: '8px',
              backgroundColor: '#1a1a2e',
            },
            '& .MuiDataGrid-cell': {
              padding: '8px 4px',
              fontSize: '0.875rem',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#2d2d44',
              color: '#d4a574',
              fontWeight: 600,
            },
            '& .placement-1': {
              backgroundColor: 'rgba(212, 165, 116, 0.1)',
              '& .MuiDataGrid-cell': {
                backgroundColor: 'rgba(212, 165, 116, 0.1)',
              },
            },
            '& .placement-2': {
              backgroundColor: 'rgba(192, 192, 192, 0.08)',
              '& .MuiDataGrid-cell': {
                backgroundColor: 'rgba(192, 192, 192, 0.08)',
              },
            },
            '& .placement-3': {
              backgroundColor: 'rgba(205, 127, 50, 0.08)',
              '& .MuiDataGrid-cell': {
                backgroundColor: 'rgba(205, 127, 50, 0.08)',
              },
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            density="compact"
            disableRowSelectionOnClick
            getRowClassName={(params) => {
              const placement = params.row.placement as number
              if (placement === 1) return 'placement-1'
              if (placement === 2) return 'placement-2'
              if (placement === 3) return 'placement-3'
              return ''
            }}
          />
        </Box>
      )}
    </Box>
  )
}
