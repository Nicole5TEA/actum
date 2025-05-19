import React, { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function IngresoAlumno() {
  const { login, idioma, isDocente, setDocente, setStage } = useActua();
  const ui = textos[idioma].ui;

  /* ─────────────────── CONTRASEÑA 1 (Acceso) ─────────────────── */
  const [showAcceso, setShowAcceso] = useState(
    () => !localStorage.getItem('access_token')
  );
  const [passAcceso, setPassAcceso] = useState('');
  const [errAcceso, setErrAcceso] = useState('');

  /* ─────────────────── LISTA DE USUARIOS ─────────────────── */
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ─────────────────── LOGIN DOCENTE (Contraseña 2) ─────────────────── */
  const [showLogin, setShowLogin] = useState(false); // Ya no aparece al inicio
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState('');

  /* ─────────────────── HANDLER CONTRASEÑA 1 ─────────────────── */
  const handleAcceso = async () => {
    setErrAcceso('');
    if (!passAcceso.trim()) {
      setErrAcceso(ui.accesoErr);
      return;
    }
    try {
      const r = await fetch('/api/loginAcceso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passAcceso }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErrAcceso(data?.error || ui.accesoErr);
        return;
      }
      localStorage.setItem('access_token', data.token);
      setShowAcceso(false);
      setPassAcceso('');
    } catch (e) {
      console.error('Error loginAcceso:', e);
      setErrAcceso(ui.accesoErr);
    }
  };

  /* ─────────────────── CARGA DE ALUMNOS ─────────────────── */
  useEffect(() => {
    if (showAcceso) return;
    setLoading(true);
    const headers = isDocente
      ? { 'X-Docente-Token': 'Bearer ' + localStorage.getItem('docente_token') }
      : {};
    fetch('/api/getAlumnos', { headers })
      .then((res) => res.json())
      .then((json) => setUsuarios(json.map((a) => a.nombre)))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false));
  }, [isDocente, showAcceso]);

  /* ─────────────────── LOGIN DOCENTE ─────────────────── */
  const handleDocenteLogin = async () => {
    setLoginError('');
    if (!senha) {
      setLoginError('Introduce la contraseña');
      return;
    }
    try {
      const response = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senha }),
      });
      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.error || 'Contraseña incorrecta');
        return;
      }
      localStorage.setItem('docente_token', data.token);
      setDocente(true);
      setShowLogin(false);
      setSenha('');
    } catch (err) {
      console.error('Error de conexión en loginDocente:', err);
      setLoginError('Error de conexión');
    }
  };

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <>
      {/* ───── Diálogo CONTRASEÑA 1 ───── */}
      <Dialog open={showAcceso} disableEscapeKeyDown>
        <DialogTitle>{ui.accesoTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="password"
            label={ui.accesoLabel}
            value={passAcceso}
            onChange={(e) => setPassAcceso(e.target.value)}
            error={!!errAcceso}
            helperText={errAcceso}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAcceso}>
            {ui.acceder}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ───── Contenido principal ───── */}
      {!showAcceso && (
        <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
          {/* Botón volver a Portada */}
          <Button
            variant="text"
            onClick={() => {
              localStorage.removeItem('access_token');
              setStage('portada');
            }}
          >
            {ui.volverAPortada}
          </Button>

          {/* Lista de alumnos */}
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
                {usuarios.map((u) => (
                  <Button key={u} variant="outlined" onClick={() => login(u)}>
                    {u}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          {/* Botón para ir al Panel del Docente o pedir login */}
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
      )}

      {/* ───── Diálogo LOGIN DOCENTE ───── */}
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
            onChange={(e) => setSenha(e.target.value)}
            error={!!loginError}
            helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogin(false)}>{ui.cancelar}</Button>
          <Button variant="contained" onClick={handleDocenteLogin}>
            {ui.acceder}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
