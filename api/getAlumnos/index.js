// api/getAlumnos/index.js

const { CosmosClient } = require('@azure/cosmos');
const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
  // --- MODO DEBUG 2: decodifica y prueba la verificación ---
  if (req.query.debug === '2') {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    const decoded = token ? jwt.decode(token) : null;
    let verifyResult;
    try {
      verifyResult = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      verifyResult = { error: err.message };
    }
    context.res = {
      status: 200,
      body: {
        rawAuthorizationHeader: auth,
        token,
        decoded,
        verifyResult,
        JWT_SECRET: process.env.JWT_SECRET
      }
    };
    return;
  }

  // --- lógica normal ---
  function autorizar(req) {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Bearer ')) return false;
    try {
      const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
      return payload.role === 'docente';
    } catch {
      return false;
    }
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
