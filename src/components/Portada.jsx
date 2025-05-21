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
      minHeight: 'calc(100vh - 48px)', // Usar minHeight para asegurar que cubre la pantalla
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative', // Para el posicionamiento absoluto del footer
      pt: 2, pb: 2 // Añadir padding vertical general
    }}>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, textAlign: 'center' }} 
      >
        <Typography variant="h2" component="h1" gutterBottom> {/* component="h1" para semántica */}
          {portadaTitle}
        </Typography>

        <Box
          component="img"
          src="/portada.png"
          alt="Portada Actua"
          sx={{ 
            width: { xs: '70%', sm: '60%' }, 
            maxWidth: 300, 
            height: 'auto' // Para mantener la proporción
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

      {/* Información Adicional */}
      <Box
        sx={{
          position: { xs: 'relative', sm: 'absolute' }, // Relativo en xs, absoluto en sm+
          bottom: { sm: 16 },
          left: { sm: 16 },
          width: { xs: 'calc(100% - 32px)', sm: 'auto' }, // Ancho completo menos padding en xs
          p: { xs: '16px 0', sm: 0 }, // Padding vertical en xs, ninguno en sm+
          mt: { xs: 'auto', sm: 0 }, // Margen superior auto en xs para empujar al fondo si es relative
          textAlign: { xs: 'center', sm: 'left'},
          color: 'text.secondary',
        }}
      >
        <Typography variant="caption" component="div">
          NICOLE DAHYAN ALFARO RUIZ [cite: 1418]
        </Typography>
        <Typography variant="caption" component="div">
          TRABAJO DE FIN DE GRADO EN EDUCACIÓN PRIMÁRIA [cite: 1420]
        </Typography>
        <Typography variant="caption" component="div">
          CURSO 2024/2025 [cite: 1422]
        </Typography>
      </Box>
    </Box>
  );
}