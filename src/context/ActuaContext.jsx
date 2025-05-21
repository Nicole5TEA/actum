// src/context/ActuaContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import useIdioma from '../hooks/useIdioma';
import ordenEscenasEstructura, { obtenerSecuenciaEscenas } from '../ordenEscenas'; // Renombrado ordenEscenas a ordenEscenasEstructura si es el array de config
import textosGlobal from '../textos'; 

const ActuaContext = createContext();

export function ActuaProvider({ children }) {
  const [stage, setStage] = useState('portada');  
  const [user, setUser] = useState(null);       
  const [perfiles, setPerfiles] = useState({});         
  const [elecciones, setElecciones] = useState({});     
  const [indiceEscena, setIndiceEscena] = useState(0); 
  const [paso, setPaso] = useState(0);
  const reiniciarPaso = () => setPaso(0);

  const [isDocente, setDocente] = useState(() => {
    try {
      return !!localStorage.getItem('docente_token');
    } catch {
      return false;
    }
  });

  const [idioma, cambiarIdioma] = useIdioma();

  // Declaraciones originales y correctas de las funciones
  const getIdEscenaActual = () => {
    const secuencia = obtenerSecuenciaEscenas();
    return secuencia[indiceEscena];
  };

  const getEscenaActual = () => {
    const idEscena = getIdEscenaActual();
    if (!idEscena) return null;
    // Asegurarse que textosGlobal[idioma] existe antes de acceder a escenas
    const escenasDisponibles = textosGlobal[idioma]?.escenas || [];
    return escenasDisponibles.find(e => e.id === idEscena);
  };

  useEffect(() => {
    const stored = localStorage.getItem('perfiles');
    if (stored) {
        try {
            const parsedPerfiles = JSON.parse(stored);
            setPerfiles(parsedPerfiles || {}); // Asegurar que perfiles sea un objeto
        } catch (error) {
            console.error("Error parsing perfiles from localStorage", error);
            localStorage.removeItem('perfiles'); 
            setPerfiles({}); // Resetear a objeto vacío en caso de error
        }
    } else {
        setPerfiles({}); // Si no hay nada en localStorage, inicializar como objeto vacío
    }
  }, []);

  useEffect(() => {
    // Solo guardar si perfiles no está vacío para evitar guardar "{}" innecesariamente
    if (Object.keys(perfiles).length > 0) {
        localStorage.setItem('perfiles', JSON.stringify(perfiles));
    } else {
        // Opcional: si quieres limpiar localStorage cuando perfiles esté vacío
        // localStorage.removeItem('perfiles');
    }
  }, [perfiles]);

  useEffect(() => {
    if (user && user.name) {
      setPerfiles(prev => {
        const userProfile = prev[user.name] || { date: user.date }; // Mantener la fecha si ya existe
        return {
          ...prev,
          [user.name]: { ...userProfile, elecciones: elecciones || {} }
        };
      });
    }
  }, [elecciones, user]);

  function login(name) {
    const now = new Date().toISOString(); 
    const existing = perfiles[name];
    if (existing) {
      setElecciones(existing.elecciones || {});
      setUser({ name, date: existing.date });
    } else {
      const newUserProfile = { date: now, elecciones: {} };
      setElecciones({}); // Para el nuevo usuario, las elecciones empiezan vacías
      setUser({ name, date: now });
      setPerfiles(prev => ({
        ...prev,
        [name]: newUserProfile
      }));
    }
    setStage('menu');
  }

  function fullLogoutAndGoToPortada() {
    setUser(null);
    setElecciones({});
    setIndiceEscena(0);
    setPaso(0);
    setDocente(false);
    localStorage.removeItem('docente_token');
    localStorage.removeItem('access_token'); 
    // localStorage.removeItem('perfiles'); // Opcional: si quieres borrar todos los perfiles al hacer logout completo
    setStage('portada'); 
  }

  function exitStudentSession() {
    setUser(null);
    // setElecciones({}); // No resetear elecciones globales si se quiere que se guarden en perfiles
    setIndiceEscena(0);
    setPaso(0);
    setStage('ingreso');
  }

  // Las líneas que causaban el error (reasignaciones de getIdEscenaActual y getEscenaActual)
  // que estaban aquí abajo han sido eliminadas. Las declaraciones `const` de arriba son suficientes.

  return (
    <ActuaContext.Provider
      value={{
        stage, setStage,
        user, perfiles,
        login, 
        logout: fullLogoutAndGoToPortada,
        exitStudentSession,
        idioma, cambiarIdioma,
        elecciones, setElecciones, 
        indiceEscena, setIndiceEscena, 
        getIdEscenaActual, // <- Se usa la función declarada arriba
        getEscenaActual,   // <- Se usa la función declarada arriba
        paso, setPaso, reiniciarPaso,
        isDocente, setDocente
      }}
    >
      {children}
    </ActuaContext.Provider>
  );
}

export function useActua() {
  const ctx = useContext(ActuaContext);
  if (!ctx) throw new Error('useActua debe usarse dentro de ActuaProvider');
  return ctx;
}