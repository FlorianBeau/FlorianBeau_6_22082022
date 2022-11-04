// Middleware = permet d'effectuer des traitements intermédiaires lancés par la route avant le controller

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Il manquerait ce code ?
    req.token = jwt.verify(token, "e07518e7048f21685308a2f7b61eb371");

    // ANCIEN CODE
    // jwt.verify(token, "RANDOM_TOKEN_SECRET");

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
