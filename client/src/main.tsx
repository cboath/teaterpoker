import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.tsx'
import { AdminProvider } from './AdminContext'
import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#1a1a2e',
    },
    primary: {
      main: '#d4a574', // Gold/Amber
      light: '#e8c9a0',
      dark: '#8b6f47',
    },
    secondary: {
      main: '#c0c0c0', // Silver
      light: '#e8e8e8',
      dark: '#808080',
    },
    success: {
      main: '#66bb6a',
    },
    error: {
      main: '#ef5350',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
          boxShadow: '0 4px 20px rgba(212, 165, 116, 0.2)',
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AdminProvider>
        <App />
      </AdminProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
