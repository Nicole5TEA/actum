// src/components/ActuaEscenario.jsx
import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import {
  Container, Box,
  Typography, Button, Grid, Drawer, IconButton,
  Stack, useTheme, useMediaQuery, TextField, Checkbox, FormControlLabel,
  LinearProgress, Fade // Added Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import textos from '../textos';
import { useActua } from '../context/ActuaContext';
import DrawerMenu from './DrawerMenu';
import ordenEscenas, {
    obtenerSecuenciaEscenas,
    esUltimaEscenaDelNivel,
    obtenerEscenasDelNivelActual,
    esPrimeraEscenaDelNivel
} from '../ordenEscenas';

const ActuaEscenario = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const {
    indiceEscena, paso, elecciones, idioma, reiniciarPaso,
    setIndiceEscena, setPaso, setElecciones, cambiarIdioma,
    user, setStage, getEscenaActual, getIdEscenaActual
  } = useActua();

  const [commentText, setCommentText] = useState('');
  const [azarFlag, setAzarFlag] = useState(false);
  const [commentSaved, setCommentSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // [cite: 298]
  
  // For scene transition
  const [transitionIn, setTransitionIn] = useState(true);
  const currentSceneId = getIdEscenaActual(); // Get ID for dependency

  useEffect(() => {
    setTransitionIn(false); // Trigger exit animation
    const timer = setTimeout(() => {
      setTransitionIn(true); // Trigger enter animation for new scene
    }, 250); // Match this with Fade timeout or slightly less
    return () => clearTimeout(timer);
  }, [currentSceneId]); // Depend on currentSceneId


  const data = textos[idioma];
  const todasEscenas = data.escenas;
  
  // useMemo for escena to avoid re-renders if getEscenaActual is stable
  const escena = useMemo(() => getEscenaActual(), [currentSceneId, idioma, getEscenaActual]);


  if (!escena) {
    useEffect(() => { setStage('menu'); }, [setStage]);
    return <Typography>Cargando escena o escena no encontrada...</Typography>;
  }

  const pasoActual = escena.pasos[paso]; // [cite: 299]
  const totalPasos = escena.pasos.length; // [cite: 299]
  const eleccionHecha = elecciones[escena.id] || ''; // [cite: 299]

  useEffect(() => {
    setCommentText('');
    setAzarFlag(false);
    setCommentSaved(false);
    setShowFeedback(false);
  }, [indiceEscena, paso]);

  const goToScene = globalIndex => { // [cite: 300]
    if (indiceEscena !== globalIndex) { // Only trigger transition if scene actually changes
        setTransitionIn(false);
        setTimeout(() => {
            setIndiceEscena(globalIndex);
            reiniciarPaso();
            setMenuOpen(false);
            // setTransitionIn(true); // This will be handled by the main currentSceneId useEffect
        }, 250); // Delay to allow fade out
    } else {
        reiniciarPaso(); // If same scene, just reset paso
        setMenuOpen(false);
    }
  };
  
  const secuenciaGlobal = obtenerSecuenciaEscenas(); // [cite: 300]
  const escenasDelNivelActualFlat = obtenerEscenasDelNivelActual(escena.id, todasEscenas); // [cite: 300]
  const esUltimaDelNivelActual = esUltimaEscenaDelNivel(escena.id, escenasDelNivelActualFlat); // [cite: 300]
  const esPrimeraDelNivelActual = esPrimeraEscenaDelNivel(escena.id, ordenEscenas, todasEscenas); // [cite: 300]


  const handleAzarToggle = event => { // [cite: 301]
    const isAzar = event.target.checked; // [cite: 301]
    setAzarFlag(isAzar); // [cite: 301]
    setCommentSaved(false); // [cite: 301]

    fetch('/api/guardarRespuestas', { // [cite: 301]
      method: 'POST', // [cite: 301]
      headers: { 'Content-Type': 'application/json' }, // [cite: 301]
      body: JSON.stringify({
        id: user.name, // [cite: 302]
        respuestas: [{
          fecha: new Date().toISOString(), // [cite: 302]
          situacionId: escena.id, // [cite: 303]
          paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1), // [cite: 303]
          tipoPaso: 'azar_toggle_feedback', // [cite: 304]
          azar: isAzar, // [cite: 304]
          comentario: commentText, // [cite: 304]
          idioma // [cite: 305]
        }]
      })
    })
    .catch(console.error);
  };

  const saveComment = () => { // [cite: 306]
    if (!commentText && !azarFlag) { // [cite: 306]
        return;
    }
    fetch('/api/guardarRespuestas', { // [cite: 306]
      method: 'POST', // [cite: 306]
      headers: { 'Content-Type': 'application/json' }, // [cite: 306]
      body: JSON.stringify({ // [cite: 307]
        id: user.name, // [cite: 307]
        respuestas: [{
          fecha: new Date().toISOString(), // [cite: 307]
          situacionId: escena.id, // [cite: 308]
          paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1), // [cite: 308]
          tipoPaso: 'comentario_feedback', // [cite: 309]
          comentario: commentText, // [cite: 309]
          azar: azarFlag, // [cite: 309]
          idioma // [cite: 310]
        }]
      })
    })
    .then(() => {
        setCommentSaved(true); // [cite: 311]
    }) // [cite: 311]
    .catch(console.error);
  };
  
  const finishFeedback = () => {
    if (!commentSaved && (commentText || azarFlag)) { // [cite: 311]
        fetch('/api/guardarRespuestas', {
          method: 'POST', // [cite: 312]
            headers: { 'Content-Type': 'application/json' }, // [cite: 312]
            body: JSON.stringify({ // [cite: 313]
                id: user.name, // [cite: 313]
                respuestas: [{
                    fecha: new Date().toISOString(), // [cite: 314]
                    situacionId: escena.id, // [cite: 315]
                    paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1), // [cite: 316]
                    tipoPaso: 'feedback_final_consolidado', // [cite: 316]
                    comentario: commentText, // [cite: 317]
                    azar: azarFlag, // [cite: 317]
                    idioma // [cite: 318]
                }]
            }) // [cite: 319]
        }).catch(console.error);
}

    setShowFeedback(false);
    setCommentText('');
    setAzarFlag(false);
    setCommentSaved(false);

    // Scene transition logic
    setTransitionIn(false);
    setTimeout(() => {
        if (esUltimaDelNivelActual) {
            setStage('menu');
        } else {
            const siguienteIndiceEscena = indiceEscena + 1; // [cite: 320]
            if (siguienteIndiceEscena < secuenciaGlobal.length) {
                setIndiceEscena(siguienteIndiceEscena); // [cite: 320]
                reiniciarPaso(); // [cite: 320]
            } else {
                setStage('menu'); // [cite: 320]
            }
        }
        // setTransitionIn(true); // This will be handled by useEffect on currentSceneId change
    }, 250); // Delay for fade out
  };

  const avanzar = idEleccion => {
    const esUltimoPaso = paso === totalPasos - 1; // [cite: 321]

    if (pasoActual.tipo === 'eleccion' && idEleccion) {
      setElecciones(prev => ({ ...prev, [escena.id]: idEleccion })); // [cite: 322]
      fetch('/api/guardarRespuestas', { // [cite: 322]
        method: 'POST', // [cite: 322]
        headers: { 'Content-Type': 'application/json' }, // [cite: 322]
        body: JSON.stringify({
          id: user.name, // [cite: 323]
          respuestas: [{
            fecha: new Date().toISOString(), // [cite: 323]
            situacionId: escena.id, // [cite: 324]
            paso, // [cite: 324]
            tipoPaso: 'eleccion', // [cite: 324]
            respuesta: idEleccion, // [cite: 325]
            idioma // [cite: 325]
          }]
        }) // [cite: 326]
      }).catch(console.error);
    }
    
    if (esUltimoPaso) {
      setShowFeedback(true); // [cite: 326]
      setCommentSaved(false); // [cite: 326]
    } else if (paso < totalPasos - 1) { // [cite: 327]
      setPaso(paso + 1);
    }
  };

  const handleBack = () => {
    setTransitionIn(false); // Start fade out before changing scene/paso
    setTimeout(() => {
        if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) { // [cite: 328]
            setStage('menu'); // [cite: 328]
            return;
        }
        if (showFeedback) {
            setShowFeedback(false);
             setTransitionIn(true); // Fade back in the current step content
            return;
        }
        if (paso > 0) {
            setPaso(paso - 1);
            setTransitionIn(true); // Fade back in
        } else {
            const prevIndiceEscena = indiceEscena - 1; // [cite: 329]
            if (prevIndiceEscena >= 0) {
                const escenaAnteriorId = secuenciaGlobal[prevIndiceEscena]; // [cite: 329]
                const escenaAnterior = todasEscenas.find(e => e.id === escenaAnteriorId); // [cite: 329]
                if (escenaAnterior) { // [cite: 330]
                    setIndiceEscena(prevIndiceEscena); // [cite: 330]
                    setPaso(escenaAnterior.pasos.length -1); // [cite: 330]
                } else {
                    setStage('menu'); // [cite: 330]
                }
            } else { // [cite: 331]
                setStage('menu'); // [cite: 331]
            }
            // TransitionIn for new scene will be handled by currentSceneId useEffect
        }
    }, 250); // Delay for fade out
  };
  
  const ProgresoNivel = () => { // [cite: 331]
    if (!escena || !todasEscenas.length || !ordenEscenas.length) return null; // [cite: 331]

    const nivelActualConf = ordenEscenas.find(n => n.nivel === escena.nivel); // [cite: 332]
    if (!nivelActualConf) return null; // [cite: 332]

    let escenasIdsEnNivelActual = []; // [cite: 332]
    Object.values(nivelActualConf.categorias).forEach(catEscenas => { // [cite: 332]
        escenasIdsEnNivelActual.push(...catEscenas); // [cite: 332]
    });
    if (!escenasIdsEnNivelActual.length) return null; // [cite: 332]

    const indiceEnNivel = escenasIdsEnNivelActual.findIndex(id => id === escena.id); // [cite: 333]
    const totalEnNivel = escenasIdsEnNivelActual.length; // [cite: 333]
    
    if (indiceEnNivel === -1) return null; // [cite: 333]

    const porcentajeProgresoVisual = totalEnNivel > 0 ? ((indiceEnNivel + 1) / totalEnNivel) * 100 : 0; // [cite: 333]
    
    return (
      <Box sx={{ width: '100%', mt: 1, mb: 1, px:1 }}> {/* [cite: 334] */}
        <Typography variant="caption" align="center" component="div" sx={{ mb: 0.5 }}>
          SITUACIÓN {indiceEnNivel + 1} DE {totalEnNivel} (NIVEL {escena.nivel}) {/* [cite: 335] */}
        </Typography>
        <LinearProgress variant="determinate" value={porcentajeProgresoVisual} /> {/* [cite: 335] */}
      </Box>
    );
  };

  const renderFeedbackContent = () => { // [cite: 336]
    return (
      <Box mt={3} p={2} border={1} borderColor="grey.400" borderRadius={1}> {/* [cite: 336] */}
        <Stack spacing={2}> {/* [cite: 336] */}
          <FormControlLabel // [cite: 337]
            control={<Checkbox checked={azarFlag} onChange={handleAzarToggle} />} // [cite: 337]
            label={data.ui.labelAzar || 'Marcar como respuesta al azar'} // [cite: 337]
          /> {/* [cite: 338] */}
          <TextField // [cite: 338]
            label={data.ui.labelComentario || 'Comentario (opcional)'} // [cite: 338]
            multiline rows={4} value={commentText} // [cite: 339]
            onChange={e => { setCommentText(e.target.value); setCommentSaved(false); }} // [cite: 339]
            fullWidth // [cite: 340]
          />
          <Box display="flex" gap={1}> {/* [cite: 340] */}
            <Button variant="contained" onClick={saveComment} disabled={(!commentText && !azarFlag) || commentSaved}> {/* [cite: 341] */}
              {commentSaved ? (data.ui.comentarioGuardado || 'Guardado') : (data.ui.guardar || 'Guardar')} {/* [cite: 341] */}
            </Button> {/* [cite: 342] */}
            <Button variant="outlined" onClick={() => {setCommentText(''); setAzarFlag(false); setCommentSaved(false);}}>
              {data.ui.cancelar || 'Cancelar'} {/* [cite: 343] */}
            </Button>
          </Box>
        </Stack>
      </Box> // [cite: 344]
    );
  };

  const renderStepContent = () => { // [cite: 344]
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center" mb={2}> {/* [cite: 345] */}
          <img 
            src={`/${pasoActual.imagen}`} 
            alt={`Escena de situación: ${pasoActual.titulo}`} 
            style={{ maxWidth: '80%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // [cite: 346]
            loading="lazy" 
          /> {/* [cite: 347] */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt: 2 }}> {/* [cite: 348] */}
            {data.ui.pasoTituloSituacion || pasoActual.titulo} {/* [cite: 348] */}
          </Typography> {/* [cite: 349] */}
          <Typography mt={1}>{pasoActual.descripcion}</Typography> {/* [cite: 349] */}
        </Box>
      );
    }
    if (pasoActual.tipo === 'eleccion') { // [cite: 350]
      return (
        <> {/* [cite: 350] */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt: 2, mb: 2, textAlign: 'center' }}> {/* [cite: 351] */}
            {pasoActual.titulo} {/* [cite: 351] */}
          </Typography> {/* [cite: 352] */}
          <Grid container spacing={2} mb={2}> {/* [cite: 352] */}
            {pasoActual.opciones.map(op => (
              <Grid item xs={12} sm={6} key={op.id}> {/* [cite: 353] */}
                <Box onClick={() => avanzar(op.id)} // [cite: 354]
                   sx={{ border: 1, borderColor: 'grey.400', p: 2, cursor: 'pointer', textAlign: 'center', borderRadius: 1, '&:hover': { backgroundColor: '#e0e0e0' } }} // [cite: 355]
                >
                  <img // [cite: 356]
                    src={`/${op.imagen}`} // [cite: 356]
                    alt={op.texto} // [cite: 357]
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // [cite: 358]
                    loading="lazy" // [cite: 358]
                  /> {/* [cite: 359] */}
                  <Typography mt={1}>{op.texto}</Typography> {/* [cite: 360] */}
                </Box> {/* [cite: 360] */}
              </Grid>
            ))}
          </Grid> {/* [cite: 361] */}
        </>
      );
    }
    if (pasoActual.tipo === 'resultado') {
         const resultado = pasoActual.resultados[eleccionHecha]; // [cite: 362]
        if (!resultado) {
          return ( <Box textAlign="center" mt={4}> <Typography color="error">{data.ui.errorSinEleccion}</Typography> </Box> ); // [cite: 362]
        }
        return (
          <Box textAlign="center" mb={1}> {/* [cite: 363] */}
             <img 
                src={`/${resultado.imagen}`} // [cite: 364]
                alt={resultado.texto} // [cite: 364]
                style={{ maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} // [cite: 365]
                loading="lazy"
             /> {/* [cite: 366] */}
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt: 2 }}> {/* [cite: 367] */}
                {data.ui.pasoTituloResultado || pasoActual.titulo} {/* [cite: 367] */}
            </Typography> {/* [cite: 368] */}
            <Typography mt={1}>{resultado.texto}</Typography> {/* [cite: 368] */}
          </Box> // [cite: 369]
      );
    }
    return null; // [cite: 369]
  };

  let textoSiguiente = data.ui.siguiente; // [cite: 369]
  let IconoSiguiente = ArrowForwardIosIcon; // [cite: 369]
  let accionSiguienteBoton = () => showFeedback ? finishFeedback() : avanzar(eleccionHecha); // [cite: 369]
  
  let mostrarSiguienteBoton = !showFeedback || (showFeedback && esUltimaDelNivelActual) || (showFeedback && !esUltimaDelNivelActual); // [cite: 370]
  if (showFeedback) {
    // No hacer nada, se maneja abajo
  } else if (pasoActual.tipo === 'eleccion') {
     mostrarSiguienteBoton = true; // [cite: 371]
  }


  if (showFeedback && esUltimaDelNivelActual) { // [cite: 371]
    textoSiguiente = data.ui.volverAlMenu || "Volver al Menú"; // [cite: 371]
    IconoSiguiente = HomeIcon; // [cite: 371]
  }

  let textoAtras = data.ui.atras; // [cite: 371]
  let IconoAtras = ArrowBackIosNewIcon; // [cite: 371]

  if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) { // [cite: 372]
      textoAtras = data.ui.volverAlMenu || "Volver al Menú"; // [cite: 372]
      IconoAtras = HomeIcon; // [cite: 372]
  }

  const commonButtonStyles = { // [cite: 372]
    position: 'fixed', // [cite: 372]
    top: '50%', // [cite: 372]
    transform: 'translateY(-50%)', // [cite: 373]
    minWidth: 'auto', // [cite: 373]
    p: 1, // [cite: 373]
    borderRadius: 1, // [cite: 373]
    zIndex: 10, // [cite: 373]
    display: 'flex', // [cite: 373]
    flexDirection: 'column', // [cite: 373]
    alignItems: 'center', // [cite: 374]
    justifyContent: 'center', // [cite: 374]
    width: 'auto', // [cite: 374]
    minHeight: 70, // [cite: 374]
    backgroundColor: 'transparent', // [cite: 374]
    color: 'inherit', // [cite: 374]
    px: {xs: 0.5, sm: 1.5}, // [cite: 375]
    '& .MuiButton-startIcon': { margin: 0}, // [cite: 375]
    '& .MuiButton-endIcon': { margin: 0}, // [cite: 375]
    '& .MuiSvgIcon-root': { fontSize: {xs: '1.5rem', sm: 'inherit'} }, // [cite: 375]
  };
  
  const captionStyles = { // [cite: 376]
    mt: 0.5, whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.1', fontSize: {xs: '0.65rem', sm: 'caption.fontSize'} // [cite: 376]
  };
  
  return (
    <>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}> {/* [cite: 377] */}
        <DrawerMenu // [cite: 377]
          items={todasEscenas} // [cite: 377]
          completed={elecciones} // [cite: 377]
          categories={data.ui.categories} // [cite: 377]
          nivelesLabels={data.ui.niveles || {}} // [cite: 378]
          onSelect={goToScene} // [cite: 378]
          currentEscenaId={escena.id} // [cite: 378]
          isGlobalMenu={false} // [cite: 379]
        />
      </Drawer>
        <Fade in={transitionIn} timeout={250}>
            <Container maxWidth="md" sx={{ pt: 1, position: 'relative', pb: {xs: isSmUp ? 2 : 10, sm: 2} }}> {/* [cite: 380] */}
                <Stack direction="row" spacing={1} alignItems="center" mb={1} flexWrap="wrap"> {/* [cite: 380] */}
                <Button variant="text" size="small" startIcon={<HomeIcon />} onClick={() => setStage('menu')} sx={{mr: 'auto'}}>
                    {data.ui.inicio} {/* [cite: 381] */}
                </Button>
                <Button  // [cite: 382]
                    variant="outlined" // [cite: 382]
                    size="small" // [cite: 382]
                    startIcon={<MenuIcon />} // [cite: 382]
                    onClick={() => setMenuOpen(true)} // [cite: 383]
                    sx={{ textTransform: 'none' }} // [cite: 383]
                >
                    {data.ui.menu} {/* [cite: 384] */}
                </Button>
                <Button variant="outlined" size="small" onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}> {/* [cite: 385] */}
                    {idioma === 'es' ? 'CAT' : 'ES'} {/* [cite: 385] */}
                </Button>
                </Stack> {/* [cite: 386] */}

                <Typography variant="h5" align="center" gutterBottom> {escena.titulo} </Typography> {/* [cite: 386] */}
                
                {(pasoActual.tipo === 'situacion' || (pasoActual.tipo === 'eleccion' && paso === 0) ) && escena.pictos && escena.pictos.length > 0 && ( /* [cite: 387] */
                <Stack direction="row" spacing={2} justifyContent="center" mb={2} flexWrap="wrap"> {/* [cite: 388] */}
                    {escena.pictos.map((pic, i) => (  /* [cite: 388] */
                    <Box  /* [cite: 389] */
                        key={i} // [cite: 389]
                        component="img" // [cite: 389]
                        src={`/${pic}`} // [cite: 390]
                        alt={`Picto ${i + 1}`} // [cite: 390]
                        sx={{ // [cite: 391]
                        width: {xs: 55, sm: 70}, 
                        height: {xs: 55, sm: 70}, // [cite: 392]
                        }} // [cite: 393]
                    /> 
                    ))}
                </Stack> /* [cite: 394] */
                )}
                
                {showFeedback ? renderFeedbackContent() : renderStepContent()} {/* [cite: 395] */}

                <Stack direction="row" spacing={1} justifyContent="center" mt={showFeedback ? 1 : 2}> {/* [cite: 396] */}
                {Array.from({ length: totalPasos }).map((_, i) => ( <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: i <= paso ? 'text.primary' : 'grey.300' }} /> ))} {/* [cite: 397] */}
                </Stack>
                <Typography align="center" variant="body2" mt={1}> {data.ui.pasoTexto(paso + 1, totalPasos)} </Typography> {/* [cite: 397] */}
                <ProgresoNivel /> {/* [cite: 398] */}


                {isSmUp ? (
                <>
                    <Button onClick={handleBack} sx={{...commonButtonStyles, left: theme.spacing(1) }} variant="outlined"> {/* [cite: 399] */}
                    <IconoAtras />
                    <Typography variant="caption" sx={captionStyles}>{textoAtras}</Typography> {/* [cite: 399] */}
                    </Button> {/* [cite: 400] */}
                    {mostrarSiguienteBoton && (
                    <Button onClick={accionSiguienteBoton} // [cite: 401]
                        sx={{...commonButtonStyles, right: theme.spacing(1) }} variant="outlined" // [cite: 401]
                    >
                        <IconoSiguiente /> {/* [cite: 402] */}
                        <Typography variant="caption" sx={captionStyles}>{textoSiguiente}</Typography> {/* [cite: 402] */}
                    </Button> /* [cite: 403] */
                    )}
                </>
                ) : ( // [cite: 404]
                <Box
                    display="flex" // [cite: 404]
                    justifyContent="space-around" // [cite: 405]
                    alignItems="center" // [cite: 405]
                    sx={{ // [cite: 406]
                    width: '100%', // [cite: 406]
                        position: 'fixed', // [cite: 406]
                        bottom: 0, // [cite: 407]
                        left: 0, // [cite: 407]
                        right: 0, // [cite: 407]
                        p: 1, // [cite: 408]
                        pb: 2, // [cite: 408]
                        bgcolor: 'background.paper', // [cite: 409]
                        zIndex: 100, // [cite: 409]
                        borderTop: `1px solid ${theme.palette.grey[300]}` // [cite: 410]
                    }}
                >
                    <Button // [cite: 411]
                        onClick={handleBack} // [cite: 411]
                        startIcon={<IconoAtras sx={{ fontSize: '1rem' }} />} // [cite: 412]
                        sx={{ // [cite: 412]
                        p: '6px 8px', fontSize: '0.65rem', lineHeight: 1.2, minWidth: 'auto', // [cite: 413]
                        display: 'flex', flexDirection: 'column', // [cite: 413]
                        '& .MuiButton-startIcon': {m:0, mb: '2px'} // [cite: 414]
                        }}
                    > 
                        {textoAtras} {/* [cite: 415] */}
                    </Button>
                    {mostrarSiguienteBoton && ( // [cite: 416]
                    <Button
                        onClick={accionSiguienteBoton} // [cite: 416]
                        endIcon={<IconoSiguiente sx={{ fontSize: '1rem' }} />} // [cite: 417]
                        sx={{ // [cite: 418]
                        p: '6px 8px', fontSize: '0.65rem', lineHeight: 1.2, minWidth: 'auto', // [cite: 418]
                        display: 'flex', flexDirection: 'column-reverse', // [cite: 419]
                        '& .MuiButton-endIcon': {m:0, mt: '2px'} // [cite: 419]
                        }} // [cite: 420]
                    > 
                        {textoSiguiente} {/* [cite: 421] */}
                    </Button>
                    )}
                </Box> /* [cite: 422] */
                )}
            </Container>
        </Fade>
    </>
  );
};

export default ActuaEscenario;