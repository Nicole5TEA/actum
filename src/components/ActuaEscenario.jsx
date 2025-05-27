// src/components/ActuaEscenario.jsx
// ... (importaciones, incluyendo LinearProgress y ordenEscenas como default) ...
import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Button, Grid, Drawer, IconButton,
  Stack, useTheme, useMediaQuery, TextField, Checkbox, FormControlLabel,
  LinearProgress // Asegúrate que LinearProgress está importado
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import textos from '../textos';
import { useActua } from '../context/ActuaContext';
import DrawerMenu from './DrawerMenu';
import ordenEscenas, { // Importar ordenEscenas como default
    obtenerSecuenciaEscenas,
    esUltimaEscenaDelNivel,
    obtenerEscenasDelNivelActual,
    esPrimeraEscenaDelNivel
} from '../ordenEscenas';


const ActuaEscenario = () => {
  // ... (estados y lógica existente sin cambios hasta ProgresoNivel)
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
  const escenasDelNivelActualFlat = obtenerEscenasDelNivelActual(escena.id, todasEscenas); // Renombrado para claridad
  const esUltimaDelNivelActual = esUltimaEscenaDelNivel(escena.id, escenasDelNivelActualFlat);
  const esPrimeraDelNivelActual = esPrimeraEscenaDelNivel(escena.id, ordenEscenas, todasEscenas);


  const handleAzarToggle = event => {
    const isAzar = event.target.checked;
    setAzarFlag(isAzar);
    setCommentSaved(false); // Permitir guardar si cambia el azar

    fetch('/api/guardarRespuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.name,
        respuestas: [{
          fecha: new Date().toISOString(),
          situacionId: escena.id,
          paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1),
          tipoPaso: 'azar_toggle_feedback', 
          azar: isAzar,
          comentario: commentText, 
          idioma
        }]
      })
    })
    .catch(console.error);
  };

  const saveComment = () => {
    if (!commentText && !azarFlag) { 
        return;
    }
    fetch('/api/guardarRespuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.name,
        respuestas: [{
          fecha: new Date().toISOString(),
          situacionId: escena.id,
          paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1),
          tipoPaso: 'comentario_feedback',
          comentario: commentText,
          azar: azarFlag,
          idioma
        }]
      })
    })
    .then(() => {
        setCommentSaved(true); 
    })
    .catch(console.error);
  };
  
  const finishFeedback = () => {
    if (!commentSaved && (commentText || azarFlag)) { 
        fetch('/api/guardarRespuestas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.name,
                respuestas: [{
                    fecha: new Date().toISOString(),
                    situacionId: escena.id,
                    paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1),
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
            idioma
          }]
        })
      }).catch(console.error);
    }
    
    if (esUltimoPaso) {
      setShowFeedback(true);
      setCommentSaved(false); 
    } else if (paso < totalPasos - 1) {
      setPaso(paso + 1);
    }
  };

  const handleBack = () => {
    if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) {
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
  
  const ProgresoNivel = () => {
    if (!escena || !todasEscenas.length || !ordenEscenas.length) return null;

    const nivelActualConf = ordenEscenas.find(n => n.nivel === escena.nivel);
    if (!nivelActualConf) return null;

    let escenasIdsEnNivelActual = [];
    Object.values(nivelActualConf.categorias).forEach(catEscenas => {
        escenasIdsEnNivelActual.push(...catEscenas);
    });

    if (!escenasIdsEnNivelActual.length) return null;

    const indiceEnNivel = escenasIdsEnNivelActual.findIndex(id => id === escena.id);
    const totalEnNivel = escenasIdsEnNivelActual.length;
    
    if (indiceEnNivel === -1) return null; 

    // Barra de progreso indicativa de la posición actual en el nivel
    const porcentajeProgresoVisual = totalEnNivel > 0 ? ((indiceEnNivel + 1) / totalEnNivel) * 100 : 0;
    
    return (
      <Box sx={{ width: '100%', mt: 1, mb: 1, px:1 }}>
        <Typography variant="caption" align="center" component="div" sx={{ mb: 0.5 }}>
          SITUACIÓN {indiceEnNivel + 1} DE {totalEnNivel} (NIVEL {escena.nivel})
        </Typography>
        <LinearProgress variant="determinate" value={porcentajeProgresoVisual} />
      </Box>
    );
  };

  const renderContenido = () => { /* ... sin cambios significativos, ya ajustado para commentSaved ... */ };
  // ... (resto de ActuaEscenario.jsx igual que en la respuesta anterior, incluyendo el return y los estilos de botones) ...
  // ... la parte de los botones ya fue ajustada para ser más responsive en la respuesta anterior ...

  // Asegurarse de que el renderContenido tiene el cambio en TextField y Botón Cancelar
  const renderFeedbackContent = () => {
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
            onChange={e => { setCommentText(e.target.value); setCommentSaved(false); }}
            fullWidth
          />
          <Box display="flex" gap={1}>
            <Button variant="contained" onClick={saveComment} disabled={(!commentText && !azarFlag) || commentSaved}>
              {commentSaved ? (data.ui.comentarioGuardado || 'Guardado') : (data.ui.guardar || 'Guardar')}
            </Button>
            <Button variant="outlined" onClick={() => {setCommentText(''); setAzarFlag(false); setCommentSaved(false);}}>
              {data.ui.cancelar || 'Cancelar'}
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  };

  const renderStepContent = () => {
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
  let accionSiguienteBoton = () => showFeedback ? finishFeedback() : avanzar();
  let mostrarSiguienteBoton = true;

  if (pasoActual.tipo === 'eleccion' && !showFeedback) {
    mostrarSiguienteBoton = false;
  }

  if (showFeedback && esUltimaDelNivelActual) {
    textoSiguiente = data.ui.volverAlMenu || "Volver al Menú";
    IconoSiguiente = HomeIcon;
  }

  let textoAtras = data.ui.atras;
  let IconoAtras = ArrowBackIosNewIcon;

  if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) {
      textoAtras = data.ui.volverAlMenu || "Volver al Menú";
      IconoAtras = HomeIcon;
  }

  const commonButtonStyles = {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'auto', // Permitir que el botón se encoja
    p: 1,
    borderRadius: 1,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto', // Ancho automático basado en contenido
    minHeight: 70,
    backgroundColor: 'transparent',
    color: 'inherit',
    px: {xs: 0.5, sm: 1.5}, // Padding horizontal más pequeño en móvil
    '& .MuiButton-startIcon': { margin: 0}, 
    '& .MuiButton-endIcon': { margin: 0},
    '& .MuiSvgIcon-root': { fontSize: {xs: '1.5rem', sm: 'inherit'} }, // Icono más pequeño en móvil
  };
  
  const captionStyles = {
    mt: 0.5, whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.1', fontSize: {xs: '0.65rem', sm: 'caption.fontSize'}
  };
  
  return (
    <>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu
          items={todasEscenas}
          completed={elecciones}
          categories={data.ui.categories}
          nivelesLabels={data.ui.niveles || {}}
          onSelect={goToScene}
          currentEscenaId={escena.id}
          isGlobalMenu={false} 
        />
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 1, position: 'relative', pb: {xs: isSmUp ? 2 : 10, sm: 2} }}>
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
          <Stack direction="row" spacing={2} justifyContent="center" mb={2} flexWrap="wrap">
            {escena.pictos.map((pic, i) => ( <Box key={i} component="img" src={`/${pic}`} alt={`Picto ${i + 1}`} sx={{width: {xs:50, sm:60}, height: {xs:50, sm:60}}} /> ))}
          </Stack>
        )}
        <Typography variant="subtitle1" align="center" sx={{mb: showFeedback ? 0 : 1}}> {pasoActual.titulo} </Typography>
        
        {showFeedback ? renderFeedbackContent() : renderStepContent()}

        <Stack direction="row" spacing={1} justifyContent="center" mt={showFeedback ? 1 : 2}>
          {Array.from({ length: totalPasos }).map((_, i) => ( <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: i <= paso ? 'text.primary' : 'grey.300' }} /> ))}
        </Stack>
        <Typography align="center" variant="body2" mt={1}> {data.ui.pasoTexto(paso + 1, totalPasos)} </Typography>
        <ProgresoNivel />


        {isSmUp ? (
          <>
            <Button onClick={handleBack} sx={{...commonButtonStyles, left: theme.spacing(1) }} variant="outlined">
              <IconoAtras />
              <Typography variant="caption" sx={captionStyles}>{textoAtras}</Typography>
            </Button>
            {mostrarSiguienteBoton && (
              <Button onClick={accionSiguienteBoton}
                sx={{...commonButtonStyles, right: theme.spacing(1) }} variant="outlined"
                disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
              >
                <IconoSiguiente />
                <Typography variant="caption" sx={captionStyles}>{textoSiguiente}</Typography>
              </Button>
            )}
          </>
        ) : ( 
          <Box 
            display="flex" 
            justifyContent="space-around" // Changed to space-around for better distribution
            alignItems="center"
            sx={{ 
                width: '100%', // Ocupar todo el ancho
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                p: 1, 
                pb: 2, 
                bgcolor: 'background.paper', 
                zIndex: 100, 
                borderTop: `1px solid ${theme.palette.grey[300]}`
            }}
          >
            <Button 
              onClick={handleBack} 
              startIcon={<IconoAtras sx={{ fontSize: '1rem' }} />} 
              sx={{
                p: '6px 8px', fontSize: '0.65rem', lineHeight: 1.2, minWidth: 'auto',
                display: 'flex', flexDirection: 'column',
                '& .MuiButton-startIcon': {m:0, mb: '2px'}
              }}
            > 
              {textoAtras} 
            </Button>
            {mostrarSiguienteBoton && (
              <Button 
                onClick={accionSiguienteBoton} 
                endIcon={<IconoSiguiente sx={{ fontSize: '1rem' }} />} 
                sx={{
                  p: '6px 8px', fontSize: '0.65rem', lineHeight: 1.2, minWidth: 'auto',
                  display: 'flex', flexDirection: 'column-reverse',
                  '& .MuiButton-endIcon': {m:0, mt: '2px'}
                 }}
                disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
              > 
                {textoSiguiente} 
              </Button>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default ActuaEscenario;