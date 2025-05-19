// src/components/IngresoAlumno.jsx

import React, { useState, useEffect } from 'react'
import {
  Stack,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

export default function IngresoAlumno() {
  const {
    login,
    logout,
    idioma,
    isDocente,
    setDocente,
    setStage
  } = useActua()
  const ui = textos[idioma].ui

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  // Estado para mostrar el diálogo de login del docente
  const [showLogin, setShowLogin] = useState(!isDocente)
  const [senha, setSenha] = useState('')
  const [loginError, setLoginError] = useState('')

  // Cargo la lista de alumnos al montar o cuando cambie isDocente
  useEffect(() => {
    setLoading(true)
    const headers = isDocente
      ? { 'X-Docente-Token': 'Bearer ' + localStorage.getItem('docente_token') }
      : {}
    fetch('/api/getAlumnos', { headers })
      .then(res => res.json())
      .then(json => setUsuarios(json.map(a => a.nombre)))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false))
  }, [isDocente])

  // Login del docente
  const handleDocenteLogin = async () => {
    setLoginError('')
    if (!senha) {
      setLoginError('Introduce la contraseña')
      return
    }
    try {
      const response = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senha })
      })
      const data = await response.json()
      if (!response.ok) {
        setLoginError(data.error || 'Contraseña incorrecta')
        return
      }
      // Guardamos token y marcamos docente
      localStorage.setItem('docente_token', data.token)
      setDocente(true)
      setShowLogin(false)
      setSenha('')
    } catch (err) {
      console.error('Error de conexión en loginDocente:', err)
      setLoginError('Error de conexión')
    }
  }

  // Volver a portada (elimina token y logout)
  const handleBackToPortada = () => {
    localStorage.removeItem('docente_token')
    logout()
  }

  return (
    <>
      {/* Cabecera: botón de volver y título de la página */}
      <Box sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="text" color="secondary" onClick={handleBackToPortada}>
          {ui.volverPortada}
        </Button>
        <Typography variant="h5" gutterBottom>
          {ui.ingresoPageTitle}
        </Typography>
      </Box>

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

        {/* Botón para autenticarse como docente o ir al panel */}
        {!isDocente ? (
          <Button
            variant="text"
            color="secondary"
            onClick={() => setShowLogin(true)}
          >
            {ui.accederDocente}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setStage('admin')}
          >
            {ui.irPanelDocente}
          </Button>
        )}
      </Stack>

      {/* Diálogo de login para docente */}
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
