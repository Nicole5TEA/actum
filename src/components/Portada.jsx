// src/components/Portada.jsx
import React from 'react';
import { Stack, Typography, Button, Box } from '@mui/material'; // [cite: 1235]
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function Portada() {
  const { setStage, idioma } = useActua(); // [cite: 1236]
  const { portadaButton } = textos[idioma].ui; // [cite: 1237]

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 48px)', 
      display: 'flex', // [cite: 1238]
      flexDirection: 'column',
      position: 'relative', 
      pt: { xs: 1, sm: 1 }, // Reduced padding top
      paddingBottom: { xs: '100px', sm: '60px' } 
    }}>
      <Stack
        spacing={2} // Reduced spacing between elements
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1, textAlign: 'center', px: 2 }} 
      >
        <Box
          component="img" // [cite: 1243]
          src="/logo.png" 
          alt="Logo Actum" // [cite: 1244]
          sx={{ // [cite: 1245]
            width: { xs: '70%', sm: '60%' }, 
            maxWidth: 400, // Increased logo size
            height: 'auto', // [cite: 1247]
            mb: 1 // Reduced margin bottom for the logo
          }} // [cite: 1248]
        />

        <Box
          component="img" // [cite: 1249]
          src="/portada.gif"
          alt="Portada Actua" 
          sx={{ // [cite: 1250]
            width: { xs: '85%', sm: '75%' }, 
            maxWidth: 500, 
            height: 'auto', 
            mb: 2 // Reduced margin bottom for the gif
          }} // [cite: 1254]
        />

        <Button
          variant="outlined" // Changed variant for dark text on light background
          size="large" 
          onClick={() => setStage('ingreso')}
          sx={{ 
            minWidth: '180px', // Ensure button has a decent minimum width
            // Add any other specific sx props if needed for click area
          }}
        >
          {portadaButton} 
        </Button>
      </Stack>

      <Box // [cite: 1258]
        sx={{
          position: 'absolute', 
          bottom: 16, // [cite: 1259]
          left: 16,
          right: 16, // [cite: 1260]
          textAlign: { xs: 'center', sm: 'left'}, // [cite: 1261]
          color: 'text.secondary', // [cite: 1262]
          p: 1, // [cite: 1262]
        }}
      >
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}> {/* [cite: 1263] */}
          NICOLE DAHYAN ALFARO RUÍZ
        </Typography> {/* [cite: 1264] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}> {/* [cite: 1265] */}
          TRABAJO DE FIN DE GRADO
        </Typography> {/* [cite: 1266] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}> {/* [cite: 1265] */}
          EN EDUCACIÓN PRIMÁRIA
        </Typography> {/* [cite: 1266] */}
        <Typography variant="caption" component="div" sx={{ fontSize: {xs: '0.65rem', sm: '0.75rem'} }}>
          CURSO 2024/2025 {/* [cite: 1267] */}
        </Typography> 
      </Box> {/* [cite: 1268] */}
    </Box>
  );
}