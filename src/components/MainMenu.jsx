// src/components/MainMenu.jsx
import React from 'react';
import { Box, Stack, Typography, Button, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';
import DrawerMenu from './DrawerMenu';
import { obtenerSecuenciaEscenas } from '../ordenEscenas';

export default function MainMenu() {
  const {
    user, logout, setStage, setIndiceEscena, reiniciarPaso, elecciones, idioma
  } = useActua();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const data = textos[idioma];
  const ui = data.ui;
  const todasEscenas = data.escenas;
  const secuenciaEscenasOrdenadas = obtenerSecuenciaEscenas();

  const handleStart = () => {
    // ... (lógica handleStart sin cambios)
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

  const HeaderContent = () => (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        {ui.inicioTitle}
      </Typography>
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2} 
        sx={{ width: '100%', maxWidth: { xs: '100%', sm: 'sm' }, px: {xs: 1, sm: 0} }}
      >
        <Typography variant="h6">
          {ui.greeting} {user?.name || ''}
        </Typography>
        {!isMobile && ( // El botón de SALIR se mueve al final en móvil
           <Button variant="outlined" onClick={logout}>
             {ui.logout}
           </Button>
        )}
      </Stack>
      <Button variant="contained" size="large" onClick={handleStart} sx={{ mb: 3 }}>
        {ui.empezar}
      </Button>
    </>
  );

  const DrawerMenuComponent = () => (
    <Box sx={{ 
        width: { xs: '100%', md: 250 }, 
        flexShrink: { md: 0 }, 
        maxHeight: { xs: 'auto', md: 'calc(100vh - 160px)' }, // Ajustar altura máxima
        overflowY: 'auto',
        mb: {xs: 2, md: 0} // Margen inferior en móvil
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
    <Box sx={{ textAlign: 'center', mb: {xs: 3, md: 3} }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <CircularProgress 
          variant="determinate" 
          value={porcentajeCompletado} 
          size={100}
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
          <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize: '1.2rem'}}>
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
      <Stack alignItems="center" sx={{ mt: 2, mb: 2, width: '100%'}}>
        <HeaderContent />
        <DrawerMenuComponent />
        <ProgressChartComponent />
        <Button variant="outlined" onClick={logout} sx={{mt: 'auto', mb: 2}}> {/* Botón SALIR al final en móvil */}
          {ui.logout}
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={3} sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <DrawerMenuComponent />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0 }}>
        <HeaderContent />
        <ProgressChartComponent />
      </Box>
    </Stack>
  );
}