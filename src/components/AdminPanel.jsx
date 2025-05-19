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
  MenuItem,
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

  /* -------------------------------------------------------------------
   * Alta de nuevo alumno — trasladado aquí (Req. 5)
   * -----------------------------------------------------------------*/
  const [newName, setNewName] = useState('');
  const [errNew, setErrNew] = useState(false);

  const crearAlumno = async () => {
    const trimmed = newName.trim();
    if (!/^([A-Za-zÀ-ÿ\s]{2,30})$/.test(trimmed)) {
      setErrNew(true);
      return;
    }
    setErrNew(false);
    try {
      const res = await fetch('/api/crearAlumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + localStorage.getItem('docente_token'),
        },
        body: JSON.stringify({ nombre: trimmed }),
      });
      if (!res.ok) throw new Error('err');
      setNewName('');
      loadData(localStorage.getItem('docente_token'));
    } catch (e) {
      setErrNew(true);
      console.error('Error crearAlumno:', e);
    }
  };

  /* -------------------------------------------------------------------
   * Vista / filtros
   * -----------------------------------------------------------------*/
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'single'
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const escenas = textos[idioma].escenas;

  /* -------------------------------------------------------------------
   * Carga inicial tras login
   * -----------------------------------------------------------------*/
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
          'X-Docente-Token': 'Bearer ' + token,
        },
      });
      if (!res.ok) throw new Error('No autorizado');
      const json = await res.json();
      const arr = json.map((item) => ({
        nombre: item.id || item.nombre,
        fechaRegistro: item.date || item.fechaRegistro,
        respuestas: item.respuestas || [],
      }));
      setData(arr);
    } catch {
      const arr = Object.entries(perfiles || {}).map(([nombre, p]) => ({
        nombre,
        fechaRegistro: p.date,
        respuestas: p.elecciones,
      }));
      setData(arr);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------
   * Login docente (Password 2)
   * -----------------------------------------------------------------*/
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
        body: JSON.stringify({ password }),
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

  /* -------------------------------------------------------------------
   * Helpers
   * -----------------------------------------------------------------*/
  const getRespuesta = (alum, sitId) => {
    const lista = (alum.respuestas || []).filter((r) => r.situacionId === sitId);
    if (!lista.length) return '';
    return lista[lista.length - 1].respuesta;
  };

  const handleViewModeChange = (e) => {
    const vm = e.target.value;
    setViewMode(vm);
    if (vm === 'all') setSelectedAlumno('');
  };

  /* -------------------------------------------------------------------
   * RENDER
   * -----------------------------------------------------------------*/
  return (
    <>
      {/* Diálogo login docente */}
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
            onChange={(e) => setPassword(e.target.value)}
            error={!!loginError}
            helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={logout} color="secondary">
            {ui.cambiarUsuario}
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            {ui.acceder}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Panel principal */}
      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          {/* Botón único para volver a página de ingreso */}
          <Box mb={2}>
            <Button onClick={() => setStage('ingreso')}>{ui.volverPortada}</Button>
          </Box>

          <Typography variant="h5" gutterBottom>
            {ui.adminPanelTitle}
          </Typography>

          {/* Alta de alumno */}
          <Box mb={4} display="flex" gap={2} alignItems="center">
            <TextField
              label={ui.nuevoAlumnoLabel}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              error={errNew}
              helperText={errNew ? ui.crearAlumnoErr : ''}
            />
            <Button variant="contained" onClick={crearAlumno}>
              {ui.crearAlumnoBtn}
            </Button>
          </Box>

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
                  onChange={(e) => setSelectedAlumno(e.target.value)}
                >
                  {data.map((alum) => (
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
                      {escenas.map((s) => (
                        <TableCell key={s.id}>{s.titulo}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((alum) => (
                      <TableRow key={alum.nombre}>
                        <TableCell>{alum.nombre}</TableCell>
                        <TableCell>{alum.fechaRegistro}</TableCell>
                        {escenas.map((s) => (
                          <TableCell key={s.id}>{getRespuesta(alum, s.id)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {viewMode === 'single' && (
                <>
                  {!selectedAlumno ? (
                    <Typography>
                      Selecciona un alumno para ver sus respuestas.
                    </Typography>
                  ) : (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Situación</TableCell>
                          <TableCell>Respuesta</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {escenas.map((s) => {
                          const alum = data.find((a) => a.nombre === selectedAlumno);
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
