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
      pasoTituloSituacion: 'SITUACIÓN',
      pasoTituloEleccion: '¿QUÉ HACES?', // O un genérico si varía mucho
      pasoTituloResultado: 'CONSECUENCIA PROBABLE',
      categories: {
        social: 'Situaciones sociales',
        emocionpropia: 'Emociones',
        teoriamente: 'Teoria de la mente',
        coherencia: 'Coherencia central',
        ejecutiva: 'Función ejecutiva',
        memoria: 'Planificación de memoria',
        caras: 'Reconocimiento expresión facial',
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
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'El autobús llega tarde',
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
        id: 'repartidor',
        categoria: 'emocionpropia',
        nivel: 3,
        titulo: 'LLEGA EL REPARTIDOR',
        pictos: [
          'repartidor/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'repartidor/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Llega el repartidor de la comida del comedor',
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
        id: 'equivocar',
        categoria: 'emocionpropia',
        nivel: 3,
        titulo: 'TE EQUIVOCAS',
        pictos: [
          'equivocar/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'equivocar/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Te equivocas bailando',
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
                { id: 'nervios', texto: 'NERVIOSO', imagen: base + 'nervios.png' },
              ]
            },
          ]
          
        })()
      },   
      {
        id: 'charco',
        categoria: 'emocionpropia',
        nivel: 3,
        titulo: 'PISAS UN CHARCO',
        pictos: [
          'charco/picto.png',
          'charco/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'charco/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Pisas un charco y te mojas en pie',
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
                { id: 'nervios', texto: 'NERVIOSO', imagen: base + 'nervios.png' },
              ]
            },
          ]
          
        })()
      },
      {
        id: 'nuevoProfe',
        categoria: 'emocionpropia',
        nivel: 3,
        titulo: 'NUEVO MAESTRO',
        pictos: [
          'nuevoProfe/picto.png',
          'nuevoProfe/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'nuevoProfe/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Mañana llega un nuevo profesor',
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
                { id: 'nervios', texto: 'NERVIOSO', imagen: base + 'nervios.png' },
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
          'excursion//picto2.png',
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
                { id: 'situacio', texto: 'VAN A MONTAR BICICLETA', imagen: base + 'situacio.png' },
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
        id: 'cambioRutina',
        categoria: 'ejecutiva',
        nivel: 1,
        titulo: 'PAPÁ SALE TARDE DE TRABAJAR',
        pictos: [
          'cambioRutina/picto.png',
          'cambioRutina//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cambioRutina/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Papá debería recogerte en el colegio. Pero llega tu tia porque papá sale tarde del trabajo.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Con quién vuelves a casa hoy?',
              opciones: [
                { id: 'situacio', texto: 'PAPÁ', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'TÍA', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'cumpleañosFamiliar',
        categoria: 'ejecutiva',
        nivel: 3,
        titulo: 'ES EL CUMPLEAÑOS DE UN FAMILIAR',
        pictos: [
          'cumpleañosFamiliar/picto.png',
          'cumpleañosFamiliar//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cumpleañosFamiliar/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Es el cumpleaños de tu tia',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Dónde cenaréis?',
              opciones: [
                { id: 'situacio', texto: 'CASA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'CASA DE TUS TIOS', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'paris',
        categoria: 'ejecutiva',
        nivel: 1,
        titulo: 'MAMÁ ESTÁ DE VIAJE',
        pictos: [
          'paris/picto.png',
          'paris//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'paris/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Mamá está de viaje. ¿Quién te viene a buscar al colegio?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién te viene a buscar al colegio?',
              opciones: [
                { id: 'situacio', texto: 'ABUELO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'MAMÁ', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
            { 
        id: 'cambioMantas',
        categoria: 'ejecutiva',
        nivel: 1,
        titulo: 'HOY SE LAVAN LAS SÁBANAS DE TU CAMA',
        pictos: [
          'cambioMantas/picto.png',
          'cambioMantas//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'cambioMantas/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Las sábanas tendran otro color u oleran diferente cuándo vaya a dormir esta noche?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién te viene a buscar al colegio?',
              opciones: [
                { id: 'situacio', texto: 'SÍ', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'NO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'papaMedico',
        categoria: 'ejecutiva',
        nivel: 2,
        titulo: 'HOY PAPÁ TIENE MÉDICO',
        pictos: [
          'papaMedico/picto.png',
          'papaMedico//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'papaMedico/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Papá te recoge siempre del colegio. Hoy tiene medico por la tarde. ¿Quién te recoge hoy?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Quién te viene a buscar al colegio?',
              opciones: [
                { id: 'situacio', texto: 'PAPÁ', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'ABUELA', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'pan',
        categoria: 'ejecutiva',
        nivel: 1,
        titulo: 'NO HAY PAN EN EL SUPERMERCADO',
        pictos: [
          'pan/picto.png',
          'pan//picto2.png',
          'pan//picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pan/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'No hay pan en el supermercado. ¿Habrá pan para cenar?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Habrá pan para cenar?',
              opciones: [
                { id: 'situacio', texto: 'SÍ', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'NO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'mochila',
        categoria: 'ejecutiva',
        nivel: 2,
        titulo: 'SE HA MOJADO Y ENSUCIADO LA MOCHILA',
        pictos: [
          'mochila/picto.png',
          'mochila//picto2.png',
          'mochila//picto3.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pan/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Se ha mojado y ensuciado la mochila. ¿Cómo llevarás las cosas al colegio?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Cómo llevarás las cosas al colegio?',
              opciones: [
                { id: 'situacio', texto: 'EN LA MISMA MOCHILA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'EN OTRA MOCHILA', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'herida',
        categoria: 'ejecutiva',
        nivel: 2,
        titulo: 'ME HE CAIDO Y ME HE HERIDO EN LA RODILLA',
        pictos: [
          'herida/picto.png',
          'herida//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pan/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Me he caido y me he herido en la rodilla. ¿Dónde iré para sanar la herida?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Dónde iré para sanar la herida?',
              opciones: [
                { id: 'situacio', texto: 'CASA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'HOSPITAL', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'mojado',
        categoria: 'ejecutiva',
        nivel: 2,
        titulo: 'SE HA PUESTO A LLOVER Y ME HE MOJADO LA ROPA',
        pictos: [
          'mojado/picto.png',
          'mojado//picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'mojado/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Se ha puesto a llover y me he mojado la ropa. ¿Qué hago?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Qué hago?',
              opciones: [
                { id: 'situacio', texto: 'ME DEJO LA ROPA MOJADA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'ME PONGO ROPA SECA', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'dentista',
        categoria: 'ejecutiva',
        nivel: 3,
        titulo: '¿A DÓNDE VAS A IR DESPUÉS DEL COLEGIO?',
        pictos: [
          'dentista/picto.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'dentista/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A dónde vas a ir después del colegio?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A dónde?',
              opciones: [
                { id: 'situacio', texto: 'DENTISTA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'CASA', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'pedirAyuda',
        categoria: 'ejecutiva',
        nivel: 3,
        titulo: 'LA MAESTRA SE VA DE CLASE. ¿A QUIÉN PIDO AYUDA CON LA TAREA?',
        pictos: [
          'pedirAyuda/picto.png',
          'pedirAyuda/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pedirAyuda/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿A quién pido ayuda con la tarea?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿A quién?',
              opciones: [
                { id: 'situacio', texto: 'A LA MISMA MAESTRA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'A OTRO MAESTRO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'verano',
        categoria: 'ejecutiva',
        nivel: 3,
        titulo: 'ES VERANO Y HACE MUCHO CALOR. ¿QUÉ PUEDO COMER PARA NO TENER CALOR?',
        pictos: [
          'verano/picto.png',
          'verano/picto2.png',
        ],
        pasos: (() => { // [cite: 417]
          const base = 'verano/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '¿Qué puedo comer?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿Qué puedo comer?',
              opciones: [
                { id: 'situacio', texto: 'SOPA', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'HELADO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'avionRysa',
        categoria: 'teoriamente',
        nivel: 1,
        titulo: 'SITUACIÓN',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'avionRysa/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿HA VISTO RYSA EL AVIÓN?',
              opciones: [
                { id: 'situacio', texto: 'NO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SÍ', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'ivan',
        categoria: 'teoriamente',
        nivel: 1,
        titulo: 'SITUACIÓN',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'ivan/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿DÓNDE MIRA IVÁN?',
              opciones: [
                { id: 'situacio', texto: 'A LA PANTALLA DIGITAL', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'TOBOGAN', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'mirar',
        categoria: 'teoriamente',
        nivel: 1,
        titulo: 'SITUACIÓN',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'mirar/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿DÓNDE MIRA EL NIÑO?',
              opciones: [
                { id: 'situacio', texto: 'AUTOBÚS', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SUPERMERCADO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'erupto',
        categoria: 'teoriamente',
        nivel: 2,
        titulo: 'TIRARSE UN ERUPTO',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'erupto/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿LE HA GUSTADO A LA MAESTRA?',
              opciones: [
                { id: 'situacio', texto: 'NO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SÍ', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'abrazo',
        categoria: 'teoriamente',
        nivel: 2,
        titulo: 'DAR UN ABRAZO',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'abrazo/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿LE HA GUSTADO A LA MAESTRA?',
              opciones: [
                { id: 'situacio', texto: 'NO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SÍ', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'chocarFuerte',
        categoria: 'teoriamente',
        nivel: 2,
        titulo: 'CHOCAR LAS MANOS MUY FUERTE',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'chocarFuerte/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: '',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿LE HA GUSTADO A LA MAESTRA?',
              opciones: [
                { id: 'situacio', texto: 'NO', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'SÍ', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'perroRafa',
        categoria: 'teoriamente',
        nivel: 3,
        titulo: '',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'perroRafa/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'RAFA ESTÁ CON EL PERRO',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LA MAESTRA LE DICE A RAFA QUE VAYA A BUSCAR CHAPAS',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL PERRO SALE AL PATIO',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿DÓNDE PIENSA RAFA QUE ESTÁ EL PERRO?',
              opciones: [
                { id: 'situacio', texto: 'EN CLASE', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'EN EL PATIO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'pintarMesa',
        categoria: 'teoriamente',
        nivel: 3,
        titulo: '',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pintarMesa/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'SARA GUARDA SU LÁPIZ EN EL ESTUCHE',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'SARA VA AL LAVABO',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LEO COGE EL LÁPIZ DEL ESTUCHE',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LEO DIBUJA EN LA MESA',
              imagen: base + 'escena4.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿DÓNDE IRÁ A BUSCAR SARA SU LÁPIZ?',
              opciones: [
                { id: 'situacio', texto: 'EN EL ESTUCHE', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'DONDE LEO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'claseB',
        categoria: 'teoriamente',
        nivel: 3,
        titulo: '',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'claseB/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LOS ALUMNOS DE LA CLASE "B" ESTÁN EN CLASE',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LOS ALUMNOS DE LA CLSE "A" VAN A PISCINA Y SE ENTERAN QUE NO HAY AGUA',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿SABEN LOS ALUMNO "B" QUE NO HAY AGUA EN LA PSICINA?',
              opciones: [
                { id: 'situacio', texto: 'SÍ', imagen: base + 'situacio.png' },
                { id: 'situacio2', texto: 'NO', imagen: base + 'situacio2.png' }
              ]
            },
          ]
          
        })()
      },
      { 
        id: 'pintarMesa2',
        categoria: 'memoria',
        nivel: 1,
        titulo: '',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'pintarMesa2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL ALUMNO DIBUJA EN LA MESA. ¿QUÉ TIENE QUE HACER CUANDO ACABE?',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL ALUMNO CUANDO ACABE DE PINTAR TIENE QUE BORRAR EL DIBUJO',
              imagen: base + 'escena2.png'
            },
          ]
          
        })()
      },
      { 
        id: 'guardarTablet',
        categoria: 'memoria',
        nivel: 1,
        titulo: '',
        pictos: [
        ],
        pasos: (() => { // [cite: 417]
          const base = 'guardarTablet/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LA CHICA COGE UNA TABLET DEL ARMARIO',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LA CHICA ESTÁ USANDO LA TABLET. ¿QUÉ TIENE QUE HACER LA CHICA CUANDO ACABE DE USAR LA TABLET? ',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'LA CHICA GUARDA LA TABLET EN EL ARMARIO',
              imagen: base + 'escena3.png'
            },    
          ]
          
        })()
      },


      
      {
        id: 'pastelPequenoFiesta',
        categoria: 'social',
        nivel: 2,
        titulo: 'TROZO DE PASTEL PEQUEÑO EN FIESTA',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Todos comen tarta en la fiesta de cumpleaños de un amigo. A Leo le dan un trozo mucho más pequeño que a los demás, y algunos ríen.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿CÓMO REACCIONA LEO?',
              opciones: [
                { id: 'triste', texto: 'Leo se pone triste', imagen: '' },
                { id: 'contento', texto: 'Leo se pone contento igualmente', imagen: '' },
                { id: 'pregunta', texto: 'Leo pregunta por qué le han dado menos', imagen: '' },
                { id: 'rie', texto: 'Leo ríe con los demás', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                triste: { texto: 'Leo se queda callado y no disfruta mucho de la fiesta. Los demás podrían notarlo o seguir con la fiesta.', imagen: '' },
                contento: { texto: 'Leo come su trozo de tarta y sigue participando y divirtiéndose en la fiesta.', imagen: '' },
                pregunta: { texto: 'El amigo o un adulto podría darle una explicación (quizás fue un error o quedaban pocos trozos grandes).', imagen: '' },
                rie: { texto: 'La situación se toma con humor, la fiesta continúa y Leo sigue participando.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'jugueteRotoMisterio',
        categoria: 'social',
        nivel: 1,
        titulo: 'JUGUETE ROTO MISTERIOSO',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Mia deja su juguete preferido en la mesa y va al baño. Cuando vuelve, el juguete está roto y Alex le dice "no sé qué ha pasado".',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE MIA?',
              opciones: [
                { id: 'enfadaAcusa', texto: 'Mia se enfada y acusa a Alex', imagen: '' },
                { id: 'tristeLlora', texto: 'Mia se pone triste y llora', imagen: '' },
                { id: 'diceNoPasaNada', texto: 'Mia dice "está bien, no pasa nada"', imagen: '' },
                { id: 'rieBroma', texto: 'Mia ríe pensando que es una broma', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                enfadaAcusa: { texto: 'Alex podría enfadarse también o negar haberlo hecho, creando un conflicto.', imagen: '' },
                tristeLlora: { texto: 'Alex podría sentirse mal o intentar consolarla. Quizás un adulto intervenga.', imagen: '' },
                diceNoPasaNada: { texto: 'Alex podría sentirse aliviado. Mia podría buscar una solución o quedarse triste por dentro.', imagen: '' },
                rieBroma: { texto: 'Alex podría sorprenderse o seguir el juego si era una broma, o confundirse si no lo era.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'sinFelicitacionClase',
        categoria: 'social',
        nivel: 2,
        titulo: 'SIN FELICITACIÓN EN CLASE',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'En clase, la maestra felicita solo a algunos alumnos por el trabajo hecho. Lucas también lo hizo pero no recibe ninguna mención.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE O PIENSA LUCAS?',
              opciones: [
                { id: 'piensaMalTriste', texto: 'Lucas piensa que no lo ha hecho suficientemente bien y se pone triste', imagen: '' },
                { id: 'piensaOlvidoJuega', texto: 'Lucas piensa que la maestra se ha olvidado y se va a jugar igualmente', imagen: '' },
                { id: 'enfadaMaestra', texto: 'Lucas se enfada con la maestra', imagen: '' },
                { id: 'felicitaCompaneros', texto: 'Lucas felicita a los compañeros', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                piensaMalTriste: { texto: 'Lucas podría sentirse desanimado y menos motivado para futuros trabajos.', imagen: '' },
                piensaOlvidoJuega: { texto: 'Lucas no se ve afectado negativamente y disfruta de su tiempo de juego.', imagen: '' },
                enfadaMaestra: { texto: 'La maestra podría no entender su enfado o podría llevar a una conversación.', imagen: '' },
                felicitaCompaneros: { texto: 'Los compañeros se sentirán bien y Lucas mostrará una actitud positiva.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'regaloNoGustado',
        categoria: 'social',
        nivel: 2,
        titulo: 'REGALO QUE NO GUSTA EN INTERCAMBIO',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'En la escuela hacen un intercambio de regalos. A Sofia le dan un regalo que no le gusta nada, mientras ve que los otros reciben cosas que sí les gustan.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE SOFIA?',
              opciones: [
                { id: 'diceEncanta', texto: 'Sofia dice que le encanta para no hacer sentir mal al otro', imagen: '' },
                { id: 'caraDecepcion', texto: 'Sofia pone cara de decepción', imagen: '' },
                { id: 'preguntaCambiar', texto: 'Sofia pregunta si puede cambiar el regalo', imagen: '' },
                { id: 'levantaMarcha', texto: 'Sofia se levanta y se va', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                diceEncanta: { texto: 'El compañero que le dio el regalo se sentirá bien, aunque Sofia no sea sincera.', imagen: '' },
                caraDecepcion: { texto: 'El compañero podría sentirse mal o incómodo al notar su decepción.', imagen: '' },
                preguntaCambiar: { texto: 'Podría generar una situación incómoda o quizás se pueda encontrar una solución.', imagen: '' },
                levantaMarcha: { texto: 'Los demás podrían sorprenderse o pensar que es maleducada.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'noDejanJugarFutbol',
        categoria: 'social',
        nivel: 1,
        titulo: 'NO LE DEJAN JUGAR AL FÚTBOL',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Hugo se acerca a un grupo para jugar a fútbol, pero le dicen que no pueden jugar más porque ya están completos.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE HUGO?',
              opciones: [
                { id: 'estaBienTriste', texto: 'Hugo dice "está bien" y se va triste', imagen: '' },
                { id: 'insisteEnfada', texto: 'Hugo insiste y se enfada', imagen: '' },
                { id: 'noPasaNadaBuscaOtra', texto: 'Hugo dice "no pasa nada" y busca otra actividad', imagen: '' },
                { id: 'gritaLlora', texto: 'Hugo grita y se pone a llorar', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                estaBienTriste: { texto: 'Hugo se queda sin jugar con ellos y podría sentirse mal un rato.', imagen: '' },
                insisteEnfada: { texto: 'El grupo podría molestarse y seguir sin dejarle jugar, o podría crearse una discusión.', imagen: '' },
                noPasaNadaBuscaOtra: { texto: 'Hugo encontrará otra forma de divertirse y no generará un conflicto.', imagen: '' },
                gritaLlora: { texto: 'Los otros niños podrían asustarse o alejarse. Quizás un adulto intervenga.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'quiereJugueteAjeno',
        categoria: 'social',
        nivel: 1,
        titulo: 'QUIERE EL JUGUETE DE OTRO NIÑO',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Daniel está mirando cómo Elena juega con un juguete que a Daniel le gusta mucho. Quiere cogerlo pero Elena no ha terminado de jugar.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE DANIEL?',
              opciones: [
                { id: 'enfadaGrita', texto: 'Daniel se enfada y grita a Elena', imagen: '' },
                { id: 'pideDespues', texto: 'Daniel le pide a Elena si puede jugar después', imagen: '' },
                { id: 'quitaSinDecir', texto: 'Daniel le quita el juguete sin decir nada', imagen: '' },
                { id: 'poneLlorar', texto: 'Daniel se pone a llorar', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                enfadaGrita: { texto: 'Elena podría asustarse o enfadarse, y probablemente no quiera compartir el juguete.', imagen: '' },
                pideDespues: { texto: 'Elena podría aceptar y Daniel jugaría después, o podría decir que no.', imagen: '' },
                quitaSinDecir: { texto: 'Elena se enfadará y podría haber una pelea por el juguete.', imagen: '' },
                poneLlorar: { texto: 'Elena podría sentirse mal o confundida. Un adulto podría intervenir.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'manchaDibujoSinQuerer',
        categoria: 'social',
        nivel: 1,
        titulo: 'MANCHA EL DIBUJO SIN QUERER',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Adrian está pintando muy concentrado y Julia, sin querer, le mancha el dibujo al pasar por su lado.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE ADRIAN?',
              opciones: [
                { id: 'diceCuidado', texto: 'Adrian dice a Julia que vaya con más cuidado', imagen: '' },
                { id: 'nerviosoGolpea', texto: 'Adrian se pone muy nervioso y golpea a Julia', imagen: '' },
                { id: 'diceAdrede', texto: 'Adrian dice a Julia que ha estropeado el dibujo a propósito', imagen: '' },
                { id: 'sabeAccidenteArregla', texto: 'Adrian le dice a Julia que sabe que ha sido un accidentee intenta arreglar el dibujo', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                diceCuidado: { texto: 'Julia podría disculparse y tener más cuidado la próxima vez.', imagen: '' },
                nerviosoGolpea: { texto: 'Julia se asustará o se enfadará, y Adrian podría meterse en problemas.', imagen: '' },
                diceAdrede: { texto: 'Julia se sentirá mal o se defenderá, negando que fuera a propósito.', imagen: '' },
                sabeAccidenteArregla: { texto: 'Julia se sentirá aliviada y podrían intentar arreglarlo juntos.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'escondeZapatosBroma',
        categoria: 'social',
        nivel: 2,
        titulo: 'LE ESCONDEN LOS ZAPATOS',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Paula esconde los zapatos de Mateo mientras juegan, riéndose, y Mateo no los encuentra y empieza a preocuparse.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE MATEO?',
              opciones: [
                { id: 'enfadaDiceNoGusta', texto: 'Mateo se enfada y le dice a Paula que no le ha gustado', imagen: '' },
                { id: 'rieJuegaIgual', texto: 'Mateo ríe y juega igualmente', imagen: '' },
                { id: 'ignoraVaTriste', texto: 'Mateo ignora la situación y se va triste', imagen: '' },
                { id: 'pideAyudaDocente', texto: 'Mateo pide ayuda al docente y explica qué ha pasado', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                enfadaDiceNoGusta: { texto: 'Paula podría darse cuenta de que su broma no fue divertida y devolver los zapatos.', imagen: '' },
                rieJuegaIgual: { texto: 'Paula podría pensar que a Mateo le parece divertido y seguir con la broma o parar.', imagen: '' },
                ignoraVaTriste: { texto: 'Paula podría sentirse mal o seguir con la broma. Mateo no resolverá la situación.', imagen: '' },
                pideAyudaDocente: { texto: 'El docente ayudará a Mateo a encontrar sus zapatos y hablará con Paula sobre la broma.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'cogeTijerasMaestra',
        categoria: 'social',
        nivel: 1,
        titulo: 'COGE LAS TIJERAS DE LA MAESTRA',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'David coge unas tijeras grandes de la mesa de la maestra sin permiso. La maestra le dice que las tiene que devolver.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE DAVID?',
              opciones: [
                { id: 'noDevuelveNecesita', texto: 'David dice que no las devolverá porque las necesita', imagen: '' },
                { id: 'devuelveNoSabia', texto: 'David las devuelve y dice que no sabía que no podía cogerlas', imagen: '' },
                { id: 'escondeNadieEncuentre', texto: 'David las esconde para que nadie las encuentre', imagen: '' },
                { id: 'gritaTodosCogen', texto: 'David grita que todo el mundo coge cosas', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                noDevuelveNecesita: { texto: 'La maestra insistirá y le explicará por qué no puede usarlas sin permiso.', imagen: '' },
                devuelveNoSabia: { texto: 'La maestra aceptará las tijeras y le recordará que debe pedir permiso.', imagen: '' },
                escondeNadieEncuentre: { texto: 'La maestra se preocupará y buscará las tijeras. David podría tener problemas.', imagen: '' },
                gritaTodosCogen: { texto: 'La maestra intentará calmarlo y le explicará las normas de la clase.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'cogeMagdalenaAntesTiempo',
        categoria: 'social',
        nivel: 1,
        titulo: 'COGE UNA MAGDALENA ANTES DE TIEMPO',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Valeria ha cogido una magdalena de la bandeja que era para después de la actividad. La docente le dice que no es el momento de comer.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE VALERIA?',
              opciones: [
                { id: 'devuelveNoSabia', texto: 'Valeria la devuelve y dice que no lo sabía', imagen: '' },
                { id: 'comeRapido', texto: 'Valeria se la come rápidamente antes de que le puedan decir nada', imagen: '' },
                { id: 'diceHambreNoEspera', texto: 'Valeria dice que tiene hambre y no quiere esperar', imagen: '' },
                { id: 'lloraTratoMal', texto: 'Valeria llora y dice que todo el mundo le trata mal', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                devuelveNoSabia: { texto: 'La docente aceptará la magdalena y le recordará esperar al momento indicado.', imagen: '' },
                comeRapido: { texto: 'La docente le dirá que no estuvo bien y que debe respetar las normas.', imagen: '' },
                diceHambreNoEspera: { texto: 'La docente le explicará que debe esperar como los demás y quizás le ofrezca algo pequeño si es necesario.', imagen: '' },
                lloraTratoMal: { texto: 'La docente intentará calmarla y explicarle la situación con paciencia.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'ignoraOrdenDocente',
        categoria: 'social',
        nivel: 2,
        titulo: 'IGNORA LA ORDEN DE LA DOCENTE',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Martin está jugando con piezas que son para otra actividad y la docente le dice dos veces que las deje.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE MARTIN?',
              opciones: [
                { id: 'noParaSigueJugando', texto: 'Martin dice que no quiere parar y continúa jugando', imagen: '' },
                { id: 'noContestaHaceNoEscucha', texto: 'Martin no contesta y hace como que no escucha', imagen: '' },
                { id: 'ignoraLuegoDevuelvePideOtras', texto: 'Martin ignora pero después devuelve las piezas y pide usar otras', imagen: '' },
                { id: 'sigueJugandoDiceNoOyo', texto: 'Martin continúa jugando y después dice que no había oído nada', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                noParaSigueJugando: { texto: 'La docente podría detener la actividad o tomar medidas para que Martin siga las instrucciones.', imagen: '' },
                noContestaHaceNoEscucha: { texto: 'La docente se acercará y le repetirá la instrucción directamente.', imagen: '' },
                ignoraLuegoDevuelvePideOtras: { texto: 'La docente podría apreciar que finalmente cooperó, aunque tarde.', imagen: '' },
                sigueJugandoDiceNoOyo: { texto: 'La docente podría no creerle y le recordará la importancia de escuchar.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'cogeZumoAjenoEnfado',
        categoria: 'social',
        nivel: 1,
        titulo: 'COGE EL ZUMO DE OTRO Y SE ENFADA',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Olivia ha cogido el zumo de otro niño. Cuando le dicen que no es suyo, lo devuelve pero se pone a gritar y se encierra en sí misma.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ PASA DESPUÉS?',
              opciones: [
                { id: 'diceNoVolveraPidePerdon', texto: 'Olivia dice que no lo volverá a hacer y pide perdón', imagen: '' },
                { id: 'devuelveNoHablaMas', texto: 'Olivia lo devuelve pero dice que no quiere hablar con nadie más', imagen: '' },
                { id: 'lanzaZumoSuelo', texto: 'Olivia lanza el zumo al suelo', imagen: '' },
                { id: 'noImportaNadieDiceQueHacer', texto: 'Olivia dice que no le importa y que nadie le dice qué tiene que hacer', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                diceNoVolveraPidePerdon: { texto: 'El otro niño y el docente apreciarán su disculpa y la situación se calmará.', imagen: '' },
                devuelveNoHablaMas: { texto: 'Olivia necesitará un tiempo para calmarse. Los demás respetarán su espacio.', imagen: '' },
                lanzaZumoSuelo: { texto: 'Se creará un desorden y Olivia podría tener consecuencias por su comportamiento.', imagen: '' },
                noImportaNadieDiceQueHacer: { texto: 'La situación podría empeorar y necesitar la intervención de un adulto para resolver el conflicto.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'invitacionJugarFutbol',
        categoria: 'social',
        nivel: 1,
        titulo: 'INVITACIÓN A JUGAR AL FÚTBOL',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Carla se acerca a Leo y le dice: "¿Quieres jugar con nosotros a fútbol?"',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ RESPONDE LEO?',
              opciones: [
                { id: 'siPreguntaQueHacer', texto: 'Leo dice que sí y pregunta qué tienen que hacer', imagen: '' },
                { id: 'noQuiereJugarNunca', texto: 'Leo dice que no quiere jugar con nadie nunca', imagen: '' },
                { id: 'ignoraMarcha', texto: 'Leo los ignora y se va', imagen: '' },
                { id: 'jugadVosotrosOtraCosa', texto: 'Leo dice "jugad vosotros, yo haré otra cosa" sin mirarlos', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                siPreguntaQueHacer: { texto: 'Leo se unirá al juego y se divertirá con Carla y los demás.', imagen: '' },
                noQuiereJugarNunca: { texto: 'Carla y los demás se sorprenderán y jugarán sin él. Leo se quedará solo.', imagen: '' },
                ignoraMarcha: { texto: 'Carla se sentirá rechazada y jugarán sin él. Leo no interactuará.', imagen: '' },
                jugadVosotrosOtraCosa: { texto: 'Carla podría sentirse un poco mal, pero respetará su decisión y jugarán sin él.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'esperarTurnoBano',
        categoria: 'social',
        nivel: 1,
        titulo: 'ESPERAR TURNO PARA EL BAÑO',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Mia está en una fila para ir al baño. Quiere pasar primero, pero hay otros niños delante.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE MIA?',
              opciones: [
                { id: 'esperaTurno', texto: 'Mia espera su turno', imagen: '' },
                { id: 'enfadaAdelanta', texto: 'Mia se enfada y se adelanta', imagen: '' },
                { id: 'gritaNecesitaMas', texto: 'Mia grita que lo necesita más que nadie', imagen: '' },
                { id: 'intentaEntrarSinVer', texto: 'Mia intenta entrar sin que nadie le vea', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                esperaTurno: { texto: 'Mia usará el baño cuando le toque, respetando a los demás.', imagen: '' },
                enfadaAdelanta: { texto: 'Los otros niños se molestarán y podrían quejarse al profesor.', imagen: '' },
                gritaNecesitaMas: { texto: 'Generará malestar en la fila y es probable que no consiga pasar antes.', imagen: '' },
                intentaEntrarSinVer: { texto: 'Podría ser descubierta y recibir una llamada de atención.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'quiereOtroJuegoGrupo',
        categoria: 'social',
        nivel: 2,
        titulo: 'QUIERE JUGAR A OTRA COSA DIFERENTE AL GRUPO',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'El grupo ha decidido jugar a las cartas, pero Lucas quiere jugar a construcciones.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE LUCAS?',
              opciones: [
                { id: 'proponeAmbas', texto: 'Lucas propone hacer las dos cosas después de un tiempo', imagen: '' },
                { id: 'marchaEnfadado', texto: 'Lucas se va enfadado', imagen: '' },
                { id: 'diceAburrido', texto: 'Lucas dice que el juego del grupo es aburrido', imagen: '' },
                { id: 'insisteCambien', texto: 'Lucas insiste hasta que todos cambian', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                proponeAmbas: { texto: 'El grupo podría aceptar la propuesta y todos podrían disfrutar de ambos juegos.', imagen: '' },
                marchaEnfadado: { texto: 'Lucas no jugará con el grupo y se perderá la diversión. El grupo jugará a las cartas.', imagen: '' },
                diceAburrido: { texto: 'Los miembros del grupo podrían sentirse mal o ignorar su comentario.', imagen: '' },
                insisteCambien: { texto: 'El grupo podría ceder o molestarse por la insistencia.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'noCompartenGalleta',
        categoria: 'social',
        nivel: 1,
        titulo: 'NO LE COMPARTEN UNA GALLETA',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Sofia quiere una galleta del desayuno de su compañero Samuel, pero Samuel le dice que no puede compartir porque solo tiene una.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE SOFIA?',
              opciones: [
                { id: 'acuerdoComeSuyo', texto: 'Sofia dice "de acuerdo" y come su desayuno', imagen: '' },
                { id: 'diceEgoista', texto: 'Sofia dice "eres un egoísta"', imagen: '' },
                { id: 'quitaGalletaRapido', texto: 'Sofia le quita la galleta rápidamente', imagen: '' },
                { id: 'lloraGritando', texto: 'Sofia se pone a llorar gritando', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                acuerdoComeSuyo: { texto: 'Sofia respeta la decisión de Samuel y ambos comen su desayuno tranquilamente.', imagen: '' },
                diceEgoista: { texto: 'Samuel podría sentirse mal o enfadarse con Sofia.', imagen: '' },
                quitaGalletaRapido: { texto: 'Samuel se enfadará mucho y podría haber una discusión o pelea.', imagen: '' },
                lloraGritando: { texto: 'Llamará la atención de todos y un adulto probablemente intervendrá.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'unirseJuegoParque',
        categoria: 'social',
        nivel: 1,
        titulo: 'UNIRSE A UN JUEGO EN EL PARQUE',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Hugo llega al parque y ve un grupo de niños que conoce, pero no sabe cómo unirse al juego.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE HUGO?',
              opciones: [
                { id: 'holaPuedoJugar', texto: 'Hugo dice "¿hola, puedo jugar con vosotros?"', imagen: '' },
                { id: 'miraNoDiceNada', texto: 'Hugo se queda mirando y no dice nada', imagen: '' },
                { id: 'acercaCogeJuguete', texto: 'Hugo se acerca y coge un juguete sin pedir permiso', imagen: '' },
                { id: 'yaEstoyAquiGrita', texto: 'Hugo dice "¡ya estoy aquí!" y grita muy fuerte', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                holaPuedoJugar: { texto: 'Los niños probablemente le dirán que sí y Hugo se unirá al juego.', imagen: '' },
                miraNoDiceNada: { texto: 'Los niños seguirán jugando y Hugo se quedará sin participar a menos que alguien lo invite.', imagen: '' },
                acercaCogeJuguete: { texto: 'Los niños podrían enfadarse porque no pidió permiso y no quieran jugar con él.', imagen: '' },
                yaEstoyAquiGrita: { texto: 'Los niños podrían sorprenderse o asustarse. Podrían aceptarlo o rechazarlo.', imagen: '' }
              }
            }
          ]
        })()
      },
      {
        id: 'errorEnJuegoCorregido',
        categoria: 'social',
        nivel: 2,
        titulo: 'COMETE UN ERROR Y LE CORRIGEN',
        pictos: [],
        pasos: (() => {
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Daniel confunde las instrucciones de un juego y todos le corrigen. Se siente avergonzado.',
              imagen: ''
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ HACE DANIEL?',
              opciones: [
                { id: 'graciasNoSabia', texto: 'Daniel dice "gracias, no lo sabía" y continúa jugando', imagen: '' },
                { id: 'enfadaDejaJuego', texto: 'Daniel se enfada y deja el juego', imagen: '' },
                { id: 'otrosTambienEquivocan', texto: 'Daniel dice que los otros también se equivocan', imagen: '' },
                { id: 'gritaNoEsJusto', texto: 'Daniel grita "¡no es justo!"', imagen: '' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                graciasNoSabia: { texto: 'El juego continúa con normalidad y Daniel aprende de su error.', imagen: '' },
                enfadaDejaJuego: { texto: 'Daniel no disfrutará del juego y los demás seguirán jugando sin él.', imagen: '' },
                otrosTambienEquivocan: { texto: 'Podría generar una discusión y un ambiente tenso en el juego.', imagen: '' },
                gritaNoEsJusto: { texto: 'Los demás jugadores se sentirán incómodos y el juego podría interrumpirse.', imagen: '' }
              }
            }
          ]
        })()
      }
// END OF NEW SOCIAL SITUATIONS
// [ ... rest of textos.js ... ]
    ]
  },
  ca: {
    ui: {
      portadaTitle: 'TE(A)NTENC',
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
      pasoTituloSituacion: 'SITUACIÓ',
      pasoTituloEleccion: 'QUÈ FAS', // O un genérico
      pasoTituloResultado: 'CONSEQÜÈNCIA PROBABLE',
      categories: {
        social: 'Situacions socials',
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
        titulo: '¿EN QUÉ ESTACIÓN DEL AÑO ESTÁN?',
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
              titulo: '¿Cúal estación del año?',
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
}

export default textos;