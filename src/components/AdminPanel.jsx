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

  /* ────────────────── ESTADOS ────────────────── */
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
  const escenas = textos[idioma].escenas;

  /* ────────────── UTIL ────────────── */
  const toArray = (x) =>
    Array.isArray(x) ? x : x && typeof x === 'object' ? Object.values(x) : [];

  const parseDate = (r) =>
    new Date(r.fecha || r.datetime || r.date || 0).getTime();

  /**
   * Agrupa los registros de una misma situación en "sesiones".
   * Una sesión comienza en un registro tipo "eleccion" y engloba los registros
   * siguientes (comentario / azar) hasta la siguiente "eleccion" o el final.
   * Devuelve una lista de objetos: {situacionId, respuesta, comentario, azar, fecha}
   * ordenados por fecha DESC.
   */
  const buildSesiones = (respuestas) => {
    const sorted = [...toArray(respuestas)].sort((a, b) => parseDate(a) - parseDate(b));
    const sesiones = [];
    const currentIdx = {}; // situacionId -> índice en sesiones

    sorted.forEach((reg) => {
      const sId = reg.situacionId;
      if (reg.tipoPaso === 'eleccion') {
        // Nueva sesión para esta situación
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
        if (reg.tipoPaso === 'azar') ses.azar = reg.azar ? '✓' : '';
        // Actualizar fecha a la más reciente dentro de la sesión
        if (parseDate(reg) > parseDate(ses)) ses.fecha = reg.fecha || reg.datetime || reg.date;
      }
    });

    // Ordenar por fecha descendente (más reciente primero)
    sesiones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    return sesiones;
  };

  /* ────────────────── EFFECT CARGA ────────────────── */
  useEffect(() => {
    if (showLogin) return;
    loadData(localStorage.getItem('docente_token'));
  }, [showLogin]);

  /* ────────────────── FUNCIONES ────────────────── */
  const loadData = async (token) => {
    if (!token) return;
    setLoading(true);
    try {
      const r = await fetch('/api/getAlumnos', {
        headers: {
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + token,
        },
      });
      if (!r.ok) throw new Error();
      const json = await r.json();
      setData(
        json.map((i) => ({
          nombre: i.id || i.nombre,
          fechaRegistro: i.date || i.fechaRegistro,
          respuestas: toArray(i.respuestas),
        }))
      );
    } catch {
      const arr = Object.entries(perfiles || {}).map(([nombre, p]) => ({
        nombre,
        fechaRegistro: p.date,
        respuestas: toArray(p.elecciones),
      }));
      setData(arr);
    } finally {
      setLoading(false);
    }
  };

  const crearAlumno = async () => {
    const trimmed = newName.trim();
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
      if (!r.ok) throw new Error();
      setNewName('');
      loadData(localStorage.getItem('docente_token'));
    } catch {
      setErrNew(true);
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
    } catch {
      setLoginError('Error de conexión');
    }
  };

  /* ───────────── SELECTORES SIMPLES PARA VISTA "ALL" ───────────── */
  const pickLast = (arr) =>
    arr.reduce((a, b) => (parseDate(a) > parseDate(b) ? a : b));

  const getResp = (al, id) => {
    const l = toArray(al.respuestas).filter((r) => r.situacionId === id && r.tipoPaso === 'eleccion');
    return l.length ? pickLast(l).respuesta : '';
  };

  /* ────────────────── RENDER ────────────────── */
  return (
    <>
      {/* LOGIN DOCENTE */}
      <Dialog open={showLogin} disableEscapeKeyDown>
        <DialogTitle>{ui.adminPanelTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Contraseña"
            type="password"
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

      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Box mb={2}>
            <Button
              onClick={() => {
                localStorage.removeItem('docente_token');
                logout();
                setStage('ingreso');
              }}
            >
              {ui.volverPortada}
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom>
            {ui.adminPanelTitle}
          </Typography>

          {/* Alta */}
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

          {/* Controles vista */}
          <Box mb={3} display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="vista-label">Vista</InputLabel>
              <Select
                labelId="vista-label"
                label="Vista"
                value={viewMode}
                onChange={(e) => {
                  const v = e.target.value;
                  setViewMode(v);
                  if (v === 'all') setSelectedAlumno('');
                }}
              >
                <MenuItem value="all">Todos los alumnos</MenuItem>
                <MenuItem value="single">Un solo alumno</MenuItem>
              </Select>
            </FormControl>

            {viewMode === 'single' && (
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="alumno-label">Alumno</InputLabel>
                <Select
                  value={selectedAlumno}
                  labelId="alumno-label"
                  onChange={(e) => setSelectedAlumno(e.target.value)}
                >
                  {data.map((al) => (
                    <MenuItem key={al.nombre} value={al.nombre}>
                      {al.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {/* ── NUEVO ALUMNO ── */}
          {viewMode === 'all' && (
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <TextField
                label={ui.nuevoAlumno}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                error={errNew}
                helperText={errNew && ui.errNombre}
              />
              <Button onClick={crearAlumno}>{ui.crear}</Button>
            </Box>
          )}

          {/* ── TABLA ── */}
          {loading ? (
            <CircularProgress />
          ) : viewMode === 'all' ? (
            <Table size="small">
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
                {data.map((al) => (
                  <TableRow key={al.nombre}>
                    <TableCell>{al.nombre}</TableCell>
                    <TableCell>{al.fechaRegistro}</TableCell>
                    {escenas.map((s) => (
                      <TableCell key={s.id}>{getResp(al, s.id)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : !selectedAlumno ? (
            <Typography>Selecciona un alumno para ver sus respuestas.</Typography>
          ) : (
            // VISTA DE UN SOLO ALUMNO → mostramos todas las sesiones ordenadas
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Situación</TableCell>
                  <TableCell>Respuesta</TableCell>
                  <TableCell>Comentario</TableCell>
                  <TableCell>Azar</TableCell>
                  <TableCell>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {buildSesiones(
                  data.find((x) => x.nombre === selectedAlumno)?.respuestas || []
                ).map((ses, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{
                      escenas.find((e) => e.id === ses.situacionId)?.titulo || ses.situacionId
                    }</TableCell>
                    <TableCell>{ses.respuesta || '—'}</TableCell>
                    <TableCell>{ses.comentario || '—'}</TableCell>
                    <TableCell align="center">{ses.azar}</TableCell>
                    <TableCell>
                      {new Date(ses.fecha).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hourCycle: 'h23',
                      })}
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
