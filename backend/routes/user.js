const express = require("express");
const userCtrl = require("../controllers/user");

const router = express.Router();

// Gestion des verbes HTTP
router.post("/signup", userCtrl.signup); // create new user
router.post("/login", userCtrl.login); // connexion user

module.exports = router;