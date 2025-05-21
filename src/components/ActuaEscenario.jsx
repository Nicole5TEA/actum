// src/components/ActuaEscenario.jsx
import React, { useState, useEffect } from 'react'
import {
  Container, Box, Typography, Button, Grid, Drawer, IconButton,
  Stack, useTheme, useMediaQuery, TextField, Checkbox, FormControlLabel
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import textos from '../textos'
import { useActua } from '../context/ActuaContext'
import DrawerMenu from './DrawerMenu'
import { 
    obtenerSecuenciaEscenas, 
    esUltimaEscenaDelNivel, 
    obtenerEscenasDelNivelActual,
    esPrimeraEscenaDelNivel // Nueva importación
} from '../ordenEscenas'

const ActuaEscenario = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    indiceEscena, paso, elecciones, idioma, reiniciarPaso, 
    setIndiceEscena, setPaso, setElecciones, cambiarIdioma,
    user, setStage, getEscenaActual
  } = useActua();

  const [commentText, setCommentText] = useState('');
  const [azarFlag, setAzarFlag] = useState(false);
  const [commentSaved, setCommentSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const data = textos[idioma];
  const todasEscenas = data.escenas;
  const escena = getEscenaActual();

  if (!escena) {
    useEffect(() => { setStage('menu'); }, [setStage]);
    return <Typography>Cargando escena o escena no encontrada...</Typography>;
  }

  const pasoActual = escena.pasos[paso];
  const totalPasos = escena.pasos.length;
  const eleccionHecha = elecciones[escena.id] || '';

  useEffect(() => {
    setCommentText('');
    setAzarFlag(false);
    setCommentSaved(false);
    setShowFeedback(false);
  }, [indiceEscena, paso]);

  const goToScene = globalIndex => {
    setIndiceEscena(globalIndex);
    reiniciarPaso();
    setMenuOpen(false);
  };
  
  const secuenciaGlobal = obtenerSecuenciaEscenas();
  const escenasDelNivelActual = obtenerEscenasDelNivelActual(escena.id, todasEscenas);
  const esUltimaDelNivelActual = esUltimaEscenaDelNivel(escena.id, escenasDelNivelActual);
  const esPrimeraDelNivelActual = esPrimeraEscenaDelNivel(escena.id, ordenEscenas, todasEscenas);


  const handleAzarToggle = event => {
    setAzarFlag(event.target.checked);
  };

  const saveComment = () => {
    if (!commentText) return;
    fetch('/api/guardarRespuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.name,
        respuestas: [{
          fecha: new Date().toISOString(),
          situacionId: escena.id,
          paso: pasoActual.tipo === "eleccion" ? paso : (paso -1 < 0 ? 0: paso -1), // Paso de la elección/resultado
          tipoPaso: 'comentario_feedback', 
          comentario: commentText,
          azar: azarFlag, 
          idioma
        }]
      })
    })
    .then(() => setCommentSaved(true))
    .catch(console.error);
  };
  
  const finishFeedback = () => {
    if (!commentSaved && (azarFlag || commentText)) {
        fetch('/api/guardarRespuestas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.name,
                respuestas: [{
                    fecha: new Date().toISOString(),
                    situacionId: escena.id,
                    paso: pasoActual.tipo === "eleccion" ? paso : (paso -1 < 0 ? 0: paso -1),
                    tipoPaso: 'feedback_final_consolidado',
                    comentario: commentText,
                    azar: azarFlag,
                    idioma
                }]
            })
        }).catch(console.error);
    }

    setShowFeedback(false);
    setCommentText('');
    setAzarFlag(false);
    setCommentSaved(false);

    if (esUltimaDelNivelActual) {
      setStage('menu');
    } else {
      const siguienteIndiceEscena = indiceEscena + 1;
      if (siguienteIndiceEscena < secuenciaGlobal.length) {
        setIndiceEscena(siguienteIndiceEscena);
        reiniciarPaso();
      } else {
        setStage('menu'); 
      }
    }
  };

  const avanzar = idEleccion => {
    const esUltimoPaso = paso === totalPasos - 1;

    if (showFeedback) {
        finishFeedback();
        return;
    }

    if (pasoActual.tipo === 'eleccion') {
      if (!idEleccion) return;
      setElecciones(prev => ({ ...prev, [escena.id]: idEleccion }));
      fetch('/api/guardarRespuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.name,
          respuestas: [{
            fecha: new Date().toISOString(),
            situacionId: escena.id,
            paso,
            tipoPaso: 'eleccion',
            respuesta: idEleccion,
            comentario: null, 
            azar: false, 
            idioma
          }]
        })
      }).catch(console.error);
    }
    
    if (esUltimoPaso) {
      setShowFeedback(true);
    } else if (paso < totalPasos - 1) {
      setPaso(paso + 1);
    }
  };

  const handleBack = () => {
    if (esPrimeraDelNivelActual && paso === 0) {
        setStage('menu');
        return;
    }

    if (showFeedback) {
      setShowFeedback(false);
      return;
    }
    
    if (paso > 0) {
      setPaso(paso - 1);
    } else {
      const prevIndiceEscena = indiceEscena - 1;
      if (prevIndiceEscena >= 0) {
        const escenaAnteriorId = secuenciaGlobal[prevIndiceEscena];
        const escenaAnterior = todasEscenas.find(e => e.id === escenaAnteriorId);
        if (escenaAnterior) {
            setIndiceEscena(prevIndiceEscena);
            setPaso(escenaAnterior.pasos.length -1);
        } else {
             setStage('menu');
        }
      } else {
        setStage('menu');
      }
    }
  };

  const renderContenido = () => {
    if (showFeedback) {
      return (
        <Box mt={3} p={2} border={1} borderColor="grey.400" borderRadius={1}>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Checkbox checked={azarFlag} onChange={handleAzarToggle} />}
              label={data.ui.labelAzar || 'Marcar como respuesta al azar'}
            />
            <TextField
              label={data.ui.labelComentario || 'Comentario (opcional)'}
              multiline rows={4} value={commentText}
              onChange={e => setCommentText(e.target.value)} fullWidth
            />
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={saveComment} disabled={!commentText || commentSaved}>
                {commentSaved ? (data.ui.comentarioGuardado || 'Guardado') : (data.ui.guardar || 'Guardar')}
              </Button>
              <Button variant="outlined" onClick={() => setCommentText('')}>
                {data.ui.cancelar || 'Cancelar'}
              </Button>
            </Box>
          </Stack>
        </Box>
      );
    }
    // ... resto de renderContenido sin cambios ...
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center" mb={2}>
          <img src={`/${pasoActual.imagen}`} alt="Escena" style={{ maxWidth: '80%', height: 'auto' }} />
          <Typography mt={1}>{pasoActual.descripcion}</Typography>
        </Box>
      );
    }
    if (pasoActual.tipo === 'eleccion') {
      return (
        <Grid container spacing={2} mb={2}>
          {pasoActual.opciones.map(op => (
            <Grid item xs={12} sm={6} key={op.id}>
              <Box onClick={() => avanzar(op.id)}
                sx={{ border: 1, borderColor: 'grey.400', p: 2, cursor: 'pointer', textAlign: 'center', borderRadius: 1, '&:hover': { backgroundColor: '#e0e0e0' } }}
              >
                <img src={`/${op.imagen}`} alt={op.texto} style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography mt={1}>{op.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    }
    if (pasoActual.tipo === 'resultado') {
        const resultado = pasoActual.resultados[eleccionHecha];
        if (!resultado) {
          return ( <Box textAlign="center" mt={4}> <Typography color="error">{data.ui.errorSinEleccion}</Typography> </Box> );
        }
        return (
          <Box textAlign="center" mb={1}>
            <img src={`/${resultado.imagen}`} alt={resultado.texto} style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography mt={1}>{resultado.texto}</Typography>
          </Box>
        );
    }
    return null;
  };

  let textoSiguiente = data.ui.siguiente;
  let IconoSiguiente = ArrowForwardIosIcon;
  let accionSiguiente = () => showFeedback ? finishFeedback() : avanzar();

  if (showFeedback && esUltimaDelNivelActual) {
    textoSiguiente = data.ui.volverAlMenu || "Volver al Menú";
    IconoSiguiente = HomeIcon;
  }

  let textoAtras = data.ui.atras;
  let IconoAtras = ArrowBackIosNewIcon;
  let accionAtras = handleBack;

  if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) {
      textoAtras = data.ui.volverAlMenu || "Volver al Menú";
      IconoAtras = HomeIcon;
  }


  return (
    <>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu
          items={todasEscenas}
          completed={elecciones}
          categories={data.ui.categories}
          nivelesLabels={data.ui.niveles || {}}
          onSelect={goToScene}
          currentEscenaId={escena.id} // Pasar el ID de la escena actual
          isGlobalMenu={false} // Indicar que es el menú de escenario
        />
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 1, position: 'relative' }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Button variant="text" size="small" startIcon={<HomeIcon />} onClick={() => setStage('menu')}>
            {data.ui.inicio}
          </Button>
          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
            <Typography sx={{ ml: 0.5 }}>{data.ui.menu}</Typography>
          </IconButton>
          <Button variant="outlined" size="small" onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}>
            {idioma === 'es' ? 'CAT' : 'ES'}
          </Button>
        </Stack>

        <Typography variant="h5" align="center" gutterBottom> {escena.titulo} </Typography>
        {(pasoActual.tipo === 'situacion' || (pasoActual.tipo === 'eleccion' && paso === 0) ) && escena.pictos && escena.pictos.length > 0 && (
          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            {escena.pictos.map((pic, i) => ( <Box key={i} component="img" src={`/${pic}`} alt={`Picto ${i + 1}`} width={40} height={40} /> ))}
          </Stack>
        )}
        <Typography variant="subtitle1" align="center" mb={0}> {pasoActual.titulo} </Typography>
        {renderContenido()}
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          {Array.from({ length: totalPasos }).map((_, i) => ( <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: i <= paso ? 'text.primary' : 'grey.300' }} /> ))}
        </Stack>
        <Typography align="center" variant="body2" mt={1}> {data.ui.pasoTexto(paso + 1, totalPasos)} </Typography>

        {isSmUp ? (
          <>
            <Button onClick={accionAtras}
              sx={{ position: 'fixed', top: '50%', left: theme.spacing(1), transform: 'translateY(-50%)',
                   minWidth: 48, p: 1, borderRadius: 1, zIndex: 10, display: 'flex', flexDirection: 'column',
                   alignItems: 'center', justifyContent: 'center', width: 'auto', minHeight: 70, // Ajustado para contenido
                   backgroundColor: 'transparent', color: 'inherit', px: 1.5 // padding horizontal
              }} variant="outlined"
            >
              <IconoAtras />
              <Typography variant="caption" sx={{ mt: 0.5, whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2' }}>{textoAtras}</Typography>
            </Button>
            <Button onClick={accionSiguiente}
              sx={{ position: 'fixed', top: '50%', right: theme.spacing(1), transform: 'translateY(-50%)',
                   minWidth: 48, p: 1, borderRadius: 1, zIndex: 10, display: 'flex', flexDirection: 'column',
                   alignItems: 'center', justifyContent: 'center', width: 'auto', minHeight: 70, // Ajustado
                   backgroundColor: 'transparent', color: 'inherit', px: 1.5
              }} variant="outlined"
              disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
            >
              <IconoSiguiente />
              <Typography variant="caption" sx={{ mt: 0.5, whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2' }}>{textoSiguiente}</Typography>
            </Button>
          </>
        ) : (
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button onClick={accionAtras} startIcon={<IconoAtras />}> {textoAtras} </Button>
            <Button onClick={accionSiguiente} endIcon={<IconoSiguiente />}
              disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
            > {textoSiguiente} </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default ActuaEscenario;