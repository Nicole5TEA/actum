// src/components/IngresoAlumno.jsx
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
  CircularProgress, // <<<--- IMPORTACIÓN AÑADIDA
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function IngresoAlumno() {
  const { login, idioma, isDocente, setDocente, setStage, logout } = useActua();
  const ui = textos[idioma].ui;

  const [showAcceso, setShowAcceso] = useState(
    () => !localStorage.getItem('access_token')
  );
  const [passAcceso, setPassAcceso] = useState('');
  const [errAcceso, setErrAcceso] = useState('');

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); // `loading` se usa para CircularProgress

  const [showLoginDocente, setShowLoginDocente] = useState(false);
  const [senhaDocente, setSenhaDocente] = useState('');
  const [loginDocenteError, setLoginDocenteError] = useState('');

  const handleAccesoSubmit = async () => {
    setErrAcceso('');
    if (!passAcceso.trim()) {
      setErrAcceso(ui.accesoErr || 'Contraseña requerida');
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
        setErrAcceso(data?.error || ui.accesoErr || 'Contraseña incorrecta');
        return;
      }
      localStorage.setItem('access_token', data.token);
      setShowAcceso(false);
      setPassAcceso('');
    } catch {
      setErrAcceso(ui.accesoErr || 'Error de conexión');
    }
  };

  const handlePassAccesoKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAccesoSubmit();
    }
  };

  useEffect(() => {
    if (showAcceso) return;

    setLoading(true);
    const headers = {};
    const accTok = localStorage.getItem('access_token');
    if (accTok) headers['X-Acceso-Token'] = 'Bearer ' + accTok;
    
    const docTok = localStorage.getItem('docente_token');
    if (docTok) headers['X-Docente-Token'] = 'Bearer ' + docTok;

    fetch('/api/getAlumnos', { headers })
      .then((res) => {
        if (!res.ok) { // Verifica si la respuesta de la red fue exitosa
          return res.json().then(err => { throw new Error(err.message || `Error ${res.status}`) });
        }
        return res.json();
      })
      .then((json) => {
        if(Array.isArray(json)) {
            setUsuarios(json.map((a) => a.nombre || a.id).filter(Boolean));
        } else {
            setUsuarios([]);
            console.error("Expected array from /api/getAlumnos, got:", json);
            throw new Error("Formato de datos inesperado.");
        }
      })
      .catch((error) => {
        console.error("Error fetching alumnos:", error);
        setUsuarios([]);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      })
      .finally(() => setLoading(false));
  }, [isDocente, showAcceso]); // Eliminado `perfiles` de las dependencias

  const handleDocenteLoginSubmit = async () => {
    setLoginDocenteError('');
    if (!senhaDocente) {
      setLoginDocenteError('Introduce la contraseña');
      return;
    }
    try {
      const r = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senhaDocente }),
      });
      const data = await r.json();
      if (!r.ok) {
        setLoginDocenteError(data.error || 'Contraseña incorrecta');
        return;
      }
      localStorage.setItem('docente_token', data.token);
      setDocente(true);
      setStage('admin'); 
      setShowLoginDocente(false);
      setSenhaDocente('');
    } catch(error) {
      console.error("Error de conexión en loginDocente:", error);
      setLoginDocenteError('Error de conexión');
    }
  };

  const handleSenhaDocenteKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleDocenteLoginSubmit();
    }
  };
  
  const handleLogoutAndGoToPortada = () => {
    logout(); 
    // No es necesario tocar los tokens aquí, logout() en el contexto debería manejarlos si es necesario.
    // setStage('portada'); // logout() en el contexto ya debería hacer esto o llevar a 'ingreso'.
  };

  return (
    <>
      <Dialog open={showAcceso} disableEscapeKeyDown>
        <DialogTitle>{ui.accesoTitle || "Acceso General"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="password"
            label={ui.accesoLabel || "Contraseña de Acceso"}
            value={passAcceso}
            onChange={(e) => setPassAcceso(e.target.value)}
            onKeyDown={handlePassAccesoKeyDown}
            error={!!errAcceso}
            helperText={errAcceso}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAccesoSubmit}>
            {ui.acceder || "Acceder"}
          </Button>
        </DialogActions>
      </Dialog>

      {!showAcceso && (
        <Stack spacing={4} alignItems="center" sx={{ mt: 2, mb: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
            LOGIN
          </Typography>

          {loading ? (
            <CircularProgress /> // <<<--- AQUÍ SE USA
          ) : usuarios.length > 0 ? (
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {ui.ingresoPrompt || "Selecciona tu nombre"}:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent="center"
                sx={{ maxWidth: '80%', margin: '0 auto' }}
              >
                {usuarios.map((u) => (
                  <Button key={u} variant="outlined" onClick={() => login(u)} sx={{m:0.5}}>
                    {u}
                  </Button>
                ))}
              </Stack>
            </Box>
          ) : (
            <Typography sx={{mt: 2, mb:2}}>No hay alumnos registrados o no se pudieron cargar.</Typography>
          )}

          {!isDocente ? (
            <Button
              variant="text"
              color="secondary"
              onClick={() => setShowLoginDocente(true)}
            >
              {ui.accederDocente || "Acceder como Docente"}
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setStage('admin')}>
              {ui.irPanelDocente || "Ir al Panel del Docente"}
            </Button>
          )}
           <Button
            variant="outlined"
            color="primary"
            onClick={handleLogoutAndGoToPortada} // logout() ahora debería llevar a 'ingreso'
            sx={{ mt: 4, alignSelf: 'center' }}
          >
            {ui.logout || "LOGOUT"} 
          </Button>
        </Stack>
      )}

      <Dialog open={showLoginDocente} onClose={() => setShowLoginDocente(false)}>
        <DialogTitle>{ui.loginDocenteTitle || "Acceso Docente"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={ui.loginDocenteLabel || "Contraseña de Docente"}
            type="password"
            fullWidth
            value={senhaDocente}
            onChange={(e) => setSenhaDocente(e.target.value)}
            onKeyDown={handleSenhaDocenteKeyDown}
            error={!!loginDocenteError}
            helperText={loginDocenteError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLoginDocente(false)}>{ui.cancelar || "Cancelar"}</Button>
          <Button variant="contained" onClick={handleDocenteLoginSubmit}>
            {ui.acceder || "Acceder"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}