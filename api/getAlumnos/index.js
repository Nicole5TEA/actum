const jwt = require('jsonwebtoken')
const { CosmosClient } = require('@azure/cosmos')

module.exports = async function (context, req) {
  const authHeader =
    req.headers['x-docente-token'] ||
    req.headers['x-front-token']

  if (!authHeader) {
    context.res = {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'No autorizado: falta token' }
    }
    return
  }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) {
    context.res = {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Formato de token inválido' }
    }
    return
  }
  const token = parts[1]

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    context.res = {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Token inválido' }
    }
    return
  }

  // Permitimos front y docente
  if (decoded.scope !== 'front' && decoded.scope !== 'docente') {
    context.res = {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Forbidden' }
    }
    return
  }

  try {
    const client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    })
    const container = client
      .database(process.env.COSMOS_DB)
      .container(process.env.COSMOS_CONTAINER)

    const { resources } = await container
      .items
      .query('SELECT c.nombre FROM c')
      .fetchAll()

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: resources
    }
  } catch (err) {
    context.log.error('Error consultando getAlumnos:', err)
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Error interno del servidor' }
    }
  }
}
