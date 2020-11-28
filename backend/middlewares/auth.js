const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs');
const { Error401 } = require('../errors/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error401('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error401('Необходима авторизация');
  }
  req.user = payload;
  return next();
};

module.exports = auth;
