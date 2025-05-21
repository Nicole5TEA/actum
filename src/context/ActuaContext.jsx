import React, { createContext, useContext, useState, useEffect } from 'react'
import useIdioma from '../hooks/useIdioma'
import ordenEscenas, { obtenerSecuenciaEscenas } from '../ordenEscenas'; // Importar la nueva estructura
import textosGlobal from '../textos'; // Para acceder a las escenas y determinar el índice

const ActuaContext = createContext()

export function ActuaProvider({ children }) {
  const [stage, setStage]       = useState('portada')   // portada → ingreso → menu → escenario → admin
  const [user, setUser]         = useState(null)        // { name, date }
  const [perfiles, setPerfiles] = useState({})          // { [name]: { date, elecciones } }
  const [elecciones, setElecciones] = useState({})      // estado de elecciones [cite: 402]
  const [indiceEscena, setIndiceEscena] = useState(0) // Este será el índice GLOBAL en la secuencia plana
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
  }, [elecciones, user]) // Agregado user a las dependencias

  function login(name) {
    const now = new Date().toISOString() // [cite: 404]
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

  function logout() {
    setUser(null)
    setElecciones({})
    setIndiceEscena(0)
    setPaso(0)
    setStage('portada')
    setDocente(false)
  }

  // Devuelve el ID de la escena actual basado en el índice global
  const getIdEscenaActual = () => {
    const secuencia = obtenerSecuenciaEscenas();
    return secuencia[indiceEscena];
  }

  // Devuelve el objeto de la escena actual
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
        elecciones, setElecciones, // [cite: 406]
        indiceEscena, setIndiceEscena, // índice global
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