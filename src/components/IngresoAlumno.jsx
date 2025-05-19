import React, { useState, useEffect } from 'react'
import {
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

const isValidName = name => /^[A-Za-zÀ-ÿ\s]{2,30}$/.test(name.trim())

export default function IngresoAlumno() {
  const {
    login,
    idioma,
    isDocente,
    loginDocente,
    setStage
  } = useActua()
  const ui = textos[idioma].ui

  const [usuarios, setUsuarios] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // El diálogo de login-docente empieza siempre cerrado
  const [showLogin, setShowLogin] = useState(false)
  const [senha, setSenha] = useState('')
  const [loginError, setLoginError] = useState('')

  // Cargo la lista de alumnos, permitiendo front_token o docente_token
  useEffect(() => {
    setLoading(true)
    const headers = {}
    if (isDocente) {
      headers['X-Docente-Token'] = 'Bearer ' + localStorage.getItem('docente_token')
    } else if (localStorage.getItem('front_token')) {
      headers['X-Front-Token'] = 'Bearer ' + localStorage.getItem('front_token')
    }
    fetch('/api/getAlumnos', { headers })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado')
        return res.json()
      })
      .then(json => setUsuarios(json.map(a => a.nombre)))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false))
  }, [isDocente])

  // Registra un alumno (solo si isDocente)
  const handleNew = async () => {
    if (!isDocente) return
    const trimmed = name.trim()
    if (!isValidName(trimmed)) {
      setError(true)
      return
    }
    setError(false)

    const res = await fetch('/api/crearAlumno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Docente-Token': 'Bearer ' + localStorage.getItem('docente_token')
      },
      body: JSON.stringify({ nombre: trimmed })
    })

    if (res.ok) {
      setUsuarios(prev => [...prev, trimmed])
      login(trimmed)
      setName('')
    } else {
      const text = await res.text()
      console.error('Error al crear alumno:', text)
      setError(true)
    }
  }

  // Login del docente: usa loginDocente() y, al OK, navega al panel
  const handleDocenteLogin = async () => {
    setLoginError('')
    if (!senha) {
      setLoginError('Introduce la contraseña')
      return
    }
    try {
      await loginDocente(senha)
      setShowLogin(false)
      setSenha('')
      setStage('admin')              // <— navegamos automáticamente
    } catch (err) {
      console.error('Error de loginDocente:', err)
      setLoginError(err.message || 'Error de conexión')
    }
  }

  return (
    <>
      <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
        {!loading && usuarios.length > 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {ui.ingresoPrompt}:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {usuarios.map(u => (
                <Button key={u} variant="outlined" onClick={() => login(u)}>
                  {u}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        <Typography variant="h6">{ui.ingresoPrompt}</Typography>
        <TextField
          label={ui.ingresoLabel}
          value={name}
          onChange={e => {
            setName(e.target.value)
            setError(false)
          }}
          error={error}
          helperText={error ? ui.ingresoError : ''}
          disabled={!isDocente}
        />
        {!isDocente && (
          <Typography color="error" align="center">
            Debes autenticarte como Docente para registrar nuevos alumnos.
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleNew}
          disabled={!name.trim() || !isDocente}
        >
          {ui.ingresoButton}
        </Button>

        {!isDocente ? (
          <Button
            variant="text"
            color="secondary"
            onClick={() => setShowLogin(true)}
          >
            {ui.accederDocente}
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setStage('admin')}>
            {ui.irPanelDocente}
          </Button>
        )}
      </Stack>

      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <DialogTitle>{ui.loginDocenteTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={ui.loginDocenteLabel}
            type="password"
            fullWidth
            value={senha}
            onChange={e => setSenha(e.target.value)}
            error={!!loginError}
            helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogin(false)}>
            {ui.cancelar}
          </Button>
          <Button variant="contained" onClick={handleDocenteLogin}>
            {ui.acceder}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
