// api/getAlumnos/index.js
const { CosmosClient } = require('@azure/cosmos');
const jwt = require('jsonwebtoken');

function autorizar(req) {
  // Aceptamos **dos** encabezados: X-Docente-Token o X-Acceso-Token
  const hdr =
    req.headers['x-docente-token'] ||
    req.headers['x-acceso-token'] ||
    '';

  if (!hdr.toLowerCase().startsWith('bearer ')) return false;
  const token = hdr.slice(7).trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Permitimos roles “docente” (panel) **o** “ingreso” (lista pública)
    return ['docente', 'ingreso'].includes(payload.role);
  } catch {
    return false;
  }
}

module.exports = async function (context, req) {
  if (!autorizar(req)) {
    context.res = { status: 401, body: 'No autorizado' };
    return;
  }

  try {
    const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
    const container = client
      .database(process.env.COSMOS_DB_DATABASE)
      .container(process.env.COSMOS_DB_CONTAINER);

    const { resources } = await container.items
      .query('SELECT * FROM c')
      .fetchAll();

    context.res = { status: 200, body: resources };
  } catch (err) {
    context.log.error('getAlumnos error:', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
