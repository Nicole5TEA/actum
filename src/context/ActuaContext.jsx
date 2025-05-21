// src/context/ActuaContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import useIdioma from '../hooks/useIdioma'
import ordenEscenas, { obtenerSecuenciaEscenas } from '../ordenEscenas'; 
import textosGlobal from '../textos'; 

const ActuaContext = createContext()

export function ActuaProvider({ children }) {
  const [stage, setStage]       = useState('portada')  
  const [user, setUser]         = useState(null)       
  const [perfiles, setPerfiles] = useState({})         
  const [elecciones, setElecciones] = useState({})     
  const [indiceEscena, setIndiceEscena] = useState(0) 
  const [paso, setPaso] = useState(0)
  const reiniciarPaso = () => setPaso(0)

  const [isDocente, setDocente] = useState(() => {
    try {
      return !!localStorage.getItem('docente_token')
    } catch {
      return false
    }
  })

  const [idioma, cambiarIdioma] = useIdioma()

  useEffect(() => {
    const stored = localStorage.getItem('perfiles')
    if (stored) setPerfiles(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('perfiles', JSON.stringify(perfiles))
  }, [perfiles])

  useEffect(() => {
    if (user) {
      setPerfiles(prev => ({
        ...prev,
        [user.name]: { date: user.date, elecciones }
      }))
    }
  }, [elecciones, user])

  function login(name) {
    const now = new Date().toISOString() 
    const existing = perfiles[name]
    if (existing) {
      setElecciones(existing.elecciones || {}) // Asegurar que elecciones sea un objeto
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

  function logout() {
    setUser(null)
    setElecciones({})
    setIndiceEscena(0)
    setPaso(0)
    setDocente(false) // También cerrar sesión de docente
    // localStorage.removeItem('docente_token'); // Opcional: quitar token de docente
    // localStorage.removeItem('access_token'); // Opcional: quitar token de acceso general
    setStage('ingreso'); // Cambiado de 'portada' a 'ingreso'
  }

  const getIdEscenaActual = () => {
    const secuencia = obtenerSecuenciaEscenas();
    return secuencia[indiceEscena];
  }

  const getEscenaActual = () => {
    const idEscena = getIdEscenaActual();
    if (!idEscena) return null;
    const escenasDisponibles = textosGlobal[idioma]?.escenas || [];
    return escenasDisponibles.find(e => e.id === idEscena);
  }

  return (
    <ActuaContext.Provider
      value={{
        stage, setStage,
        user, perfiles,
        login, logout,
        idioma, cambiarIdioma,
        elecciones, setElecciones, 
        indiceEscena, setIndiceEscena, 
        getIdEscenaActual,
        getEscenaActual,
        paso, setPaso, reiniciarPaso,
        isDocente, setDocente
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