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
      minHeight: 'calc(100vh - 40px)', 
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Stack
        alignItems="center"
        justifyContent="center" 
        spacing={{ xs: 2, sm: 3 }} // Added spacing for the Stack children
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          px: 2,
          width: '100%', 
          mt: { xs: 1, sm: 0 } // Reduced top margin for the stack itself
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Logo TE(A)NTENC"
          sx={{
            width: { xs: '80%', sm: '65%', md: '50%' }, // Made logo significantly larger
            maxWidth: { xs: 300, sm: 450 }, // Increased max width
            height: 'auto',
            // mb: { xs: 2, sm: 3 }, // Spacing handled by Stack now
          }}
        />

        <Button
          variant="contained" // Changed to contained for more prominence
          color="primary"    // Using primary color
          onClick={() => setStage('ingreso')}
          sx={{
            minWidth: { xs: '200px', sm: '280px' }, // Further increase minWidth
            fontSize: { xs: '1.15rem', sm: '1.35rem'}, // Further increase font size
            padding: { xs: '12px 28px', sm: '16px 35px'}, // Further increase padding
            // my: { xs: 2, sm: 3}, // Spacing handled by Stack now
            zIndex: 1,
            fontWeight: 'bold', // Make text bolder
          }}
        >
          {portadaButton}
        </Button>

        <Box
          component="img"
          src="/portada.gif"
          alt="Portada Actua"
          sx={{
            width: { xs: '85%', sm: '70%', md: '60%' },
            maxWidth: 480, 
            height: 'auto',
            // mt: { xs: 2, sm: 3 }, // Spacing handled by Stack now
            // mb: { xs: 2, sm: 3},
          }}
        />
      </Stack>

      {/* Footer Section - Centered block, left-aligned text */}
      <Box
        sx={{
          width: '100%', 
          display: 'flex',
          justifyContent: 'center', 
          py: 1, // Reduced padding slightly
          mt: 'auto', 
        }}
      >
        <Box sx={{ textAlign: 'left', color: 'text.secondary'}}>
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
    </Box>
  );
}