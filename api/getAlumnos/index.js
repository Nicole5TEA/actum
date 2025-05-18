const { CosmosClient } = require('@azure/cosmos');
const jwt = require('jsonwebtoken');

// Valida el JWT para acceder al listado
function autorizar(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  try {
    // Usa el mismo secreto
    const payload = jwt.verify(token, 'as90ml39kl19skl21854kv');
    return payload.role === 'docente';
  } catch {
    return false;
  }
}

module.exports = async function (context, req) {
  context.log('>> JWT_SECRET en Function:', process.env.JWT_SECRET);
  context.log('>> Authorization header:', req.headers.authorization);
    // Si pides debug, devuelve las vars de entorno
    if (req.query.debug === '1') {
      context.res = {
        status: 200,
        body: {
          JWT_SECRET: process.env.JWT_SECRET,
          DOCENTE_PW_HASH: process.env.DOCENTE_PW_HASH
        }
      };
      return;
    }

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
