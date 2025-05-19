const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async function(context, req) {
  try {
    const pw = req.body?.password
    if (!pw) {
      context.res = {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Falta la contraseña' }
      }
      return
    }
    const hash = process.env.DOCENTE_PW_HASH
    if (!hash) {
      context.res = {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'DOCENTE_PW_HASH no configurado' }
      }
      return
    }
    const match = await bcrypt.compare(pw, hash)
    if (!match) {
      context.res = {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Contraseña incorrecta' }
      }
      return
    }
    const token = jwt.sign(
      { scope: 'docente' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { token }
    }
  } catch (err) {
    context.log.error('loginDocente error:', err)
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Error interno del servidor' }
    }
  }
}
