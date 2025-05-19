// api/loginFront/index.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async function (context, req) {
  const { password } = req.body || {};
  if (!password) {
    context.res = { status: 400, body: { error: 'Falta contraseña' } };
    return;
  }
  const match = await bcrypt.compare(password, process.env.FRONT_PW_HASH);
  if (!match) {
    context.res = { status: 401, body: { error: 'Contraseña incorrecta' } };
    return;
  }
  const token = jwt.sign({ scope: 'front' }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  context.res = { body: { token } };
};
