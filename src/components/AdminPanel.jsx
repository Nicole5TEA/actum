import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function AdminPanel() {
  const { setStage, logout, perfiles, idioma } = useActua();
  const ui = textos[idioma].ui;

  // Estado para datos y carga
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados para autenticación al panel
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [panelToken, setPanelToken] = useState('');

  // Carga de datos tras autenticarse
  useEffect(() => {
    if (!showLogin && panelToken) {
      loadData(panelToken);
    }
  }, [showLogin, panelToken]);

  // Función para obtener alumnos desde la API con token de panel
  const loadData = async (token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/getAlumnos', {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (!res.ok) throw new Error('No autorizado');
      const json = await res.json();
      setData(json);
    } catch {
      // Fallback local
      const arr = Object.entries(perfiles).map(([nombre, p]) => ({
        nombre,
        fechaRegistro: p.date,
        respuestas: p.elecciones
      }));
      setData(arr);
    } finally {
      setLoading(false);
    }
  };

  // Manejador de login para panel
  const handleLogin = async () => {
    setLoginError('');
    if (!password) {
      setLoginError('Introduce la contraseña');
      return;
    }
    try {
      const response = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const text = await response.text();
      let dataResp;
      try {
        dataResp = text ? JSON.parse(text) : {};
      } catch {
        setLoginError('Respuesta no válida');
        return;
      }
      if (!response.ok) {
        setLoginError(dataResp.error || 'Contraseña incorrecta');
        return;
      }
      // Guardamos token solo para panel
      setPanelToken(dataResp.token);
      setShowLogin(false);
      setPassword('');
    } catch {
      setLoginError('Error de conexión');
    }
  };

  // Logout del panel (no borra token de creación)
  const handleLogout = () => {
    logout();
    setStage('ingreso');
  };

  return (
    <>
      {/* Modal de login para acceder al panel */}
      <Dialog open={showLogin} disableEscapeKeyDown>
        <DialogTitle>{ui.adminPanelTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!loginError}
            helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStage('ingreso')} color="secondary">
            {ui.cambiarUsuario}
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            Acceder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Panel de datos tras login exitoso */}
      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Button onClick={handleLogout} sx={{ mr: 1 }}>
            {ui.volverPortada}
          </Button>
          <Button onClick={() => setStage('ingreso')}>
            {ui.cambiarUsuario}
          </Button>

          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            {ui.adminPanelTitle}
          </Typography>

          {loading ? (
            <CircularProgress sx={{ mt: 4 }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alumno</TableCell>
                  <TableCell>Fecha Registro</TableCell>
                  <TableCell>Respuestas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(alum => (
                  <TableRow key={alum.nombre}>
                    <TableCell>{alum.nombre}</TableCell>
                    <TableCell>{alum.fechaRegistro}</TableCell>
                    <TableCell>
                      {alum.respuestas &&
                        Object.entries(alum.respuestas).map(([sit, resp]) => (
                          <Box key={sit} component="div">
                            {sit}: {resp}
                          </Box>
                        ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}
    </>
  );
}
