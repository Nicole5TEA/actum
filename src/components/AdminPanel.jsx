// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, CircularProgress, Table, TableBody,
  TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel, Select, MenuItem,
  Paper, TableContainer, Alert
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';
import { obtenerSecuenciaEscenas } from '../ordenEscenas'; // Import for correct ordering

export default function AdminPanel() {
  const { setStage, perfiles, idioma, setDocente } = useActua();
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
  
  const [alumnoAEliminar, setAlumnoAEliminar] = useState('');
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState({ type: '', text: '' });
  
  // Escenas from textos for titles, but order from obtenerSecuenciaEscenas
  const escenasConTextos = textos[idioma].escenas;
  const secuenciaOrdenadaIds = obtenerSecuenciaEscenas();
  const escenasParaTabla = secuenciaOrdenadaIds.map(id =>
    escenasConTextos.find(s => s.id === id)
  ).filter(Boolean);


  const toArray = (x) =>
    Array.isArray(x) ? x : x && typeof x === 'object' ? Object.values(x) : []; // [cite: 428]

  const parseDate = (r) =>
    new Date(r.fecha || r.datetime || r.date || 0).getTime();

  const buildSesiones = (respuestas) => {
    const sortedRespuestas = [...toArray(respuestas)].sort((a, b) => parseDate(a) - parseDate(b));
    const sesionesMap = {};

    // Initialize sessions primarily from 'eleccion' steps
    sortedRespuestas.forEach(reg => {
      if (reg.tipoPaso === 'eleccion') {
        const key = `${reg.situacionId}-${reg.paso}`;
        if (!sesionesMap[key] || parseDate(reg) > parseDate(sesionesMap[key])) {
          sesionesMap[key] = {
            situacionId: reg.situacionId,
            paso: reg.paso,
            respuesta: reg.respuesta || '',
            comentario: '', // Initialize
            azar: '',       // Initialize
            fecha: reg.fecha || reg.datetime || reg.date,
          };
        }
      }
    });

    // Populate feedback (comentario, azar) into the corresponding 'eleccion' session
    sortedRespuestas.forEach(reg => {
      if (reg.tipoPaso === 'comentario_feedback' || reg.tipoPaso === 'azar_toggle_feedback' || reg.tipoPaso === 'feedback_final_consolidado') {
        const key = `${reg.situacionId}-${reg.paso}`; // Assuming feedback 'paso' matches 'eleccion' 'paso'
        
        if (sesionesMap[key]) {
          if (reg.comentario) sesionesMap[key].comentario = reg.comentario;
          if (typeof reg.azar === 'boolean') sesionesMap[key].azar = reg.azar ? '✓' : '';
          // Update fecha if this feedback is newer
          if (parseDate(reg) > parseDate(sesionesMap[key])) {
            sesionesMap[key].fecha = reg.fecha || reg.datetime || reg.date;
          }
        } else {
          // If no matching 'eleccion' step, create a new entry (e.g., feedback without prior eleccion)
          // This case might need refinement based on exact data flow
            sesionesMap[key + '-feedback-' + parseDate(reg)] = { // Ensure unique key
                situacionId: reg.situacionId,
                paso: reg.paso,
                respuesta: '', // No eleccion associated directly
                comentario: reg.comentario || '',
                azar: typeof reg.azar === 'boolean' ? (reg.azar ? '✓' : '') : '',
                fecha: reg.fecha || reg.datetime || reg.date,
            };
        }
      }
    });
    
    const sesionesArray = Object.values(sesionesMap);
    sesionesArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    return sesionesArray;
  };


  useEffect(() => {
    if (showLogin) return;
    loadData(localStorage.getItem('docente_token'));
  }, [showLogin]); 

  const procesarRespuestasParaElecciones = (respuestasAlumno) => {
    if (!respuestasAlumno || !Array.isArray(respuestasAlumno)) {
      return {};
    }
    const eleccionesExtraidas = {};
    const sortedRespuestas = [...respuestasAlumno].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    sortedRespuestas.forEach(reg => {
      if (reg.tipoPaso === 'eleccion' && reg.situacionId && reg.respuesta) {
        if (!eleccionesExtraidas[reg.situacionId]) { 
          eleccionesExtraidas[reg.situacionId] = reg.respuesta;
        }
      }
    });
    return eleccionesExtraidas;
  };


  const loadData = async (token) => {
    if (!token) {
      setShowLogin(true);
      return;
    }
    setLoading(true);
    setDeleteMessage({ type: '', text: '' });
    try {
      const r = await fetch('/api/getAlumnos', { // [cite: 443]
        headers: {
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + token, // [cite: 444]
        },
      });
      if (!r.ok) {
        if (r.status === 401) {
          localStorage.removeItem('docente_token'); // [cite: 445]
          setDocente(false);
          setShowLogin(true);
          setLoginError("Sesión expirada o no válida. Por favor, inicie sesión de nuevo."); // [cite: 445]
        }
        throw new Error('Failed to fetch alumnos: ' + r.statusText);
      }
      let json = await r.json(); // [cite: 446]
      
      const currentPerfilesFromStorage = JSON.parse(localStorage.getItem('perfiles') || '{}');
      const newPerfilesToStore = { ...currentPerfilesFromStorage };

      if (!Array.isArray(json)) {
        console.warn("API did not return an array for /api/getAlumnos, attempting to use local perfiles if structure matches.");
        // Attempt to use localStorage perfiles if API fails or returns non-array
        // This part is tricky as 'perfiles' might not be the same structure as 'json' from API
        // For now, let's assume 'json' should be an array. If not, we show an error or empty.
        json = []; // Or handle more gracefully
        setDeleteMessage({ type: 'warning', text: 'No se pudieron cargar los datos del servidor. Mostrando datos locales si existen.' });

      }

      json.forEach(alumnoApi => {
        const nombreAlumno = alumnoApi.id || alumnoApi.nombre;
        if (nombreAlumno) { // Ensure alumno has a name/id
            const respuestasApi = toArray(alumnoApi.respuestas || alumnoApi.elecciones || []);
            newPerfilesToStore[nombreAlumno] = {
                date: alumnoApi.date || alumnoApi.fechaRegistro || (newPerfilesToStore[nombreAlumno] ? newPerfilesToStore[nombreAlumno].date : new Date().toISOString()),
                elecciones: procesarRespuestasParaElecciones(respuestasApi), // Process for context compatibility
                respuestas: respuestasApi // Store raw responses
            };
        }
      });
      localStorage.setItem('perfiles', JSON.stringify(newPerfilesToStore));


      setData(
        json.map((i) => ({
          nombre: i.id || i.nombre, // [cite: 449]
          fechaRegistro: i.date || i.fechaRegistro,
          respuestas: toArray(i.respuestas || i.elecciones), // [cite: 450]
        }))
      );
    } catch(error) {
      console.error("Error loading data from API:", error);
       if (!showLogin) { // Only use local data if not in login flow & API fails
        const arr = Object.entries(perfiles || {}).map(([nombre, p]) => ({
            nombre,
            fechaRegistro: p.date,
            respuestas: toArray(p.respuestas || p.elecciones || []), // [cite: 452]
        }));
        setData(arr);
        setDeleteMessage({ type: 'error', text: error.message || 'Error al cargar datos de alumnos.' });
       }
    } finally {
      setLoading(false);
    }
  };

  const crearAlumno = async () => {
    const trimmed = newName.trim();
    setDeleteMessage({ type: '', text: '' });
    if (!/^([A-Za-zÀ-ÿ\s]{2,30})$/.test(trimmed)) { // [cite: 454]
      setErrNew(true);
      return;
    }
    setErrNew(false);
    try {
      const r = await fetch('/api/crearAlumno', {
        method: 'POST',
        headers: { // [cite: 455]
          'Content-Type': 'application/json',
          'X-Docente-Token': 'Bearer ' + localStorage.getItem('docente_token'), // [cite: 456]
        },
        body: JSON.stringify({ nombre: trimmed }),
      });
      if (!r.ok) {
        const errData = await r.json();
        throw new Error(errData.body || 'Failed to create alumno'); // [cite: 457]
      }
      setNewName('');
      setDeleteMessage({ type: 'success', text: `Alumno '${trimmed}' creado.` });
      loadData(localStorage.getItem('docente_token'));
    } catch(error) {
      console.error("Error creating alumno:", error);
      setErrNew(true);
      setDeleteMessage({ type: 'error', text: error.message || 'Error al crear alumno.' }); // [cite: 458]
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
        headers: { 'Content-Type': 'application/json' }, // [cite: 460]
        body: JSON.stringify({ password }),
      });
      const data = await r.json();
      if (!r.ok) {
        setLoginError(data.error || 'Contraseña incorrecta'); // [cite: 461]
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

  const handleLoginOnKeyDown = (event) => { // [cite: 462]
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  
  const handleOpenConfirmDeleteDialog = () => {
    if (!alumnoAEliminar) {
      setDeleteMessage({ type: 'warning', text: 'Por favor, selecciona un alumno para eliminar.' }); // [cite: 463]
        return;
    }
    setDeleteMessage({ type: '', text: '' });
    setShowConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDeleteDialog(false);
    if (!alumnoAEliminar) return; // [cite: 464]

    try {
        const token = localStorage.getItem('docente_token');
        const response = await fetch('/api/deleteAlumno', {
            method: 'POST', // [cite: 465]
            headers: {
                'Content-Type': 'application/json', // [cite: 466]
                'X-Docente-Token': `Bearer ${token}`,
            },
            body: JSON.stringify({ alumnoId: alumnoAEliminar }), // [cite: 467]
        });

        if (!response.ok) {
            const errorData = await response.json(); // [cite: 468]
            throw new Error(errorData.error || `Error al eliminar: ${response.statusText}`);
        }
        setDeleteMessage({ type: 'success', text: `Alumno '${alumnoAEliminar}' eliminado correctamente.` });
        setAlumnoAEliminar(''); 
        loadData(token); // [cite: 469]
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        setDeleteMessage({ type: 'error', text: error.message || 'No se pudo eliminar el alumno.' }); // [cite: 470]
    }
  };


  const pickLast = (arr) =>
    arr.reduce((a, b) => (parseDate(a) > parseDate(b) ? a : b));

  const getResp = (alumnoNombre, escenaId) => {
    const alumno = data.find(al => al.nombre === alumnoNombre); // [cite: 471]
    if (!alumno) return '';
    const respuestasFiltradas = toArray(alumno.respuestas).filter(
        (r) => r.situacionId === escenaId && r.tipoPaso === 'eleccion'
    );
    return respuestasFiltradas.length ? pickLast(respuestasFiltradas).respuesta : ''; // [cite: 472]
  };

  const handleExitAdminToIngreso = () => {
    localStorage.removeItem('docente_token');
    setDocente(false); 
    setStage('ingreso'); // [cite: 473]
  };

  return (
    <>
      <Dialog open={showLogin} disableEscapeKeyDown>
        <DialogTitle>{ui.adminPanelTitle}</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth margin="dense" label="Contraseña" type="password" // [cite: 475]
            value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleLoginOnKeyDown} error={!!loginError} helperText={loginError} // [cite: 476]
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExitAdminToIngreso} color="secondary"> 
             {ui.volverPortada || "Volver a Ingreso"} {/* [cite: 478] */}
          </Button>
          <Button variant="contained" onClick={handleLogin}> {ui.acceder} </Button> {/* [cite: 479] */}
        </DialogActions>
      </Dialog>

      {!showLogin && (
        <Box sx={{ mt: 2, mb: 4 }}>
          <Box mb={2}> {/* [cite: 480] */}
            <Button onClick={handleExitAdminToIngreso}> {/* [cite: 481] */}
              {ui.volverPortada || "Volver a Ingreso"}
            </Button>
          </Box> {/* [cite: 482] */}
          <Typography variant="h5" gutterBottom> {ui.adminPanelTitle} </Typography> {/* [cite: 483] */}
          
          {deleteMessage.text && (
            <Alert severity={deleteMessage.type === '' ? 'info' : deleteMessage.type} sx={{ mb: 2 }} onClose={() => setDeleteMessage({ type: '', text: '' })}> {/* [cite: 484] */}
              {deleteMessage.text}
            </Alert> /* [cite: 485] */
          )}

          <Box mb={4} display="flex" gap={2} alignItems="flex-start"> {/* [cite: 486] */}
            <TextField
              label={ui.nuevoAlumnoLabel || "Nuevo alumno"}
              value={newName} // [cite: 487]
              onChange={(e) => setNewName(e.target.value)}
              error={errNew}
              helperText={errNew ? (ui.crearAlumnoErr || "Error al crear") : ''} // [cite: 488]
              variant="outlined"
              size="small" // [cite: 489]
            />
            <Button variant="contained" onClick={crearAlumno}>
              {ui.crearAlumnoBtn || "Crear"} {/* [cite: 490] */}
            </Button>
          </Box>

          <Box mb={4} display="flex" gap={2} alignItems="center" flexWrap="wrap"> {/* [cite: 491] */}
            <FormControl sx={{ minWidth: 220 }} size="small" variant="outlined">
              <InputLabel id="delete-alumno-label">Seleccionar Alumno a Eliminar</InputLabel> {/* [cite: 492] */}
              <Select
                labelId="delete-alumno-label" // [cite: 493]
                label="Seleccionar Alumno a Eliminar"
                value={alumnoAEliminar} // [cite: 494]
                onChange={(e) => { setAlumnoAEliminar(e.target.value); setDeleteMessage({ type: '', text: '' });}}
              > {/* [cite: 495] */}
                <MenuItem value=""><em>-- Seleccionar --</em></MenuItem>
                {data.map((al) => ( // [cite: 496]
                  <MenuItem key={al.nombre} value={al.nombre}>
                    {al.nombre} {/* [cite: 497] */}
                  </MenuItem>
                ))} {/* [cite: 498] */}
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              color="error" /* [cite: 500] */
              onClick={handleOpenConfirmDeleteDialog}
              disabled={!alumnoAEliminar}
            > {/* [cite: 501] */}
              Eliminar Alumno
            </Button>
          </Box> {/* [cite: 502] */}

          <Box mb={3} display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <FormControl sx={{ minWidth: 200 }} size="small" variant="outlined">
              <InputLabel id="vista-label">Vista</InputLabel> {/* [cite: 503] */}
              <Select
                labelId="vista-label" label="Vista" value={viewMode} // [cite: 504]
                onChange={(e) => {
                  const v = e.target.value; // [cite: 505]
                  setViewMode(v);
                  if (v === 'all') setSelectedAlumno('');
                }}
              >
                <MenuItem value="all">Todas las respuestas (Situaciones vs Alumnos)</MenuItem> {/* [cite: 506] */}
                <MenuItem value="single">Respuestas de un solo alumno</MenuItem> {/* [cite: 507] */}
              </Select>
            </FormControl>

            {viewMode === 'single' && ( // [cite: 508]
              <FormControl sx={{ minWidth: 200 }} size="small" variant="outlined">
                <InputLabel id="alumno-label">Alumno</InputLabel> {/* [cite: 509] */}
                <Select value={selectedAlumno} labelId="alumno-label" label="Alumno"
                  onChange={(e) => setSelectedAlumno(e.target.value)} // [cite: 510]
                >
                  <MenuItem value=""><em>-- Seleccionar Alumno --</em></MenuItem> {/* [cite: 511] */}
                  {data.map((al) => (
                    <MenuItem key={al.nombre} value={al.nombre}> {al.nombre} </MenuItem> // [cite: 512]
                  ))}
                </Select> {/* [cite: 513] */}
              </FormControl>
            )} {/* [cite: 514] */}
          </Box>

          {loading ? (
            <CircularProgress /> // [cite: 515]
          ) : viewMode === 'all' ? (
            <TableContainer component={Paper} sx={{mt: 2, maxHeight: '60vh'}}>
              <Table size="small" stickyHeader> {/* [cite: 516] */}
                <TableHead>
                  <TableRow> {/* [cite: 517] */}
                    <TableCell sx={{ fontWeight: 'bold', minWidth: '200px', position: 'sticky', left: 0, background: 'white', zIndex: 1001 }}>Situación</TableCell> {/* [cite: 518] */}
                    {data.map((al) => (
                      <TableCell key={al.nombre} sx={{ fontWeight: 'bold', minWidth: '120px', textAlign: 'center' }}>{al.nombre}</TableCell> // [cite: 519]
                    ))} {/* [cite: 520] */}
                  </TableRow>
                </TableHead> {/* [cite: 521] */}
                <TableBody>
                  {escenasParaTabla.map((s) => ( // [cite: 522] Changed from `escenas.map` to `escenasParaTabla.map`
                    <TableRow key={s.id} hover>
                      <TableCell sx={{ position: 'sticky', left: 0, background: 'white', zIndex: 1000, fontWeight: 'medium' }}>{s.titulo}</TableCell> {/* [cite: 523] */}
                      {data.map((al) => ( // [cite: 524]
                        <TableCell key={`${s.id}-${al.nombre}`} sx={{textAlign: 'center'}}>
                          {getResp(al.nombre, s.id) || '—'} {/* [cite: 525] */}
                        </TableCell> /* [cite: 526] */
                      ))}
                    </TableRow> /* [cite: 527] */
                  ))} {/* [cite: 528] */}
                </TableBody>
              </Table>
            </TableContainer> /* [cite: 529] */
          ) : !selectedAlumno ? (
            <Typography sx={{mt:2}}>Selecciona un alumno para ver sus respuestas detalladas.</Typography> // [cite: 530]
          ) : (
            <TableContainer component={Paper} sx={{mt: 2, maxHeight: '60vh'}}>
              <Table size="small"> {/* [cite: 531] */}
                <TableHead>
                  <TableRow> {/* [cite: 532] */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Situación</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Respuesta</TableCell> {/* [cite: 533] */}
                    <TableCell sx={{ fontWeight: 'bold' }}>Comentario</TableCell> {/* [cite: 534] */}
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Azar</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell> {/* [cite: 535] */}
                  </TableRow>
                </TableHead> {/* [cite: 536] */}
                <TableBody>
                  {buildSesiones( // [cite: 537]
                    data.find((x) => x.nombre === selectedAlumno)?.respuestas || [] // [cite: 538]
                  ).map((ses, idx) => (
                    <TableRow key={idx} hover> {/* [cite: 539] */}
                      <TableCell> {escenasConTextos.find((e) => e.id === ses.situacionId)?.titulo || ses.situacionId} </TableCell>
                      <TableCell>{ses.respuesta || '—'}</TableCell> {/* [cite: 540] */}
                      <TableCell>{ses.comentario || '—'}</TableCell> {/* [cite: 541] */}
                      <TableCell align="center">{ses.azar}</TableCell>
                      <TableCell> {/* [cite: 542] */}
                        {new Date(ses.fecha).toLocaleString(idioma === 'ca' ? 'ca-ES' : 'es-ES', { // [cite: 543]
                          year: '2-digit', month: '2-digit', day: '2-digit', // [cite: 544]
                          hour: '2-digit', minute: '2-digit',
                          hourCycle: 'h23', // [cite: 545]
                        })} {/* [cite: 546] */}
                      </TableCell>
                    </TableRow> /* [cite: 547] */
                  ))}
                </TableBody> {/* [cite: 548] */}
              </Table>
            </TableContainer> /* [cite: 549] */
          )}
        </Box>
      )}
      <Dialog open={showConfirmDeleteDialog} onClose={() => setShowConfirmDeleteDialog(false)}> {/* [cite: 550] */}
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar al alumno '{alumnoAEliminar}' y todos sus datos? Esta acción no se puede deshacer. {/* [cite: 551] */}
          </Typography>
        </DialogContent>
        <DialogActions> {/* [cite: 552] */}
          <Button onClick={() => setShowConfirmDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar {/* [cite: 553] */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}