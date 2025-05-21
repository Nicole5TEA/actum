// src/components/Portada.jsx
import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function Portada() {
  const { setStage, idioma } = useActua();
  const { portadaTitle, portadaButton } = textos[idioma].ui;

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 48px)', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      pt: 2, 
      // pb: {xs: '80px', sm: 2} // Espacio en la parte inferior para el texto, más en móvil
      paddingBottom: { xs: '100px', sm: '60px' } // Ajusta según sea necesario
    }}>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, textAlign: 'center', px: 2 }} // Añadido padding horizontal general
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{fontSize: {xs: '2.5rem', sm: '3.75rem'}}}>
          {portadaTitle}
        </Typography>

        <Box
          component="img"
          src="/portada.png"
          alt="Portada Actua"
          sx={{ 
            width: { xs: '70%', sm: '60%' }, 
            maxWidth: 300, 
            height: 'auto'
          }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={() => setStage('ingreso')}
        >
          {portadaButton}
        </Button>
      </Stack>

      <Box
        sx={{
          position: 'absolute', // Mantenido absoluto para el sticky effect
          bottom: 16, 
          left: 16,
          right: 16, // Para centrar texto en móvil si es necesario
          textAlign: { xs: 'center', sm: 'left'}, // Centrado en móvil, izquierda en SM+
          color: 'text.secondary',
          p: 1, // Un poco de padding interno
        }}
      >
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          NICOLE DAHYAN ALFARO RUÍZ
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          TRABAJO DE FIN DE GRADO EN EDUCACIÓN PRIMÁRIA
        </Typography>
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          CURSO 2024/2025
        </Typography>
      </Box>
    </Box>
  );
}