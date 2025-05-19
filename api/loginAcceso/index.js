const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async function (context, req) {
  const { password } = req.body || {};

  if (!password) {
    context.res = { status: 400, body: { error: 'Falta contraseña' } };
    return;
  }

  // Compara contra el hash de entorno
  const match = await bcrypt.compare(password, process.env.ACCESO_PW_HASH);
  if (!match) {
    context.res = { status: 401, body: { error: 'Contraseña incorrecta' } };
    return;
  }

  // Firma el JWT
  const token = jwt.sign(
    { role: 'docente' },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { token }
  };
};
