// src/components/IngresoAlumno.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack, Typography, Button, Box,
  Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, CircularProgress, Grid
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function IngresoAlumno() {
  const { login, idioma, isDocente, setDocente, setStage } = useActua();
  const ui = textos[idioma].ui;

  const [showAcceso, setShowAcceso] = useState(
    () => !localStorage.getItem('access_token')
  );
  const [passAcceso, setPassAcceso] = useState('');
  const [errAcceso, setErrAcceso] = useState('');
  const [isAccesoProcessing, setIsAccesoProcessing] = useState(false); // New state for acceso login

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showLoginDocente, setShowLoginDocente] = useState(false);
  const [senhaDocente, setSenhaDocente] = useState('');
  const [loginDocenteError, setLoginDocenteError] = useState('');
  const [isDocenteLoginProcessing, setIsDocenteLoginProcessing] = useState(false); // New state for docente login


  const handleCloseAccesoDialog = (event, reason) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      if (!localStorage.getItem('access_token')) {
        setStage('portada');
      }
    }
  };

  const handleCancelAcceso = () => {
    setStage('portada');
  };

  const handleAccesoSubmit = async () => {
    setErrAcceso('');
    if (!passAcceso.trim()) {
      setErrAcceso(ui.accesoErr || 'Contraseña requerida');
      return;
    }
    setIsAccesoProcessing(true); // Start loading animation
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
    } catch (error) {
      console.error("Error en loginAcceso:", error);
      setErrAcceso(ui.accesoErr || 'Error de conexión');
    } finally {
      setIsAccesoProcessing(false); // Stop loading animation
    }
  };

  const handlePassAccesoKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAccesoSubmit();
    }
  };

  useEffect(() => {
    if (showAcceso) {
        setLoading(false);
        return;
    }

    setLoading(true);
    const headers = {};
    const accTok = localStorage.getItem('access_token');
    if (accTok) headers['X-Acceso-Token'] = 'Bearer ' + accTok;
    
    fetch('/api/getAlumnos', { headers })
      .then((res) => {
        if (!res.ok) { 
          if (res.status === 401) {
            localStorage.removeItem('access_token');
            setShowAcceso(true);
            throw new Error("Token de acceso inválido o expirado. Por favor, ingrese la contraseña de acceso.");
          }
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
        setErrAcceso(error.message);
      })
      .finally(() => setLoading(false));
  }, [isDocente, showAcceso, setStage]);

  const handleDocenteLoginSubmit = async () => {
    setLoginDocenteError('');
    if (!senhaDocente) {
      setLoginDocenteError('Introduce la contraseña');
      return;
    }
    setIsDocenteLoginProcessing(true); // Start loading animation
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
    } finally {
      setIsDocenteLoginProcessing(false); // Stop loading animation
    }
  };

  const handleSenhaDocenteKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleDocenteLoginSubmit();
    }
  };
  
  const handleExitToPortada = () => {
    localStorage.removeItem('access_token');
    setStage('portada');
  };

  return (
    <>
      <Dialog
        open={showAcceso}
        onClose={handleCloseAccesoDialog}
        disableEscapeKeyDown={false}
      >
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
            disabled={isAccesoProcessing} // Disable field during processing
          />
        </DialogContent>
        <DialogActions>
           <Button onClick={handleCancelAcceso} color="secondary" disabled={isAccesoProcessing}>
             {ui.cancelar || "Cancelar"}
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleAccesoSubmit} 
            disabled={isAccesoProcessing} // Disable button during processing
          >
            {isAccesoProcessing ? <CircularProgress size={24} /> : (ui.acceder || "Acceder")}
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
                  <Grid item xs={12} sm={6} md={3} key={u}>
                    <Button
                        variant="outlined"
                        onClick={() => login(u)}
                        fullWidth
                        sx={{ textTransform: 'none', p: 1.5, fontSize: '0.9rem' }}
                    >
                      {u}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography sx={{mt: 2, mb:2}} color={errAcceso ? "error" : "text.secondary"}>
              {errAcceso ? errAcceso : "No hay alumnos registrados o no se pudieron cargar."}
            </Typography>
          )}
          
          {!loading && usuarios.length > 0 && (
             <Box
              component="img"
              src="/3d.gif" // Reemplaza con la ruta a tu imagen
              alt="Personajes en 3d"
              sx={{
                width: { xs: '50%', sm: '35%', md: '25%' },
                maxWidth: 200,
                height: 'auto',
                mt: 3,
                mb: 2,
              }}
            />
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
            onClick={handleExitToPortada}
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
            disabled={isDocenteLoginProcessing} // Disable field during processing
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLoginDocente(false)} disabled={isDocenteLoginProcessing}>
            {ui.cancelar || "Cancelar"}
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleDocenteLoginSubmit}
            disabled={isDocenteLoginProcessing} // Disable button during processing
          >
            {isDocenteLoginProcessing ? <CircularProgress size={24} /> : (ui.acceder || "Acceder")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}