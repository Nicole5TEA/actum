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
      minHeight: 'calc(100vh - 40px)', // Adjusted minHeight slightly
      display: 'flex',
      flexDirection: 'column',
      // pt: { xs: 1, sm: 2 }, // Adjusted top padding
      // paddingBottom: { xs: '100px', sm: '80px' } // Will be handled by Stack spacing
    }}>
      <Stack
        alignItems="center"
        justifyContent="center" // Reverted to center, will use margins for spacing children
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          px: 2,
          width: '100%', // Ensure stack takes full width for centering children
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Logo TE(A)NTENC"
          sx={{
            width: { xs: '60%', sm: '50%', md: '40%' },
            maxWidth: 350,
            height: 'auto',
            mt: { xs: 2, sm: 3 }, // Margin top for space from screen top
            mb: { xs: 2, sm: 3 }, // Margin bottom for space to button
          }}
        />

        <Button
          variant="outlined"
          size="large"
          onClick={() => setStage('ingreso')}
          sx={{
            minWidth: { xs: '200px', sm: '250px' },
            fontSize: { xs: '1.1rem', sm: '1.25rem'}, // Increased font size
            padding: { xs: '12px 24px', sm: '15px 30px'}, // Increased padding
            my: { xs: 2, sm: 3}, // Vertical margin to balance space
            zIndex: 1,
          }}
        >
          {portadaButton}
        </Button>

        <Box
          component="img"
          src="/portada.gif"
          alt="Portada Actua"
          sx={{
            width: { xs: '80%', sm: '65%', md: '55%' },
            maxWidth: 450,
            height: 'auto',
            mt: { xs: 2, sm: 3 }, // Margin top for space from button
            mb: { xs: 2, sm: 3}, // Margin bottom before footer area
          }}
        />
      </Stack>

      {/* Footer Section - Centered block, left-aligned text */}
      <Box
        sx={{
          width: '100%', // Take full width to allow text alignment within
          display: 'flex',
          justifyContent: 'center', // Center the inner Box
          py: 2, // Padding top and bottom
          mt: 'auto', // Pushes to the bottom if there's space
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