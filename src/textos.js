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
	  // Nuevas claves para títulos de pasos
      pasoTituloSituacion: 'SITUACIÓN',
      pasoTituloEleccion: '¿QUÉ PUEDE HACER EL NIÑO Y?', // O un genérico si varía mucho
      pasoTituloResultado: 'CONSECUENCIA PROBABLE',
      categories: {
        social: 'Situaciones sociales',
        emocionajena: 'Emociones ajenas',
        emocionpropia: 'Emociones propias',
        teoriamente: 'Teoria de la mente',
        coherencia: 'Coherencia central',
        ejecutiva: 'Función ejecutiva'
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
              descripcion: 'Entra un perro de terapia y se sienta a tu lado durante la sesión',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Entra un perro de terapia y se sienta a tu lado durante la sesión',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Se apagan las luces en el aula porque se va a proyectar un vídeo',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Se apagan las luces en el aula porque se va a proyectar un vídeo',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Un compañero grita en clase de psicomotricidad',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Escribes bien la palabra y con la maestra chocáis las manos para celebrarlo',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Escribes bien la palabra y con la maestra chocáis las manos para celebrarlo',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Estás trabajando y se cae el reloj de la pared',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Estás trabajando y se cae el reloj de la pared',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'El autobús llega tarde',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
        })()
      },
       {
        id: 'llamarProfe',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'LLAMAS A LA MAESTRA Y NO TE ESCUCHA',
        pictos: [
          'llamarProfe/picto.png',
          'llamarProfe/picto2.png',
          'llamarProfe/picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'llamarProfe/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Llamas a la maestra y no te escucha ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
        })()
      },
      {
        id: 'pelotaRota',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'SE ROMPE LA PELOTA',
        pictos: [
          'pelotaRota/picto.png',
          'pelotaRota/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pelotaRota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Estás jugando al fútbol y la pelota se rompe ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'seOlvidaDeTi',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'EL MAESTRO SE OLVIDA DE TI',
        pictos: [
          'seOlvidaDeTi/picto.png',
          'seOlvidaDeTi/picto2.png',
          'seOlvidaDeTi/picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'seOlvidaDeTi/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'En la clase el maestro reparte una actividad y se olvida de ti ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
            {
        id: 'responderMal',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'HACER MAL UNA ACTIVIDAD',
        pictos: [
          'responderMal/picto.png',
          'responderMal/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'responderMal/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Haces una actividad mal delante de tus compañeros ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'hacerFoto',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'HACER FOTO',
        pictos: [
          'hacerFoto/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'hacerFoto/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'La maestra te hace una foto',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
                { id: 'vergüenza', texto: 'VERGÜENZA', imagen: base + 'vergüenza.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'mancharse',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'MANCHARSE',
        pictos: [
          'mancharse/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'mancharse/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Te manchas de pintura la camiseta y la cara en una actividad y tus compañeros miran.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
                { id: 'vergüenza', texto: 'VERGÜENZA', imagen: base + 'vergüenza.png' },
              ]
            },
          ]
          
        })()
      },
       {
        id: 'cremalleraRota',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'SE ROMPE LA CREMALLERA DEL JERSEY',
        pictos: [
          'cremalleraRota/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cremalleraRota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Te pones el jersey y te das cuenta que la cremallera esta rota.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
       {
        id: 'mochilaRota',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'SE ROMPE LA CREMALLERA DE LA MOCHILA',
        pictos: [
          'mochilaRota/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'mochilaRota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Cierras la mochila y se te rompe la cremallera.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
        {
        id: 'ventanaAvion',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'VES UN AVIÓN POR LA VENTANA',
        pictos: [
          'ventanaAvion/picto.png',
          'ventanaAvion/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'ventanaAvion/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Ves pasar un avión por la ventana.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'miedo', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
           {
        id: 'profeAmor',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'LA MAESTRA TE LLAMA AMOR',
        pictos: [
          'profeAmor/picto.png',
          'profeAmor//picto2.png',
          'profeAmor//picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'profeAmor/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'La maestra te llama cariñosamente "AMOR".',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'botonPlay',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'PULSAR BOTÓN PLAY',
        pictos: [
          'botonPlay/picto.png',
          'botonPlay//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'botonPlay/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Pulsas el botón play y no funciona',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'vacaciones',
        categoria: 'emocionpropia',
        nivel: 3,
        titulo: 'VACACIONES',
        pictos: [
          'vacaciones/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'vacaciones/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'último día de colegio y te vas de',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
        })()
      },
      {
      id: 'elegirFruta',
      categoria: 'emocionpropia',
      nivel: 3,
      titulo: 'ELEGIR FRUTA',
      pictos: [
        'elegirFruta/picto.png',
          'elegirFruta/picto2.png',
      ],
      pasos: (() => { // [cite: 417]
        const base = 'elegirFruta/';
        return [
          {
            tipo: 'situacion',
            titulo: 'SITUACIÓN',
            descripcion: 'El monitor del comedor te deja elegir la fruta de postre',
            imagen: base + 'escena1.png'
          },
          {
            tipo: 'eleccion',
            titulo: '¿Cómo te sientes?',
            opciones: [
              { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
              { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
              { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
              { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
            ]
          },
        ]
        })()
      },
      {
      id: 'ventanaFuerte',
      categoria: 'emocionpropia',
      nivel: 3,
      titulo: 'CIERRAN LA VENTANA FUERTE',
      pictos: [
        'ventanaFuerte/picto.png',
      ],
      pasos: (() => { // [cite: 417]
        const base = 'ventanaFuerte/';
        return [
          {
            tipo: 'situacion',
            titulo: 'SITUACIÓN',
            descripcion: 'Un compañero cierra la ventana fuerte',
            imagen: base + 'escena1.png'
          },
          {
            tipo: 'eleccion',
            titulo: '¿Cómo te sientes?',
            opciones: [
              { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
              { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
              { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
              { id: 'sorpresa', texto: 'SORPRENDIDO', imagen: base + 'sorpresa.png' },
            ]
          },
        ]
        })()
      },      


      { 
        id: 'excursion',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ VAN HACER ESTOS NIÑOS?',
        pictos: [
          'excursion/picto.png',
          'exccursion//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'excursion/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van este grupo de niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Dónde van?',
              opciones: [
                { id: 'situacio', texto: 'VAN HA MONTAR BICICLETA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VAN AL SUPERMERCADO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'VAN DE EXCURSIÓN', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'naturaleza',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ HACEN ESTOS NIÑOS?',
        pictos: [
          'naturaleza/picto.png',
          'naturaleza//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'naturaleza/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qúe estan haciendo estos niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'COMER', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'OBSERVAR LAS HOJAS', imagen: base + 'situacio2.png',},
                { id: 'situacio3', texto: 'DIBUJAR', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
         { 
        id: 'piscina',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿A DÓNDE VA LA NIÑA?',
        pictos: [
          'piscina/picto.png',
          'piscina//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'piscina/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde va la niña?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde va?',
              opciones: [
                { id: 'situacio', texto: 'A LA PISCINA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'A LA PARADA DE BUS', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'AL SUPERMERCADO', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cumpleaños',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿DE QUIÉN ES EL CUMPLEAÑOS?',
        pictos: [
          'cumpleaños/picto.png',
          'cumpleaños//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cumpleaños/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿De quién es el cumpleaños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde va?',
              opciones: [
                { id: 'situacio', texto: 'DEL NIÑO CON LA CORONA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DEL NIÑO QUE ESTÁ TOMÁNDO LA FOTO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'DE LA NIÑA QUE TIENE UN REGALO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'DE LA NIÑA QUE ESTÁ BAILANDO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cumpleaños2',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿DE QUIÉN ES EL CUMPLEAÑOS?',
        pictos: [
          'cumpleaños2/picto.png',
          'cumpleaños2//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cumpleaños2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿De quién es el cumpleaños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde va?',
              opciones: [
                { id: 'situacio', texto: 'DEL NIÑO CON LA CORONA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DEL NIÑO QUE ESTÁ TOMÁNDO LA FOTO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'DE LA NIÑA QUE TIENE UN REGALO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'DEL NIÑO QUE ESTÁ COMIENDO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
          { 
        id: 'museo',
        categoria: 'coherencia',
        nivel: 3,
        titulo: '¿QUIÉN ES EL PINTOR?',
        pictos: [
          'museo/picto.png',
          'museo//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'museo/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Quién es el pintor de la obra medio terminada?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién es?',
              opciones: [
                { id: 'situacio', texto: 'LA NIÑA QUE ESTÁ MIRANDO EL CUADRO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'EL SEÑOR QUE SALE DEL BAÑO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'LA SEÑORA CON TURBANTE', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'EL SEÑOR QUE TIENE UN SOMBRERO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'comedor',
        categoria: 'coherencia',
        nivel: 3,
        titulo: '¿QUÉ OBJECTO FALTA PARA COMER?',
        pictos: [
          'comedor/picto.png',
          'comedor//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'comedor/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué objecto falta para comer?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién es?',
              opciones: [
                { id: 'situacio', texto: 'JARRA DE AGUA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SERVILLETAS', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'CUBIERTOS', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'aeropuerto',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿EN DÓNDE ESTÁN?',
        pictos: [
          'aeropuerto/picto.png',
          'aeropuerto//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'aeropuerto/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En dónde están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién es?',
              opciones: [
                { id: 'situacio', texto: 'AEROPUERTO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SUPERMERCADO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'PARQUE DE BOMBEROS', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'estacionAño',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN',
        pictos: [
          'estacionAño/picto.png',
          'estacionAño//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'estacionAño/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En qué estación del año están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'PRIMAVERA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VERANO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'OTOÑO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'INVIERNO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'dondeVan',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿A DÓNDE VAN LOS NIÑOS',
        pictos: [
          'dondeVan/picto.png',
          'dondeVan//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'dondeVan/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'A LA PISCINA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'AL AUTOBÚS', imagen: base + 'situacio2.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'queHacen',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿QUÉ HACEN LOS NIÑOS',
        pictos: [
          'queHacen/picto.png',
          'queHacen//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'queHacen/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué hacen los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'JUGAR CON LA PELOTA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DESCANSAR EN EL PATIO', imagen: base + 'situacio2.png' },
                 { id: 'situacio3', texto: 'UN PICNIC', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'bancAliments',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ HACEN LAS PERSONAS',
        pictos: [
          'bancAliments/picto.png',
          'bancAliments//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'bancAliments/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué hacen las personas?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'LIMPIAR', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'AYUDAR EN EL BANCO DE ALIMENTOS', imagen: base + 'situacio2.png' },
                 { id: 'situacio3', texto: 'COMPRAR EN EL SUPERMERCADO', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      
      { 
        id: 'cocinar',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ HACEN LAS PERSONAS',
        pictos: [
          'cocinar/picto.png',
          'cocinar//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cocinar/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué hacen las personas?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'COMER', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'COCINAR', imagen: base + 'situacio2.png' },
                 { id: 'situacio3', texto: 'PASEAR', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'estacionAño2',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN?',
        pictos: [
          'estacionAño2/picto.png',
          'estacionAño2//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'estacionAño2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En qué estación del año están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'PRIMAVERA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VERANO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'OTOÑO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'INVIERNO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'estacionAño3',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN?',
        pictos: [
          'estacionAño3/picto.png',
          'estacionAño3//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'estacionAño3/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En qué estación del año están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'PRIMAVERA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VERANO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'OTOÑO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'INVIERNO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cine',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿A DÓNDE VAN LOS NIÑOS?',
        pictos: [
          'cine/picto.png',
          'cine//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cine/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde?',
              opciones: [
                { id: 'situacio', texto: 'RESTAURANTE', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'CIRC', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'CINE', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cine',
        categoria: 'ejecutiva',
        nivel: 1,
        titulo: '¿A DÓNDE VAN LOS NIÑOS?',
        pictos: [
          'cine/picto.png',
          'cine//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cine/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde?',
              opciones: [
                { id: 'situacio', texto: 'RESTAURANTE', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'CIRC', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'CINE', imagen: base + 'situacio3.png' },
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
	  // Nuevas claves para títulos de pasos en catalán
      pasoTituloSituacion: 'SITUACIÓ',
      pasoTituloEleccion: 'QUÈ POT FER EL NEN Y?', // O un genérico
      pasoTituloResultado: 'CONSEQÜÈNCIA PROBABLE',
      categories: {
        social: 'Situacions socials',
        emocionajena: 'Emocions dels altres',
        emocionpropia: 'Emocions pròpies',
        teoriamente: 'Teoria de la ment',
        coherencia: 'Coherència central', // [cite: 454]
      }, // [cite: 1909]
      niveles: { 1: 'Nivell 1', 2: 'Nivell 2', 3: 'Nivell 3' },
    }, // [cite: 1910]
    // Las escenas en catalán deben ser añadidas aquí, siguiendo la misma estructura que en español.
    // Por brevedad, no las duplicaré aquí, pero deben ser traducidas y añadidas.
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
              descripcion: 'Entra un perro de terapia y se sienta a tu lado durante la sesión',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Entra un perro de terapia y se sienta a tu lado durante la sesión',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Se apagan las luces en el aula porque se va a proyectar un vídeo',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Se apagan las luces en el aula porque se va a proyectar un vídeo',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Un compañero grita en clase de psicomotricidad',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Escribes bien la palabra y con la maestra chocáis las manos para celebrarlo',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Escribes bien la palabra y con la maestra chocáis las manos para celebrarlo',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'Estás trabajando y se cae el reloj de la pared',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Estás trabajando y se cae el reloj de la pared',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
              descripcion: 'El autobús llega tarde',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
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
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
        })()
      },
       {
        id: 'llamarProfe',
        categoria: 'emocionpropia',
        nivel: 1,
        titulo: 'LLAMAS A LA MAESTRA Y NO TE ESCUCHA',
        pictos: [
          'llamarProfe/picto.png',
          'llamarProfe/picto2.png',
          'llamarProfe/picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'llamarProfe/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Llamas a la maestra y no te escucha ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'asustado', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
        })()
      },
      {
        id: 'pelotaRota',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'SE ROMPE LA PELOTA',
        pictos: [
          'pelotaRota/picto.png',
          'pelotaRota/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pelotaRota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Estás jugando al fútbol y la pelota se rompe ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'seOlvidaDeTi',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'EL MAESTRO SE OLVIDA DE TI',
        pictos: [
          'seOlvidaDeTi/picto.png',
          'seOlvidaDeTi/picto2.png',
          'seOlvidaDeTi/picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'seOlvidaDeTi/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'En la clase el maestro reparte una actividad y se olvida de ti ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
            {
        id: 'responderMal',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'HACER MAL UNA ACTIVIDAD',
        pictos: [
          'responderMal/picto.png',
          'responderMal/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'responderMal/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Haces una actividad mal delante de tus compañeros ',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'hacerFoto',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'HACER FOTO',
        pictos: [
          'hacerFoto/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'hacerFoto/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'La maestra te hace una foto',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
                { id: 'vergüenza', texto: 'VERGÜENZA', imagen: base + 'vergüenza.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'mancharse',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'MANCHARSE',
        pictos: [
          'mancharse/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'mancharse/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Te manchas de pintura la camiseta y la cara en una actividad y tus compañeros miran.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
                { id: 'vergüenza', texto: 'VERGÜENZA', imagen: base + 'vergüenza.png' },
              ]
            },
          ]
          
        })()
      },
       {
        id: 'cremalleraRota',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'SE ROMPE LA CREMALLERA DEL JERSEY',
        pictos: [
          'cremalleraRota/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cremalleraRota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Te pones el jersey y te das cuenta que la cremallera esta rota.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
       {
        id: 'mochilaRota',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'SE ROMPE LA CREMALLERA DE LA MOCHILA',
        pictos: [
          'mochilaRota/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'mochilaRota/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Cierras la mochila y se te rompe la cremallera.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
        {
        id: 'ventanaAvion',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'VES UN AVIÓN POR LA VENTANA',
        pictos: [
          'ventanaAvion/picto.png',
          'ventanaAvion/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'ventanaAvion/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Ves pasar un avión por la ventana.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'miedo', texto: 'ASUSTADO', imagen: base + 'miedo.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
           {
        id: 'profeAmor',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'LA MAESTRA TE LLAMA AMOR',
        pictos: [
          'profeAmor/picto.png',
          'profeAmor//picto2.png',
          'profeAmor//picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'profeAmor/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'La maestra te llama cariñosamente "AMOR".',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'botonPlay',
        categoria: 'emocionpropia',
        nivel: 2,
        titulo: 'PULSAR BOTÓN PLAY',
        pictos: [
          'botonPlay/picto.png',
          'botonPlay//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'botonPlay/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Pulsas el botón play y no funciona',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'vacaciones',
        categoria: 'emocionpropia',
        nivel: 3,
        titulo: 'VACACIONES',
        pictos: [
          'vacaciones/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'vacaciones/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'último día de colegio y te vas de',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo te sientes?',
              opciones: [
                { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
                { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
                { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
                { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
              ]
            },
          ]
        })()
      },
      {
      id: 'elegirFruta',
      categoria: 'emocionpropia',
      nivel: 3,
      titulo: 'ELEGIR FRUTA',
      pictos: [
        'elegirFruta/picto.png',
          'elegirFruta/picto2.png',
      ],
      pasos: (() => { // [cite: 417]
        const base = 'elegirFruta/';
        return [
          {
            tipo: 'situacion',
            titulo: 'SITUACIÓN',
            descripcion: 'El monitor del comedor te deja elegir la fruta de postre',
            imagen: base + 'escena1.png'
          },
          {
            tipo: 'eleccion',
            titulo: '¿Cómo te sientes?',
            opciones: [
              { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
              { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
              { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
              { id: 'triste', texto: 'TRISTE', imagen: base + 'triste.png' },
            ]
          },
        ]
        })()
      },
      {
      id: 'ventanaFuerte',
      categoria: 'emocionpropia',
      nivel: 3,
      titulo: 'CIERRAN LA VENTANA FUERTE',
      pictos: [
        'ventanaFuerte/picto.png',
      ],
      pasos: (() => { // [cite: 417]
        const base = 'ventanaFuerte/';
        return [
          {
            tipo: 'situacion',
            titulo: 'SITUACIÓN',
            descripcion: 'Un compañero cierra la ventana fuerte',
            imagen: base + 'escena1.png'
          },
          {
            tipo: 'eleccion',
            titulo: '¿Cómo te sientes?',
            opciones: [
              { id: 'igual', texto: 'ME DA IGUAL', imagen: base + 'igual.png' },
              { id: 'feliz', texto: 'FELIZ', imagen: base + 'felicidad.png' },
              { id: 'enfadado', texto: 'ENFADADO', imagen: base + 'enfadado.png' },
              { id: 'sorpresa', texto: 'SORPRENDIDO', imagen: base + 'sorpresa.png' },
            ]
          },
        ]
        })()
      },      


      { 
        id: 'excursion',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ VAN HACER ESTOS NIÑOS?',
        pictos: [
          'excursion/picto.png',
          'exccursion//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'excursion/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van este grupo de niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Dónde van?',
              opciones: [
                { id: 'situacio', texto: 'VAN HA MONTAR BICICLETA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VAN AL SUPERMERCADO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'VAN DE EXCURSIÓN', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'naturaleza',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ HACEN ESTOS NIÑOS?',
        pictos: [
          'naturaleza/picto.png',
          'naturaleza//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'naturaleza/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qúe estan haciendo estos niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'COMER', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'OBSERVAR LAS HOJAS', imagen: base + 'situacio2.png',},
                { id: 'situacio3', texto: 'DIBUJAR', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
         { 
        id: 'piscina',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿A DÓNDE VA LA NIÑA?',
        pictos: [
          'piscina/picto.png',
          'piscina//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'piscina/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde va la niña?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde va?',
              opciones: [
                { id: 'situacio', texto: 'A LA PISCINA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'A LA PARADA DE BUS', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'AL SUPERMERCADO', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cumpleaños',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿DE QUIÉN ES EL CUMPLEAÑOS?',
        pictos: [
          'cumpleaños/picto.png',
          'cumpleaños//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cumpleaños/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿De quién es el cumpleaños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde va?',
              opciones: [
                { id: 'situacio', texto: 'DEL NIÑO CON LA CORONA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DEL NIÑO QUE ESTÁ TOMÁNDO LA FOTO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'DE LA NIÑA QUE TIENE UN REGALO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'DE LA NIÑA QUE ESTÁ BAILANDO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cumpleaños2',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿DE QUIÉN ES EL CUMPLEAÑOS?',
        pictos: [
          'cumpleaños2/picto.png',
          'cumpleaños2//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cumpleaños2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿De quién es el cumpleaños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde va?',
              opciones: [
                { id: 'situacio', texto: 'DEL NIÑO CON LA CORONA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DEL NIÑO QUE ESTÁ TOMÁNDO LA FOTO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'DE LA NIÑA QUE TIENE UN REGALO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'DEL NIÑO QUE ESTÁ COMIENDO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
          { 
        id: 'museo',
        categoria: 'coherencia',
        nivel: 3,
        titulo: '¿QUIÉN ES EL PINTOR?',
        pictos: [
          'museo/picto.png',
          'museo//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'museo/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Quién es el pintor de la obra medio terminada?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién es?',
              opciones: [
                { id: 'situacio', texto: 'LA NIÑA QUE ESTÁ MIRANDO EL CUADRO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'EL SEÑOR QUE SALE DEL BAÑO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'LA SEÑORA CON TURBANTE', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'EL SEÑOR QUE TIENE UN SOMBRERO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'comedor',
        categoria: 'coherencia',
        nivel: 3,
        titulo: '¿QUÉ OBJECTO FALTA PARA COMER?',
        pictos: [
          'comedor/picto.png',
          'comedor//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'comedor/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué objecto falta para comer?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién es?',
              opciones: [
                { id: 'situacio', texto: 'JARRA DE AGUA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SERVILLETAS', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'CUBIERTOS', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'aeropuerto',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿EN DÓNDE ESTÁN?',
        pictos: [
          'aeropuerto/picto.png',
          'aeropuerto//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'aeropuerto/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En dónde están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién es?',
              opciones: [
                { id: 'situacio', texto: 'AEROPUERTO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SUPERMERCADO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'PARQUE DE BOMBEROS', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'estacionAño',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN',
        pictos: [
          'estacionAño/picto.png',
          'estacionAño//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'estacionAño/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En qué estación del año están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'PRIMAVERA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VERANO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'OTOÑO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'INVIERNO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'dondeVan',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿A DÓNDE VAN LOS NIÑOS',
        pictos: [
          'dondeVan/picto.png',
          'dondeVan//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'dondeVan/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'A LA PISCINA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'AL AUTOBÚS', imagen: base + 'situacio2.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'queHacen',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿QUÉ HACEN LOS NIÑOS',
        pictos: [
          'queHacen/picto.png',
          'queHacen//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'queHacen/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué hacen los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'JUGAR CON LA PELOTA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DESCANSAR EN EL PATIO', imagen: base + 'situacio2.png' },
                 { id: 'situacio3', texto: 'UN PICNIC', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'bancAliments',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ HACEN LAS PERSONAS',
        pictos: [
          'bancAliments/picto.png',
          'bancAliments//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'bancAliments/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué hacen las personas?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'LIMPIAR', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'AYUDAR EN EL BANCO DE ALIMENTOS', imagen: base + 'situacio2.png' },
                 { id: 'situacio3', texto: 'COMPRAR EN EL SUPERMERCADO', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      
      { 
        id: 'cocinar',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿QUÉ HACEN LAS PERSONAS',
        pictos: [
          'cocinar/picto.png',
          'cocinar//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cocinar/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué hacen las personas?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Qué hacen?',
              opciones: [
                { id: 'situacio', texto: 'COMER', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'COCINAR', imagen: base + 'situacio2.png' },
                 { id: 'situacio3', texto: 'PASEAR', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'estacionAño2',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN?',
        pictos: [
          'estacionAño2/picto.png',
          'estacionAño2//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'estacionAño2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En qué estación del año están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'PRIMAVERA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VERANO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'OTOÑO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'INVIERNO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'estacionAño3',
        categoria: 'coherencia',
        nivel: 2,
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN?',
        pictos: [
          'estacionAño3/picto.png',
          'estacionAño3//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'estacionAño3/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿En qué estación del año están?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'Cúal estación del año?',
              opciones: [
                { id: 'situacio', texto: 'PRIMAVERA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'VERANO', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'OTOÑO', imagen: base + 'situacio3.png' },
                { id: 'situacio4', texto: 'INVIERNO', imagen: base + 'situacio4.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cine',
        categoria: 'coherencia',
        nivel: 1,
        titulo: '¿A DÓNDE VAN LOS NIÑOS?',
        pictos: [
          'cine/picto.png',
          'cine//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cine/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde?',
              opciones: [
                { id: 'situacio', texto: 'RESTAURANTE', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'CIRC', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'CINE', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cine',
        categoria: 'ejecutiva',
        nivel: 1,
        titulo: '¿A DÓNDE VAN LOS NIÑOS?',
        pictos: [
          'cine/picto.png',
          'cine//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cine/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde van los niños?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde?',
              opciones: [
                { id: 'situacio', texto: 'RESTAURANTE', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'CIRC', imagen: base + 'situacio2.png' },
                { id: 'situacio3', texto: 'CINE', imagen: base + 'situacio3.png' },
              ]
            },
          ]
          
        })()
      },
    ]
  }
};


export default textos;