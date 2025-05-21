// src/ordenEscenas.js
const ordenEscenas = [
    {
      nivel: 1,
      categorias: {
        social: ['patatas'], // Add other social scene IDs for level 1 here
        emocionajena: ['juguete'], // Add other emocionajena scene IDs for level 1 here
        emocionpropia: [], // Add emocionpropia scene IDs for level 1 here
        teoriamente: [],   // Add teoriamente scene IDs for level 1 here
        coherencia: []     // Add coherencia scene IDs for level 1 here
      }
    },
    {
      nivel: 2,
      categorias: {
        social: [],
        emocionajena: ['emocion1'],
        emocionpropia: ['aniversario'],
        teoriamente: [],
        coherencia: []
      }
    },
    {
      nivel: 3,
      categorias: {
        social: [],
        emocionajena: ['emocion2'],
        emocionpropia: [],
        teoriamente: [],
        coherencia: []
      }
    }
    // Add more levels as needed
  ];
  
  // Helper function to get a flat list of scene IDs in the correct order
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
  
  export const obtenerEscenasDelNivelActual = (escenaIdActual, textosEscenas) => {
      const escenaActualObj = textosEscenas.find(e => e.id === escenaIdActual);
      if (!escenaActualObj) return [];
  
      const nivelActual = ordenEscenas.find(n => n.nivel === escenaActualObj.nivel);
      if (!nivelActual) return [];
  
      let escenasEnNivel = [];
      Object.values(nivelActual.categorias).forEach(catEscenas => {
          escenasEnNivel.push(...catEscenas);
      });
      return escenasEnNivel;
  };
  
  
  export default ordenEscenas;