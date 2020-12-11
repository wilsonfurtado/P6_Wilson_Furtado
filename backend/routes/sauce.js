const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const sauceCtrl = require("../controllers/sauce");

const router = express.Router();

// Management HTTP

// Create a new sauce
router.post("/", auth, multer, sauceCtrl.createSauce);
// Get all the sauces
router.get("/", auth, sauceCtrl.getAllSauces); 
// Get a specific sauce
router.get("/:id", auth, sauceCtrl.getOneSauce);
// Modify a sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce); 
// Remove a sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce); 
 // Like ou dislike une sauce
router.post("/:id/like", auth, sauceCtrl.likeSauce);


module.exports = router;