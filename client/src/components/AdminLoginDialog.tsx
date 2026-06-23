import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from '@mui/material'
import { useAdmin } from '../AdminContext'

interface AdminLoginDialogProps {
  open: boolean
  onClose: () => void
}

export default function AdminLoginDialog({ open, onClose }: AdminLoginDialogProps) {
  const { login } = useAdmin()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleClose = () => {
    setPassword('')
    setError(null)
    onClose()
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      setError(null)
      await login(password)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ color: '#d4a574' }}>Administrator Login</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            autoFocus
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#999' }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting || !password}>
            Log In
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
