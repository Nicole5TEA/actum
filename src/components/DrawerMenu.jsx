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

/**
 * @param {Object[]} items
 * @param {number}   currentIndex
 * @param {Object}   completed
 * @param {Object}   categories
 * @param {Object}   nivelesLabels
 * @param {fn}       onSelect
 */
const DrawerMenu = ({
  items = [],
  currentIndex = 0,
  completed = {},
  categories = {},
  nivelesLabels = {},      // ← ¡no olvides pasarlo desde el padre!
  onSelect = () => {}
}) => {
  // 1️⃣  --- lógica fuera del JSX ---
  const niveles = [...new Set(items.map(e => e.nivel))].sort((a, b) => a - b)

  // 2️⃣  --- JSX ---
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
        {niveles.map(nivel => (
          <React.Fragment key={`nivel-${nivel}`}>
            <ListSubheader disableSticky>
              {nivelesLabels[nivel] || `Nivel ${nivel}`}
            </ListSubheader>

            {Object.entries(categories).map(([catKey, catLabel]) => {
              const escenasCat = items
                .map((item, idx) => ({ ...item, idx }))
                .filter(
                  item => item.nivel === nivel && item.categoria === catKey
                )

              if (!escenasCat.length) return null

              return (
                <React.Fragment key={`${nivel}-${catKey}`}>
                  <ListSubheader sx={{ pl: 4 }} disableSticky>
                    {catLabel}
                  </ListSubheader>

                  {escenasCat.map(({ idx, titulo, id }) => (
                    <ListItemButton
                      key={id}
                      selected={idx === currentIndex}
                      onClick={() => onSelect(idx)}
                    >
                      <ListItemText
                        primary={titulo}
                        primaryTypographyProps={{ fontSize: '0.875rem' }}
                      />
                      {completed[id] && (
                        <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                          <CheckIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                      )}
                    </ListItemButton>
                  ))}
                </React.Fragment>
              )
            })}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default DrawerMenu
