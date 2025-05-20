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

const ActuaEscenario = () => {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    indiceEscena,
    paso,
    elecciones,
    idioma,
    reiniciarPaso,
    setIndiceEscena,
    setPaso,
    setElecciones,
    cambiarIdioma,
    user,
    setStage
  } = useActua()

  /* ---------------- ESTADO LOCAL ---------------- */
  const [commentText, setCommentText] = useState('')
  const [azarFlag, setAzarFlag] = useState(false)
  const [commentSaved, setCommentSaved] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* ---------------- DATOS ESCENA ---------------- */
  const data = textos[idioma]
  const escenas = data.escenas
  const escena = escenas[indiceEscena]
  const pasoActual = escena.pasos[paso]
  const totalPasos = escena.pasos.length
  const eleccion = elecciones[escena.id] || ''

  /* ---------------- LÓGICA DE NIVEL -------------- */
  // 1) Filtra por nivel
  const escenasNivel = escenas.filter(e => e.nivel === escena.nivel)
  // 2) Reordénalas según el orden de categorías del UI
  const categoriasKeys = Object.keys(data.ui.categories)
  const escenasNivelOrdered = categoriasKeys.flatMap(catKey =>
    escenasNivel.filter(e => e.categoria === catKey)
  )
  // 3) Índice y siguiente dentro de ese orden
  const indiceEnNivel = escenasNivelOrdered.findIndex(e => e.id === escena.id)
  const isLastSceneLvl = indiceEnNivel === escenasNivelOrdered.length - 1
  const nextInNivel = escenasNivelOrdered[indiceEnNivel + 1]
  const nextGlobalIdx = nextInNivel ? escenas.findIndex(e => e.id === nextInNivel.id) : -1
  // Ocultar flecha sólo en el paso "resultado" de la última escena del nivel
  const hideNext = showFeedback

  /* ---------------- EFFECTS ---------------------- */
  useEffect(() => {
    setCommentText('')
    setAzarFlag(false)
    setCommentSaved(false)
    setShowFeedback(false)
  }, [indiceEscena, paso])

  /* ---------------- HANDLERS --------------------- */
  const goToScene = idx => {
    setIndiceEscena(idx)
    reiniciarPaso()
    setMenuOpen(false)
  }

  const handleAzarToggle = e => {
    const isAzar = e.target.checked
    setAzarFlag(isAzar)
    fetch('/api/guardarRespuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.name,
        respuestas: [
          {
            fecha: new Date().toISOString(),
            situacionId: escena.id,
            paso,
            tipoPaso: 'azar',
            azar: isAzar,
            comentario: null,
            idioma
          }
        ]
      })
    }).catch(console.error)
  }

  const saveComment = () => {
    if (!commentText) return
    fetch('/api/guardarRespuestas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.name,
        respuestas: [
          {
            fecha: new Date().toISOString(),
            situacionId: escena.id,
            paso,
            tipoPaso: 'comentario',
            comentario: commentText,
            azar: azarFlag,
            idioma
          }
        ]
      })
    })
      .then(() => setCommentSaved(true))
      .catch(console.error)
  }

  const finishFeedback = () => {
    setShowFeedback(false)
    setCommentText('')
    setAzarFlag(false)
    setCommentSaved(false)

    if (!isLastSceneLvl) {
      setIndiceEscena(nextGlobalIdx)
      reiniciarPaso()
    } else {
      setStage('menu')
    }
  }

  const avanzar = id => {
    const isLastStep = paso === totalPasos - 1
    if (showFeedback) return

    if (pasoActual.tipo === 'eleccion') {
      if (!id) return
      setElecciones(prev => ({ ...prev, [escena.id]: id }))

      fetch('/api/guardarRespuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.name,
          respuestas: [
            {
              fecha: new Date().toISOString(),
              situacionId: escena.id,
              paso,
              tipoPaso: 'eleccion',
              respuesta: id,
              comentario: null,
              azar: azarFlag,
              idioma
            }
          ]
        })
      }).catch(console.error)

      if (isLastStep) {
        setShowFeedback(true)
        return
      }
    }

    if (paso < totalPasos - 1) {
      setPaso(paso + 1)
      return
    }

    if (!isLastSceneLvl) {
      setIndiceEscena(nextGlobalIdx)
      reiniciarPaso()
    } else {
      setStage('menu')
    }
  }

  const handleBack = () => {
    if (showFeedback) {
      setShowFeedback(false)
      return
    }

    if (indiceEscena === 0 && paso === 0) {
      setStage('menu')
      return
    }

    if (paso > 0) {
      setPaso(paso - 1)
    } else {
      const prev = indiceEscena - 1
      setIndiceEscena(prev)
      setPaso(escenas[prev].pasos.length - 1)
    }
  }

  /* ---------------- RENDER CONTENIDO ------------ */
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
              multiline
              rows={4}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              fullWidth
            />
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={saveComment} disabled={!commentText || commentSaved}>
                {commentSaved ? data.ui.comentarioGuardado || 'Guardado' : data.ui.guardar || 'Guardar'}
              </Button>
              <Button variant="outlined" onClick={() => setCommentText('')}>
                {data.ui.cancelar || 'Cancelar'}
              </Button>
              {commentSaved && (
                <Button variant="outlined" onClick={finishFeedback}>
                  {data.ui.continuar || 'Continuar'}
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      )
    }

    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center" mb={2}>
          <img src={`/${pasoActual.imagen}`} alt="Escena" style={{ maxWidth: '80%', height: 'auto' }} />
          <Typography mt={1}>{pasoActual.descripcion}</Typography>
        </Box>
      )
    }

    if (pasoActual.tipo === 'eleccion') {
      return (
        <Grid container spacing={2} mb={2}>
          {pasoActual.opciones.map(op => (
            <Grid item xs={12} sm={6} key={op.id}>
              <Box
                onClick={() => avanzar(op.id)}
                sx={{
                  border: 1,
                  borderColor: 'grey.400',
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: '#e0e0e0' }
                }}
              >
                <img
                  src={`/${op.imagen}`}
                  alt={op.texto}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Typography mt={1}>{op.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )
    }

    const resultado = pasoActual.resultados[eleccion]
    if (!resultado) {
      return (
        <Box textAlign="center" mt={4}>
          <Typography color="error">{data.ui.errorSinEleccion}</Typography>
        </Box>
      )
    }
    return (
      <Box textAlign="center" mb={1}>
        <img
          src={`/${resultado.imagen}`}
          alt={resultado.texto}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Typography mt={1}>{resultado.texto}</Typography>
      </Box>
    )
  }

  // -------------------------------------------------------------------------
  // JSX ---------------------------------------------------------------------
  // -------------------------------------------------------------------------
  return (
    <>
      {/* Drawer (menú lateral) */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu
          items={escenas}
          currentIndex={indiceEscena}
          completed={elecciones}
          categories={data.ui.categories}
          nivelesLabels={data.ui.niveles}
          onSelect={goToScene}
        />
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 1, position: 'relative' }}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Button
            variant="text"
            size="small"
            startIcon={<HomeIcon />}
            onClick={() => setStage('menu')}
          >
            {data.ui.inicio}
          </Button>
          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
            <Typography sx={{ ml: 0.5 }}>{data.ui.menu}</Typography>
          </IconButton>
          <Button
            variant="outlined"
            size="small"
            onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}
          >
            {idioma === 'es' ? 'CAT' : 'ES'}
          </Button>
        </Stack>

        {/* Título y pictos */}
        <Typography variant="h5" align="center" gutterBottom>
          {escena.titulo}
        </Typography>
        {pasoActual.tipo === 'situacion' && escena.pictos && (
          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            {escena.pictos.map((pic, i) => (
              <Box
                key={i}
                component="img"
                src={`/${pic}`}
                alt={`Picto ${i + 1}`}
                width={40}
                height={40}
              />
            ))}
          </Stack>
        )}

        <Typography variant="subtitle1" align="center" mb={0}>
          {pasoActual.titulo}
        </Typography>

        {/* Contenido central */}
        {renderContenido()}

        {/* Comentario / azar cuando es resultado */}
        {pasoActual.tipo === 'resultado' && (
          <Box mt={3} p={2} border={1} borderColor="grey.400" borderRadius={1}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox checked={azarFlag} onChange={handleAzarToggle} />
                }
                label={data.ui.labelAzar || 'Marcar como respuesta al azar'}
              />
              <TextField
                label={data.ui.labelComentario || 'Comentario (opcional)'}
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
                  disabled={!commentText || commentSaved}
                >
                  {commentSaved
                    ? data.ui.comentarioGuardado || 'Guardado'
                    : data.ui.guardar || 'Guardar'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setCommentText('')}
                >
                  {data.ui.cancelar || 'Cancelar'}
                </Button>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Puntos de progreso */}
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          {Array.from({ length: totalPasos }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: i <= paso ? 'text.primary' : 'grey.300'
              }}
            />
          ))}
        </Stack>
        <Typography align="center" variant="body2" mt={1}>
          {data.ui.pasoTexto(paso + 1, totalPasos)}
        </Typography>

        {/* Navegación */}
        {isSmUp ? (
  <>
    {/* Atrás */}
    <Button
      onClick={handleBack}
      sx={{
        position: 'fixed',
        top: '50%',
        left: theme.spacing(1),
        transform: 'translateY(-50%)',
        minWidth: 48,
        p: 1,
        borderRadius: 1,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: 'transparent',
        color: 'inherit'
      }}
      variant="outlined"
    >
      <ArrowBackIosNewIcon />
      <Typography variant="caption" sx={{ mt: 1 }}>
        {data.ui.atras}
      </Typography>
    </Button>

    {/* Flecha adelante (muestra en todos los pasos, deshabilitada si falta elección) */}
    {!hideNext && (
      <Button
        onClick={() =>
          // Si ya estamos en el feedback, paso a la siguiente escena; si no, avanzo paso
          showFeedback ? finishFeedback() : avanzar()
        }
        sx={{
          position: 'fixed',
          top: '50%',
          right: theme.spacing(1),
          transform: 'translateY(-50%)',
          minWidth: 48,
          p: 1,
          borderRadius: 1,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          height: 70,
          backgroundColor: 'transparent',
          color: 'inherit'
        }}
        variant="outlined"
        disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccion}
      >
        <ArrowForwardIosIcon />
        <Typography variant="caption" sx={{ mt: 1 }}>
          {data.ui.siguiente}
        </Typography>
      </Button>
    )}

    {/* Después de completar feedback, botón para volver al menú */}
    {hideNext && (
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          top: '50%',
          right: theme.spacing(1),
          transform: 'translateY(-50%)',
          zIndex: 10
        }}
        onClick={finishFeedback}
      >
        {data.ui.volverMenu}
      </Button>
    )}
  </>
) : (
  /* Vista móvil */
  <Box display="flex" justifyContent="space-between" mt={4}>
    <Button onClick={handleBack}>
      <ArrowBackIosNewIcon /> {data.ui.atras}
    </Button>

    {/* Flecha adelante o botón menú tras feedback */}
    {!hideNext ? (
      <Button
        onClick={() =>
          showFeedback ? finishFeedback() : avanzar()
        }
        disabled={!showFeedback && pasoActual.tipo === 'eleccion' && !eleccion}
      >
        {data.ui.siguiente}
        <ArrowForwardIosIcon />
      </Button>
    ) : (
      <Button variant="contained" onClick={finishFeedback}>
        {data.ui.volverMenu}
      </Button>
    )}
  </Box>
)}      </Container>
    </>
  )
}

export default ActuaEscenario

