import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

const isValidName = name => /^[A-Za-zÀ-ÿ\s]{2,30}$/.test(name.trim());

export default function IngresoAlumno() {
  const { login, idioma, setDocente, setStage } = useActua();
  const ui = textos[idioma].ui;

  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para login docente
  const [showLogin, setShowLogin] = useState(false);
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState('');

  // Carga inicial de usuarios
  useEffect(() => {
    fetch('/api/getAlumnos')
      .then(res => res.json())
      .then(json => setUsuarios(json.map(a => a.nombre)))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false));
  }, []);

  const handleNew = async () => {
    if (!isValidName(name)) {
      setError(true);
      return;
    }
    setError(false);

    const res = await fetch('/api/crearAlumno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: name.trim() })
    });

    if (res.ok) {
      setUsuarios([...usuarios, name.trim()]);
      login(name.trim());
    } else {
      console.error('Error al crear alumno', await res.text());
    }
  };

  const handleDocenteLogin = async () => {
    setLoginError('');
    if (!senha) {
      setLoginError('Introduce la contraseña');
      return;
    }

    let response, text, data;
    try {
      response = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senha })
      });
    } catch (netErr) {
      console.error('Network error en loginDocente:', netErr);
      setLoginError('Error de conexión');
      return;
    }

    try {
      text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (parseErr) {
      console.error('No pude parsear JSON:', text, parseErr);
      setLoginError('Respuesta no válida del servidor');
      return;
    }

    if (!response.ok) {
      setLoginError(data.error || 'Contraseña incorrecta');
      return;
    }

    // ✅ Login correcto:
    localStorage.setItem('docente_token', data.token);
    setDocente(true);
    setStage('panelDocente');       // <-- aquí forzamos la vista de AdminPanel
    setShowLogin(false);
    setSenha('');
  };

  return (
    <>
      <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
        {!loading && usuarios.length > 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {ui.ingresoPrompt}:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
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
          onChange={e => { setName(e.target.value); setError(false); }}
          error={error}
          helperText={error ? ui.ingresoError : ''}
        />
        <Button variant="contained" onClick={handleNew} disabled={!name.trim()}>
          {ui.ingresoButton}
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={() => setShowLogin(true)}
        >
          ACCEDER COMO DOCENTE
        </Button>
      </Stack>

      {/* Diálogo de login de docente */}
      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <DialogTitle>Acceso Docente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={senha}
            onChange={e => setSenha(e.target.value)}
            error={!!loginError}
            helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogin(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleDocenteLogin}>
            Acceder
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
