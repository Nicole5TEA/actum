// src/components/MainMenu.jsx
import React from 'react';
import { Box, Stack, Typography, Button, CircularProgress } from '@mui/material'; // CircularProgress importado
import { useActua } from '../context/ActuaContext';
import textos from '../textos';
import DrawerMenu from './DrawerMenu';
import { obtenerSecuenciaEscenas } from '../ordenEscenas';

export default function MainMenu() {
  const {
    user,
    logout,
    setStage,
    setIndiceEscena,
    reiniciarPaso,
    elecciones,
    idioma
  } = useActua();
  
  const data = textos[idioma];
  const ui = data.ui;
  const todasEscenas = data.escenas; // Todas las escenas definidas en textos.js
  const secuenciaEscenasOrdenadas = obtenerSecuenciaEscenas(); // IDs de escenas en orden

  // Filtrar todasEscenas para que solo contenga las que están en secuenciaEscenasOrdenadas y mantener su orden
  const escenasEnOrden = secuenciaEscenasOrdenadas
    .map(id => todasEscenas.find(escena => escena.id === id))
    .filter(Boolean); // Eliminar undefined si alguna ID no se encuentra

  const handleStart = () => {
    setIndiceEscena(0);
    reiniciarPaso();
    setStage('escenario');
  };

  const handleSelect = globalIndex => {
    setIndiceEscena(globalIndex);
    reiniciarPaso();
    setStage('escenario');
  };

  const totalSituaciones = secuenciaEscenasOrdenadas.length;
  const situacionesCompletadas = Object.keys(elecciones).filter(
    // Considera completada si existe la key y no es un string vacío
    // y además, la escena está en la secuencia ordenada (para no contar antiguas)
    idEscena => elecciones[idEscena] && elecciones[idEscena] !== '' && secuenciaEscenasOrdenadas.includes(idEscena)
  ).length;

  const porcentajeCompletado = totalSituaciones > 0 
    ? Math.round((situacionesCompletadas / totalSituaciones) * 100) 
    : 0;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: { xs: '100%', md: 250 }, flexShrink: { md: 0 } }}>
        <DrawerMenu
          items={todasEscenas} // Pasamos todas las escenas para que el Drawer las busque por ID
          completed={elecciones}
          categories={ui.categories}
          nivelesLabels={ui.niveles || {}}
          onSelect={handleSelect}
          isGlobalMenu={true}
        />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} sx={{ width: '100%', maxWidth: 'sm' }}>
          <Typography variant="h6">
            {ui.greeting} {user.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            {user.name === 'admin' && (
              <Button variant="outlined" onClick={() => setStage('admin')}>
                {ui.adminPanelTitle}
              </Button>
            )}
            <Button variant="outlined" onClick={() => {
                logout(); // logout() ahora redirige a 'ingreso'
            }}>
              {ui.logout}
            </Button>
          </Stack>
        </Stack>

        <Button variant="contained" size="large" onClick={handleStart} sx={{ mb: 3 }}>
          {ui.empezar}
        </Button>

        {/* Gráfico Circular de Progreso */}
        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <CircularProgress 
            variant="determinate" 
            value={porcentajeCompletado} 
            size={100} // Tamaño del círculo
            thickness={4} // Grosor del círculo
            sx={{ color: 'primary.main' }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
    </Stack>
  );
}