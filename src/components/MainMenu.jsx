import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'
import DrawerMenu from './DrawerMenu'
import { obtenerSecuenciaEscenas } from '../ordenEscenas'

export default function MainMenu() {
  const {
    user,
    // perfiles, // No se usa directamente aquí
    logout,
    setStage,
    setIndiceEscena,
    reiniciarPaso,
    elecciones,
    idioma
  } = useActua()
  
  const data = textos[idioma] 

  const ui = textos[idioma].ui
  const escenas = textos[idioma].escenas // Usado para pasar al DrawerMenu

  // Arranca la primera situación de la secuencia global
  const handleStart = () => {
    setIndiceEscena(0) // El índice 0 de la secuencia global
    reiniciarPaso()
    setStage('escenario')
  }

  // Va a una situación concreta (el índice es el global en la secuencia)
  const handleSelect = idx => {
    setIndiceEscena(idx)
    reiniciarPaso()
    setStage('escenario')
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      {/* Título */}
      <Typography variant="h4" align="center" gutterBottom>
        {ui.inicioTitle}
      </Typography>

      {/* Saludo y botones admin/logout */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}> {/* [cite: 396] */}
        <Typography variant="h6">
          {ui.greeting} {user.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          {user.name === 'admin' && ( // Asumiendo que 'admin' es un nombre especial
            <Button variant="outlined" onClick={() => setStage('admin')}>
              {ui.adminPanelTitle}
            </Button>
          )}
          <Button variant="outlined" onClick={logout}>
            {ui.logout} {/* [cite: 411] */}
          </Button>
        </Stack>
      </Stack>

      {/* Botón EMPEZAR */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Button variant="contained" onClick={handleStart}>
          {ui.empezar} {/* [cite: 451] */}
        </Button>
      </Box>

      {/* Lista de situaciones */}
      <DrawerMenu
        items={escenas} // Pasamos todas las escenas para que el Drawer las organice
        currentIndex={-1} // Ya no es relevante el índice global aquí para la selección
        completed={elecciones}
        categories={ui.categories}
        nivelesLabels={data.ui.niveles || {}} // Aseguramos que nivelesLabels exista
        onSelect={handleSelect} // onSelect espera el índice global
      />
    </Box>
  )
}