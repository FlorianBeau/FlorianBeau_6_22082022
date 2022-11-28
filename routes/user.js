// CREATION DES ROUTES POUR LA GESTION DES UTILISATEURS

const express = require("express");
const router = express.Router();
const limiter = require("../middleware/limiter");
const userCtrl = require("../controllers/user");

router.post("/signup", limiter.login, userCtrl.signup);
router.post("/login", limiter.login, userCtrl.login);

module.exports = router;
