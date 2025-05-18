// api/guardarRespuestas/index.js

const { CosmosClient } = require('@azure/cosmos');

const endpoint = process.env.COSMOS_ENDPOINT;
const key      = process.env.COSMOS_KEY;
const dbName   = process.env.COSMOS_DB_NAME;
const contName = process.env.COSMOS_CONTAINER_NAME;

const client    = new CosmosClient({ endpoint, key });
const container = client.database(dbName).container(contName);


module.exports = async function (context, req) {
  try {
    // 1. Validación mínima
    const { id, respuestas } = req.body || {};
    if (!id || !Array.isArray(respuestas)) {
      context.res = {
        status: 400,
        body: { error: 'Falta el id o el array de respuestas.' }
      };
      return;
    }

    // 2. Leer el documento existente
    const item = container.item(id, id);
    const { resource: alumno } = await item.read();
    if (!alumno) {
      context.res = { status: 404, body: { error: 'Alumno no encontrado.' } };
      return;
    }

    // 3. Actualizar el array de respuestas
    // Si quieres añadir al final:
    alumno.respuestas = (alumno.respuestas || []).concat(respuestas);

    // 4. Reemplazar el documento en Cosmos
    const { resource: updated } = await item.replace(alumno);

    // 5. Devolver el documento actualizado
    context.res = {
      status: 200,
      body: updated
    };
  } catch (err) {
    context.log.error('guardarRespuestas error:', err);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
