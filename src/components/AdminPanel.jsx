// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, CircularProgress, Table, TableBody,
  TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Paper, TableContainer, Alert // Alert para notificaciones
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function AdminPanel() {
  const { setStage, logout, perfiles, idioma } = useActua();
  const ui = textos[idioma].ui;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(
    () => !localStorage.getItem('docente_token')
  );
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [newName, setNewName] = useState('');
  const [errNew, setErrNew] = useState(false);
  const [viewMode, setViewMode] = useState('all');
  const [selectedAlumno, setSelectedAlumno] = useState('');
  
  // Estados para eliminación
  const [alumnoAEliminar, setAlumnoAEliminar] = useState('');
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({ type: '', text: '' });


  const escenas = textos[idioma].escenas;

  const toArray = (x) =>
    Array.isArray(x) ? x : x && typeof x === 'object' ? Object.values(x) : [];

  const parseDate = (r) =>
    new Date(r.fecha || r.datetime || r.date || 0).getTime();

  const buildSesiones = (respuestas) => {
    const sorted = [...toArray(respuestas)].sort((a, b) => parseDate(a) - parseDate(b));
    const sesiones = [];
    const currentIdx = {}; 

    sorted.forEach((reg) => {
      const sId = reg.situacionId;
      if (reg.tipoPaso === 'eleccion') {
        const ses = {
          situacionId: sId,
          respuesta: reg.respuesta || '',
          comentario: '',
          azar: '',
          fecha: reg.fecha || reg.datetime || reg.date,
        };
        sesiones.push(ses);
        currentIdx[sId] = sesiones.length - 1;
      } else if (currentIdx[sId] !== undefined) {
        const ses = sesiones[currentIdx[sId]];
        if (reg.tipoPaso === 'comentario' && reg.comentario) ses.comentario = reg.comentario;
        if (reg.tipoPaso === 'feedback_final') { 
             if (reg.comentario) ses.comentario = reg.comentario;
             ses.azar = reg.azar ? '✓' : '';
        }
        if (reg.tipoPaso === 'azar') ses.azar = reg.azar ? '✓' : '';
        
        if (parseDate(reg) > parseDate(ses)) ses.fecha = reg.fecha || reg.datetime || reg.date;
      } else if (reg.tipoPaso === 'feedback_final') { 
        const ses = {
          situacionId: sId,
          respuesta: '', 
          comentario: reg.comentario || '',
          azar: reg.azar ? '✓' : '',
          fecha: reg.fecha || reg.datetime || reg.date,
        };
        sesiones.push(ses);
        currentIdx[sId] = sesiones.length -1;
      }
    });
    sesiones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    return sesiones;
  };

  useEffect(() => {
    if (showLogin) return;
    loadData(localStorage.getItem('docente_token'));
  }, [showLogin]);

  const loadData = async (token) => {
    if (!token) return;
    setLoading(true);
    setDeleteMessage({ type: '', text: '' }); // Limpiar mensajes al recargar
    try {
      const r = await fetch('/api/getAlumnos', {
        headers: {
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + token,
        },
      });
      if (!r.ok) throw new Error('Failed to fetch alumnos');
      let json = await r.json();
      if (!Array.isArray(json)) {
        console.warn("API did not return an array for /api/getAlumnos, using local perfiles.");
        json = Object.entries(perfiles || {}).map(([nombre, p]) => ({
            id: nombre,
            date: p.date,
            respuestas: p.respuestas || p.elecciones || [], 
        }));
      }
      setData(
        json.map((i) => ({
          nombre: i.id || i.nombre,
          fechaRegistro: i.date || i.fechaRegistro,
          respuestas: toArray(i.respuestas || i.elecciones), 
        }))
      );
    } catch(error) {
      console.error("Error loading data, falling back to local profiles:", error);
      const arr = Object.entries(perfiles || {}).map(([nombre, p]) => ({
        nombre,
        fechaRegistro: p.date,
        respuestas: toArray(p.respuestas || p.elecciones),
      }));
      setData(arr);
      setDeleteMessage({ type: 'error', text: 'Error al cargar datos de alumnos.' });
    } finally {
      setLoading(false);
    }
  };

  const crearAlumno = async () => {
    const trimmed = newName.trim();
    setDeleteMessage({ type: '', text: '' });
    if (!/^([A-Za-zÀ-ÿ\s]{2,30})$/.test(trimmed)) {
      setErrNew(true);
      return;
    }
    setErrNew(false);
    try {
      const r = await fetch('/api/crearAlumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + localStorage.getItem('docente_token'),
        },
        body: JSON.stringify({ nombre: trimmed }),
      });
      if (!r.ok) {
        const errData = await r.json();
        throw new Error(errData.body || 'Failed to create alumno');
      }
      setNewName('');
      setDeleteMessage({ type: 'success', text: `Alumno '${trimmed}' creado.` });
      loadData(localStorage.getItem('docente_token'));
    } catch(error) {
      console.error("Error creating alumno:", error);
      setErrNew(true);
      setDeleteMessage({ type: 'error', text: error.message || 'Error al crear alumno.' });
    }
  };

  const handleLogin = async () => {
    setLoginError('');
    if (!password) {
      setLoginError('Introduce la contraseña');
      return;
    }
    try {
      const r = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await r.json();
      if (!r.ok) {
        setLoginError(data.error || 'Contraseña incorrecta');
        return;
      }
      localStorage.setItem('docente_token', data.token);
      setShowLogin(false);
      setPassword('');
    } catch(error) {
        console.error("Error de conexión en loginDocente:", error);
        setLoginError('Error de conexión');
    }
  };

  const handleLoginOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  
  const handleOpenConfirmDeleteDialog = () => {
    if (!alumnoAEliminar) {
        setDeleteMessage({ type: 'warning', text: 'Por favor, selecciona un alumno para eliminar.' });
        return;
    }
    setDeleteMessage({ type: '', text: '' });
    setShowConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDeleteDialog(false);
    if (!alumnoAEliminar) return;

    try {
        const token = localStorage.getItem('docente_token');
        const response = await fetch('/api/deleteAlumno', {
            method: 'POST', // Usando POST como se decidió, pero semánticamente DELETE sería mejor con ID en URL
            headers: {
                'Content-Type': 'application/json',
                'X-Docente-Token': `Bearer ${token}`,
            },
            body: JSON.stringify({ alumnoId: alumnoAEliminar }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error al eliminar: ${response.statusText}`);
        }
        setDeleteMessage({ type: 'success', text: `Alumno '${alumnoAEliminar}' eliminado correctamente.` });
        setAlumnoAEliminar(''); // Limpiar selección
        loadData(token); // Recargar datos
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        setDeleteMessage({ type: 'error', text: error.message || 'No se pudo eliminar el alumno.' });
    }
  };


  const pickLast = (arr) =>
    arr.reduce((a, b) => (parseDate(a) > parseDate(b) ? a : b));

  const getResp = (alumnoNombre, escenaId) => {
    const alumno = data.find(al => al.nombre === alumnoNombre);
    if (!alumno) return '';
    const respuestasFiltradas = toArray(alumno.respuestas).filter(
        (r) => r.situacionId === escenaId && r.tipoPaso === 'eleccion'
    );
    return respuestasFiltradas.length ? pickLast(respuestasFiltradas).respuesta : '';
  };

  return (
    <>
      <Dialog open={showLogin} disableEscapeKeyDown>
        <DialogTitle>{ui.adminPanelTitle}</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth margin="dense" label="Contraseña" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleLoginOnKeyDown} error={!!loginError} helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { logout(); setStage('ingreso');}} color="secondary">
            {ui.cambiarUsuario || "Cambiar Usuario"}
          </Button>
          <Button variant="contained" onClick={handleLogin}> {ui.acceder} </Button>
        </DialogActions>
      </Dialog>

      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Box mb={2}>
            <Button onClick={() => { localStorage.removeItem('docente_token'); logout(); }}>
              {ui.volverPortada || "Volver a Ingreso"}
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom> {ui.adminPanelTitle} </Typography>
          
          {deleteMessage.text && (
            <Alert severity={deleteMessage.type === '' ? 'info' : deleteMessage.type} sx={{ mb: 2 }}>
              {deleteMessage.text}
            </Alert>
          )}

          <Box mb={4} display="flex" gap={2} alignItems="flex-start">
            <TextField
              label={ui.nuevoAlumnoLabel || "Nuevo alumno"}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              error={errNew}
              helperText={errNew ? (ui.crearAlumnoErr || "Error al crear") : ''}
              variant="outlined"
              size="small"
            />
            <Button variant="contained" onClick={crearAlumno}>
              {ui.crearAlumnoBtn || "Crear"}
            </Button>
          </Box>

          {/* Sección para eliminar alumno */}
          <Box mb={4} display="flex" gap={2} alignItems="center" flexWrap="wrap">
            <FormControl sx={{ minWidth: 220 }} size="small" variant="outlined">
              <InputLabel id="delete-alumno-label">Seleccionar Alumno a Eliminar</InputLabel>
              <Select
                labelId="delete-alumno-label"
                label="Seleccionar Alumno a Eliminar"
                value={alumnoAEliminar}
                onChange={(e) => { setAlumnoAEliminar(e.target.value); setDeleteMessage({ type: '', text: '' });}}
              >
                <MenuItem value=""><em>-- Seleccionar --</em></MenuItem>
                {data.map((al) => (
                  <MenuItem key={al.nombre} value={al.nombre}>
                    {al.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleOpenConfirmDeleteDialog}
              disabled={!alumnoAEliminar}
            >
              Eliminar Alumno
            </Button>
          </Box>


          <Box mb={3} display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <FormControl sx={{ minWidth: 200 }} size="small" variant="outlined">
              <InputLabel id="vista-label">Vista</InputLabel>
              <Select
                labelId="vista-label" label="Vista" value={viewMode}
                onChange={(e) => {
                  const v = e.target.value;
                  setViewMode(v);
                  if (v === 'all') setSelectedAlumno('');
                }}
              >
                <MenuItem value="all">Todas las respuestas (Situaciones vs Alumnos)</MenuItem>
                <MenuItem value="single">Respuestas de un solo alumno</MenuItem>
              </Select>
            </FormControl>

            {viewMode === 'single' && (
              <FormControl sx={{ minWidth: 200 }} size="small" variant="outlined">
                <InputLabel id="alumno-label">Alumno</InputLabel>
                <Select value={selectedAlumno} labelId="alumno-label" label="Alumno"
                  onChange={(e) => setSelectedAlumno(e.target.value)}
                >
                  {data.map((al) => (
                    <MenuItem key={al.nombre} value={al.nombre}> {al.nombre} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {loading ? (
            <CircularProgress />
          ) : viewMode === 'all' ? (
            <TableContainer component={Paper} sx={{mt: 2}}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', minWidth: '200px', position: 'sticky', left: 0, background: 'white', zIndex: 1001 }}>Situación</TableCell>
                    {data.map((al) => (
                      <TableCell key={al.nombre} sx={{ fontWeight: 'bold', minWidth: '120px', textAlign: 'center' }}>{al.nombre}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {escenas.map((s) => (
                    <TableRow key={s.id} hover>
                      <TableCell sx={{ position: 'sticky', left: 0, background: 'white', zIndex: 1000, fontWeight: 'medium' }}>{s.titulo}</TableCell>
                      {data.map((al) => (
                        <TableCell key={`${s.id}-${al.nombre}`} sx={{textAlign: 'center'}}>
                          {getResp(al.nombre, s.id) || '—'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : !selectedAlumno ? (
            <Typography sx={{mt:2}}>Selecciona un alumno para ver sus respuestas detalladas.</Typography>
          ) : (
            <TableContainer component={Paper} sx={{mt: 2}}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Situación</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Respuesta</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Comentario</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Azar</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buildSesiones(
                    data.find((x) => x.nombre === selectedAlumno)?.respuestas || []
                  ).map((ses, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell> {escenas.find((e) => e.id === ses.situacionId)?.titulo || ses.situacionId} </TableCell>
                      <TableCell>{ses.respuesta || '—'}</TableCell>
                      <TableCell>{ses.comentario || '—'}</TableCell>
                      <TableCell align="center">{ses.azar}</TableCell>
                      <TableCell>
                        {new Date(ses.fecha).toLocaleString(idioma === 'ca' ? 'ca-ES' : 'es-ES', {
                          year: '2-digit', month: '2-digit', day: '2-digit',
                          hour: '2-digit', minute: '2-digit',
                          hourCycle: 'h23',
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
      {/* Confirm Delete Dialog */}
      <Dialog open={showConfirmDeleteDialog} onClose={() => setShowConfirmDeleteDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar al alumno '{alumnoAEliminar}' y todos sus datos? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}