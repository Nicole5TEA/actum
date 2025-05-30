// src/ordenEscenas.js
const ordenEscenas = [
  {
    nivel: 1, // [cite: 796]
    categorias: {
      social: [],
      // Removed 'oler' and 'pluja' from this list
      emocionpropia: ['perroSentarse','apagarLuz','psicomotricidad','pegatina','chocarCinco','globoExplota','busTarde','canastaAplaudir','chupachup','relojCaer', 'llamarProfe'],
      teoriamente: ['avionRysa','ivan','mirar'],
      coherencia: ['excursion','naturaleza','piscina','cumpleaños','estacionAño','dondeVan','bancAliments','cocinar','cine'], // [cite: 797]
      ejecutiva: ['cambioRutina','paris','cambioMantas','pan'],
      memoria: ['pintarMesa2','guardarTablet'],
      caras: [],
    }
  },
  {
    nivel: 2,
    categorias: {
      social: [], // [cite: 798]
      emocionpropia: ['pelotaRota','seOlvidaDeTi','cremalleraRota','responderMal','hacerFoto','mancharse', 'mochilaRota','ventanaAvion','profeAmor','botonPlay'],
      teoriamente: ['erupto','abrazo','chocarFuerte'],
      coherencia: ['cumpleaños2','estacionAño2','aeropuerto','queHacen','estacionAño3'],
      ejecutiva: ['papaMedico','mochila','herida','mojado'],
    } // [cite: 799]
  },
  {
    nivel: 3,
    categorias: {
      social: [],
      emocionpropia: ['vacaciones','elegirFruta','ventanaFuerte','repartidor','equivocar','charco','nuevoProfe'], // [cite: 800]
      teoriamente: ['perroRafa','pintarMesa','claseB'],
      coherencia: ['museo','comedor'],
      ejecutiva: ['cumpleañosFamiliar','dentista','pedirAyuda','verano'],
    }
  }
];

export const obtenerSecuenciaEscenas = () => {
  const secuencia = []; // [cite: 801]
  ordenEscenas.forEach(nivelObj => {
    Object.values(nivelObj.categorias).forEach(categoriaEscenas => {
      secuencia.push(...categoriaEscenas);
    });
  });
  return secuencia;
};

export const esUltimaEscenaDelNivel = (escenaIdActual, escenasDelNivel) => {
    if (!escenasDelNivel || escenasDelNivel.length === 0) return false; // [cite: 802]
    return escenasDelNivel[escenasDelNivel.length - 1] === escenaIdActual;
};

export const obtenerEscenasDelNivelActual = (escenaIdActual, todasLasEscenas) => {
    const escenaActualObj = todasLasEscenas.find(e => e.id === escenaIdActual);
    if (!escenaActualObj) return []; // [cite: 803]

    const nivelActualConfig = ordenEscenas.find(n => n.nivel === escenaActualObj.nivel);
    if (!nivelActualConfig) return [];

    let escenasEnNivel = [];
    // Iterate in the defined order of categories to maintain consistency
    const categoriasOrdenadas = Object.keys(nivelActualConfig.categorias); 
    categoriasOrdenadas.forEach(catKey => {
        escenasEnNivel.push(...(nivelActualConfig.categorias[catKey] || []));
    });
    return escenasEnNivel;
};

export const esPrimeraEscenaDelNivel = (escenaIdActual, ordenEscenasConfig, todasLasEscenas) => { // [cite: 804]
    const escenaActualObj = todasLasEscenas.find(e => e.id === escenaIdActual);
    if (!escenaActualObj) return false;

    const nivelActualConfig = ordenEscenasConfig.find(n => n.nivel === escenaActualObj.nivel);
    if (!nivelActualConfig) return false;

    for (const catKey in nivelActualConfig.categorias) { // [cite: 805]
        const escenasEnCategoria = nivelActualConfig.categorias[catKey];
        if (escenasEnCategoria && escenasEnCategoria.length > 0) { // [cite: 806]
            return escenasEnCategoria[0] === escenaIdActual;
        }
    }
    return false; // [cite: 807]
};


export default ordenEscenas;