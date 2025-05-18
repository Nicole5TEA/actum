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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (!showLogin) {
      const token = localStorage.getItem('docente_token');
      if (!token) {
        setShowLogin(true);
        return;
      }
      loadData(token);
    }
  }, [showLogin]);

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
      const dataResp = await response.json();
      if (!response.ok) {
        setLoginError(dataResp.error || 'Contraseña incorrecta');
        return;
      }
      localStorage.setItem('docente_token', dataResp.token);
      setShowLogin(false);
      setPassword('');
    } catch {
      setLoginError('Error de conexión');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('docente_token');
    logout();
    setStage('ingreso');
  };

  return (
    <>
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
          <Button onClick={handleLogout} color="secondary">{ui.cambiarUsuario}</Button>
          <Button variant="contained" onClick={handleLogin}>Acceder</Button>
        </DialogActions>
      </Dialog>
      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Button onClick={handleLogout} sx={{ mr: 1 }}>{ui.volverPortada}</Button>
          <Button onClick={() => setStage('ingreso')}>{ui.cambiarUsuario}</Button>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>{ui.adminPanelTitle}</Typography>
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
                      {alum.respuestas && Object.entries(alum.respuestas).map(([sit, resp]) => (
                        <Box key={sit} component="div">{sit}: {resp}</Box>
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