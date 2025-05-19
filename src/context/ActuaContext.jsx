// src/context/ActuaContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import useIdioma from '../hooks/useIdioma'

const ActuaContext = createContext()

export function ActuaProvider({ children }) {
  // flujo de pantallas: portada → ingreso → menu → escenario → admin
  const [stage, setStage]       = useState('portada')
  // usuario actual (nombre + fecha)
  const [user, setUser]         = useState(null)
  // perfiles guardados ({ nombre: { date, elecciones } })
  const [perfiles, setPerfiles] = useState({})
  // elecciones en curso
  const [elecciones, setElecciones] = useState({})
  // índice de escena y paso actual
  const [indiceEscena, setIndiceEscena] = useState(0)
  const [paso, setPaso] = useState(0)
  const reiniciarPaso = () => setPaso(0)

  // 1) Control de login “docente”
  const [isDocente, setDocente] = useState(() => {
    try {
      return !!localStorage.getItem('docente_token')
    } catch {
      return false
    }
  })

  // 2) Control de login “front” (página de ingreso)
  const [isFront, setFront] = useState(() => {
    try {
      return !!localStorage.getItem('front_token')
    } catch {
      return false
    }
  })

  // idioma
  const [idioma, cambiarIdioma] = useIdioma()

  // persistencia de perfiles en localStorage
  useEffect(() => {
    const stored = localStorage.getItem('perfiles')
    if (stored) setPerfiles(JSON.parse(stored))
  }, [])
  useEffect(() => {
    localStorage.setItem('perfiles', JSON.stringify(perfiles))
  }, [perfiles])

  // actualizar perfil cuando cambian elecciones
  useEffect(() => {
    if (user) {
      setPerfiles(prev => ({
        ...prev,
        [user.name]: { date: user.date, elecciones }
      }))
    }
  }, [elecciones])

  // login de alumno / usuario
  function login(name) {
    const now = new Date().toISOString()
    const existing = perfiles[name]
    if (existing) {
      setElecciones(existing.elecciones)
      setUser({ name, date: existing.date })
    } else {
      setElecciones({})
      setUser({ name, date: now })
      setPerfiles(prev => ({
        ...prev,
        [name]: { date: now, elecciones: {} }
      }))
    }
    setStage('menu')
  }

  // logout de alumno (vuelve a portada, conserva token docente si quieres)
  function logout() {
    setUser(null)
    setElecciones({})
    setIndiceEscena(0)
    setPaso(0)
    setStage('portada')
    // revocamos permiso docente en estado, pero no tocamos localStorage
    setDocente(false)
  }

  // --- NUEVOS MÉTODOS PARA LOGIN DE FRONT Y DOCENTE ---

  // login “front” (página de ingreso)
  async function loginFront(password) {
    const res = await fetch('/api/loginFront', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    
    // primero leemos lo que haya en body (o nada)
    let payload = null
    try {
      payload = await res.json()
    } catch {
      // no era JSON o no había body
      payload = null
    }
    
    if (!res.ok || !payload?.token) {
      // si payload.error existe, lo usamos; sino un texto por defecto
      const msg = payload?.error || 'Contraseña incorrecta'
      throw new Error(msg)
    }
    
    // OK: guardamos el token
    localStorage.setItem('front_token', payload.token)
    setFront(true)
  }

  // logout “front” (vuelve a portada y borra token front)
  function logoutFront() {
    localStorage.removeItem('front_token')
    setFront(false)
    setStage('portada')
  }

  // login docente (panel del docente)
  async function loginDocente(password) {
    const res = await fetch('/api/loginDocente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Error login docente')
    }
    const { token } = await res.json()
    localStorage.setItem('docente_token', token)
    setDocente(true)
  }

  return (
    <ActuaContext.Provider
      value={{
        // flujo y navegación
        stage, setStage,
        // usuario y perfiles
        user, perfiles,
        // login/logout de alumno
        login, logout,
        // login/logout de front
        isFront, loginFront, logoutFront,
        // login docente
        isDocente, loginDocente,
        // idioma
        idioma, cambiarIdioma,
        // elecciones y control de escenas
        elecciones, setElecciones,
        indiceEscena, setIndiceEscena,
        paso, setPaso, reiniciarPaso
      }}
    >
      {children}
    </ActuaContext.Provider>
  )
}

export function useActua() {
  const ctx = useContext(ActuaContext)
  if (!ctx) throw new Error('useActua debe usarse dentro de ActuaProvider')
  return ctx
}
