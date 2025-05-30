// src/ordenEscenas.js
const ordenEscenas = [
  {
    nivel: 1,
    categorias: {
      social: [
        'patatas',
        'juguete',
        'jugueteRotoMisterio',
        'noDejanJugarFutbol',
        'quiereJugueteAjeno',
        'manchaDibujoSinQuerer',
        'cogeTijerasMaestra',
        'cogeMagdalenaAntesTiempo',
        'cogeZumoAjenoEnfado',
        'invitacionJugarFutbol',
        'esperarTurnoBano',
        'noCompartenGalleta',
        'unirseJuegoParque'
      ],
      emocionpropia: [
        'perroSentarse',
        'apagarLuz',
        'psicomotricidad',
        'pegatina',
        'chupachup',
        'chocarCinco',
        'globoExplota',
        'relojCaer',
        'busTarde',
        'canastaAplaudir',
        'llamarProfe'
      ],
      teoriamente: [
        'avionRysa',
        'ivan',
        'mirar'
      ],
      coherencia: [ //
        'excursion',
        'naturaleza',
        'piscina',
        'cumpleaños',
        'estacionAño',
        'dondeVan',
        'bancAliments',
        'cocinar',
        'cine'
      ],
      ejecutiva: [
        'cambioRutina',
        'paris',
        'cambioMantas',
        'pan'
      ],
      memoria: [
        'pintarMesa2',
        'guardarTablet'
      ],
      caras: []
    }
  },
  {
    nivel: 2,
    categorias: {
      social: [ //
        'aniversario',
        'pastelPequenoFiesta',
        'sinFelicitacionClase',
        'regaloNoGustado',
        'escondeZapatosBroma',
        'ignoraOrdenDocente',
        'quiereOtroJuegoGrupo',
        'errorEnJuegoCorregido'
      ],
      emocionpropia: [
        'pelotaRota',
        'seOlvidaDeTi',
        'responderMal',
        'hacerFoto',
        'mancharse',
        'cremalleraRota',
        'mochilaRota',
        'ventanaAvion',
        'profeAmor',
        'botonPlay'
      ],
      teoriamente: [
        'erupto',
        'abrazo',
        'chocarFuerte'
      ],
      coherencia: [
        'cumpleaños2',
        'aeropuerto',
        'queHacen',
        'estacionAño2',
        'estacionAño3'
      ],
      ejecutiva: [
        'papaMedico',
        'mochila',
        'herida',
        'mojado'
      ]
    }
  },
  {
    nivel: 3,
    categorias: {
      social: [],
      emocionpropia: [ //
        'repartidor',
        'equivocar',
        'charco',
        'nuevoProfe',
        'vacaciones',
        'elegirFruta',
        'ventanaFuerte'
      ],
      teoriamente: [
        'perroRafa',
        'pintarMesa',
        'claseB'
      ],
      coherencia: [
        'museo',
        'comedor'
      ],
      ejecutiva: [
        'cumpleañosFamiliar',
        'dentista',
        'pedirAyuda',
        'verano'
      ]
    }
  }
];

export const obtenerSecuenciaEscenas = () => {
  const secuencia = []; //
  ordenEscenas.forEach(nivelObj => {
    Object.values(nivelObj.categorias).forEach(categoriaEscenas => {
      secuencia.push(...categoriaEscenas);
    });
  });
  return secuencia;
};

export const esUltimaEscenaDelNivel = (escenaIdActual, escenasDelNivel) => {
    if (!escenasDelNivel || escenasDelNivel.length === 0) return false; //
    return escenasDelNivel[escenasDelNivel.length - 1] === escenaIdActual;
};

export const obtenerEscenasDelNivelActual = (escenaIdActual, todasLasEscenas) => {
    const escenaActualObj = todasLasEscenas.find(e => e.id === escenaIdActual);
    if (!escenaActualObj) return []; //

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

export const esPrimeraEscenaDelNivel = (escenaIdActual, ordenEscenasConfig, todasLasEscenas) => { //
    const escenaActualObj = todasLasEscenas.find(e => e.id === escenaIdActual);
    if (!escenaActualObj) return false;

    const nivelActualConfig = ordenEscenasConfig.find(n => n.nivel === escenaActualObj.nivel);
    if (!nivelActualConfig) return false;

    for (const catKey in nivelActualConfig.categorias) { //
        const escenasEnCategoria = nivelActualConfig.categorias[catKey];
        if (escenasEnCategoria && escenasEnCategoria.length > 0) { //
            return escenasEnCategoria[0] === escenaIdActual;
        }
    }
    return false; //
};


export default ordenEscenas;