// src/components/Portada.jsx
import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function Portada() {
  const { setStage, idioma } = useActua();
  const { portadaButton } = textos[idioma].ui;

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative', // Keep this for the footer positioning
      pt: { xs: 1, sm: 1 },
      paddingBottom: { xs: '100px', sm: '60px' }
    }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ 
          flexGrow: 1, 
          textAlign: 'center', 
          px: 2,
          // Ensure Stack does not prevent clicks on its children
          // pointerEvents: 'auto', // Default, but good to be mindful of
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Logo TE(A)NTENC"
          sx={{
            width: { xs: '70%', sm: '60%' },
            maxWidth: 400,
            height: 'auto',
            mb: 2, // Distancia entre logo y botón Empezar
          }}
        />

        <Button
          variant="outlined"
          size="large"
          onClick={() => setStage('ingreso')}
          sx={{
            minWidth: '180px',
            mb: 0, // Distancia entre botón Empezar y GIF
            zIndex: 1, // Ensure button is on top if any weird overlaps occur at zoom
            // pointerEvents: 'auto' // Ensure button itself is interactive
          }}
        >
          {portadaButton}
        </Button>

        <Box
          component="img"
          src="/portada.gif"
          alt="Portada Actua"
          sx={{
            width: { xs: '85%', sm: '75%' },
            maxWidth: 500,
            height: 'auto',
            mb: 1,
          }}
        />
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 0, // Change to 0 to allow full width for centering
          right: 0, // Change to 0
          textAlign: { xs: 'center', sm: 'left'},
          color: 'text.secondary',
          p: 1,
          zIndex: 0,
        }}
      >
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          NICOLE DAHYAN ALFARO RUÍZ
        </Typography> {/* [cite: 1264] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}> {/* [cite: 1265] */}
          TRABAJO DE FIN DE GRADO
        </Typography> {/* [cite: 1266] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}> {/* [cite: 1265] */}
          EN EDUCACIÓN PRIMÁRIA
        </Typography> {/* [cite: 1266] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          CURSO 2024/2025
        </Typography>
      </Box>
    </Box>
  );
}