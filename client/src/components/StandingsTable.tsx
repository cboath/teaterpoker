import { useMemo } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { Standing } from '../types'

interface StandingsTableProps {
  standings: Standing[]
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'rank',
        headerName: '#',
        width: 60,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'name',
        headerName: 'Player Name',
        width: 180,
        sortable: false,
      },
      {
        field: 'totalPoints',
        headerName: 'Total Points',
        width: 140,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'wins',
        headerName: 'Wins 🏆',
        width: 110,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'finalTables',
        headerName: 'Final Tables',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'tournamentsPlayed',
        headerName: 'Tournaments',
        width: 130,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'averagePlacement',
        headerName: 'Avg Placement',
        width: 140,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => params.value.toFixed(2),
      },
      {
        field: 'pointsPerTournament',
        headerName: 'Pts/Tournament',
        width: 140,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => params.value.toFixed(2),
      },
    ],
    []
  )

  const rows = useMemo(
    () =>
      standings.map((standing) => ({
        id: standing.playerId,
        ...standing,
      })),
    [standings]
  )

  return (
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
        '& .rank-gold': {
          backgroundColor: 'rgba(212, 165, 116, 0.15)',
          '& .MuiDataGrid-cell': {
            backgroundColor: 'rgba(212, 165, 116, 0.15)',
            color: '#d4a574',
            fontWeight: 600,
          },
        },
        '& .rank-silver': {
          backgroundColor: 'rgba(192, 192, 192, 0.1)',
          '& .MuiDataGrid-cell': {
            backgroundColor: 'rgba(192, 192, 192, 0.1)',
            color: '#c0c0c0',
            fontWeight: 600,
          },
        },
        '& .rank-bronze': {
          backgroundColor: 'rgba(205, 127, 50, 0.1)',
          '& .MuiDataGrid-cell': {
            backgroundColor: 'rgba(205, 127, 50, 0.1)',
            color: '#cd7f32',
            fontWeight: 600,
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
          if (params.row.rank === 1) return 'rank-gold'
          if (params.row.rank === 2) return 'rank-silver'
          if (params.row.rank === 3) return 'rank-bronze'
          return ''
        }}
        sx={{
          '& .MuiDataGrid-virtualScroller': {
            overflow: 'auto',
          },
        }}
      />
    </Box>
  )
}
