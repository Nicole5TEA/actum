// src/components/IngresoAlumno.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack, Typography, Button, Box, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, CircularProgress, Grid // <<<--- IMPORTAR Grid
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
  const [loading, setLoading] = useState(true);

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
    // ... lógica de fetch en useEffect ...
    const headers = {};
    const accTok = localStorage.getItem('access_token');
    if (accTok) headers['X-Acceso-Token'] = 'Bearer ' + accTok;
    const docTok = localStorage.getItem('docente_token');
    if (docTok) headers['X-Docente-Token'] = 'Bearer ' + docTok;

    fetch('/api/getAlumnos', { headers })
      .then((res) => {
        if (!res.ok) { return res.json().then(err => { throw new Error(err.message || `Error ${res.status}`) }); }
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
      .catch((error) => { console.error("Error fetching alumnos:", error); setUsuarios([]); })
      .finally(() => setLoading(false));
  }, [isDocente, showAcceso]);

  const handleDocenteLoginSubmit = async () => { /* ... */ }; // contenido omitido
  const handleSenhaDocenteKeyDown = (event) => { /* ... */ }; // contenido omitido
  
  const handleLogout = () => { // Renombrado para claridad, ya que ahora va a portada
    logout(); 
  };

  return (
    <>
      <Dialog open={showAcceso} disableEscapeKeyDown>
        <DialogTitle>{ui.accesoTitle || "Acceso General"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={ui.accesoLabel || "Contraseña de Acceso"}
            type="password"
            fullWidth
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
        <Stack spacing={3} alignItems="center" sx={{ mt: {xs: 2, sm: 4}, mb: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
            LOGIN
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : usuarios.length > 0 ? (
            <Box sx={{ textAlign: 'center', width: '100%', maxWidth: { xs: '95%', sm: '80%', md: '70%'}, margin: '0 auto' }}>
              <Typography variant="h6" gutterBottom sx={{mb: 2}}>
                {ui.ingresoPrompt || "Selecciona tu nombre"}:
              </Typography>
              <Grid container spacing={{xs: 1, sm: 2}} justifyContent="center">
                {usuarios.map((u) => (
                  <Grid item xs={12} sm={6} md={3} key={u}> {/* xs=12 (1 por fila), sm=6 (2 por fila), md=3 (4 por fila) */}
                    <Button 
                      variant="outlined" 
                      onClick={() => login(u)} 
                      fullWidth // Para que ocupe el ancho de la celda del Grid
                      sx={{ textTransform: 'none', p: 1.5, fontSize: '0.9rem' }} // Ajustes de estilo
                    >
                      {u}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography sx={{mt: 2, mb:2}}>No hay alumnos registrados o no se pudieron cargar.</Typography>
          )}

          {!isDocente ? (
            <Button
              variant="text"
              color="secondary"
              onClick={() => setShowLoginDocente(true)}
              sx={{mt: 3}}
            >
              {ui.accederDocente || "Acceder como Docente"}
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setStage('admin')} sx={{mt: 3}}>
              {ui.irPanelDocente || "Ir al Panel del Docente"}
            </Button>
          )}
           <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout} // Usa la función renombrada
            sx={{ mt: 4, alignSelf: 'center' }}
          >
            {ui.logout || "SALIR"} 
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