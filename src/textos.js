// src/textos.js
const textos = {
  es: {
    ui: {
      // ... (otros textos existentes) ...
      portadaTitle: 'TE ANTENC',
      portadaButton: 'EMPEZAR',
      ingresoPrompt: 'SELECCIONA TÚ NOMBRE', // [cite: 410]
      ingresoLabel: 'NOMBRE',
      ingresoError: 'Nombre no válido',
      ingresoButton: 'REGISTRARSE',
      accederDocente: 'ACCEDER COMO DOCENTE',
      irPanelDocente: 'IR AL PANEL DEL DOCENTE',
      loginDocenteTitle: 'Acceso Docente',
      loginDocenteLabel: 'CONTRASEÑA',
      cancelar: 'CANCELAR',
      acceder: 'ACCEDER',
      greeting: 'HOLA,',
      logout: 'SALIR', // [cite: 411]
      inicioTitle: 'INICIO',
      empezar: 'EMPEZAR',
      inicio: 'INICIO',
      menu: 'MENÚ',
      adminPanelTitle: 'Panel del Docente',
      cambiarUsuario: 'CAMBIAR USUARI',
      volverPortada  : 'VOLVER A PÁGINA DE INGRESO',
      accesoTitle : 'Acceso', // [cite: 412]
      accesoLabel : 'CONTRASEÑA',
      accesoErr   : 'Contraseña incorrecta',
      volverAPortada : 'VOLVER A PORTADA',
      necesitasDocente :                           // [cite: 413]
        'Debes autenticarte como Docente para registrar nuevos alumnos.',
      nuevoAlumnoLabel : 'Nuevo alumno',
      crearAlumnoBtn   : 'CREAR',
      crearAlumnoErr   : 'No se pudo crear el alumno. Inténtalo de nuevo.', // [cite: 414]
      atras: 'ATRÁS',
      siguiente: 'SIGUIENTE',
      pasoTexto: (act, tot) => `Paso ${act} de ${tot}`,
      errorSinEleccion: 'No hay resultado disponible. Vuelve a hacer una elección.', // [cite: 415]
      volverAlMenu: 'VOLVER AL MENÚ', // Nueva clave
      labelAzar: 'Marcar como respuesta al azar',
      labelComentario: 'Comentario (opcional)',
      comentarioGuardado: 'Guardado',
      guardar: 'Guardar',
      categories: {
        social: 'Situaciones sociales',
        emocionajena: 'Emociones ajenas',
        emocionpropia: 'Emociones propias',
        teoriamente: 'Teoria de la mente',
        coherencia: 'Coherencia central',
      },
      niveles: { 1: 'Nivel 1', 2: 'Nivel 2', 3: 'Nivel 3' }, // [cite: 454]
    },
    escenas: [ // [cite: 416]
      {
        id: 'perroSentarse',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'PERROS',
        pictos: [
          'perroSentarse/perro.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'perroSentarse/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Entra un perro de terapia y se sienta a su lado durante la sesión',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Entra un perro de terapia y se sienta a su lado durante la sesión',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'apagarLuz',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'SE APAGA LA LUZ',
        pictos: [
          'apagarLuz/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'apagarLuz/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Se apagan las luces en el aula porque se va a proyectar un video',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Se apagan las luces en el aula porque se va a proyectar un video',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'psicomotricidad',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'GRITAR',
        pictos: [
          'psicomotricidad/picto.png',
          'psicomotricidad/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'psicomotricidad/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Un compañero grita en clase de Psicomotricidad',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'pegatina',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'FELICITACIÓN Y PEGATINA',
        pictos: [
          'pegatina/picto.png',
          'pegatina/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pegatina/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'La maestra te da una pegatina felicitándote porque has trabajado muy bien',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'chupachup',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'REPARTIR CHUPA-CHUP',
        pictos: [
          'chupachup/picto.png',
          'chupachup/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'chupachup/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'La maestra reparte chupa-chup',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'chocarCinco',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'CHOCAR DE MANOS',
        pictos: [
          'chocarCinco/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'chocarCinco/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Escribes bien la palabra y con la maestra chocáis las manos',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Escribes bien la palabra y con la maestra chocáis las manos',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'globoExplota',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'UN GLOBO EXPLOTA',
        pictos: [
          'globoExplota/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'globoExplota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Un globo explota en una fiesta de cumpleaños',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Un globo explota en una fiesta de cumpleaños',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
         {
        id: 'relojCaer',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'SE CAE EL RELOJ',
        pictos: [
          'relojCaer/picto.png',
          'relojCaer/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'relojCaer/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Estas trabajando y se cae el reloj de la pared',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Estas trabajando y se cae el reloj de la pared',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
         {
        id: 'busTarde',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'EL AUTOBÚS LLEGA TARDE',
        pictos: [
          'busTarde/picto.png',
          'busTarde/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'busTarde/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'El autobus llega tarde',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
       {
        id: 'canastaAplaudir',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'HACER CANASTA',
        pictos: [
          'canastaAplaudir/picto.png',
          'canastaAplaudir/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'canastaAplaudir/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Haces canasta y tus compañeros y maestra te aplauden',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
       {
        id: 'oler',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'OLER ALGO NUEVO',
        pictos: [
          'oler/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'oler/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Te hacen oler algo nuevo',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' }
              ]
            },
          ]
        })()
      },
      //       {
      //   id: 'patatas',
      //   categoria: 'social',
      //   nivel: 1, // Añadido nivel
      //   titulo: 'YO TAMBIÉN QUIERO PATATAS',
      //   pictos: [
      //     'situacion1/picto1.png',
      //     'situacion1/picto2.png',
      //     'situacion1/picto3.png'
      //   ],
      //   pasos: (() => { // [cite: 417]
      //     const base = 'situacion1/';
      //     return [
      //       {
      //         tipo: 'situacion',
      //         titulo: 'SITUACIÓN',
      //         descripcion: 'EL NIÑO Y OBSERVA A DOS NIÑOS COMIENDO PATATAS.',
      //         imagen: base + 'escena1.png' // [cite: 418]
      //       },
      //       {
      //         tipo: 'eleccion',
      //         titulo: '¿QUÉ PUEDE HACER EL NIÑO Y?',
      //         opciones: [
      //           { id: 'nada', texto: 'NO HACE NADA', imagen: base + 'eleccion1.png' }, // [cite: 419]
      //           { id: 'enfado', texto: 'SE ENFADA', imagen: base + 'eleccion2.png' },
      //           { id: 'gesto', texto: 'HACE UN GESTO', imagen: base + 'eleccion3.png' }
      //         ]
      //       },
      //       { // [cite: 420]
      //         tipo: 'resultado',
      //         titulo: 'CONSECUENCIA PROBABLE',
      //         resultados: {
      //           nada: { texto: 'LOS OTROS NIÑOS NO REACCIONAN', imagen: base + 'resultado1.png' },
      //           enfado: { texto: 'LOS OTROS NIÑOS SE ALEJAN', imagen: base + 'resultado2.png' }, // [cite: 421]
      //           gesto: { texto: 'LOS NIÑOS COMPARTEN LAS PATATAS', imagen: base + 'resultado3.png' }
      //         }
      //       }
      //     ]
      //   })()
      // },
      // {
      //   id: 'aniversario', // [cite: 422]
      //   categoria: 'emocionpropia',
      //   nivel: 2, // Añadido nivel
      //   titulo: 'TROZO PEQUEÑO DE PASTEL EN FIESTA DE ANIVERSARIO',
      //   pictos: [
      //     'emocionpropiaAniversario/picto1.png',
      //     'emocionpropiaAniversario/picto2.png',
      //     'emocionpropiaAniversario/picto3.png'
      //   ],
      //   pasos: (() => {
      //     const base = 'emocionpropiaAniversario/'; // [cite: 423]
      //     return [
      //       {
      //         tipo: 'situacion',
      //         titulo: 'SITUACIÓN',
      //         descripcion: 'TODOS COMEN PASTEL EN LA FIESTA DE ANIVERSARIO DE UN AMIGO. A TI TE DAN UN TROZO MUCHO MÁS PEQUEÑO QUE AL RESTO, ALGUNOS RÍEN', // [cite: 424]
      //         imagen: base + 'escena1.png'
      //       },
      //       {
      //         tipo: 'eleccion',
      //         titulo: '¿CÓMO REACCIONAS?',
      //         opciones: [ // [cite: 425]
      //           { id: 'nada', texto: 'ME PONGO TRISTE', imagen: base + 'eleccion1.png' },
      //           { id: 'enfado', texto: 'PREGUNTO POR QUÉ ME HAN DADO MENOS', imagen: base + 'eleccion2.png' },
      //           { id: 'gesto', texto: 'RÍO CON LOS OTROS', imagen: base + 'eleccion3.png' },
      //           { id: 'contento', texto: 'ME PONGO CONTENTO', imagen: base + 'eleccion4.png' } // Cambiado id para ser único [cite: 426]
      //         ]
      //       },
      //     ]
      //   })()
      // },
      // {
      //   id: 'juguete',
      //   nivel: 1, // Añadido nivel
      //   categoria: 'emocionajena',
      //   titulo: 'SE ROMPE UN JUGUETE', // [cite: 427]
      //   pictos: [
      //     'situacion2/picto1.png',
      //     'situacion2/picto2.png'
      //   ],
      //   pasos: (() => {
      //     const base = 'situacion2/';
      //     return [ // [cite: 428]
      //       {
      //         tipo: 'situacion',
      //         titulo: 'SITUACIÓN',
      //         descripcion: 'EL NIÑO Y VE CÓMO UN JUGUETE FAVORITO SE ROMPE AL CAER.',
      //         imagen: base + 'escena1.png'
      //       },
      //       { // [cite: 429]
      //         tipo: 'eleccion',
      //         titulo: '¿QUÉ PUEDE HACER EL NIÑO Y?',
      //         opciones: [
      //           { id: 'llora', texto: 'LLORA', imagen: base + 'eleccion1.png' },
      //           { id: 'ayuda', texto: 'PIDE AYUDA', imagen: base + 'eleccion2.png' }, // [cite: 430]
      //           { id: 'ignora', texto: 'IGNORA EL JUGUETE', imagen: base + 'eleccion3.png' },
      //           { id: 'tira', texto: 'SE ENFADA Y LO TIRA', imagen: base + 'eleccion4.png' }
      //         ]
      //       },
      //       { // [cite: 431]
      //         tipo: 'resultado',
      //         titulo: 'CONSECUENCIA PROBABLE',
      //         resultados: {
      //           llora: { texto: 'UN ADULTO LO CONSUELA', imagen: base + 'resultado1.png' },
      //           ayuda: { texto: 'REPARAN EL JUGUETE JUNTOS', imagen: base + 'resultado2.png' }, // [cite: 432]
      //           ignora: { texto: 'SE SIENTE TRISTE PERO CALMADO', imagen: base + 'resultado3.png' },
      //           tira: { texto: 'ROMPE OTROS OBJETOS Y LO REGAÑAN', imagen: base + 'resultado4.png' }
      //         }
      //       }
      //     ]
      //   })() // [cite: 433]
      // },
    ]
  },
  ca: {
    ui: {
      portadaTitle: 'ACTUM',
      portadaButton: 'COMENÇA',
      ingresoPrompt: 'SELECCIONA EL TEU NOM',
      ingresoLabel: 'Nom', // [cite: 450]
      ingresoError: 'Nom no vàlid',
      ingresoButton: 'REGISTRAR-SE',
      accederDocente: 'ACCEDIR COM A DOCENT', // Traducción mejorada
      irPanelDocente: 'ANAR AL PANELL DEL DOCENT', // Traducción mejorada
      loginDocenteTitle: 'Accés Docent',
      loginDocenteLabel: 'CONTRASENYA',
      cancelar: 'CANCEL·LAR', // Traducción
      acceder: 'ACCEDIR',
      greeting: 'Hola,',
      logout: 'SORTIR',
      menu: 'MENÚ',
      inicioTitle: 'INICI',
      empezar: 'COMENÇAR', // [cite: 451]
      inicio: 'INICI',
      // menu: 'MENÚ', // Repetido, ya está arriba
      adminPanelTitle: 'Panell del Docent',
      cambiarUsuario: 'CANVIAR USUARI',
      volverPortada  : 'TORNAR A LA PÀGINA D’INGRÉS',
      accesoTitle : 'Accés',
      accesoLabel : 'CONTRASENYA',
      accesoErr   : 'Contrasenya incorrecta',
      volverAPortada : 'TORNAR A LA PORTADA', // [cite: 452]
      necesitasDocente :
        'Has d’autenticar-te com a Docent per registrar nous alumnes.',
      nuevoAlumnoLabel : 'Alumne nou',
      crearAlumnoBtn   : 'CREAR',
      crearAlumnoErr   : "No s'ha pogut crear l'alumne. Torna-ho a provar.", // [cite: 453]
      atras: 'ENRERE',
      siguiente: 'SEGÜENT',
      pasoTexto: (act, tot) => `Pas ${act} de ${tot}`,
      errorSinEleccion: 'No hi ha resultat disponible. Torna a fer una elecció.',
      volverAlMenu: 'TORNAR AL MENÚ', // Nueva clave
      labelAzar: 'Marcar com a resposta a l\'atzar',
      labelComentario: 'Comentari (opcional)',
      comentarioGuardado: 'Desat',
      guardar: 'Desar',
      categories: {
        social: 'Situacions socials',
        emocionajena: 'Emocions dels altres',
        emocionpropia: 'Emocions pròpies',
        teoriamente: 'Teoria de la ment',
        coherencia: 'Coherència central', // [cite: 454]
      },
      niveles: { 1: 'Nivell 1', 2: 'Nivell 2', 3: 'Nivell 3' }, // Traducción
    },
    escenas: [
    ]
  }
}

export default textos;