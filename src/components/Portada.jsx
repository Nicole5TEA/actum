// src/components/Portada.jsx
import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { useActua } from '../context/ActuaContext'; // [cite: 1420]
import textos from '../textos';

export default function Portada() {
  const { setStage, idioma } = useActua(); // [cite: 1421]
  // Se elimina portadaTitle de la desestructuración, ya que se reemplazará por un logo
  const { portadaButton } = textos[idioma].ui;

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 48px)', // [cite: 1422]
      display: 'flex',
      flexDirection: 'column',
      position: 'relative', // [cite: 1423]
      pt: 2,
      paddingBottom: { xs: '100px', sm: '60px' } // [cite: 1425]
    }}>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, textAlign: 'center', px: 2 }} // [cite: 1427]
      >
        {/* Se reemplaza el Typography del título por una imagen para el logo */}
        <Box
          component="img"
          src="/logo.png" // Asumiendo que tu logo se llama 'logo.png' y está en la carpeta 'public'
          alt="Logo Actum"
          sx={{
            width: { xs: '50%', sm: '40%' }, // Ajusta el tamaño del logo según sea necesario
            maxWidth: 250, // Ajusta el tamaño máximo del logo
            height: 'auto',
            mb: 2 // Margen inferior para el logo
          }}
        />

        <Box
          component="img"
          src="/portada.gif"
          alt="Portada Actua" // [cite: 1431]
          sx={{
            width: { xs: '90%', sm: '80%' }, // Aumentamos el ancho de la imagen
            maxWidth: 550, // Aumentamos el ancho máximo de la imagen para que sea más grande
            height: 'auto', // [cite: 1434]
            mb: 3 // Añadimos un margen inferior si es necesario
          }}
        />

        <Button
          variant="contained"
          size="large" // [cite: 1436]
          onClick={() => setStage('ingreso')}
        >
          {portadaButton} {/* [cite: 1437] */}
        </Button>
      </Stack>

      <Box
        sx={{
          position: 'absolute', // [cite: 1439]
          bottom: 16, // [cite: 1440]
          left: 16,
          right: 16, // [cite: 1441]
          textAlign: { xs: 'center', sm: 'left'}, // [cite: 1442]
          color: 'text.secondary', // [cite: 1443]
          p: 1,
        }}
      >
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}> {/* [cite: 1445] */}
          NICOLE DAHYAN ALFARO RUÍZ
        </Typography> {/* [cite: 1446] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          TRABAJO DE FIN DE GRADO EN EDUCACIÓN PRIMÁRIA
        </Typography> {/* [cite: 1448] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          CURSO 2024/2025
        </Typography> {/* [cite: 1449] */}
      </Box>
    </Box>
  );
}