import React from 'react'
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ordenEscenas, { obtenerSecuenciaEscenas } from '../ordenEscenas'; // Importar para la estructura

const DrawerMenu = ({
  items = [], // Todas las escenas disponibles
  // currentIndex no se usa para la selección aquí, se basa en el ID de la escena
  completed = {},
  categories = {},
  nivelesLabels = {},
  onSelect = () => {} // onSelect debería recibir el índice GLOBAL de la escena seleccionada
}) => {
  const secuenciaGlobal = obtenerSecuenciaEscenas();

  const handleSelect = (escenaId) => {
    const globalIndex = secuenciaGlobal.findIndex(id => id === escenaId);
    if (globalIndex !== -1) {
      onSelect(globalIndex);
    }
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        overflowY: 'auto',
        bgcolor: 'background.paper'
      }}
      role="presentation" // [cite: 352]
    >
      <List disablePadding>
        {ordenEscenas.map(nivelObj => (
          <React.Fragment key={`nivel-${nivelObj.nivel}`}>
            <ListSubheader disableSticky>
              {nivelesLabels[nivelObj.nivel] || `Nivel ${nivelObj.nivel}`} {/* [cite: 353] */}
            </ListSubheader>

            {Object.entries(nivelObj.categorias).map(([catKey, escenasEnCategoriaPorId]) => {
              if (!escenasEnCategoriaPorId || escenasEnCategoriaPorId.length === 0) return null;
              
              // Mapear IDs a objetos de escena completos para obtener títulos, etc.
              const escenasCompletasEnCategoria = escenasEnCategoriaPorId
                .map(idEscena => items.find(item => item.id === idEscena))
                .filter(Boolean); // Filtrar por si alguna ID no tiene correspondencia

              if (!escenasCompletasEnCategoria.length) return null;

              return (
                <React.Fragment key={`${nivelObj.nivel}-${catKey}`}>
                  <ListSubheader sx={{ pl: 4 }} disableSticky>
                    {categories[catKey] || catKey} {/* [cite: 355] */}
                  </ListSubheader>

                  {escenasCompletasEnCategoria.map(({ id, titulo }) => (
                    <ListItemButton
                      key={id} // [cite: 356]
                      // selected={id === items[currentIndex]?.id} // Ya no se usa currentIndex así
                      onClick={() => handleSelect(id)}
                    >
                      <ListItemText
                        primary={titulo} // [cite: 357]
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                      />
                      {completed[id] && (
                        <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}> {/* [cite: 358] */}
                          <CheckIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                      )}
                    </ListItemButton>
                  ))}
                </React.Fragment>
              )
            })}
            {/* Solo añadir Divider si no es el último nivel o si hay contenido después */}
            {ordenEscenas.indexOf(nivelObj) < ordenEscenas.length -1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default DrawerMenu