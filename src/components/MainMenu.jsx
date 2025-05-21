// src/components/MainMenu.jsx
import React from 'react';
import { Box, Stack, Typography, Button, CircularProgress, useTheme, useMediaQuery, Container } from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';
import DrawerMenu from './DrawerMenu';
import { obtenerSecuenciaEscenas } from '../ordenEscenas';

export default function MainMenu() {
  const {
    user,
    exitStudentSession, // Usar esta en lugar de logout para el botón SALIR de esta vista
    setStage,
    setIndiceEscena,
    reiniciarPaso,
    elecciones,
    idioma
  } = useActua();
  
  const theme = useTheme(); // theme se define aquí para estar en el scope de los componentes internos
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const data = textos[idioma];
  const ui = data.ui;
  const todasEscenas = data.escenas; 
  const secuenciaEscenasOrdenadas = obtenerSecuenciaEscenas(); 

  const handleStart = () => {
    const primeraEscenaId = obtenerSecuenciaEscenas()[0];
    if (primeraEscenaId) {
        const indiceGlobal = obtenerSecuenciaEscenas().findIndex(id => id === primeraEscenaId);
        if (indiceGlobal !== -1) {
            setIndiceEscena(indiceGlobal);
            reiniciarPaso();
            setStage('escenario');
        } else {
            console.error("Error: No se encontró la primera escena en la secuencia global.");
        }
    } else {
        console.error("Error: No hay escenas definidas en ordenEscenas.js");
    }
  };

  const handleSelect = globalIndex => {
    setIndiceEscena(globalIndex);
    reiniciarPaso();
    setStage('escenario');
  };

  const totalSituaciones = secuenciaEscenasOrdenadas.length;
  const situacionesCompletadas = Object.keys(elecciones || {}).filter(
    idEscena => (elecciones[idEscena] && elecciones[idEscena] !== '') && secuenciaEscenasOrdenadas.includes(idEscena)
  ).length;

  const porcentajeCompletado = totalSituaciones > 0 
    ? Math.round((situacionesCompletadas / totalSituaciones) * 100) 
    : 0;

  const TopBarContent = () => (
    <Stack 
      direction="row" 
      justifyContent="space-between" 
      alignItems="center" 
      mb={2} 
      sx={{ width: '100%', maxWidth: 'sm', px: {xs: 1, sm: 0} }}
    >
      <Typography variant="h6" sx={{fontSize: {xs: '1rem', sm: '1.25rem'}}}>
        {ui.greeting} {user?.name || ''}
      </Typography>
      {user?.name === 'admin' && !isMobile && (
            <Button variant="outlined" onClick={() => setStage('admin')} size="small">
              {ui.adminPanelTitle}
            </Button>
         )}
    </Stack>
  );

  // Eliminado el comentario problemático aquí
  const DrawerMenuComponent = () => ( 
    <Box sx={{ 
        width: { xs: '100%', md: 280 }, 
        flexShrink: { md: 0 }, 
        maxHeight: { xs: '40vh', md: 'calc(100vh - 220px)' }, 
        overflowY: 'auto',
        mb: {xs: 2, md: 0},
        border: {xs: `1px solid ${theme.palette.divider}`, md: 'none'},
        borderRadius: {xs: 1, md: 0},
    }}>
      <DrawerMenu
        items={todasEscenas}
        completed={elecciones || {}}
        categories={ui.categories}
        nivelesLabels={ui.niveles || {}}
        onSelect={handleSelect}
        isGlobalMenu={true}
      />
    </Box>
  );

  const ProgressChartComponent = () => (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <CircularProgress 
          variant="determinate" 
          value={porcentajeCompletado} 
          size={isMobile ? 80 : 100}
          thickness={4}
          sx={{ color: 'primary.main' }}
        />
        <Box
          sx={{
            top: 0, left: 0, bottom: 0, right: 0,
            position: 'absolute', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize: isMobile? '1rem':'1.2rem'}}>
            {`${porcentajeCompletado}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {situacionesCompletadas} de {totalSituaciones} situaciones completadas
      </Typography>
    </Box>
  );
  
  if (isMobile) {
    return (
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, pb: 2, minHeight: 'calc(100vh - 48px)'}}>
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle}
        </Typography>
        <TopBarContent />
        {user?.name === 'admin' && (
            <Button variant="outlined" onClick={() => setStage('admin')} size="small" sx={{mb:2, alignSelf: 'flex-end'}}>
              {ui.adminPanelTitle}
            </Button>
         )}
        <Button variant="contained" size="large" onClick={handleStart} sx={{ mb: 2 }}>
          {ui.empezar}
        </Button>
        <DrawerMenuComponent />
        <ProgressChartComponent />
        <Button variant="outlined" onClick={exitStudentSession} sx={{ mt: 'auto', width: 'fit-content' }}>
          {ui.logout || "SALIR"}
        </Button>
      </Container>
    );
  }

  return (
    <Stack direction="row" spacing={3} sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <DrawerMenuComponent />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle}
        </Typography>
        <TopBarContent />
        <Button variant="contained" size="large" onClick={handleStart} sx={{ mb: 3 }}>
          {ui.empezar}
        </Button>
        <ProgressChartComponent />
        <Button variant="outlined" onClick={exitStudentSession} sx={{ mt: 2, width: 'fit-content' }}>
         {ui.logout || "SALIR"}
        </Button>
      </Box>
    </Stack>
  );
}