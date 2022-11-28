// CREATION DES ROUTES POUR LA GESTION DES SAUCES

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const limiter = require("../middleware/limiter");

const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getAllSauces);
router.get("/:id", auth, saucesCtrl.getById);

router.post("/", limiter.global, auth, multer, saucesCtrl.postPictureAndSauce);
router.put("/:id", limiter.global, auth, multer, saucesCtrl.putUpdateSauce);
router.delete("/:id", limiter.global, auth, saucesCtrl.deleteById);
router.post("/:id/like", limiter.global, auth, saucesCtrl.postLike);

module.exports = router;
