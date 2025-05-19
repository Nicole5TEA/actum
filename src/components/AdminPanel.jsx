// src/components/AdminPanel.jsx

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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
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

  // Nueva: modo de vista y alumno seleccionado
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'single'
  const [selectedAlumno, setSelectedAlumno] = useState('');

  // Lista de situaciones (orden)
  const escenas = textos[idioma].escenas;

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
        headers: {
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + token
        }
      });
      if (!res.ok) throw new Error('No autorizado');
      const json = await res.json();
      // Ajustamos nombres de campos
      const arr = json.map(item => ({
        nombre: item.id || item.nombre,
        fechaRegistro: item.date || item.fechaRegistro,
        respuestas: item.respuestas || []
      }));
      setData(arr);
    } catch {
      // fallback local
      const arr = Object.entries(perfiles || {}).map(([nombre, p]) => ({
        nombre,
        fechaRegistro: p.date,
        respuestas: p.elecciones  // aquí p.elecciones era objeto, pero en tu backend ya vienen arrays
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

  // Extrae la última respuesta de un alumno para una situación
  const getRespuesta = (alum, sitId) => {
    const lista = (alum.respuestas || []).filter(r => r.situacionId === sitId);
    if (!lista.length) return '';
    return lista[ lista.length - 1 ].respuesta;
  };

  // Cuando cambiamos de vista, reseteamos alumno seleccionado
  const handleViewModeChange = (e) => {
    const vm = e.target.value;
    setViewMode(vm);
    if (vm === 'all') setSelectedAlumno('');
  };

  return (
    <>
      {/* Diálogo de login */}
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

      {/* Panel principal */}
      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Box mb={2} display="flex" alignItems="center" flexWrap="wrap" gap={2}>
            <Button onClick={() => setStage('ingreso')}>{ui.volverPortada}</Button>
            <Button onClick={handleLogout}>{ui.cambiarUsuario}</Button>
          </Box>

          <Typography variant="h5" gutterBottom>{ui.adminPanelTitle}</Typography>

          {/* Controles de vista */}
          <Box mb={3} display="flex" alignItems="center" flexWrap="wrap" gap={2}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="view-select-label">Vista</InputLabel>
              <Select
                labelId="view-select-label"
                value={viewMode}
                label="Vista"
                onChange={handleViewModeChange}
              >
                <MenuItem value="all">Todos los alumnos</MenuItem>
                <MenuItem value="single">Un solo alumno</MenuItem>
              </Select>
            </FormControl>

            {viewMode === 'single' && (
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="alumno-select-label">Alumno</InputLabel>
                <Select
                  labelId="alumno-select-label"
                  value={selectedAlumno}
                  label="Alumno"
                  onChange={e => setSelectedAlumno(e.target.value)}
                >
                  {data.map(alum => (
                    <MenuItem key={alum.nombre} value={alum.nombre}>
                      {alum.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {viewMode === 'all' && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Alumno</TableCell>
                      <TableCell>Fecha Registro</TableCell>
                      {escenas.map(s => (
                        <TableCell key={s.id}>{s.titulo}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map(alum => (
                      <TableRow key={alum.nombre}>
                        <TableCell>{alum.nombre}</TableCell>
                        <TableCell>{alum.fechaRegistro}</TableCell>
                        {escenas.map(s => (
                          <TableCell key={s.id}>
                            {getRespuesta(alum, s.id)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {viewMode === 'single' && (
                <>
                  {!selectedAlumno ? (
                    <Typography>Selecciona un alumno para ver sus respuestas.</Typography>
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Situación</TableCell>
                          <TableCell>Respuesta</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {escenas.map(s => {
                          const alum = data.find(a => a.nombre === selectedAlumno);
                          return (
                            <TableRow key={s.id}>
                              <TableCell>{s.titulo}</TableCell>
                              <TableCell>{getRespuesta(alum, s.id)}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
}
