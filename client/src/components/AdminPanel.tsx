import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Alert,
  Stack,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import { Player, Tournament, TournamentResult, TournamentDetails } from '../types'
import { useAdminFetch } from '../api'

interface AdminPanelProps {
  players: Player[]
  tournaments: Tournament[]
  onRefresh: () => Promise<void>
}

const sectionTitleSx = { color: '#d4a574', fontWeight: 600 }

export default function AdminPanel({ players, tournaments, onRefresh }: AdminPanelProps) {
  const adminFetch = useAdminFetch()
  const [error, setError] = useState<string | null>(null)

  const runAction = async (action: () => Promise<void>) => {
    try {
      setError(null)
      await action()
      await onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Accordion defaultExpanded sx={{ backgroundColor: '#1a1a2e', mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#d4a574' }} />}>
          <Typography sx={sectionTitleSx}>Tournaments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TournamentsSection
            tournaments={tournaments}
            adminFetch={adminFetch}
            runAction={runAction}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: '#1a1a2e', mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#d4a574' }} />}>
          <Typography sx={sectionTitleSx}>Players</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlayersSection players={players} adminFetch={adminFetch} runAction={runAction} />
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: '#1a1a2e', mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#d4a574' }} />}>
          <Typography sx={sectionTitleSx}>Tournament Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ResultsSection
            players={players}
            tournaments={tournaments}
            adminFetch={adminFetch}
            runAction={runAction}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

type AdminFetch = ReturnType<typeof useAdminFetch>
type RunAction = (action: () => Promise<void>) => Promise<void>

const cellInputSx = { '& .MuiInputBase-input': { color: '#fff' } }

function TournamentsSection({
  tournaments,
  adminFetch,
  runAction,
}: {
  tournaments: Tournament[]
  adminFetch: AdminFetch
  runAction: RunAction
}) {
  const [drafts, setDrafts] = useState<Record<string, Tournament>>({})
  const [newTournament, setNewTournament] = useState({ name: '', date: '', buyIn: 0, players: 0 })

  useEffect(() => {
    const next: Record<string, Tournament> = {}
    tournaments.forEach((t) => {
      next[t.id] = drafts[t.id] ?? t
    })
    setDrafts(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournaments])

  const updateDraft = (id: string, field: keyof Tournament, value: string | number) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  const saveTournament = (id: string) =>
    runAction(async () => {
      const draft = drafts[id]
      await adminFetch(`/api/admin/tournaments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(draft),
      })
    })

  const deleteTournament = (id: string) =>
    runAction(async () => {
      await adminFetch(`/api/admin/tournaments/${id}`, { method: 'DELETE' })
    })

  const addTournament = () =>
    runAction(async () => {
      await adminFetch('/api/admin/tournaments', {
        method: 'POST',
        body: JSON.stringify(newTournament),
      })
      setNewTournament({ name: '', date: '', buyIn: 0, players: 0 })
    })

  return (
    <Box>
      <Table size="small" sx={{ mb: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#999' }}>Name</TableCell>
            <TableCell sx={{ color: '#999' }}>Date</TableCell>
            <TableCell sx={{ color: '#999' }}>Buy-in</TableCell>
            <TableCell sx={{ color: '#999' }}>Players</TableCell>
            <TableCell sx={{ color: '#999' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {tournaments.map((t) => {
            const draft = drafts[t.id] ?? t
            return (
              <TableRow key={t.id}>
                <TableCell>
                  <TextField
                    size="small"
                    sx={cellInputSx}
                    value={draft.name}
                    onChange={(e) => updateDraft(t.id, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="date"
                    sx={cellInputSx}
                    value={draft.date}
                    onChange={(e) => updateDraft(t.id, 'date', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ ...cellInputSx, width: 90 }}
                    value={draft.buyIn}
                    onChange={(e) => updateDraft(t.id, 'buyIn', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ ...cellInputSx, width: 90 }}
                    value={draft.players}
                    onChange={(e) => updateDraft(t.id, 'players', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => saveTournament(t.id)}>
                      Save
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => deleteTournament(t.id)}
                      sx={{ color: '#ef5350' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>
        Add Tournament
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <TextField
          size="small"
          label="Name"
          value={newTournament.name}
          onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
        />
        <TextField
          size="small"
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={newTournament.date}
          onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
        />
        <TextField
          size="small"
          type="number"
          label="Buy-in"
          sx={{ width: 100 }}
          value={newTournament.buyIn}
          onChange={(e) => setNewTournament({ ...newTournament, buyIn: Number(e.target.value) })}
        />
        <TextField
          size="small"
          type="number"
          label="Players"
          sx={{ width: 100 }}
          value={newTournament.players}
          onChange={(e) => setNewTournament({ ...newTournament, players: Number(e.target.value) })}
        />
        <Button
          variant="contained"
          onClick={addTournament}
          disabled={!newTournament.name || !newTournament.date}
        >
          Add
        </Button>
      </Stack>
    </Box>
  )
}

function PlayersSection({
  players,
  adminFetch,
  runAction,
}: {
  players: Player[]
  adminFetch: AdminFetch
  runAction: RunAction
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [newName, setNewName] = useState('')

  useEffect(() => {
    const next: Record<string, string> = {}
    players.forEach((p) => {
      next[p.id] = drafts[p.id] ?? p.name
    })
    setDrafts(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players])

  const savePlayer = (id: string) =>
    runAction(async () => {
      await adminFetch(`/api/admin/players/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: drafts[id] }),
      })
    })

  const deletePlayer = (id: string) =>
    runAction(async () => {
      await adminFetch(`/api/admin/players/${id}`, { method: 'DELETE' })
    })

  const addPlayer = () =>
    runAction(async () => {
      await adminFetch('/api/admin/players', {
        method: 'POST',
        body: JSON.stringify({ name: newName }),
      })
      setNewName('')
    })

  return (
    <Box>
      <Table size="small" sx={{ mb: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#999' }}>Name</TableCell>
            <TableCell sx={{ color: '#999' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <TextField
                  size="small"
                  sx={cellInputSx}
                  value={drafts[p.id] ?? p.name}
                  onChange={(e) => setDrafts((prev) => ({ ...prev, [p.id]: e.target.value }))}
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined" onClick={() => savePlayer(p.id)}>
                    Save
                  </Button>
                  <IconButton size="small" onClick={() => deletePlayer(p.id)} sx={{ color: '#ef5350' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="subtitle2" sx={{ color: '#999', mb: 1 }}>
        Add Player
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField size="small" label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <Button variant="contained" onClick={addPlayer} disabled={!newName}>
          Add
        </Button>
      </Stack>
    </Box>
  )
}

function ResultsSection({
  players,
  tournaments,
  adminFetch,
  runAction,
}: {
  players: Player[]
  tournaments: Tournament[]
  adminFetch: AdminFetch
  runAction: RunAction
}) {
  const [selectedTournamentId, setSelectedTournamentId] = useState(tournaments[0]?.id ?? '')
  const [rows, setRows] = useState<TournamentResult[]>([])
  const [loading, setLoading] = useState(false)

  const playerById = useMemo(() => new Map(players.map((p) => [p.id, p.name])), [players])

  useEffect(() => {
    if (!selectedTournamentId) {
      setRows([])
      return
    }
    setLoading(true)
    fetch(`/api/tournaments/${selectedTournamentId}/results`)
      .then((res) => res.json())
      .then((data: TournamentDetails) => setRows(data.results))
      .finally(() => setLoading(false))
  }, [selectedTournamentId])

  const updateRow = (index: number, field: keyof TournamentResult, value: string | number) => {
    setRows((prev) => {
      const next = [...prev]
      const row = { ...next[index], [field]: value }
      if (field === 'playerId') {
        row.playerName = playerById.get(value as string) ?? ''
      }
      next[index] = row
      return next
    })
  }

  const addRow = () => {
    const firstPlayer = players[0]
    setRows((prev) => [
      ...prev,
      {
        placement: prev.length + 1,
        playerId: firstPlayer?.id ?? '',
        playerName: firstPlayer?.name ?? '',
        points: 0,
        bounties: 0,
        eliminationPosition: prev.length + 1,
      },
    ])
  }

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  const saveResults = () =>
    runAction(async () => {
      await adminFetch(`/api/admin/tournaments/${selectedTournamentId}/results`, {
        method: 'PUT',
        body: JSON.stringify(rows),
      })
    })

  return (
    <Box>
      <Select
        size="small"
        value={selectedTournamentId}
        onChange={(e) => setSelectedTournamentId(e.target.value)}
        sx={{ mb: 3, minWidth: 280, color: '#fff' }}
      >
        {tournaments.map((t) => (
          <MenuItem key={t.id} value={t.id}>
            {t.name}
          </MenuItem>
        ))}
      </Select>

      {!loading && (
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#999' }}>Placement</TableCell>
              <TableCell sx={{ color: '#999' }}>Player</TableCell>
              <TableCell sx={{ color: '#999' }}>Points</TableCell>
              <TableCell sx={{ color: '#999' }}>Bounties</TableCell>
              <TableCell sx={{ color: '#999' }}>Elimination #</TableCell>
              <TableCell sx={{ color: '#999' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ ...cellInputSx, width: 80 }}
                    value={row.placement}
                    onChange={(e) => updateRow(index, 'placement', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    size="small"
                    sx={{ minWidth: 160, color: '#fff' }}
                    value={row.playerId}
                    onChange={(e) => updateRow(index, 'playerId', e.target.value)}
                  >
                    {players.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ ...cellInputSx, width: 80 }}
                    value={row.points}
                    onChange={(e) => updateRow(index, 'points', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ ...cellInputSx, width: 80 }}
                    value={row.bounties ?? 0}
                    onChange={(e) => updateRow(index, 'bounties', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ ...cellInputSx, width: 80 }}
                    value={row.eliminationPosition ?? ''}
                    onChange={(e) => updateRow(index, 'eliminationPosition', Number(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => removeRow(index)} sx={{ color: '#ef5350' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={addRow} disabled={!selectedTournamentId}>
          Add Row
        </Button>
        <Button variant="contained" onClick={saveResults} disabled={!selectedTournamentId}>
          Save Results
        </Button>
      </Stack>
    </Box>
  )
}
