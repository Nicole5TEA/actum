// src/components/DrawerMenu.jsx
import React, { useState } from 'react';
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse, // Importar Collapse
  Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLess from '@mui/icons-material/ExpandLess'; // Importar iconos
import ExpandMore from '@mui/icons-material/ExpandMore'; // Importar iconos
import FolderIcon from '@mui/icons-material/Folder'; // Icono para niveles/categorías
import FolderOpenIcon from '@mui/icons-material/FolderOpen'; // Icono para niveles/categorías
import ordenEscenas, { obtenerSecuenciaEscenas, obtenerEscenasDelNivelActual } from '../ordenEscenas';

const DrawerMenu = ({
  items = [], 
  completed = {},
  categories = {},
  nivelesLabels = {},
  onSelect = () => {},
  currentEscenaId = null, // Para filtrar por nivel actual en ActuaEscenario
  isGlobalMenu = true, // true para MainMenu, false para ActuaEscenario
}) => {
  const secuenciaGlobal = obtenerSecuenciaEscenas();
  const [openNiveles, setOpenNiveles] = useState({});
  const [openCategorias, setOpenCategorias] = useState({});

  const currentNivelFilter = (() => {
    if (isGlobalMenu || !currentEscenaId) return null;
    const escenaActualObj = items.find(e => e.id === currentEscenaId);
    return escenaActualObj ? escenaActualObj.nivel : null;
  })();

  const handleSelect = (escenaId) => {
    const globalIndex = secuenciaGlobal.findIndex(id => id === escenaId);
    if (globalIndex !== -1) {
      onSelect(globalIndex);
    }
  };

  const toggleNivel = (nivel) => {
    setOpenNiveles(prev => ({ ...prev, [nivel]: !prev[nivel] }));
  };

  const toggleCategoria = (nivelCategoriaKey) => {
    setOpenCategorias(prev => ({ ...prev, [nivelCategoriaKey]: !prev[nivelCategoriaKey] }));
  };
  
  const escenasAMostrar = isGlobalMenu 
    ? ordenEscenas
    : currentNivelFilter !== null
      ? ordenEscenas.filter(n => n.nivel === currentNivelFilter)
      : [];


  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        overflowY: 'auto',
        bgcolor: 'background.paper'
      }}
      role="presentation"
    >
      <List disablePadding>
        {escenasAMostrar.map(nivelObj => {
          const isNivelOpen = openNiveles[nivelObj.nivel] === undefined ? true : openNiveles[nivelObj.nivel]; // Abierto por defecto
          
          // Verifica si hay escenas visibles en este nivel para decidir si mostrar el nivel
           const tieneEscenasVisiblesEnNivel = Object.values(nivelObj.categorias).some(
            (escenasEnCategoriaPorId) =>
              escenasEnCategoriaPorId && escenasEnCategoriaPorId.length > 0 &&
              escenasEnCategoriaPorId.some(idEscena => items.find(item => item.id === idEscena))
          );

          if (!isGlobalMenu && !tieneEscenasVisiblesEnNivel && currentNivelFilter !== null) {
            return null; // No mostrar nivel si está filtrado y no tiene escenas
          }


          return (
            <React.Fragment key={`nivel-${nivelObj.nivel}`}>
              <ListItemButton onClick={() => toggleNivel(nivelObj.nivel)} sx={{ pl: isGlobalMenu ? 1 : 2 }}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                  {isNivelOpen ? <FolderOpenIcon fontSize="small" /> : <FolderIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText 
                  primary={nivelesLabels[nivelObj.nivel] || `Nivel ${nivelObj.nivel}`} 
                  primaryTypographyProps={{ fontWeight: 'medium', fontSize: '0.95rem' }}
                />
                {isNivelOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isNivelOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {Object.entries(nivelObj.categorias).map(([catKey, escenasEnCategoriaPorId]) => {
                    if (!escenasEnCategoriaPorId || escenasEnCategoriaPorId.length === 0) return null;
                    
                    const escenasCompletasEnCategoria = escenasEnCategoriaPorId
                      .map(idEscena => items.find(item => item.id === idEscena))
                      .filter(Boolean); 

                    if (!escenasCompletasEnCategoria.length) return null;

                    const nivelCategoriaKey = `${nivelObj.nivel}-${catKey}`;
                    const isCategoriaOpen = openCategorias[nivelCategoriaKey] === undefined ? true : openCategorias[nivelCategoriaKey]; // Abierto por defecto

                    return (
                      <React.Fragment key={nivelCategoriaKey}>
                        <ListItemButton onClick={() => toggleCategoria(nivelCategoriaKey)} sx={{ pl: isGlobalMenu ? 3 : 4 }}>
                          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                            {isCategoriaOpen ? <FolderOpenIcon fontSize="small" sx={{opacity: 0.7}} /> : <FolderIcon fontSize="small" sx={{opacity: 0.7}}/>}
                          </ListItemIcon>
                          <ListItemText 
                            primary={categories[catKey] || catKey} 
                            primaryTypographyProps={{ fontSize: '0.9rem', fontStyle: 'italic' }}
                          />
                          {isCategoriaOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={isCategoriaOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {escenasCompletasEnCategoria.map(({ id, titulo }) => (
                              <ListItemButton
                                key={id}
                                onClick={() => handleSelect(id)}
                                sx={{ pl: isGlobalMenu ? 5 : 6 }} // Mayor indentación para escenas
                              >
                                <ListItemText
                                  primary={titulo}
                                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 'normal' }} // Ajustado
                                />
                                {completed[id] && (
                                  <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                                    <CheckIcon fontSize="small" color="primary" />
                                  </ListItemIcon>
                                )}
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    )
                  })}
                </List>
              </Collapse>
              {isGlobalMenu && ordenEscenas.indexOf(nivelObj) < ordenEscenas.length - 1 && <Divider />}
            </React.Fragment>
          )
        })}
      </List>
    </Box>
  )
}

export default DrawerMenu;