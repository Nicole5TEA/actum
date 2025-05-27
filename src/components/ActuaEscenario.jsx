// src/components/ActuaEscenario.jsx
// ... (importaciones)
import React, { useState, useEffect } from 'react';
import {
  Container, Box, 
  Typography, Button, Grid, Drawer, IconButton, // [cite: 647]
  Stack, useTheme, useMediaQuery, TextField, Checkbox, FormControlLabel,
  LinearProgress 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // [cite: 648]
import HomeIcon from '@mui/icons-material/Home'; // [cite: 648]
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // [cite: 648]
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // [cite: 648]
import textos from '../textos';
import { useActua } from '../context/ActuaContext';
import DrawerMenu from './DrawerMenu'; // [cite: 649]
import ordenEscenas, { 
    obtenerSecuenciaEscenas,
    esUltimaEscenaDelNivel,
    obtenerEscenasDelNivelActual,
    esPrimeraEscenaDelNivel
} from '../ordenEscenas'; // [cite: 649]

const ActuaEscenario = () => { // [cite: 650]
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm')); // [cite: 651]
  const {
    indiceEscena, paso, elecciones, idioma, reiniciarPaso, 
    setIndiceEscena, setPaso, setElecciones, cambiarIdioma,
    user, setStage, getEscenaActual // [cite: 652]
  } = useActua();

  const [commentText, setCommentText] = useState(''); // [cite: 655]
  const [azarFlag, setAzarFlag] = useState(false); // [cite: 655]
  const [commentSaved, setCommentSaved] = useState(false); // [cite: 655]
  const [showFeedback, setShowFeedback] = useState(false); // [cite: 655]
  const [menuOpen, setMenuOpen] = useState(false); // [cite: 653]

  const data = textos[idioma];
  const todasEscenas = data.escenas;
  const escena = getEscenaActual();

  if (!escena) {
    useEffect(() => { setStage('menu'); }, [setStage]);
    return <Typography>Cargando escena o escena no encontrada...</Typography>; // [cite: 654]
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
    setIndiceEscena(globalIndex); // [cite: 656]
    reiniciarPaso();
    setMenuOpen(false);
  };
  
  const secuenciaGlobal = obtenerSecuenciaEscenas();
  const escenasDelNivelActualFlat = obtenerEscenasDelNivelActual(escena.id, todasEscenas); 
  const esUltimaDelNivelActual = esUltimaEscenaDelNivel(escena.id, escenasDelNivelActualFlat); // [cite: 657]
  const esPrimeraDelNivelActual = esPrimeraEscenaDelNivel(escena.id, ordenEscenas, todasEscenas); // [cite: 657]


  const handleAzarToggle = event => {
    const isAzar = event.target.checked;
    setAzarFlag(isAzar);
    setCommentSaved(false); // [cite: 658]

    fetch('/api/guardarRespuestas', { // [cite: 658]
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ // [cite: 659]
        id: user.name,
        respuestas: [{
          fecha: new Date().toISOString(), // [cite: 660]
          situacionId: escena.id,
          paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1), // [cite: 661]
          tipoPaso: 'azar_toggle_feedback', // [cite: 662]
          azar: isAzar,
          comentario: commentText, // [cite: 663]
          idioma
        }]
      }) // [cite: 664]
    })
    .catch(console.error);
  };

  const saveComment = () => {
    if (!commentText && !azarFlag) { 
        return; // [cite: 665]
    }
    fetch('/api/guardarRespuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // [cite: 666]
      body: JSON.stringify({
        id: user.name,
        respuestas: [{ // [cite: 667]
          fecha: new Date().toISOString(),
          situacionId: escena.id, // [cite: 668]
          paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1), // [cite: 669]
          tipoPaso: 'comentario_feedback',
          comentario: commentText,
          azar: azarFlag, // [cite: 670]
          idioma
        }] // [cite: 671]
      })
    })
    .then(() => {
        setCommentSaved(true);  // [cite: 672]
    })
    .catch(console.error);
  };
  
  const finishFeedback = () => {
    if (!commentSaved && (commentText || azarFlag)) {  // [cite: 673]
        fetch('/api/guardarRespuestas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // [cite: 674]
            body: JSON.stringify({
                id: user.name, // [cite: 675]
                respuestas: [{ // [cite: 676]
                    fecha: new Date().toISOString(), // [cite: 677]
                    situacionId: escena.id,
                    paso: (pasoActual.tipo === "eleccion" || pasoActual.tipo === "resultado") ? paso : (paso -1 < 0 ? 0: paso -1), // [cite: 678, 679]
                    tipoPaso: 'feedback_final_consolidado', // [cite: 680]
                    comentario: commentText, // [cite: 681]
                    azar: azarFlag,
                    idioma // [cite: 682]
                }] // [cite: 683]
            })
        }).catch(console.error); 
} // [cite: 684]

    setShowFeedback(false);
    setCommentText('');
    setAzarFlag(false);
    setCommentSaved(false);

    if (esUltimaDelNivelActual) {
      setStage('menu');
    } else {
      const siguienteIndiceEscena = indiceEscena + 1; // [cite: 685]
      if (siguienteIndiceEscena < secuenciaGlobal.length) {
        setIndiceEscena(siguienteIndiceEscena);
        reiniciarPaso();
      } else {
        setStage('menu');  // [cite: 686]
      }
    }
  };

  const avanzar = idEleccion => { // idEleccion puede ser undefined si se avanza sin elegir
    const esUltimoPaso = paso === totalPasos - 1; // [cite: 687]

    if (pasoActual.tipo === 'eleccion' && idEleccion) { // Solo guardar si se hizo una elección
      setElecciones(prev => ({ ...prev, [escena.id]: idEleccion }));
      fetch('/api/guardarRespuestas', {
        method: 'POST', // [cite: 688]
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ // [cite: 689]
          id: user.name,
          respuestas: [{
            fecha: new Date().toISOString(), // [cite: 690]
            situacionId: escena.id,
            paso, // [cite: 691]
            tipoPaso: 'eleccion',
            respuesta: idEleccion, // [cite: 692]
            idioma
          }] // [cite: 693]
        })
      }).catch(console.error);
    }
    
    if (esUltimoPaso) { // [cite: 694]
      setShowFeedback(true);
      setCommentSaved(false); 
    } else if (paso < totalPasos - 1) {
      setPaso(paso + 1); // [cite: 695]
    }
  };

  const handleBack = () => {
    if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) {
        setStage('menu'); // [cite: 696]
        return;
    }
    if (showFeedback) {
      setShowFeedback(false);
      return;
    }
    if (paso > 0) { // [cite: 697]
      setPaso(paso - 1);
    } else {
      const prevIndiceEscena = indiceEscena - 1; // [cite: 698]
      if (prevIndiceEscena >= 0) {
        const escenaAnteriorId = secuenciaGlobal[prevIndiceEscena];
        const escenaAnterior = todasEscenas.find(e => e.id === escenaAnteriorId);
        if (escenaAnterior) { // [cite: 699]
            setIndiceEscena(prevIndiceEscena);
            setPaso(escenaAnterior.pasos.length -1); 
        } else {
            setStage('menu'); // [cite: 700]
        }
      } else {
        setStage('menu');
      }
    } // [cite: 701]
  };
  
  const ProgresoNivel = () => {
    if (!escena || !todasEscenas.length || !ordenEscenas.length) return null;

    const nivelActualConf = ordenEscenas.find(n => n.nivel === escena.nivel); // [cite: 702]
    if (!nivelActualConf) return null;

    let escenasIdsEnNivelActual = [];
    Object.values(nivelActualConf.categorias).forEach(catEscenas => {
        escenasIdsEnNivelActual.push(...catEscenas);
    }); // [cite: 703]
    if (!escenasIdsEnNivelActual.length) return null;

    const indiceEnNivel = escenasIdsEnNivelActual.findIndex(id => id === escena.id);
    const totalEnNivel = escenasIdsEnNivelActual.length;
    
    if (indiceEnNivel === -1) return null; 

    const porcentajeProgresoVisual = totalEnNivel > 0 ? ((indiceEnNivel + 1) / totalEnNivel) * 100 : 0; // [cite: 704, 705]
    
    return (
      <Box sx={{ width: '100%', mt: 1, mb: 1, px:1 }}>
        <Typography variant="caption" align="center" component="div" sx={{ mb: 0.5 }}> {/* [cite: 706] */}
          SITUACIÓN {indiceEnNivel + 1} DE {totalEnNivel} (NIVEL {escena.nivel})
        </Typography> {/* [cite: 707] */}
        <LinearProgress variant="determinate" value={porcentajeProgresoVisual} />
      </Box>
    ); // [cite: 708]
  };

  const renderFeedbackContent = () => { // [cite: 711]
    return (
      <Box mt={3} p={2} border={1} borderColor="grey.400" borderRadius={1}>
        <Stack spacing={2}> {/* [cite: 712] */}
          <FormControlLabel
            control={<Checkbox checked={azarFlag} onChange={handleAzarToggle} />} // [cite: 713]
            label={data.ui.labelAzar || 'Marcar como respuesta al azar'}
          /> {/* [cite: 714] */}
          <TextField
            label={data.ui.labelComentario || 'Comentario (opcional)'} // [cite: 715]
            multiline rows={4} value={commentText}
            onChange={e => { setCommentText(e.target.value); setCommentSaved(false); }} // [cite: 716]
            fullWidth
          /> {/* [cite: 717] */}
          <Box display="flex" gap={1}>
            <Button variant="contained" onClick={saveComment} disabled={(!commentText && !azarFlag) || commentSaved}> {/* [cite: 718] */}
              {commentSaved ? (data.ui.comentarioGuardado || 'Guardado') : (data.ui.guardar || 'Guardar')} {/* [cite: 719] */}
            </Button>
            <Button variant="outlined" onClick={() => {setCommentText(''); setAzarFlag(false); setCommentSaved(false);}}> {/* [cite: 720] */}
              {data.ui.cancelar || 'Cancelar'}
            </Button> {/* [cite: 721] */}
          </Box>
        </Stack> {/* [cite: 722] */}
      </Box>
    );
  };

  const renderStepContent = () => {
    if (pasoActual.tipo === 'situacion') { // [cite: 723]
      return (
        <Box textAlign="center" mb={2}>
          <img src={`/${pasoActual.imagen}`} alt="Escena" style={{ maxWidth: '80%', height: 'auto' }} /> {/* [cite: 724] */}
          <Typography mt={1}>{pasoActual.descripcion}</Typography>
        </Box> // [cite: 725]
      );
    }
    if (pasoActual.tipo === 'eleccion') {
      return ( // [cite: 726]
        <Grid container spacing={2} mb={2}>
          {pasoActual.opciones.map(op => (
            <Grid item xs={12} sm={6} key={op.id}> {/* [cite: 727] */}
              <Box onClick={() => avanzar(op.id)} // [cite: 728]
                sx={{ border: 1, borderColor: 'grey.400', p: 2, cursor: 'pointer', textAlign: 'center', borderRadius: 1, '&:hover': { backgroundColor: '#e0e0e0' } }} // [cite: 729]
              > {/* [cite: 730] */}
                <img src={`/${op.imagen}`} alt={op.texto} style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography mt={1}>{op.texto}</Typography> {/* [cite: 731] */}
              </Box> {/* [cite: 732] */}
            </Grid>
          ))} {/* [cite: 733] */}
        </Grid>
      );
    }
    if (pasoActual.tipo === 'resultado') {
         const resultado = pasoActual.resultados[eleccionHecha]; // [cite: 734]
        if (!resultado) {
          return ( <Box textAlign="center" mt={4}> <Typography color="error">{data.ui.errorSinEleccion}</Typography> </Box> ); // [cite: 735]
        }
        return (
          <Box textAlign="center" mb={1}>
             <img src={`/${resultado.imagen}`} alt={resultado.texto} style={{ maxWidth: '100%', height: 'auto' }} /> {/* [cite: 736] */}
             <Typography mt={1}>{resultado.texto}</Typography> {/* [cite: 737] */}
          </Box>
        ); 
    } // [cite: 738]
    return null;
  };

  let textoSiguiente = data.ui.siguiente;
  let IconoSiguiente = ArrowForwardIosIcon;
  let accionSiguienteBoton = () => showFeedback ? finishFeedback() : avanzar(eleccionHecha); // Pasar elección actual si no es undefined
  
  // MOSTRAR SIEMPRE EL BOTÓN DE SIGUIENTE SI NO ESTAMOS EN SHOWFEEDBACK
  let mostrarSiguienteBoton = !showFeedback || (showFeedback && esUltimaDelNivelActual) || (showFeedback && !esUltimaDelNivelActual); // [cite: 739]
  if (showFeedback) { // Si estamos en feedback, el botón siempre se muestra (para finalizar o ir al siguiente)
    // No hacer nada aquí, ya se maneja abajo
  } else if (pasoActual.tipo === 'eleccion') {
     // mostrarSiguienteBoton = !!eleccionHecha; // Comentado para que siempre aparezca
     mostrarSiguienteBoton = true; // Siempre se muestra en 'eleccion'
  }


  if (showFeedback && esUltimaDelNivelActual) {
    textoSiguiente = data.ui.volverAlMenu || "Volver al Menú"; // [cite: 740]
    IconoSiguiente = HomeIcon;
  }

  let textoAtras = data.ui.atras;
  let IconoAtras = ArrowBackIosNewIcon;

  if (esPrimeraDelNivelActual && paso === 0 && !showFeedback) { // [cite: 741]
      textoAtras = data.ui.volverAlMenu || "Volver al Menú";
      IconoAtras = HomeIcon;
  }

  const commonButtonStyles = {
    position: 'fixed', // [cite: 742]
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'auto', 
    p: 1, // [cite: 743]
    borderRadius: 1,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // [cite: 744]
    justifyContent: 'center',
    width: 'auto', 
    minHeight: 70,
    backgroundColor: 'transparent', // [cite: 745]
    color: 'inherit',
    px: {xs: 0.5, sm: 1.5}, 
    '& .MuiButton-startIcon': { margin: 0},  // [cite: 746]
    '& .MuiButton-endIcon': { margin: 0},
    '& .MuiSvgIcon-root': { fontSize: {xs: '1.5rem', sm: 'inherit'} }, 
  }; // [cite: 747]
  
  const captionStyles = {
    mt: 0.5, whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.1', fontSize: {xs: '0.65rem', sm: 'caption.fontSize'} // [cite: 748]
  };
  
  return (
    <>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu // [cite: 749]
          items={todasEscenas}
          completed={elecciones}
          categories={data.ui.categories} // [cite: 750]
          nivelesLabels={data.ui.niveles || {}}
          onSelect={goToScene} // [cite: 751]
          currentEscenaId={escena.id}
          isGlobalMenu={false} 
        /> {/* [cite: 752] */}
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 1, position: 'relative', pb: {xs: isSmUp ? 2 : 10, sm: 2} }}> {/* [cite: 753] */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1} flexWrap="wrap"> {/* Allow wrapping for smaller screens */}
          <Button variant="text" size="small" startIcon={<HomeIcon />} onClick={() => setStage('menu')} sx={{mr: 'auto'}}> {/* Pushes menu button to the right */} {/* [cite: 754] */}
            {data.ui.inicio}
          </Button> {/* [cite: 755] */}
           {/* Botón de Menú con estilo rectangular */}
           <Button 
            variant="outlined" // o "text" si se prefiere sin borde
            size="small"
            startIcon={<MenuIcon />} 
            onClick={() => setMenuOpen(true)}
            sx={{ textTransform: 'none' }} // Para que el texto "Menú" no esté en mayúsculas por defecto del botón
          >
            {data.ui.menu}
          </Button>
          <Button variant="outlined" size="small" onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}> {/* [cite: 758] */}
            {idioma === 'es' ? 'CAT' : 'ES'}
          </Button> {/* [cite: 759] */}
        </Stack>

        <Typography variant="h5" align="center" gutterBottom> {escena.titulo} </Typography>
        {(pasoActual.tipo === 'situacion' || (pasoActual.tipo === 'eleccion' && paso === 0) ) && escena.pictos && escena.pictos.length > 0 && ( /* [cite: 760] */
          <Stack direction="row" spacing={2} justifyContent="center" mb={2} flexWrap="wrap"> {/* [cite: 761] */}
            {escena.pictos.map((pic, i) => ( <Box key={i} component="img" src={`/${pic}`} alt={`Picto ${i + 1}`} sx={{width: {xs:50, sm:60}, height: {xs:50, sm:60}}} /> ))} {/* [cite: 762] */}
          </Stack> /* [cite: 763] */
        )}
        <Typography variant="subtitle1" align="center" sx={{mb: showFeedback ? 0 : 1}}> {pasoActual.titulo} </Typography> {/* [cite: 764] */}
        
        {showFeedback ? renderFeedbackContent() : renderStepContent()}

        <Stack direction="row" spacing={1} justifyContent="center" mt={showFeedback ? 1 : 2}> {/* [cite: 765] */}
          {Array.from({ length: totalPasos }).map((_, i) => ( <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: i <= paso ? 'text.primary' : 'grey.300' }} /> ))} {/* [cite: 766] */}
        </Stack> {/* [cite: 767] */}
        <Typography align="center" variant="body2" mt={1}> {data.ui.pasoTexto(paso + 1, totalPasos)} </Typography>
        <ProgresoNivel /> {/* [cite: 768] */}


        {isSmUp ? (
          <>
            <Button onClick={handleBack} sx={{...commonButtonStyles, left: theme.spacing(1) }} variant="outlined"> {/* [cite: 769] */}
              <IconoAtras /> {/* [cite: 770] */}
              <Typography variant="caption" sx={captionStyles}>{textoAtras}</Typography>
            </Button> {/* [cite: 771] */}
            {mostrarSiguienteBoton && (
              <Button onClick={accionSiguienteBoton} // [cite: 772]
                sx={{...commonButtonStyles, right: theme.spacing(1) }} variant="outlined" // [cite: 773]
                // No se deshabilita si es tipo elección y no hay elección hecha
                // disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
              > {/* [cite: 774] */}
                <IconoSiguiente /> {/* [cite: 775] */}
                <Typography variant="caption" sx={captionStyles}>{textoSiguiente}</Typography>
              </Button> /* [cite: 776] */
            )}
          </> /* [cite: 777] */
        ) : ( 
          <Box // [cite: 778]
            display="flex" 
            justifyContent="space-around" // [cite: 779]
            alignItems="center"
            sx={{ // [cite: 780]
                width: '100%', // [cite: 781]
                position: 'fixed', 
                bottom: 0, // [cite: 782]
                left: 0, // [cite: 783]
                right: 0, 
                p: 1, // [cite: 784]
                pb: 2, // [cite: 785]
                bgcolor: 'background.paper', 
                zIndex: 100, // [cite: 786]
                borderTop: `1px solid ${theme.palette.grey[300]}` // [cite: 787]
            }}
          > {/* [cite: 788] */}
            <Button 
              onClick={handleBack} // [cite: 789]
              startIcon={<IconoAtras sx={{ fontSize: '1rem' }} />} // [cite: 790]
              sx={{ // [cite: 791]
                p: '6px 8px', fontSize: '0.65rem', lineHeight: 1.2, minWidth: 'auto',
                display: 'flex', flexDirection: 'column', // [cite: 792]
                '& .MuiButton-startIcon': {m:0, mb: '2px'} // [cite: 793]
              }}
            >  {/* [cite: 794] */}
              {textoAtras} 
            </Button> {/* [cite: 795] */}
            {mostrarSiguienteBoton && (
              <Button // [cite: 796]
                onClick={accionSiguienteBoton} 
                endIcon={<IconoSiguiente sx={{ fontSize: '1rem' }} />} // [cite: 797]
                sx={{ // [cite: 798]
                  p: '6px 8px', fontSize: '0.65rem', lineHeight: 1.2, minWidth: 'auto', // [cite: 799]
                  display: 'flex', flexDirection: 'column-reverse', // [cite: 800]
                  '& .MuiButton-endIcon': {m:0, mt: '2px'} // [cite: 801]
                 }}
                // No se deshabilita si es tipo elección y no hay elección hecha
                // disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
              >  /* [cite: 802] */
                {textoSiguiente} 
              </Button> /* [cite: 804] */
            )}
          </Box> /* [cite: 805] */
        )}
      </Container>
    </>
  );
};

export default ActuaEscenario; // [cite: 806]