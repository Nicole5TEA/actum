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
  const { login, idioma, isDocente, setDocente, setStage } = useActua();
  const ui = textos[idioma].ui;

  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Login docente para habilitar registro
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

  // Registrar nuevo alumno (solo si isDocente)
  const handleNew = async () => {
    if (!isDocente) return;
    if (!isValidName(name)) {
      setError(true);
      return;
    }
    setError(false);

    const token = localStorage.getItem('docente_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;

    const res = await fetch('/api/crearAlumno', {
      method: 'POST',
      headers,
      body: JSON.stringify({ nombre: name.trim() })
    });

    if (res.ok) {
      setUsuarios(prev => [...prev, name.trim()]);
      login(name.trim());
    } else {
      const text = await res.text();
      console.error('Error al crear alumno:', text);
    }
  };

  // Login docente para registro
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
        body: JSON.stringify({ password: senha })
      });
      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.error || 'Contraseña incorrecta');
        return;
      }
      // Guarda token para registro
      localStorage.setItem('docente_token', data.token);
      setDocente(true);
      setShowLogin(false);
      setSenha('');
    } catch (err) {
      console.error('Error de conexión en loginDocente:', err);
      setLoginError('Error de conexión');
    }
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
          disabled={!isDocente}
        />
        {!isDocente && (
          <Typography color="error">
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

        {/* Botones de autenticación y acceso a panel */}
        {!isDocente ? (
          <Button variant="text" color="secondary" onClick={() => setShowLogin(true)}>
            ACCEDER COMO DOCENTE
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setStage('admin')}>
            IR AL PANEL DEL DOCENTE
          </Button>
        )}
      </Stack>

      {/* Diálogo de login de docente para registro */}
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
