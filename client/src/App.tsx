import { useEffect, useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material'
import CasinoIcon from '@mui/icons-material/Casino'
import StandingsTable from './components/StandingsTable'
import TournamentResultsTable from './components/TournamentResultsTable'
import { Standing, Tournament } from './types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function App() {
  const [tabValue, setTabValue] = useState(0)
  const [standings, setStandings] = useState<Standing[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [standingsRes, tournamentsRes] = await Promise.all([
        fetch('/api/standings'),
        fetch('/api/tournaments'),
      ])

      if (!standingsRes.ok || !tournamentsRes.ok) {
        throw new Error('Failed to fetch data from server')
      }

      const standingsData = await standingsRes.json()
      const tournamentsData = await tournamentsRes.json()

      setStandings(standingsData)
      setTournaments(tournamentsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      <AppBar position="static">
        <Toolbar>
          <CasinoIcon sx={{ mr: 2, fontSize: '2rem' }} />
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>
            Teater Poker League
          </h1>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="league tabs"
            sx={{
              '& .MuiTab-root': {
                color: '#999',
                '&.Mui-selected': {
                  color: '#d4a574',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#d4a574',
              },
            }}
          >
            <Tab label="Standings" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Tournament Results" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#d4a574' }} />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <StandingsTable standings={standings} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TournamentResultsTable tournaments={tournaments} />
            </TabPanel>
          </>
        )}
      </Container>
    </Box>
  )
}

export default App
