const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

module.exports = async function(context, req) {
  if (req.query.debug === '1') {
    context.res = {
      status: 200,
      body: {
        JWT_SECRET: process.env.JWT_SECRET,
        DOCENTE_PW_HASH: process.env.DOCENTE_PW_HASH,
        passwordReceived: req.body?.password
      }
    };
    return;
  }
  const pw = req.body?.password;
  if (!pw) {
    context.res = { status: 400, body: 'Falta el campo password' };
    return;
  }
  const ok = await bcrypt.compare(pw, process.env.DOCENTE_PW_HASH);
  if (!ok) {
    context.res = { status: 401, body: 'Password incorrecta' };
    return;
  }
  const token = jwt.sign({ role: 'docente' }, process.env.JWT_SECRET, { expiresIn: '2h' });
  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { token }
  };
};