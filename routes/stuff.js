const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/stuff");

// Routes similaires à app.use
// router.get("/", auth, stuffCtrl.getAllStuff);
// router.post("/", auth, multer, stuffCtrl.createThing);
// router.get("/:id", auth, stuffCtrl.getOneThing);
// router.put("/:id", auth, multer, stuffCtrl.modifyThing);
// router.delete("/:id", auth, stuffCtrl.deleteThing);

router.post("/api/auth/signup", auth);
router.post("/api/auth/login", auth);
router.get("/api/sauces", auth, stuffCtrl.getOneThing);
router.get("/api/sauces/:id", auth, stuffCtrl.getOneThing);
router.post("/api/sauces/", auth, stuffCtrl.getOneThing);

module.exports = router;
