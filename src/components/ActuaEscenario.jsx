import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Drawer,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  TextField,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import textos from '../textos'
import { useActua } from '../context/ActuaContext'
import DrawerMenu from './DrawerMenu'
import { obtenerSecuenciaEscenas, esUltimaEscenaDelNivel, obtenerEscenasDelNivelActual } from '../ordenEscenas'

const ActuaEscenario = () => {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    indiceEscena, // Este es el índice GLOBAL
    paso,
    elecciones,
    idioma,
    reiniciarPaso, // [cite: 229]
    setIndiceEscena,
    setPaso,
    setElecciones,
    cambiarIdioma,
    user,
    setStage,
    getEscenaActual // Usaremos esta función para obtener la escena actual
  } = useActua()

  const [commentText, setCommentText] = useState('')
  const [azarFlag, setAzarFlag] = useState(false)
  const [commentSaved, setCommentSaved] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const data = textos[idioma]
  const todasEscenas = data.escenas // Todas las escenas para el DrawerMenu
  
  const escena = getEscenaActual() // Obtenemos la escena actual usando el contexto

  // Si la escena no se encuentra (podría pasar si el índice está fuera de rango)
  if (!escena) {
    // Podrías redirigir al menú o mostrar un error
    useEffect(() => {
        setStage('menu');
    }, [setStage]);
    return <Typography>Cargando escena o escena no encontrada...</Typography>;
  }

  const pasoActual = escena.pasos[paso]
  const totalPasos = escena.pasos.length
  const eleccionHecha = elecciones[escena.id] || '' // [cite: 230]

  useEffect(() => {
    setCommentText('')
    setAzarFlag(false)
    setCommentSaved(false)
    setShowFeedback(false)
  }, [indiceEscena, paso])

  const goToScene = idx => { // idx es el índice GLOBAL
    setIndiceEscena(idx)
    reiniciarPaso()
    setMenuOpen(false)
  }
  
  const secuenciaGlobal = obtenerSecuenciaEscenas();
  const escenasDelNivelActual = obtenerEscenasDelNivelActual(escena.id, todasEscenas);
  const esUltimaDelNivel = esUltimaEscenaDelNivel(escena.id, escenasDelNivelActual);


  const handleAzarToggle = event => {
    const isAzar = event.target.checked
    setAzarFlag(isAzar)
    // El guardado de "azar" se hará junto con la elección o el comentario
    // No es necesario un fetch aquí si se consolida en `finishFeedback` o `avanzar`
  }

  const saveComment = () => {
    if (!commentText) return
    fetch('/api/guardarRespuestas', {
      method: 'POST', // [cite: 233]
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.name,
        respuestas: [
          {
            fecha: new Date().toISOString(),
            situacionId: escena.id,
            paso, // El paso donde se tomó la elección/resultado que precede a este feedback
            tipoPaso: 'comentario', // El feedback es un tipo de respuesta
            comentario: commentText, // [cite: 234]
            azar: azarFlag, // Guardamos el estado actual del azar
            idioma
          }
        ]
      })
    })
      .then(() => setCommentSaved(true))
      .catch(console.error)
  }
  
  const finishFeedback = () => {
    // Guardar cualquier estado pendiente de feedback (azar si no hubo comentario)
    // Esto es importante si el usuario marca azar pero no comenta
    if (!commentSaved && (azarFlag || commentText)) { // Si hay algo que guardar
        fetch('/api/guardarRespuestas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.name,
                respuestas: [
                    {
                        fecha: new Date().toISOString(),
                        situacionId: escena.id,
                        paso: pasoActual.tipo === "eleccion" ? paso : (paso -1 < 0 ? 0: paso -1) , // paso de la eleccion/resultado
                        tipoPaso: 'feedback_final', // O un tipo genérico
                        comentario: commentText,
                        azar: azarFlag,
                        idioma
                    }
                ]
            })
        }).catch(console.error);
    }


    setShowFeedback(false)
    setCommentText('')
    setAzarFlag(false)
    setCommentSaved(false)

    if (esUltimaDelNivel) {
      setStage('menu');
    } else {
      const siguienteIndiceEscena = indiceEscena + 1;
      if (siguienteIndiceEscena < secuenciaGlobal.length) {
        setIndiceEscena(siguienteIndiceEscena);
        reiniciarPaso();
      } else {
        setStage('menu'); // Fin de todas las escenas
      }
    }
  }


  const avanzar = idEleccion => {
    const esUltimoPaso = paso === totalPasos - 1

    if (showFeedback) { // Si estamos mostrando feedback, el botón "siguiente" llama a finishFeedback
        finishFeedback();
        return;
    }

    if (pasoActual.tipo === 'eleccion') {
      if (!idEleccion) return
      setElecciones(prev => ({ ...prev, [escena.id]: idEleccion }))
      fetch('/api/guardarRespuestas', { // [cite: 237]
        method: 'POST', // [cite: 233]
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.name,
          respuestas: [
            {
              fecha: new Date().toISOString(),
              situacionId: escena.id, // [cite: 238]
              paso,
              tipoPaso: 'eleccion',
              respuesta: idEleccion,
              comentario: null, 
              azar: false, // Azar se guardará con el feedback
              idioma
            }
          ]
        })
      }).catch(console.error)
    }
    
    // Después de una elección o un resultado, si es el último paso, mostrar feedback
    if (esUltimoPaso) {
      setShowFeedback(true);
    } else if (paso < totalPasos - 1) { // [cite: 240]
      setPaso(paso + 1)
    }
    // La navegación a la siguiente escena se maneja en finishFeedback
  }

  const handleBack = () => {
    if (showFeedback) {
      setShowFeedback(false)
      // No retrocedemos de paso aquí, el usuario vuelve a la vista del último paso
      return
    }
    
    if (paso > 0) {
      setPaso(paso - 1)
    } else {
      const prevIndiceEscena = indiceEscena - 1;
      if (prevIndiceEscena >= 0) {
        const escenaAnteriorId = secuenciaGlobal[prevIndiceEscena];
        const escenaAnterior = todasEscenas.find(e => e.id === escenaAnteriorId);
        if (escenaAnterior) {
            setIndiceEscena(prevIndiceEscena);
            setPaso(escenaAnterior.pasos.length -1); // Ir al último paso de la escena anterior
        } else {
             setStage('menu'); // Fallback
        }
      } else {
        setStage('menu'); // Ya está en la primera escena, primer paso
      }
    }
  }

  const renderContenido = () => {
    if (showFeedback) {
      return (
        <Box mt={3} p={2} border={1} borderColor="grey.400" borderRadius={1}>
          <Stack spacing={2}>
            <FormControlLabel
              control={<Checkbox checked={azarFlag} onChange={handleAzarToggle} />}
              label={data.ui.labelAzar || 'Marcar como respuesta al azar'} // [cite: 244]
            />
            <TextField
              label={data.ui.labelComentario || 'Comentario (opcional)'} // [cite: 245]
              multiline
              rows={4}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              fullWidth
            />
            <Box display="flex" gap={1}>
              <Button
                variant="contained"
                onClick={saveComment}
                disabled={!commentText || commentSaved} // [cite: 247]
              >
                {commentSaved ? (data.ui.comentarioGuardado || 'Guardado') : (data.ui.guardar || 'Guardar')} {/* [cite: 248] */}
              </Button>
              <Button variant="outlined" onClick={() => setCommentText('')}>
                {data.ui.cancelar || 'Cancelar'} {/* [cite: 249] */}
              </Button>
            </Box>
          </Stack>
        </Box>
      )
    }

    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center" mb={2}>
          <img
            src={`/${pasoActual.imagen}`} // [cite: 250]
            alt="Escena"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
          <Typography mt={1}>{pasoActual.descripcion}</Typography>
        </Box>
      )
    }

    if (pasoActual.tipo === 'eleccion') {
      return (
        <Grid container spacing={2} mb={2}> {/* [cite: 251] */}
          {pasoActual.opciones.map(op => (
            <Grid item xs={12} sm={6} key={op.id}>
              <Box
                onClick={() => avanzar(op.id)}
                sx={{
                  border: 1,
                  borderColor: 'grey.400', // [cite: 252]
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: '#e0e0e0' } // [cite: 253]
                }}
              >
                <img
                  src={`/${op.imagen}`}
                  alt={op.texto}
                  style={{ maxWidth: '100%', height: 'auto' }} // [cite: 254]
                />
                <Typography mt={1}>{op.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )
    }

    if (pasoActual.tipo === 'resultado') {
        const resultado = pasoActual.resultados[eleccionHecha]
        if (!resultado) {
          return (
            <Box textAlign="center" mt={4}>
              <Typography color="error">{data.ui.errorSinEleccion}</Typography> {/* [cite: 415] */}
            </Box>
          )
        }
        return (
          <Box textAlign="center" mb={1}>
            <img
              src={`/${resultado.imagen}`}
              alt={resultado.texto} // [cite: 256]
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <Typography mt={1}>{resultado.texto}</Typography>
          </Box>
        )
    }
    return null; // Por si acaso
  }

  // Texto y acción del botón "Siguiente" / "Finalizar Nivel" / "Finalizar"
  let textoSiguiente = data.ui.siguiente;
  let accionSiguiente = () => showFeedback ? finishFeedback() : avanzar();

  if (showFeedback && esUltimaDelNivel) {
    textoSiguiente = data.ui.volverAlMenu || "Volver al Menú"; // Añadir a textos.js si no existe
    // la acción ya está cubierta por finishFeedback que lleva al menú
  }


  return (
    <>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu
          items={todasEscenas} // Usamos todas las escenas para el Drawer
          currentIndex={indiceEscena} // Pasamos el índice global
          completed={elecciones} // [cite: 257]
          categories={data.ui.categories}
          nivelesLabels={data.ui.niveles || {}}
          onSelect={goToScene} // onSelect espera el índice global
        />
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 1, position: 'relative' }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Button variant="text" size="small" startIcon={<HomeIcon />} onClick={() => setStage('menu')}>
            {data.ui.inicio} {/* [cite: 258] */}
          </Button>
          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
            <Typography sx={{ ml: 0.5 }}>{data.ui.menu}</Typography>
          </IconButton>
          <Button variant="outlined" size="small" onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}> {/* [cite: 259] */}
            {idioma === 'es' ? 'CAT' : 'ES'} {/* [cite: 260] */}
          </Button>
        </Stack>

        <Typography variant="h5" align="center" gutterBottom>
          {escena.titulo}
        </Typography>
        {(pasoActual.tipo === 'situacion' || (pasoActual.tipo === 'eleccion' && paso === 0) ) && escena.pictos && escena.pictos.length > 0 && (
          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            {escena.pictos.map((pic, i) => (
              <Box key={i} component="img" src={`/${pic}`} alt={`Picto ${i + 1}`} width={40} height={40} /> /* [cite: 261] */
            ))}
          </Stack>
        )}

        <Typography variant="subtitle1" align="center" mb={0}>
          {pasoActual.titulo}
        </Typography>

        {renderContenido()} {/* [cite: 262] */}

        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          {Array.from({ length: totalPasos }).map((_, i) => (
            <Box // [cite: 269]
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: i <= paso ? 'text.primary' : 'grey.300' // [cite: 270]
              }}
            />
          ))}
        </Stack>
        <Typography align="center" variant="body2" mt={1}>
          {data.ui.pasoTexto(paso + 1, totalPasos)}
        </Typography>

        {isSmUp ? ( // [cite: 271]
          <>
            <Button
              onClick={handleBack}
              sx={{
                position: 'fixed',
                top: '50%',
                left: theme.spacing(1), // [cite: 272]
                transform: 'translateY(-50%)',
                minWidth: 48,
                p: 1,
                borderRadius: 1,
                zIndex: 10,
                display: 'flex', // [cite: 273]
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                backgroundColor: 'transparent', // [cite: 274]
                color: 'inherit'
              }}
              variant="outlined"
            >
              <ArrowBackIosNewIcon />
              <Typography variant="caption" sx={{ mt: 1 }}>
                {data.ui.atras} {/* [cite: 275] */}
              </Typography>
            </Button>
            <Button
              onClick={accionSiguiente}
              sx={{
                position: 'fixed',
                top: '50%',
                right: theme.spacing(1),
                transform: 'translateY(-50%)',
                minWidth: 48, // [cite: 278]
                p: 1,
                borderRadius: 1,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column', // [cite: 279]
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                backgroundColor: 'transparent', // [cite: 280]
                color: 'inherit'
              }}
              variant="outlined"
              disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
            >
              <ArrowForwardIosIcon /> {/* [cite: 281] */}
              <Typography variant="caption" sx={{ mt: 1 }}>
                {textoSiguiente}
              </Typography>
            </Button>
          </>
        ) : ( // [cite: 282]
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button onClick={handleBack}>
              <ArrowBackIosNewIcon /> {data.ui.atras}
            </Button>
            <Button
              onClick={accionSiguiente}
              disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccionHecha}
            >
              {textoSiguiente}
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        )}
      </Container>
    </> // [cite: 284]
  )
}

export default ActuaEscenario