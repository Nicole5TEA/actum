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
  const todasEscenas = data.escenas; 
  const secuenciaEscenasOrdenadas = obtenerSecuenciaEscenas(); 

  const escenasEnOrden = secuenciaEscenasOrdenadas
    .map(id => todasEscenas.find(escena => escena.id === id))
    .filter(Boolean); 

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
            // Opcionalmente, redirigir a un estado de error o al menú si la primera escena no es válida
        }
    } else {
        console.error("Error: No hay escenas definidas en ordenEscenas.js");
        // Opcionalmente, mostrar un mensaje al usuario
    }
  };

  const handleSelect = globalIndex => {
    setIndiceEscena(globalIndex);
    reiniciarPaso();
    setStage('escenario');
  };

  const totalSituaciones = secuenciaEscenasOrdenadas.length;
  const situacionesCompletadas = Object.keys(elecciones || {}).filter( // Asegurar que elecciones sea un objeto
    idEscena => (elecciones[idEscena] && elecciones[idEscena] !== '') && secuenciaEscenasOrdenadas.includes(idEscena)
  ).length;

  const porcentajeCompletado = totalSituaciones > 0 
    ? Math.round((situacionesCompletadas / totalSituaciones) * 100) 
    : 0;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 4, mb: 4, position: 'relative', minHeight: 'calc(100vh - 64px)' }}> {/* Ajustado para ocupar altura */}
      <Box sx={{ width: { xs: '100%', md: 250 }, flexShrink: { md: 0 }, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <DrawerMenu
          items={todasEscenas}
          completed={elecciones || {}} // Asegurar que elecciones sea un objeto
          categories={ui.categories}
          nivelesLabels={ui.niveles || {}}
          onSelect={handleSelect}
          isGlobalMenu={true}
        />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: { xs: 2, md: 0 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} sx={{ width: '100%', maxWidth: 'sm' }}>
          <Typography variant="h6">
            {ui.greeting} {user?.name || ''}
          </Typography>
          <Stack direction="row" spacing={1}>
            {user?.name === 'admin' && (
              <Button variant="outlined" onClick={() => setStage('admin')}>
                {ui.adminPanelTitle}
              </Button>
            )}
            <Button variant="outlined" onClick={() => {
                logout(); 
            }}>
              {ui.logout}
            </Button>
          </Stack>
        </Stack>

        <Button variant="contained" size="large" onClick={handleStart} sx={{ mb: 3 }}>
          {ui.empezar}
        </Button>

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
        <Typography variant="body2" color="text.secondary" sx={{mb:3}}>
          {situacionesCompletadas} de {totalSituaciones} situaciones completadas
        </Typography>
      </Box>
    </Stack>
  );
}