// Middleware = fonction d'Express entre la requête "req" et la réponse "res" permettant d'exécuter
// du code à ce moment la

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.auth = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
