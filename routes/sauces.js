const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

router.get("/", saucesCtrl.getAllSauces);
router.get("/:id", saucesCtrl.getById);
router.post("/", saucesCtrl.postPictureAndSauce);
router.put("/:id", saucesCtrl.putUpdateSauce);
router.delete("/:id", saucesCtrl.deleteById);
router.post("/:id/like", saucesCtrl.postLike);

module.exports = router;
