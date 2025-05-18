import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

export default function AdminPanel() {
  const { setStage, logout, perfiles, idioma, isDocente } = useActua()
  const ui = textos[idioma].ui

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // Entra directamente si ya estás marcado como docente
  useEffect(() => {
    if (isDocente) {
      const token = localStorage.getItem('docente_token')
      loadData(token)
    } else {
      // Si no, vuelve a Ingreso
      setStage('ingreso')
    }
  }, [isDocente])

  const loadData = async token => {
    setLoading(true)
    try {
      const res = await fetch('/api/getAlumnos', {
        headers: { Authorization: 'Bearer ' + token }
      })
      if (!res.ok) throw new Error('No autorizado')
      const json = await res.json()
      setData(json)
    } catch {
      // Fallback local
      const arr = Object.entries(perfiles || {}).map(([nombre, p]) => ({
        nombre,
        fechaRegistro: p.date,
        respuestas: p.elecciones
      }))
      setData(arr)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('docente_token')
    logout()
    setStage('ingreso')
  }

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Button onClick={handleLogout} sx={{ mr: 1 }}>
        {ui.volverPortada}
      </Button>
      <Button onClick={() => setStage('ingreso')}>
        {ui.cambiarUsuario}
      </Button>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {ui.adminPanelTitle}
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Alumno</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Respuestas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(alum => (
              <TableRow key={alum.nombre}>
                <TableCell>{alum.nombre}</TableCell>
                <TableCell>{alum.fechaRegistro}</TableCell>
                <TableCell>
                  {Object.entries(alum.respuestas || {}).map(([sit, resp]) => (
                    <Box key={sit} component="div">
                      {sit}: {resp}
                    </Box>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  )
}
