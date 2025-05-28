// src/context/ActuaContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import useIdioma from '../hooks/useIdioma';
import ordenEscenasEstructura, { obtenerSecuenciaEscenas } from '../ordenEscenas';
import textosGlobal from '../textos';

const ActuaContext = createContext(); // [cite: 767]

export function ActuaProvider({ children }) {
  const [stage, setStage] = useState('portada');
  const [user, setUser] = useState(null);
  const [perfiles, setPerfiles] = useState({});
  const [elecciones, setElecciones] = useState({});
  const [indiceEscena, setIndiceEscena] = useState(0);
  const [paso, setPaso] = useState(0); // [cite: 768]
  const reiniciarPaso = () => setPaso(0);

  const [isDocente, setDocente] = useState(() => {
    try {
      return !!localStorage.getItem('docente_token');
    } catch {
      return false; // [cite: 769]
    }
  });

  const [idioma, cambiarIdioma] = useIdioma();

  const getIdEscenaActual = () => {
    const secuencia = obtenerSecuenciaEscenas();
    return secuencia[indiceEscena]; // [cite: 770]
  };

  const getEscenaActual = () => {
    const idEscena = getIdEscenaActual();
    if (!idEscena) return null;
    const escenasDisponibles = textosGlobal[idioma]?.escenas || []; // [cite: 771]
    return escenasDisponibles.find(e => e.id === idEscena);
  };

  const procesarRespuestasParaEleccionesContext = (respuestasAlumno) => {
    if (!respuestasAlumno || !Array.isArray(respuestasAlumno)) {
      return {};
    }
    const eleccionesExtraidas = {};
    const sortedRespuestas = [...respuestasAlumno].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    sortedRespuestas.forEach(reg => {
      if (reg.tipoPaso === 'eleccion' && reg.situacionId && reg.respuesta) {
        if (!eleccionesExtraidas[reg.situacionId]) { 
          eleccionesExtraidas[reg.situacionId] = reg.respuesta;
        }
      }
    });
    return eleccionesExtraidas;
  };

  useEffect(() => {
    const storedPerfiles = localStorage.getItem('perfiles');
    let parsedPerfiles = {};
    if (storedPerfiles) {
        try {
            parsedPerfiles = JSON.parse(storedPerfiles) || {}; // [cite: 772]
            setPerfiles(parsedPerfiles);
        } catch (error) {
            console.error("Error parsing perfiles from localStorage", error);
            localStorage.removeItem('perfiles'); // [cite: 774]
            setPerfiles({});
        }
    } else {
        setPerfiles({}); // [cite: 775]
    }

    const storedUser = localStorage.getItem('actua_currentUser');
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.name) {
                setUser(parsedUser);
                const userProfile = parsedPerfiles[parsedUser.name];
                if (userProfile) {
                    const respuestasDelStorage = userProfile.respuestas || [];
                    const eleccionesProcesadas = procesarRespuestasParaEleccionesContext(respuestasDelStorage);
                    setElecciones(eleccionesProcesadas || userProfile.elecciones || {});
                } else {
                    setElecciones({});
                }
            }
        } catch (error) {
            console.error("Error parsing stored user", error);
            localStorage.removeItem('actua_currentUser');
        }
    }
  }, []);


  useEffect(() => {
    if (Object.keys(perfiles).length > 0) { // [cite: 776]
        localStorage.setItem('perfiles', JSON.stringify(perfiles));
    } else {
        localStorage.removeItem('perfiles'); // [cite: 777]
    }
  }, [perfiles]);

  useEffect(() => {
    if (user && user.name) {
      setPerfiles(prev => {
        const userProfileFromStorage = prev[user.name] || { date: user.date, respuestas: [], elecciones: {} }; // [cite: 778]
        return {
          ...prev,
          [user.name]: { 
            ...userProfileFromStorage, 
            elecciones: elecciones, // Persist current derived elecciones for quick load
            // 'respuestas' should be the source of truth, updated by API calls.
            // This effect ensures the 'elecciones' key in 'perfiles' reflects the current state.
          }
        }; // [cite: 779, 780]
      });
      localStorage.setItem('actua_currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('actua_currentUser');
    }
  }, [elecciones, user]);


  function login(name) {
    const now = new Date().toISOString();
    const perfilExistente = perfiles[name]; 
    let eleccionesParaUsuario = {};

    if (perfilExistente) {
        const respuestasDelStorage = perfilExistente.respuestas || [];
        const eleccionesPreProcesadasDelStorage = perfilExistente.elecciones || {}; // Fallback
        
        eleccionesParaUsuario = respuestasDelStorage.length > 0 
            ? procesarRespuestasParaEleccionesContext(respuestasDelStorage) 
            : eleccionesPreProcesadasDelStorage;
        setUser({ name, date: perfilExistente.date });
    } else {
        eleccionesParaUsuario = {};
        setUser({ name, date: now });
        setPerfiles(prev => ({
            ...prev,
            [name]: { date: now, elecciones: {}, respuestas: [] } // Initialize with empty respuestas
        }));
    }
    setElecciones(eleccionesParaUsuario); // [cite: 781]
    setStage('menu'); // [cite: 783]
  }

  function fullLogoutAndGoToPortada() {
    setUser(null);
    setElecciones({});
    setIndiceEscena(0);
    setPaso(0);
    setDocente(false);
    localStorage.removeItem('docente_token');
    localStorage.removeItem('access_token');
    // Consider if 'perfiles' or 'actua_currentUser' should be cleared too.
    // localStorage.removeItem('perfiles'); // Potentially clears all student data from local
    localStorage.removeItem('actua_currentUser');
    setStage('portada');
  }

  function exitStudentSession() { // [cite: 784]
    setUser(null);
    setIndiceEscena(0);
    setPaso(0);
    setStage('ingreso');
  }

  return (
    <ActuaContext.Provider
      value={{
        stage, setStage, // [cite: 786]
        user, perfiles,
        login,
        logout: fullLogoutAndGoToPortada,
        exitStudentSession, // [cite: 787]
        idioma, cambiarIdioma,
        elecciones, setElecciones,
        indiceEscena, setIndiceEscena,
        getIdEscenaActual, // [cite: 788]
        getEscenaActual,
        paso, setPaso, reiniciarPaso, // [cite: 789]
        isDocente, setDocente
      }}
    >
      {children}
    </ActuaContext.Provider>
  );
}

export function useActua() {
  const ctx = useContext(ActuaContext); // [cite: 790]
  if (!ctx) throw new Error('useActua debe usarse dentro de ActuaProvider');
  return ctx;
}