// src/components/Portada.jsx
import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { useActua } from '../context/ActuaContext'; // [cite: 740]
import textos from '../textos';

export default function Portada() {
  const { setStage, idioma } = useActua();
  const { portadaButton } = textos[idioma].ui;

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 48px)', // [cite: 741]
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      pt: { xs: 2, sm: 3 }, // Increased top padding slightly for overall content
      paddingBottom: { xs: '100px', sm: '80px' } // Adjusted bottom padding for footer
    }}>
      <Stack
        alignItems="center"
        justifyContent="flex-start" // Changed from center to flex-start
        sx={{
          flexGrow: 1,
          textAlign: 'center', // [cite: 744]
          px: 2,
          pt: { xs: 2, sm: 4 }, // Added padding top to the Stack
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Logo TE(A)NTENC"
          sx={{
            width: { xs: '70%', sm: '55%' }, // Adjusted size
            maxWidth: 380, // Slightly adjusted max width
            height: 'auto', // [cite: 748]
            mb: { xs: 3, sm: 4 }, // Adjusted margin bottom for spacing
          }}
        />

        <Button
          variant="outlined"
          size="large"
          onClick={() => setStage('ingreso')}
          sx={{
            minWidth: { xs: '180px', sm: '220px' }, // [cite: 751]
            fontSize: { xs: '1rem', sm: '1.15rem'},
            padding: { xs: '10px 20px', sm: '12px 28px'},
            mb: { xs: 3, sm: 4 }, // Adjusted margin bottom for spacing (equidistant attempt)
            mt: { xs: 1, sm: 2 }, // Added margin top for spacing from logo
            zIndex: 1, // [cite: 752]
          }}
        >
          {portadaButton}
        </Button>

        <Box
          component="img"
          src="/portada.gif"
          alt="Portada Actua"
          sx={{
            width: { xs: '85%', sm: '70%' }, // Adjusted size
            maxWidth: 480, // Slightly adjusted
            height: 'auto', // [cite: 756]
            mb: 1,
          }}
        />
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16, // [cite: 758]
          left: 0, // [cite: 759]
          right: 0, // [cite: 759]
          textAlign: 'center', // Changed sm: 'left' to 'center'
          color: 'text.secondary',
          p: 1, // [cite: 760]
          zIndex: 0,
        }}
      >
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          NICOLE DAHYAN ALFARO RUÍZ
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          TRABAJO DE FIN DE GRADO
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          EN EDUCACIÓN PRIMÁRIA
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          CURSO 2024/2025
        </Typography>
      </Box>
    </Box>
  );
}