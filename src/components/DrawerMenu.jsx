// src/components/DrawerMenu.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, List, ListSubheader, ListItemButton, ListItemIcon,
  ListItemText, Collapse, Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ordenEscenasEstructura, { obtenerSecuenciaEscenas } from '../ordenEscenas';

const DrawerMenu = ({
  items = [], 
  completed = {},
  categories = {},
  nivelesLabels = {},
  onSelect = () => {},
  currentEscenaId = null,
  isGlobalMenu = true,
}) => {
  const secuenciaGlobal = obtenerSecuenciaEscenas();

  const currentNivelFilter = (() => {
    if (isGlobalMenu || !currentEscenaId) return null;
    const escenaActualObj = items.find(e => e.id === currentEscenaId);
    return escenaActualObj ? escenaActualObj.nivel : null;
  })();
  
  const escenasAMostrarConfig = isGlobalMenu 
    ? ordenEscenasEstructura
    : currentNivelFilter !== null
      ? ordenEscenasEstructura.filter(n => n.nivel === currentNivelFilter)
      : [];

  const [openNiveles, setOpenNiveles] = useState(() => {
    const initialState = {};
    escenasAMostrarConfig.forEach(nivelObj => {
      initialState[nivelObj.nivel] = true; // Abierto por defecto
    });
    return initialState;
  });

  const [openCategorias, setOpenCategorias] = useState(() => {
    const initialState = {};
    escenasAMostrarConfig.forEach(nivelObj => {
      Object.keys(nivelObj.categorias).forEach(catKey => {
        initialState[`${nivelObj.nivel}-${catKey}`] = true; // Abierto por defecto
      });
    });
    return initialState;
  });
  
  useEffect(() => {
    const newOpenNiveles = {};
    escenasAMostrarConfig.forEach(nivelObj => {
      // Mantiene el estado actual si existe, sino default a true
      newOpenNiveles[nivelObj.nivel] = openNiveles[nivelObj.nivel] === undefined ? true : openNiveles[nivelObj.nivel];
    });
    // Solo actualiza si hay cambios para evitar bucles
    if (JSON.stringify(newOpenNiveles) !== JSON.stringify(openNiveles)) {
        setOpenNiveles(newOpenNiveles);
    }

    const newOpenCategorias = {};
    escenasAMostrarConfig.forEach(nivelObj => {
      Object.keys(nivelObj.categorias).forEach(catKey => {
         const key = `${nivelObj.nivel}-${catKey}`;
         newOpenCategorias[key] = openCategorias[key] === undefined ? true : openCategorias[key];
      });
    });
    if (JSON.stringify(newOpenCategorias) !== JSON.stringify(openCategorias)) {
        setOpenCategorias(newOpenCategorias);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGlobalMenu, currentEscenaId, escenasAMostrarConfig]); // No añadir openNiveles/openCategorias aquí


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

  return (
    <Box
      sx={{ width: '100%', height: '100%', overflowY: 'auto', bgcolor: 'background.paper' }} // width 100% para móvil
      role="presentation"
    >
      <List disablePadding>
        {escenasAMostrarConfig.map(nivelObj => {
          // Asegurarse de que el estado siempre tenga una entrada para este nivel
          const isNivelOpen = openNiveles[nivelObj.nivel] === undefined ? true : openNiveles[nivelObj.nivel];
          
          const tieneEscenasVisiblesEnNivel = Object.values(nivelObj.categorias).some(
            (escenasEnCategoriaPorId) =>
              escenasEnCategoriaPorId && escenasEnCategoriaPorId.length > 0 &&
              escenasEnCategoriaPorId.some(idEscena => items.find(item => item.id === idEscena))
          );

          if (!isGlobalMenu && !tieneEscenasVisiblesEnNivel && currentNivelFilter !== null) {
            return null;
          }

          return (
            <React.Fragment key={`nivel-${nivelObj.nivel}`}>
              <ListItemButton onClick={() => toggleNivel(nivelObj.nivel)} sx={{ pl: isGlobalMenu ? 1 : 2, bgcolor: 'grey.100' }}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                  {isNivelOpen ? <FolderOpenIcon fontSize="small" /> : <FolderIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText 
                  primary={nivelesLabels[nivelObj.nivel] || `Nivel ${nivelObj.nivel}`} 
                  primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.95rem' }}
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
                    const isCategoriaOpen = openCategorias[nivelCategoriaKey] === undefined ? true : openCategorias[nivelCategoriaKey];

                    return (
                      <React.Fragment key={nivelCategoriaKey}>
                        <ListItemButton onClick={() => toggleCategoria(nivelCategoriaKey)} sx={{ pl: isGlobalMenu ? 3 : 4, bgcolor: 'grey.50' }}>
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
                                sx={{ pl: isGlobalMenu ? 5 : 6 }}
                              >
                                <ListItemText
                                  primary={titulo}
                                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 'normal' }}
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
                    );
                  })}
                </List>
              </Collapse>
              {isGlobalMenu && ordenEscenasEstructura.indexOf(nivelObj) < ordenEscenasEstructura.length - 1 && <Divider sx={{my:1}} />}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default DrawerMenu;