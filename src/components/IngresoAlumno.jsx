// src/components/IngresoAlumno.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack, Typography, Button, Box, 
  Dialog, DialogTitle, DialogContent, // [cite: 1085]
  DialogActions, TextField, CircularProgress, Grid 
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function IngresoAlumno() {
  const { login, idioma, isDocente, setDocente, setStage } = useActua(); // [cite: 1086]
  const ui = textos[idioma].ui;

  const [showAcceso, setShowAcceso] = useState(
    () => !localStorage.getItem('access_token') // [cite: 1087]
  );
  const [passAcceso, setPassAcceso] = useState('');
  const [errAcceso, setErrAcceso] = useState(''); // [cite: 1088]

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false); 

  const [showLoginDocente, setShowLoginDocente] = useState(false); // [cite: 1089]
  const [senhaDocente, setSenhaDocente] = useState('');
  const [loginDocenteError, setLoginDocenteError] = useState('');

  const handleCloseAccesoDialog = (event, reason) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) { // [cite: 1090]
      if (!localStorage.getItem('access_token')) { // [cite: 1091]
        setStage('portada');
      }
    } // [cite: 1092]
  }; // [cite: 1093]

  const handleCancelAcceso = () => {
    setStage('portada'); 
  }; // [cite: 1094]

  const handleAccesoSubmit = async () => {
    setErrAcceso(''); // [cite: 1095]
    if (!passAcceso.trim()) {
      setErrAcceso(ui.accesoErr || 'Contraseña requerida');
      return;
    }
    try {
      const r = await fetch('/api/loginAcceso', { // [cite: 1096]
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passAcceso }), // [cite: 1097]
      });
      const data = await r.json();
      if (!r.ok) {
        setErrAcceso(data?.error || ui.accesoErr || 'Contraseña incorrecta'); // [cite: 1098]
        return;
      }
      localStorage.setItem('access_token', data.token); // [cite: 1099]
      setShowAcceso(false);
      setPassAcceso('');
    } catch (error) { // [cite: 1100]
      console.error("Error en loginAcceso:", error);
      setErrAcceso(ui.accesoErr || 'Error de conexión');
    }
  };

  const handlePassAccesoKeyDown = (event) => {
    if (event.key === 'Enter') { // [cite: 1101]
      handleAccesoSubmit();
    }
  };

  useEffect(() => {
    if (showAcceso) { // [cite: 1102]
        setLoading(false); // [cite: 1103]
        return;
    }

    setLoading(true);
    const headers = {}; // [cite: 1104]
    const accTok = localStorage.getItem('access_token');
    if (accTok) headers['X-Acceso-Token'] = 'Bearer ' + accTok;
    
    // [cite: 1105]
    // [cite: 1106]

    fetch('/api/getAlumnos', { headers })
      .then((res) => {
        if (!res.ok) {  // [cite: 1107]
          if (res.status === 401) { // [cite: 1108]
            localStorage.removeItem('access_token');
            setShowAcceso(true); // [cite: 1109]
            throw new Error("Token de acceso inválido o expirado. Por favor, ingrese la contraseña de acceso."); // [cite: 1110]
          }
           return res.json().then(err => { throw new Error(err.message || `Error ${res.status}`) }); // [cite: 1111]
        }
        return res.json(); // [cite: 1112]
      })
      .then((json) => {
        if(Array.isArray(json)) { // [cite: 1113]
            setUsuarios(json.map((a) => a.nombre || a.id).filter(Boolean));
        } else { // [cite: 1114]
            setUsuarios([]);
            console.error("Expected array from /api/getAlumnos, got:", json); // [cite: 1115]
            throw new Error("Formato de datos inesperado.");
        } // [cite: 1116]
      })
      .catch((error) => { 
        console.error("Error fetching alumnos:", error);  // [cite: 1117]
        setUsuarios([]); 
        setErrAcceso(error.message); // [cite: 1118]
      })
      .finally(() => setLoading(false));
  }, [isDocente, showAcceso, setStage]); // [cite: 1119]

  const handleDocenteLoginSubmit = async () => {
    setLoginDocenteError('');
    if (!senhaDocente) { // [cite: 1120]
      setLoginDocenteError('Introduce la contraseña');
      return;
    }
    try {
      const r = await fetch('/api/loginDocente', { // [cite: 1121]
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senhaDocente }), // [cite: 1122]
      });
      const data = await r.json();
      if (!r.ok) {
        setLoginDocenteError(data.error || 'Contraseña incorrecta'); // [cite: 1123]
        return;
      }
      localStorage.setItem('docente_token', data.token);
      setDocente(true);
      setStage('admin'); 
      setShowLoginDocente(false);
      setSenhaDocente('');
    } catch(error) {
      console.error("Error de conexión en loginDocente:", error); // [cite: 1124]
      setLoginDocenteError('Error de conexión');
    }
  };

  const handleSenhaDocenteKeyDown = (event) => {
    if (event.key === 'Enter') { // [cite: 1125]
      handleDocenteLoginSubmit();
    }
  };
  
  const handleExitToPortada = () => { // [cite: 1126]
    localStorage.removeItem('access_token'); 
    // [cite: 1127]
    setStage('portada');
  };

  return (
    <>
      <Dialog 
        open={showAcceso} // [cite: 1128]
        onClose={handleCloseAccesoDialog}
        disableEscapeKeyDown={false} 
      > {/* [cite: 1129] */}
        <DialogTitle>{ui.accesoTitle || "Acceso General"}</DialogTitle>
        <DialogContent>
          <TextField // [cite: 1130]
            autoFocus
            margin="dense" // [cite: 1131]
            label={ui.accesoLabel || "Contraseña de Acceso"}
            type="password" // [cite: 1132]
            fullWidth
            value={passAcceso} // [cite: 1133]
            onChange={(e) => setPassAcceso(e.target.value)}
            onKeyDown={handlePassAccesoKeyDown} // [cite: 1134]
            error={!!errAcceso}
            helperText={errAcceso} // [cite: 1135]
          />
        </DialogContent>
        <DialogActions> {/* [cite: 1136] */}
           <Button onClick={handleCancelAcceso} color="secondary">
             {ui.cancelar || "Cancelar"} {/* [cite: 1137] */}
          </Button>
          <Button variant="outlined" onClick={handleAccesoSubmit}> {/* Changed variant */}
             {ui.acceder || "Acceder"} {/* [cite: 1138] */}
          </Button>
        </DialogActions> {/* [cite: 1139] */}
      </Dialog>

      {!showAcceso && (
        <Stack spacing={3} alignItems="center" sx={{ mt: {xs: 2, sm: 4}, mb: 4, width: '100%' }}> {/* [cite: 1140] */}
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}> {/* [cite: 1141] */}
            LOGIN
          </Typography> {/* [cite: 1142] */}

          {loading ? (
            <CircularProgress /> // [cite: 1143]
          ) : usuarios.length > 0 ? (
            <Box sx={{ textAlign: 'center', width: '100%', maxWidth: { xs: '95%', sm: '80%', md: '70%'}, margin: '0 auto' }}> {/* [cite: 1144] */}
              <Typography variant="h6" gutterBottom sx={{mb: 2}}> {/* [cite: 1145] */}
                {ui.ingresoPrompt || "Selecciona tu nombre"}: {/* [cite: 1146] */}
              </Typography>
              <Grid container spacing={{xs: 1, sm: 2}} justifyContent="center"> {/* [cite: 1147] */}
                {usuarios.map((u) => ( /* [cite: 1148] */
                  <Grid item xs={12} sm={6} md={3} key={u}> {/* [cite: 1149] */}
                    <Button 
                        variant="outlined" // [cite: 1150]
                        onClick={() => login(u)} // [cite: 1151]
                        fullWidth // [cite: 1152]
                        sx={{ textTransform: 'none', p: 1.5, fontSize: '0.9rem' }} // [cite: 1153]
                    > {/* [cite: 1154] */}
                      {u} {/* [cite: 1155] */}
                    </Button> {/* [cite: 1156] */}
                  </Grid>
                ))} {/* [cite: 1157] */}
              </Grid>
            </Box> /* [cite: 1158] */
          ) : (
            <Typography sx={{mt: 2, mb:2}} color={errAcceso ? "error" : "text.secondary"}> {/* [cite: 1159] */}
              {errAcceso ? errAcceso : "No hay alumnos registrados o no se pudieron cargar."} {/* [cite: 1160] */}
            </Typography> /* [cite: 1161] */
          )}

          {/* Imagen añadida aquí */}
          {!loading && usuarios.length > 0 && (
            <Box
              component="img"
              src="/images/3d.gif" // Reemplaza con la ruta a tu imagen
              alt="Personajes en 3d"
              sx={{
                width: { xs: '50%', sm: '35%', md: '25%' },
                maxWidth: 200,
                height: 'auto',
                mt: 3, // Margen superior
                mb: 2, // Margen inferior
              }}
            />
          )}


          {!isDocente ? ( // [cite: 1162]
            <Button
              variant="text" // [cite: 1163]
              color="secondary"
              onClick={() => setShowLoginDocente(true)} // [cite: 1164]
              sx={{mt: 3}}
            > {/* [cite: 1165] */}
              {ui.accederDocente || "Acceder como Docente"}
            </Button> // [cite: 1166]
          ) : (
            <Button variant="outlined" onClick={() => setStage('admin')} sx={{mt: 3}}> {/* [cite: 1167] */}
              {ui.irPanelDocente || "Ir al Panel del Docente"} {/* [cite: 1168] */}
            </Button>
          )} {/* [cite: 1169] */}
           <Button
            variant="outlined" // [cite: 1170]
            color="primary"
            onClick={handleExitToPortada} // [cite: 1171]
            sx={{ mt: 4, alignSelf: 'center' }}
          > {/* [cite: 1172] */}
            {ui.logout || "SALIR"} 
          </Button> {/* [cite: 1173] */}
        </Stack>
      )}

      <Dialog open={showLoginDocente} onClose={() => setShowLoginDocente(false)}> {/* [cite: 1174] */}
        <DialogTitle>{ui.loginDocenteTitle || "Acceso Docente"}</DialogTitle>
        <DialogContent>
          <TextField // [cite: 1175]
            autoFocus
            margin="dense" // [cite: 1176]
            label={ui.loginDocenteLabel || "Contraseña de Docente"}
            type="password" // [cite: 1177]
            fullWidth
            value={senhaDocente} // [cite: 1178]
            onChange={(e) => setSenhaDocente(e.target.value)}
            onKeyDown={handleSenhaDocenteKeyDown} // [cite: 1179]
            error={!!loginDocenteError}
            helperText={loginDocenteError} // [cite: 1180]
          />
        </DialogContent>
        <DialogActions> {/* [cite: 1181] */}
          <Button onClick={() => setShowLoginDocente(false)}>{ui.cancelar || "Cancelar"}</Button>
          <Button variant="outlined" onClick={handleDocenteLoginSubmit}> {/* Changed variant */} {/* [cite: 1182] */}
            {ui.acceder || "Acceder"}
          </Button> {/* [cite: 1183] */}
        </DialogActions>
      </Dialog>
    </>
  );
}