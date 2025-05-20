// api/guardarRespuestas/index.js
const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
  // 1) Leer y validar configuración de Cosmos DB
  const connectionString = process.env.COSMOS_DB_CONNECTION;
  const endpoint         = process.env.COSMOS_ENDPOINT;
  const key              = process.env.COSMOS_KEY;
  const dbName           = process.env.COSMOS_DB_DATABASE;
  const contName         = process.env.COSMOS_DB_CONTAINER;

  // Comprobamos que tengamos o bien connectionString o bien endpoint+key,
  // y además dbName y contName
  if ((!connectionString && !(endpoint && key)) || !dbName || !contName) {
    context.log.error('Faltan variables de entorno de Cosmos DB:', {
      connectionString: !!connectionString,
      endpoint:         !!endpoint,
      key:              !!key,
      dbName:           !!dbName,
      contName:         !!contName
    });
    context.res = {
      status: 500,
      body: { error: 'Configuración de Cosmos DB incompleta.' }
    };
    return;
  }

  // 2) Instanciar aquí el cliente
  let client, container;
  try {
    if (connectionString) {
      client = new CosmosClient(connectionString);
    } else {
      client = new CosmosClient({ endpoint, key });
    }
    container = client.database(dbName).container(contName);
  } catch (e) {
    context.log.error('Error inicializando CosmosClient:', e);
    context.res = {
      status: 500,
      body: { error: 'No se pudo inicializar el cliente de Cosmos DB.' }
    };
    return;
  }

  // 3) Body esperado y lógica de actualización
  try {
    const { id, respuestas } = req.body || {};
    if (!id || !Array.isArray(respuestas) || respuestas.length === 0) {
      context.res = {
        status: 400,
        body: { error: 'Falta id o array de respuestas.' }
      };
      return;
    }

    const item = container.item(id, id);
    const { resource: alumno } = await item.read();
    if (!alumno) {
      context.res = { status: 404, body: { error: 'Alumno no encontrado.' } };
      return;
    }

    // Normalizar cada registro nuevo: si no viene fecha, añadimos una ISO actual
    respuestas.forEach(r => {
      if (!r.fecha) r.fecha = new Date().toISOString();
    });

    alumno.respuestas = (alumno.respuestas || []).concat(respuestas);
    const { resource: updated } = await item.replace(alumno);

    context.res = { status: 200, body: updated };
  } catch (err) {
    context.log.error('guardarRespuestas error:', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
