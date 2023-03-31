const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (error) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  next();
};
