// src/components/MainMenu.jsx
import React from 'react';
import { Box, Stack, Typography, Button, CircularProgress, useTheme, useMediaQuery, Container } from '@mui/material'; // [cite: 1184]
// ... (resto de las importaciones)
import { useActua } from '../context/ActuaContext'; // [cite: 1185]
import textos from '../textos'; // [cite: 1185]
import DrawerMenu from './DrawerMenu'; // [cite: 1185]
import { obtenerSecuenciaEscenas } from '../ordenEscenas'; // [cite: 1189]

export default function MainMenu() {
  const {
    user,
    exitStudentSession, // [cite: 1186]
    setStage,
    setIndiceEscena,
    reiniciarPaso, // [cite: 1187]
    elecciones,
    idioma
  } = useActua();
  
  const theme = useTheme(); // [cite: 1187]
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const data = textos[idioma];
  const ui = data.ui;
  const todasEscenas = data.escenas; 
  const secuenciaEscenasOrdenadas = obtenerSecuenciaEscenas(); // [cite: 1189]

  const handleStart = () => {
    const primeraEscenaId = obtenerSecuenciaEscenas()[0];
    if (primeraEscenaId) {
        const indiceGlobal = obtenerSecuenciaEscenas().findIndex(id => id === primeraEscenaId); // [cite: 1190]
        if (indiceGlobal !== -1) {
            setIndiceEscena(indiceGlobal);
            reiniciarPaso();
            setStage('escenario');
        } else { // [cite: 1191]
            console.error("Error: No se encontró la primera escena en la secuencia global.");
        }
    } else { // [cite: 1192]
        console.error("Error: No hay escenas definidas en ordenEscenas.js");
    }
  };

  const handleSelect = globalIndex => { // [cite: 1193]
    setIndiceEscena(globalIndex);
    reiniciarPaso();
    setStage('escenario');
  };

  const totalSituaciones = secuenciaEscenasOrdenadas.length;
  const situacionesCompletadas = Object.keys(elecciones || {}).filter(
    idEscena => (elecciones[idEscena] && elecciones[idEscena] !== '') && secuenciaEscenasOrdenadas.includes(idEscena) // [cite: 1194]
  ).length;

  const porcentajeCompletado = totalSituaciones > 0 
    ? Math.round((situacionesCompletadas / totalSituaciones) * 100) 
    : 0; // [cite: 1195]

  const TopBarContent = () => (
    <Stack 
      direction="row" 
      justifyContent="space-between" // [cite: 1196]
      alignItems="center" 
      mb={2} 
      sx={{ width: '100%', maxWidth: 'sm', 
      px: {xs: 1, sm: 0} }} // [cite: 1197]
    >
      <Typography variant="h6" sx={{fontSize: {xs: '1rem', sm: '1.25rem'}}}>
        {ui.greeting} {user?.name || ''} {/* [cite: 1198] */}
      </Typography>
      {user?.name === 'admin' && !isMobile && (
           <Button variant="outlined" onClick={() => setStage('admin')} size="small"> {/* [cite: 1199] */}
           {ui.adminPanelTitle} {/* [cite: 1200] */}
            </Button>
         )}
    </Stack> // [cite: 1201]
  );

  const DrawerMenuComponent = () => ( 
    <Box sx={{ 
        width: { xs: '100%', md: 280 }, // [cite: 1202]
        flexShrink: { md: 0 }, 
        maxHeight: { xs: '40vh', md: 'calc(100vh - 220px)' }, // [cite: 1203]
        overflowY: 'auto', // [cite: 1204]
        mb: {xs: 2, md: 0},
        border: {xs: `1px solid ${theme.palette.divider}`, md: 'none'}, // [cite: 1205]
        borderRadius: {xs: 1, md: 0},
    }}>
      <DrawerMenu
        items={todasEscenas} // [cite: 1206]
        completed={elecciones || {}}
        categories={ui.categories}
        nivelesLabels={ui.niveles || {}} // [cite: 1207]
        onSelect={handleSelect}
        isGlobalMenu={true}
      /> {/* [cite: 1208] */}
    </Box>
  );

  const ProgressChartComponent = () => (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}> {/* [cite: 1209] */}
        {/* Background track for 0% visibility */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={isMobile ? 80 : 100}
          thickness={4}
          sx={{
            color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800], // Light grey track
            position: 'absolute', // Overlay the main progress
            left: 0,
            top: 0,
            zIndex: 1, // Behind the main progress
          }}
        />
        <CircularProgress 
          variant="determinate" 
          value={porcentajeCompletado} // [cite: 1210]
          size={isMobile ? 80 : 100} // [cite: 1211]
          thickness={4}
          sx={{ 
            color: 'primary.main', // [cite: 1212]
            zIndex: 2 // On top of the background track
          }}
        />
        <Box
          sx={{ // [cite: 1213]
            top: 0, left: 0, bottom: 0, right: 0,
            position: 'absolute', display: 'flex', // [cite: 1214]
            alignItems: 'center', justifyContent: 'center', // [cite: 1215]
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize: isMobile? '1rem':'1.2rem'}}> {/* [cite: 1216] */}
            {`${porcentajeCompletado}%`}
          </Typography> {/* [cite: 1217] */}
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary"> {/* [cite: 1218] */}
        {situacionesCompletadas} de {totalSituaciones} situaciones completadas
      </Typography>
    </Box>
  ); // [cite: 1219]
  
  if (isMobile) {
    return (
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, pb: 2, 
      minHeight: 'calc(100vh - 48px)'}}> {/* [cite: 1220] */}
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle}
        </Typography> {/* [cite: 1221] */}
        <TopBarContent />
        {user?.name === 'admin' && ( // [cite: 1222]
            <Button variant="outlined" onClick={() => setStage('admin')} size="small" sx={{mb:2, alignSelf: 'flex-end'}}>
              {ui.adminPanelTitle} {/* [cite: 1223] */}
            </Button>
          )} {/* [cite: 1224] */}
        <Button variant="outlined" size="large" onClick={handleStart} sx={{ mb: 2 }}> {/* Changed variant */}
           {ui.empezar} {/* [cite: 1225] */}
        </Button>
        <DrawerMenuComponent />
        <ProgressChartComponent /> {/* [cite: 1226] */}
        <Button variant="outlined" onClick={exitStudentSession} sx={{ mt: 'auto', width: 'fit-content' }}>
           {ui.logout || "SALIR"} {/* [cite: 1227] */}
        </Button>
      </Container>
    );
  }

  return ( // [cite: 1228]
    <Stack direction="row" spacing={3} sx={{ mt: 4, mb: 4, position: 'relative' }}>
      <DrawerMenuComponent />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0 }}> {/* [cite: 1229] */}
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle} {/* [cite: 1230] */}
        </Typography>
        <TopBarContent /> {/* [cite: 1231] */}
        <Button variant="outlined" size="large" onClick={handleStart} sx={{ mb: 3 }}> {/* Changed variant */}
          {ui.empezar}
        </Button> {/* [cite: 1232] */}
        <ProgressChartComponent />
        <Button variant="outlined" onClick={exitStudentSession} sx={{ mt: 2, width: 'fit-content' }}> {/* [cite: 1233] */}
         {ui.logout || "SALIR"}
        </Button>
      </Box> {/* [cite: 1234] */}
    </Stack>
  );
}