// src/textos.js
const textos = {
  es: {
    ui: {
      // ... (otros textos existentes) ...
      portadaTitle: 'ACTUM',
      portadaButton: 'EMPEZAR',
      ingresoPrompt: 'Introduce el nombre del alumno', // [cite: 410]
      ingresoLabel: 'Nombre',
      ingresoError: 'Nombre no válido',
      ingresoButton: 'REGISTRARSE',
      accederDocente: 'ACCEDER COMO DOCENTE',
      irPanelDocente: 'IR AL PANEL DEL DOCENTE',
      loginDocenteTitle: 'Acceso Docente',
      loginDocenteLabel: 'CONTRASEÑA',
      cancelar: 'CANCELAR',
      acceder: 'ACCEDER',
      greeting: 'Hola,',
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
        id: 'patatas',
        categoria: 'social',
        nivel: 1, // Añadido nivel
        titulo: 'YO TAMBIÉN QUIERO PATATAS',
        pictos: [
          'situacion1/picto1.png',
          'situacion1/picto2.png',
          'situacion1/picto3.png'
        ],
        pasos: (() => { // [cite: 417]
          const base = 'situacion1/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL NIÑO Y OBSERVA A DOS NIÑOS COMIENDO PATATAS.',
              imagen: base + 'escena1.png' // [cite: 418]
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ PUEDE HACER EL NIÑO Y?',
              opciones: [
                { id: 'nada', texto: 'NO HACE NADA', imagen: base + 'eleccion1.png' }, // [cite: 419]
                { id: 'enfado', texto: 'SE ENFADA', imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'HACE UN GESTO', imagen: base + 'eleccion3.png' }
              ]
            },
            { // [cite: 420]
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                nada: { texto: 'LOS OTROS NIÑOS NO REACCIONAN', imagen: base + 'resultado1.png' },
                enfado: { texto: 'LOS OTROS NIÑOS SE ALEJAN', imagen: base + 'resultado2.png' }, // [cite: 421]
                gesto: { texto: 'LOS NIÑOS COMPARTEN LAS PATATAS', imagen: base + 'resultado3.png' }
              }
            }
          ]
        })()
      },
      {
        id: 'aniversario', // [cite: 422]
        categoria: 'emocionpropia',
        nivel: 2, // Añadido nivel
        titulo: 'TROZO PEQUEÑO DE PASTEL EN FIESTA DE ANIVERSARIO',
        pictos: [
          'emocionpropiaAniversario/picto1.png',
          'emocionpropiaAniversario/picto2.png',
          'emocionpropiaAniversario/picto3.png'
        ],
        pasos: (() => {
          const base = 'emocionpropiaAniversario/'; // [cite: 423]
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'TODOS COMEN PASTEL EN LA FIESTA DE ANIVERSARIO DE UN AMIGO. A TI TE DAN UN TROZO MUCHO MÁS PEQUEÑO QUE AL RESTO, ALGUNOS RÍEN', // [cite: 424]
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿CÓMO REACCIONAS?',
              opciones: [ // [cite: 425]
                { id: 'nada', texto: 'ME PONGO TRISTE', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: 'PREGUNTO POR QUÉ ME HAN DADO MENOS', imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'RÍO CON LOS OTROS', imagen: base + 'eleccion3.png' },
                { id: 'contento', texto: 'ME PONGO CONTENTO', imagen: base + 'eleccion4.png' } // Cambiado id para ser único [cite: 426]
              ]
            },
          ]
        })()
      },
      {
        id: 'juguete',
        nivel: 1, // Añadido nivel
        categoria: 'emocionajena',
        titulo: 'SE ROMPE UN JUGUETE', // [cite: 427]
        pictos: [
          'situacion2/picto1.png',
          'situacion2/picto2.png'
        ],
        pasos: (() => {
          const base = 'situacion2/';
          return [ // [cite: 428]
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL NIÑO Y VE CÓMO UN JUGUETE FAVORITO SE ROMPE AL CAER.',
              imagen: base + 'escena1.png'
            },
            { // [cite: 429]
              tipo: 'eleccion',
              titulo: '¿QUÉ PUEDE HACER EL NIÑO Y?',
              opciones: [
                { id: 'llora', texto: 'LLORA', imagen: base + 'eleccion1.png' },
                { id: 'ayuda', texto: 'PIDE AYUDA', imagen: base + 'eleccion2.png' }, // [cite: 430]
                { id: 'ignora', texto: 'IGNORA EL JUGUETE', imagen: base + 'eleccion3.png' },
                { id: 'tira', texto: 'SE ENFADA Y LO TIRA', imagen: base + 'eleccion4.png' }
              ]
            },
            { // [cite: 431]
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                llora: { texto: 'UN ADULTO LO CONSUELA', imagen: base + 'resultado1.png' },
                ayuda: { texto: 'REPARAN EL JUGUETE JUNTOS', imagen: base + 'resultado2.png' }, // [cite: 432]
                ignora: { texto: 'SE SIENTE TRISTE PERO CALMADO', imagen: base + 'resultado3.png' },
                tira: { texto: 'ROMPE OTROS OBJETOS Y LO REGAÑAN', imagen: base + 'resultado4.png' }
              }
            }
          ]
        })() // [cite: 433]
      },
      {
        id: 'emocion1',
        nivel: 2, // Añadido nivel
        categoria: 'emocionajena',
        titulo: '¿CÓMO TE SIENTES?',
        pictos: [
           'emocion1/picto1.png' // [cite: 434]
        ],
        pasos: (() => {
          const base = 'emocion1/'
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN', // [cite: 435]
              descripcion: 'Mira la primera imagen y observa la escena.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN', // [cite: 436]
              descripcion: 'Ahora mira esta otra parte de la escena.',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN', // [cite: 437]
              descripcion: 'Fíjate bien en lo que está pasando aquí.',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'eleccion', // [cite: 438]
              titulo: '¿QUÉ EMOCIÓN SIENTES?',
              opciones: [
                { id: 'feliz',     texto: 'FELIZ',     imagen: base + 'eleccion1.png' },
                { id: 'triste',    texto: 'TRISTE',    imagen: base + 'eleccion2.png' }, // [cite: 439]
                { id: 'enfado',    texto: 'ENFADADO',  imagen: base + 'eleccion3.png' },
                { id: 'asustado',  texto: 'ASUSTADO',  imagen: base + 'eleccion4.png' }
              ]
            }
          ]
        })() // [cite: 440]
        },
        {
          id: 'emocion2',
          nivel: 3, // Añadido nivel
          categoria: 'emocionajena',
          titulo: 'PARTIDO DE FUTBOL',
          pictos: [
             'emocion2/picto1.png' // [cite: 441]
          ],
          pasos: (() => {
            const base = 'emocion2/'
            return [
              {
                tipo: 'situacion',
                titulo: 'SITUACIÓN', // [cite: 442]
                descripcion: 'Mira la primera imagen y observa la escena.',
                imagen: base + 'escena1.png'
              },
              { // [cite: 443]
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Ahora mira esta otra parte de la escena.',
                imagen: base + 'escena2.png'
              },
              { // [cite: 444]
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Fíjate bien en lo que está pasando aquí.',
                imagen: base + 'escena3.png' // [cite: 445]
              },
              {
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Fíjate bien.',
                imagen: base + 'escena4.png' // [cite: 446]
              },
              {
                tipo: 'eleccion',
                titulo: '¿QUÉ EMOCIÓN SIENTES?',
                opciones: [ // [cite: 447]
                  { id: 'feliz',     texto: 'FELIZ',     imagen: base + 'eleccion1.png' },
                  { id: 'triste',    texto: 'TRISTE',    imagen: base + 'eleccion2.png' },
                  { id: 'enfado',    texto: 'ENFADADO',  imagen: base + 'eleccion3.png' }, // [cite: 448]
                  { id: 'confuso',   texto: 'CONFUSO',   imagen: base + 'eleccion4.png' },
                  { id: 'asustado',  texto: 'ASUSTADO',  imagen: base + 'eleccion5.png' }
                ]
              } // [cite: 449]
            ]
          })()
          },
    ]
  },
  ca: {
    ui: {
      portadaTitle: 'ACTUM',
      portadaButton: 'COMENÇA',
      ingresoPrompt: 'Introdueix el nom de l’alumne',
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
      {
        id: 'patatas',
        categoria: 'social',
        nivel: 1, // Añadido nivel
        titulo: 'JO TAMBÉ VULL PATATES',
        pictos: [
          'situacion1/picto1.png',
          'situacion1/picto2.png', // [cite: 455]
          'situacion1/picto3.png'
        ],
        pasos: (() => {
          const base = 'situacion1/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'EL NEN Y OBSERVA DOS NENS MENJANT PATATES.', // [cite: 456]
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'QUÈ POT FER EL NEN Y?',
              opciones: [ // [cite: 457]
                { id: 'nada', texto: 'NO FA RES', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: "S’ENFADA", imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'FA UN GEST', imagen: base + 'eleccion3.png' }
              ] // [cite: 458]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSEQÜÈNCIA PROBABLE',
              resultados: {
                nada: { texto: 'ELS ALTRES NENS NO REACCIONEN', imagen: base + 'resultado1.png' }, // [cite: 459]
                enfado: { texto: 'ELS ALTRES NENS S’ALLUNYEN', imagen: base + 'resultado2.png' },
                gesto: { texto: 'ELS NENS COMPARTEIXEN LES PATATES', imagen: base + 'resultado3.png' }
              }
            }
          ]
        })() // [cite: 460]
      },
      {
        id: 'aniversario',
        categoria: 'emocionpropia',
        nivel: 2, // Añadido nivel
        titulo: 'TROS PETIT DE PASTÍS A FESTA D\'ANIVERSARI', // Traducción
        pictos: [
          'emocionpropiaAniversario/picto1.png',
          'emocionpropiaAniversario/picto2.png',
          'emocionpropiaAniversario/picto3.png'
        ],
        pasos: (() => { // [cite: 461]
          const base = 'emocionpropiaAniversario/';
          return [ // [cite: 462]
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: "TOTS MENGEN PASTÍS A LA FESTA D'ANIVERSARI D'UN AMIC. A TU TE'N DONEN UN TROS MOLT MÉS PETIT QUE A LA RESTA, ALGUNS RIUEN.",
              imagen: base + 'escena1.png'
            }, // [cite: 463]
            {
              tipo: 'eleccion',
              titulo: 'COM REACCIONES?', // Traducción
              opciones: [
                { id: 'nada', texto: 'EM POSO TRIST', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: 'PREGUNTO PER QUÈ ME N\'HAN DONAT MENYS', imagen: base + 'eleccion2.png' }, // [cite: 464]
                { id: 'gesto', texto: 'RIC AMB ELS ALTRES', imagen: base + 'eleccion3.png' }, // Traducción
                { id: 'contento', texto: 'EM POSO CONTENT', imagen: base + 'eleccion4.png' } // Traducción, id cambiado
              ]
            }, // [cite: 465]
          ]
        })()
      },
      {
        id: 'juguete',
        categoria: 'emocionajena',
        nivel: 1, // Añadido nivel
        titulo: 'ES TRONCA UN JOGUET',
        pictos: [ // [cite: 466]
          'situacion2/picto1.png',
          'situacion2/picto2.png'
        ],
        pasos: (() => {
          const base = 'situacion2/';
          return [ // [cite: 467]
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'EL NEN Y VEU COM UN DELS SEUS JOGUETS FAVORITS ES TRONCA EN CAURE.',
              imagen: base + 'escena1.png'
            }, // [cite: 468]
            {
              tipo: 'eleccion',
              titulo: 'QUÈ POT FER EL NEN Y?',
              opciones: [
                { id: 'llora', texto: 'PLORA', imagen: base + 'eleccion1.png' },
                { id: 'ayuda', texto: 'DEMANA AJUDA', imagen: base + 'eleccion2.png' }, // [cite: 469]
                { id: 'ignora', texto: 'IGNORA EL JOGUET', imagen: base + 'eleccion3.png' },
                { id: 'tira', texto: "S’ENFADA I EL LLENÇA", imagen: base + 'eleccion4.png' }
              ]
            },
            { // [cite: 470]
              tipo: 'resultado',
              titulo: 'CONSEQÜÈNCIA PROBABLE',
              resultados: {
                llora: { texto: 'UN ADULT EL CONSOLA', imagen: base + 'resultado1.png' },
                ayuda: { texto: 'REPARAN EL JOGUET JUNTS', imagen: base + 'resultado2.png' }, // [cite: 471]
                ignora: { texto: 'SE SENT TRIST PERÒ CALMAT', imagen: base + 'resultado3.png' },
                tira: { texto: 'TRONCA ALTRES OBJECTES I EL RENYEN', imagen: base + 'resultado4.png' }
              }
            }
          ]
        })() // [cite: 472]
      },
      {
        id: 'emocion1',
        categoria: 'emocionajena',
        nivel: 2, // Añadido nivel
        titulo: 'COM ET SENTS?',
        pictos: [ 'emocion1/picto1.png' ],
        pasos: (() => {
          const base = 'emocion1/'
          return [
            { // [cite: 473]
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Mira la primera imatge i observa l’escena.',
              imagen: base + 'escena1.png'
            },
            { // [cite: 474]
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Ara mira aquesta altra part de l’escena.',
              imagen: base + 'escena2.png'
            },
            { // [cite: 475]
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Fixa’t bé en el que està passant aquí.',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'eleccion', // [cite: 476]
              titulo: 'QUINA EMOCIÓ SENTS?',
              opciones: [
                { id: 'feliz',    texto: 'FELIÇ',     imagen: base + 'eleccion1.png' },
                { id: 'triste',   texto: 'TRIST',     imagen: base + 'eleccion2.png' },
                { id: 'enfado',   texto: 'ENFADAT',   imagen: base + 'eleccion3.png' }, // [cite: 477]
                { id: 'asustado', texto: 'ESPANTAT',  imagen: base + 'eleccion4.png' }
              ]
            }
          ]
        })()
      }, // [cite: 478]
      {
        id: 'emocion2',
        categoria: 'emocionajena',
        nivel: 3, // Añadido nivel
        titulo: 'PARTIT DE FUTBOL',
        pictos: [ 'emocion2/picto1.png' ],
        pasos: (() => {
          const base = 'emocion2/'
          return [
            { // [cite: 479]
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Mira la primera imatge i observa l’escena.',
              imagen: base + 'escena1.png'
            },
            { // [cite: 480]
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Ara mira aquesta altra part de l’escena.',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion', // [cite: 481]
              titulo: 'SITUACIÓ',
              descripcion: 'Fixa’t bé en el que està passant aquí.',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'situacion', // [cite: 482]
              titulo: 'SITUACIÓ',
              descripcion: 'Fixa’t hi bé.',
              imagen: base + 'escena4.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'QUINA EMOCIÓ SENTS?',
              opciones: [ // [cite: 483]
                { id: 'feliz',    texto: 'FELIÇ',     imagen: base + 'eleccion1.png' },
                { id: 'triste',   texto: 'TRIST',     imagen: base + 'eleccion2.png' },
                { id: 'enfado',   texto: 'ENFADAT',   imagen: base + 'eleccion3.png' },
                { id: 'confusio', texto: 'CONFÚS',    imagen: base + 'eleccion4.png' }, // ID normalizado [cite: 484]
                { id: 'asustado', texto: 'ESPANTAT',  imagen: base + 'eleccion5.png' }
              ]
            }
          ]
        })()
      }, // [cite: 485]
    ]
  }
}

export default textos;