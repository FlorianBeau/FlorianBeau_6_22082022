const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const saucesCtrl = require("../controllers/sauces");

router.get("/", auth, saucesCtrl.getAllSauces); // Test: rajout de "auth"
router.get("/:id", auth, saucesCtrl.getById); // Test: rajout de "auth"

router.post("/", auth, multer, saucesCtrl.postPictureAndSauce); // Test: rajout de "auth"
router.put("/:id", auth, multer, saucesCtrl.putUpdateSauce); // Test: rajout de "auth"
router.delete("/:id", auth, saucesCtrl.deleteById); // Test: rajout de "auth"
router.post("/:id/like", auth, saucesCtrl.postLike); // Test: rajout de "auth"

module.exports = router;
