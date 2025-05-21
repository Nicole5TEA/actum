// api/deleteAlumno/index.js
const { CosmosClient } = require('@azure/cosmos');
const jwt = require('jsonwebtoken');

function autorizar(req) {
  const auth = req.headers['x-docente-token'] || '';
  if (!auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.role === 'docente';
  } catch {
    return false;
  }
}

module.exports = async function (context, req) {
  if (!autorizar(req)) {
    context.res = { status: 401, body: 'No autorizado para eliminar alumno' };
    return;
  }

  const { alumnoId } = req.body || {};
  if (!alumnoId) {
    context.res = { status: 400, body: 'Falta el ID del alumno (alumnoId)' };
    return;
  }

  try {
    const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
    const database = client.database(process.env.COSMOS_DB_DATABASE);
    const container = database.container(process.env.COSMOS_DB_CONTAINER);

    // Verificar si el alumno existe antes de intentar eliminarlo (opcional pero buena práctica)
    const { resource: existingAlumno } = await container.item(alumnoId, alumnoId).read();
    if (!existingAlumno) {
      context.res = { status: 404, body: 'Alumno no encontrado' };
      return;
    }

    // Eliminar el alumno
    await container.item(alumnoId, alumnoId).delete();
    context.res = { status: 200, body: { message: `Alumno '${alumnoId}' eliminado correctamente` } };

  } catch (err) {
    context.log.error('deleteAlumno error:', err);
    if (err.code === 404) {
        context.res = { status: 404, body: { error: 'Alumno no encontrado.' } };
    } else {
        context.res = { status: 500, body: { error: err.message || 'Error al eliminar el alumno' } };
    }
  }
};