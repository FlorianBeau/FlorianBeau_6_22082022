const rateLimit = require("express-rate-limit");

const limiter = {
  global: rateLimit({
    windowMs: 60 * 1000, // 100 requêtes par minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
  login: rateLimit({
    windowMs: 60 * 1000,
    max: 10, // Limite à 10 pour la présentation, idéalement limité à 3
    standardHeaders: true,
    legacyHeaders: false,
  }),
};
module.exports = limiter;
