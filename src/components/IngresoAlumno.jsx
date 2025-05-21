// src/components/IngresoAlumno.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack, Typography, Button, Box, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, CircularProgress, Grid 
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function IngresoAlumno() {
  const { login, idioma, isDocente, setDocente, setStage } = useActua(); // No se usa contextLogout aquí
  const ui = textos[idioma].ui;

  const [showAcceso, setShowAcceso] = useState(
    () => !localStorage.getItem('access_token') // Mostrar si no hay token de acceso
  );
  const [passAcceso, setPassAcceso] = useState('');
  const [errAcceso, setErrAcceso] = useState('');

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false); // Inicialmente false si el diálogo de acceso se muestra primero

  const [showLoginDocente, setShowLoginDocente] = useState(false);
  const [senhaDocente, setSenhaDocente] = useState('');
  const [loginDocenteError, setLoginDocenteError] = useState('');

  const handleCloseAccesoDialog = (event, reason) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      // Solo volver a portada si *realmente* no hay token de acceso y el diálogo es la primera interacción
      if (!localStorage.getItem('access_token')) {
        setStage('portada');
      }
      // Si ya hay un token y el diálogo se abrió por otra razón (no implementado), no hacer nada.
      // Opcionalmente, si se quiere forzar el cierre sin acción: setShowAcceso(false);
    }
  };

  const handleCancelAcceso = () => {
    setStage('portada'); // Vuelve a la portada
    // setShowAcceso(false); // El cambio de stage ya desmontará este componente o lo ocultará
  };

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
      localStorage.setItem('access_token', data.token); // Guardar token de acceso
      setShowAcceso(false);
      setPassAcceso('');
      // La carga de alumnos se disparará por el useEffect al cambiar showAcceso
    } catch (error) {
      console.error("Error en loginAcceso:", error);
      setErrAcceso(ui.accesoErr || 'Error de conexión');
    }
  };

  const handlePassAccesoKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAccesoSubmit();
    }
  };

  useEffect(() => {
    if (showAcceso) { // Si el diálogo de acceso está abierto, no cargar alumnos aún
        setLoading(false); // Asegurar que no se muestre el spinner de carga de alumnos
        return;
    }

    setLoading(true);
    const headers = {};
    const accTok = localStorage.getItem('access_token');
    if (accTok) headers['X-Acceso-Token'] = 'Bearer ' + accTok;
    
    // No es necesario el docente_token para simplemente listar alumnos aquí si el accTok es suficiente
    // const docTok = localStorage.getItem('docente_token');
    // if (docTok) headers['X-Docente-Token'] = 'Bearer ' + docTok;

    fetch('/api/getAlumnos', { headers })
      .then((res) => {
        if (!res.ok) { 
          if (res.status === 401) { // Si es no autorizado (ej. token inválido o expirado)
            localStorage.removeItem('access_token');
            setShowAcceso(true); // Mostrar diálogo de acceso de nuevo
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
        setErrAcceso(error.message); // Mostrar error al usuario
      })
      .finally(() => setLoading(false));
  }, [isDocente, showAcceso, setStage]); // Añadido setStage por si se usa en un futuro aquí

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
  
  // Botón "SALIR" de la página de LOGIN (IngresoAlumno)
  const handleExitToPortada = () => {
    localStorage.removeItem('access_token'); // Limpiar solo el token de acceso general
    // No limpiar docente_token ni llamar al logout() del contexto, que es para la sesión de alumno/docente.
    setStage('portada');
  };

  return (
    <>
      <Dialog 
        open={showAcceso} 
        onClose={handleCloseAccesoDialog}
        disableEscapeKeyDown={false} // Permitir Escape
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
          />
        </DialogContent>
        <DialogActions>
           <Button onClick={handleCancelAcceso} color="secondary">
            {ui.cancelar || "Cancelar"}
          </Button>
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
            onClick={handleExitToPortada} // Usar la nueva función específica
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