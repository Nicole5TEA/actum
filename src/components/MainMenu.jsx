// src/components/MainMenu.jsx
import React, { useMemo } from 'react'; // Added useMemo
import { Box, Stack, Typography, Button, CircularProgress, useTheme, useMediaQuery, Container } from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';
import DrawerMenu from './DrawerMenu';
import { obtenerSecuenciaEscenas } from '../ordenEscenas';

export default function MainMenu() {
  const {
    user,
    exitStudentSession, // [cite: 695]
    setStage,
    setIndiceEscena,
    reiniciarPaso,
    elecciones,
    idioma
  } = useActua();
  
  const theme = useTheme(); // [cite: 696]
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // [cite: 696]

  const data = textos[idioma];
  const ui = data.ui;
  const todasEscenas = data.escenas; 
  const secuenciaEscenasOrdenadas = useMemo(() => obtenerSecuenciaEscenas(), []); // Memoize

  const primeraEscenaSinRespuesta = useMemo(() => {
    for (let i = 0; i < secuenciaEscenasOrdenadas.length; i++) {
      const escenaId = secuenciaEscenasOrdenadas[i];
      if (!elecciones[escenaId]) {
        return i; // Devuelve el índice global de la primera escena no completada
      }
    }
    return 0; // Si todas están completas, o no hay escenas, por defecto la primera
  }, [secuenciaEscenasOrdenadas, elecciones]);

  const hayProgreso = useMemo(() => Object.keys(elecciones || {}).length > 0, [elecciones]);

  const handleStartOrContinue = () => {
    const indiceGlobal = hayProgreso ? primeraEscenaSinRespuesta : 0;
    
    if (secuenciaEscenasOrdenadas[indiceGlobal]) {
        setIndiceEscena(indiceGlobal); // [cite: 698]
        reiniciarPaso(); // [cite: 698]
        setStage('escenario'); // [cite: 698]
    } else {
        console.error("Error: No se encontró la escena de inicio/continuación."); // [cite: 699]
    }
  };


  const handleSelect = globalIndex => {
    setIndiceEscena(globalIndex); // [cite: 700]
    reiniciarPaso(); // [cite: 700]
    setStage('escenario'); // [cite: 700]
  };

  const totalSituaciones = secuenciaEscenasOrdenadas.length; // [cite: 700]
  const situacionesCompletadas = Object.keys(elecciones || {}).filter( // [cite: 700]
    idEscena => (elecciones[idEscena] && elecciones[idEscena] !== '') && secuenciaEscenasOrdenadas.includes(idEscena)
  ).length; // [cite: 701]

  const porcentajeCompletado = totalSituaciones > 0  // [cite: 701]
    ? Math.round((situacionesCompletadas / totalSituaciones) * 100) 
    : 0;

  const TopBarContent = () => (
    <Stack // [cite: 702]
      direction="row" 
      justifyContent="space-between"
      alignItems="center" 
      mb={2} 
      sx={{ // [cite: 703]
        width: '100%', maxWidth: 'sm', 
        px: {xs: 1, sm: 0} }}
    >
      <Typography variant="h6" sx={{fontSize: {xs: '1rem', sm: '1.25rem'}}}>
        {ui.greeting} {user?.name || ''} {/* [cite: 704] */}
      </Typography>
      {user?.name === 'admin' && !isMobile && (
        <Button variant="outlined" onClick={() => setStage('admin')} size="small"> {/* [cite: 705] */}
           {ui.adminPanelTitle} {/* [cite: 705] */}
        </Button> // [cite: 706]
         )}
    </Stack>
  );

  const DrawerMenuComponent = () => ( 
    <Box sx={{ 
      width: { xs: '100%', md: 280 }, // [cite: 707]
        flexShrink: { md: 0 }, 
        maxHeight: { // [cite: 708]
          xs: 'calc(50vh - 120px)', // Ajusta la altura máxima en móvil
          md: 'calc(100vh - 240px)'  // Ajusta la altura máxima en desktop
        }, 
        overflowY: 'auto', // [cite: 708]
        mb: {xs: 2, md: 0},
        border: {xs: `1px solid ${theme.palette.divider}`, md: 'none'}, // [cite: 709]
        borderRadius: {xs: 1, md: 0}, // [cite: 709]
    }}>
      <DrawerMenu
        items={todasEscenas} // [cite: 710]
        completed={elecciones || {}} // [cite: 710]
        categories={ui.categories} // [cite: 710]
        nivelesLabels={ui.niveles || {}} // [cite: 711]
        onSelect={handleSelect} // [cite: 711]
        isGlobalMenu={true} // [cite: 711]
      />
    </Box> // [cite: 709]
  );

  const ProgressChartComponent = () => ( // [cite: 712]
    <Box sx={{ textAlign: 'center', my: 2 }}> {/* [cite: 712] */}
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <CircularProgress // [cite: 713]
          variant="determinate" // [cite: 713]
          value={100} // [cite: 714]
          size={isMobile ? 80 : 100} // [cite: 714]
          thickness={4} // [cite: 714]
          sx={{ // [cite: 715]
            color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            position: 'absolute', // [cite: 716]
            left: 0, // [cite: 716]
            top: 0, // [cite: 716]
            zIndex: 1, // [cite: 717]
          }}
        />
        <CircularProgress // [cite: 718]
          variant="determinate" // [cite: 718]
          value={porcentajeCompletado}
          size={isMobile ? 80 : 100} // [cite: 719]
          thickness={4} // [cite: 719]
          sx={{ // [cite: 720]
            color: 'primary.main',
            zIndex: 2 // [cite: 720]
          }} // [cite: 721]
        />
        <Box
          sx={{ // [cite: 721]
            top: 0, left: 0, bottom: 0, right: 0, // [cite: 722]
            position: 'absolute', display: 'flex', // [cite: 722]
            alignItems: 'center', justifyContent: 'center', // [cite: 723]
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary" sx={{fontSize: isMobile? '1rem':'1.2rem'}}> {/* [cite: 724] */}
            {`${porcentajeCompletado}%`} {/* [cite: 724] */}
          </Typography>
        </Box> {/* [cite: 725] */}
      </Box>
      <Typography variant="body2" color="text.secondary"> {/* [cite: 725] */}
        {situacionesCompletadas} de {totalSituaciones} situaciones completadas {/* [cite: 726] */}
      </Typography>
    </Box> // [cite: 719]
  );
  
  if (isMobile) {
    return (
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2, pb: 2, minHeight: 'calc(100vh - 48px)'}}> {/* [cite: 727] */}
        <Typography variant="h4" align="center" gutterBottom>
           {ui.inicioTitle} {/* [cite: 728] */}
        </Typography>
        <TopBarContent /> {/* [cite: 728] */}
        {user?.name === 'admin' && ( // [cite: 729]
            <Button variant="outlined" onClick={() => setStage('admin')} size="small" sx={{mb:2, alignSelf: 'flex-end'}}>
              {ui.adminPanelTitle} {/* [cite: 730] */}
            </Button>
          )} {/* [cite: 730] */}
        <Button 
          variant="contained" // Changed to contained for more prominence
          size="large" 
          onClick={handleStartOrContinue} 
          sx={{ 
            mb: 2, 
            fontSize: '1.1rem', // Larger font
            padding: '10px 20px' // More padding
          }}
        >
           {hayProgreso ? (ui.continuar || "CONTINUAR") : ui.empezar}
        </Button> {/* [cite: 731] */}
        <DrawerMenuComponent /> {/* [cite: 732] */}
        <ProgressChartComponent />
        <Button variant="outlined" onClick={exitStudentSession} sx={{ mt: 'auto', width: 'fit-content' }}> {/* [cite: 733] */}
          {ui.logout || "SALIR"}
        </Button> {/* [cite: 733] */}
      </Container>
    );
  }

  return ( // [cite: 734]
    <Stack direction="row" spacing={3} sx={{ mt: 4, mb: 4, position: 'relative' }}> {/* [cite: 734] */}
      <DrawerMenuComponent />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0 }}> {/* [cite: 735] */}
        <Typography variant="h4" align="center" gutterBottom>
          {ui.inicioTitle} {/* [cite: 736] */}
        </Typography> {/* [cite: 736] */}
        <TopBarContent />
        <Button 
          variant="contained" // Changed to contained
          size="large" 
          onClick={handleStartOrContinue} 
          sx={{ 
            mb: 3,
            fontSize: '1.1rem', // Larger font
            padding: '10px 20px' // More padding
          }}
        >
          {hayProgreso ? (ui.continuar || "CONTINUAR") : ui.empezar}
        </Button>
        <ProgressChartComponent /> {/* [cite: 737] */}
        <Button variant="outlined" onClick={exitStudentSession} sx={{ mt: 2, width: 'fit-content' }}> {/* [cite: 738] */}
         {ui.logout || "SALIR"} {/* [cite: 738] */}
        </Button>
      </Box> {/* [cite: 739] */}
    </Stack>
  );
}