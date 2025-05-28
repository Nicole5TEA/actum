// src/context/ActuaContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import useIdioma from '../hooks/useIdioma';
import ordenEscenasEstructura, { obtenerSecuenciaEscenas } from '../ordenEscenas';
import textosGlobal from '../textos';

const ActuaContext = createContext();

// Helper function to safely parse JSON
const safeJsonParse = (item) => {
  if (typeof item !== 'string') return null;
  try {
    return JSON.parse(item);
  } catch (e) {
    return null;
  }
};

const toArray = (x) => Array.isArray(x) ? x : (x && typeof x === 'object' ? Object.values(x) : []);


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

  const getIdEscenaActual = () => {
    const secuencia = obtenerSecuenciaEscenas();
    return secuencia[indiceEscena];
  };

  const getEscenaActual = () => {
    const idEscena = getIdEscenaActual();
    if (!idEscena) return null;
    const escenasDisponibles = textosGlobal[idioma]?.escenas || [];
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
    const storedPerfilesRaw = localStorage.getItem('perfiles');
    const parsedPerfiles = safeJsonParse(storedPerfilesRaw) || {};
    setPerfiles(parsedPerfiles);

    const storedUserRaw = localStorage.getItem('actua_currentUser');
    const parsedUser = safeJsonParse(storedUserRaw);

    if (parsedUser && parsedUser.name) {
      setUser(parsedUser);
      const userProfile = parsedPerfiles[parsedUser.name];
      if (userProfile) {
        const respuestasDelStorage = toArray(userProfile.respuestas);
        const eleccionesProcesadas = procesarRespuestasParaEleccionesContext(respuestasDelStorage);
        setElecciones(eleccionesProcesadas || userProfile.elecciones || {});
      } else {
        setElecciones({});
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(perfiles).length > 0) {
        localStorage.setItem('perfiles', JSON.stringify(perfiles));
    } else {
        localStorage.removeItem('perfiles');
    }
  }, [perfiles]);

  useEffect(() => {
    if (user && user.name) {
      setPerfiles(prev => {
        const userProfileFromStorage = prev[user.name] || { date: user.date, respuestas: [], elecciones: {} };
        return {
          ...prev,
          [user.name]: {
            ...userProfileFromStorage,
            elecciones: elecciones, // Persist current derived elecciones
            // Ensure 'respuestas' are also updated when new detailed responses come in.
            // This happens via guardarRespuestas -> AdminPanel updates localStorage -> next login reads.
          }
        };
      });
      localStorage.setItem('actua_currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('actua_currentUser');
    }
  }, [elecciones, user]);


  async function login(name) {
    const now = new Date().toISOString();
    setUser({ name, date: now }); // Optimistic UI update for user

    const accToken = localStorage.getItem('access_token');
    let eleccionesParaUsuario = {};
    let userDate = now;

    // Attempt to fetch fresh data from server if access_token is available
    if (accToken) {
      try {
        console.log("Attempting to fetch alumnos with access_token for user:", name);
        const res = await fetch('/api/getAlumnos', {
          headers: { 'X-Acceso-Token': `Bearer ${accToken}` }
        });

        if (res.ok) {
          const todosLosAlumnos = await res.json();
          const perfilDelServidor = todosLosAlumnos.find(a => (a.id || a.nombre) === name);

          if (perfilDelServidor) {
            console.log("Found user profile on server:", perfilDelServidor);
            const respuestasDelServidor = toArray(perfilDelServidor.respuestas || perfilDelServidor.elecciones || []);
            eleccionesParaUsuario = procesarRespuestasParaEleccionesContext(respuestasDelServidor);
            userDate = perfilDelServidor.date || perfilDelServidor.fechaRegistro || now;
            
            setPerfiles(prev => ({
              ...prev,
              [name]: {
                date: userDate,
                elecciones: eleccionesParaUsuario,
                respuestas: respuestasDelServidor
              }
            }));
            setUser({ name, date: userDate }); // Update user with potentially server-synced date
          } else {
            console.log("User not found on server, creating new local profile for:", name);
            // User not on server, ensure a clean local profile is set up
            setPerfiles(prev => ({ ...prev, [name]: { date: now, elecciones: {}, respuestas: [] }}));
          }
        } else {
          console.warn(`Failed to fetch alumnos (status: ${res.status}), falling back to localStorage for:`, name);
          // If API call fails (e.g. token invalid, network error), fall back to localStorage
          const perfilLocal = perfiles[name]; // 'perfiles' state should be from localStorage by now
          if (perfilLocal) {
              const respuestasLocal = toArray(perfilLocal.respuestas);
              eleccionesParaUsuario = procesarRespuestasParaEleccionesContext(respuestasLocal) || perfilLocal.elecciones || {};
              userDate = perfilLocal.date || now;
              setUser({ name, date: userDate });
          } else {
             setPerfiles(prev => ({ ...prev, [name]: { date: now, elecciones: {}, respuestas: [] }}));
          }
        }
      } catch (error) {
        console.error("Error fetching or processing alumno data in login, using localStorage fallback:", error);
        const perfilLocal = perfiles[name];
        if (perfilLocal) {
            const respuestasLocal = toArray(perfilLocal.respuestas);
            eleccionesParaUsuario = procesarRespuestasParaEleccionesContext(respuestasLocal) || perfilLocal.elecciones || {};
            userDate = perfilLocal.date || now;
            setUser({ name, date: userDate });
        } else {
           setPerfiles(prev => ({ ...prev, [name]: { date: now, elecciones: {}, respuestas: [] }}));
        }
      }
    } else {
      // No access_token, rely purely on existing perfiles state (already loaded from localStorage)
      console.log("No access_token, using localStorage perfiles for user:", name);
      const perfilLocal = perfiles[name];
      if (perfilLocal) {
        const respuestasLocal = toArray(perfilLocal.respuestas);
        eleccionesParaUsuario = procesarRespuestasParaEleccionesContext(respuestasLocal) || perfilLocal.elecciones || {};
        userDate = perfilLocal.date || now;
        setUser({ name, date: userDate });
      } else {
         setPerfiles(prev => ({ ...prev, [name]: { date: now, elecciones: {}, respuestas: [] }}));
      }
    }
    
    setElecciones(eleccionesParaUsuario);
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
    localStorage.removeItem('actua_currentUser');
    // Optionally clear all perfiles: localStorage.removeItem('perfiles');
    // setPerfiles({}); // If you clear from localStorage, also clear state
    setStage('portada');
  }

  function exitStudentSession() {
    setUser(null);
    // setElecciones({}); // Keep global elecciones if multiple student profiles are managed locally without full logout
    setIndiceEscena(0);
    setPaso(0);
    setStage('ingreso');
  }

  return (
    <ActuaContext.Provider
      value={{
        stage, setStage,
        user, perfiles, setPerfiles, // Expose setPerfiles if AdminPanel needs to update context directly
        login,
        logout: fullLogoutAndGoToPortada,
        exitStudentSession,
        idioma, cambiarIdioma,
        elecciones, setElecciones,
        indiceEscena, setIndiceEscena,
        getIdEscenaActual,
        getEscenaActual,
        paso, setPaso, reiniciarPaso,
        isDocente, setDocente,
        procesarRespuestasParaEleccionesContext // Expose helper if needed elsewhere
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