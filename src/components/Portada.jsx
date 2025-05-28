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
        // spacing={{ xs: 2, sm: 3 }} // We will control spacing with margins for more precision
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          px: 2,
          width: '100%', 
          mt: { xs: 1, sm: 0 } 
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Logo TE(A)NTENC"
          sx={{
            width: { xs: '100%', sm: '90%', md: '80%' },
            maxWidth: { xs: 520, sm: 630, md: 840 }, // Slightly larger logo
            height: 'auto',
            mt: { xs: 2, sm: 1 }, // Adjusted top margin for logo
            mb: { xs: 8, sm: 10 }, // Increased space between logo and button
          }}
        />

        <Button
          variant="contained" 
          color="primary"    
          onClick={() => setStage('ingreso')}
          sx={{
            minWidth: { xs: '200px', sm: '280px' }, 
            fontSize: { xs: '1.15rem', sm: '1.35rem'}, 
            padding: { xs: '12px 28px', sm: '16px 35px'}, 
            zIndex: 1,
            fontWeight: 'bold', 
            mb: { xs: 2, sm: 2.5 }, // Decreased space between button and gif
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
            // mt is implicitly handled by button's mb
            mb: { xs: 2, sm: 3},
          }}
        />
      </Stack>

      {/* Footer Section - Centered block, left-aligned text */}
      <Box
        sx={{
          width: '100%', 
          display: 'flex',
          justifyContent: 'center', 
          py: 1, 
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