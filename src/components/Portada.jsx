// src/components/Portada.jsx
import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function Portada() {
  const { setStage, idioma } = useActua();
  const { portadaTitle, portadaButton } = textos[idioma].ui;

  return (
    <Box sx={{ height: 'calc(100vh - 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}> {/* Contenedor principal para posicionamiento */}
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }} 
      >
        <Typography variant="h2" align="center">
          {portadaTitle}
        </Typography>

        <Box
          component="img"
          src="/portada.png"
          alt="Portada Actua"
          sx={{ width: '60%', maxWidth: 300 }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={() => setStage('ingreso')}
        >
          {portadaButton}
        </Button>
      </Stack>

      {/* Información Adicional */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16, // Espacio desde abajo
          left: 16,   // Espacio desde la izquierda
          textAlign: 'left',
          color: 'text.secondary', // Un color discreto
        }}
      >
        <Typography variant="caption" component="div">
          NICOLE DAHYAN ALFARO RUÍZ
        </Typography>
        <Typography variant="caption" component="div">
          TRABAJO DE FIN DE GRADO EN EDUCACIÓN PRIMÁRIA
        </Typography>
        <Typography variant="caption" component="div">
          CURSO 2024/2025
        </Typography>
      </Box>
    </Box>
  );
}