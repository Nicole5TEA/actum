// src/ordenEscenas.js
const ordenEscenas = [
  {
    nivel: 1,
    categorias: {
      social: [],
      emocionajena: [],
      emocionpropia: ['perroSentarse','apagarLuz','psicomotricidad','pegatina','chocarCinco','globoExplota','busTarde','canastaAplaudir','chupachup','relojCaer','oler','pluja','llamarProfe','estoig'],
      teoriamente: [],
      coherencia: ['excursion','naturaleza','piscina','cumpleaños','estacionAño','dondeVan','bancAliments','cocinar','cine']
    }
  },
  {
    nivel: 2,
    categorias: {
      social: [],
      emocionajena: [],
      emocionpropia: ['pelotaRota','seOlvidaDeTi','cremalleraRota','responderMal','hacerFoto','mancharse', 'mochilaRota','ventanaAvion','profeAmor','botonPlay'],
      teoriamente: [],
      coherencia: ['cumpleaños2','estacionAño2','aeropuerto','queHacen','estacionAño3']
    }
  },
  {
    nivel: 3,
    categorias: {
      social: [],
      emocionajena: [],
      emocionpropia: ['vacaciones','elegirFruta'],
      teoriamente: [],
      coherencia: ['museo','comedor']
    }
  }
];

export const obtenerSecuenciaEscenas = () => {
  const secuencia = [];
  ordenEscenas.forEach(nivelObj => {
    Object.values(nivelObj.categorias).forEach(categoriaEscenas => {
      secuencia.push(...categoriaEscenas);
    });
  });
  return secuencia;
};

export const esUltimaEscenaDelNivel = (escenaIdActual, escenasDelNivel) => {
    if (!escenasDelNivel || escenasDelNivel.length === 0) return false;
    return escenasDelNivel[escenasDelNivel.length - 1] === escenaIdActual;
};

export const obtenerEscenasDelNivelActual = (escenaIdActual, todasLasEscenas) => {
    const escenaActualObj = todasLasEscenas.find(e => e.id === escenaIdActual);
    if (!escenaActualObj) return [];

    const nivelActualConfig = ordenEscenas.find(n => n.nivel === escenaActualObj.nivel);
    if (!nivelActualConfig) return [];

    let escenasEnNivel = [];
    Object.values(nivelActualConfig.categorias).forEach(catEscenas => {
        escenasEnNivel.push(...catEscenas);
    });
    return escenasEnNivel;
};

export const esPrimeraEscenaDelNivel = (escenaIdActual, ordenEscenasConfig, todasLasEscenas) => {
    const escenaActualObj = todasLasEscenas.find(e => e.id === escenaIdActual);
    if (!escenaActualObj) return false;

    const nivelActualConfig = ordenEscenasConfig.find(n => n.nivel === escenaActualObj.nivel);
    if (!nivelActualConfig) return false;

    // Iterar categorías en el orden en que están definidas para encontrar la primera escena
    for (const catKey in nivelActualConfig.categorias) {
        const escenasEnCategoria = nivelActualConfig.categorias[catKey];
        if (escenasEnCategoria && escenasEnCategoria.length > 0) {
            return escenasEnCategoria[0] === escenaIdActual;
        }
    }
    return false; // No debería llegar aquí si el nivel tiene escenas
};


export default ordenEscenas;