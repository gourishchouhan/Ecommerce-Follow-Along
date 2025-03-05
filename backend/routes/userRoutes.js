const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

console.log("userController:", userController); // Debug log

router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;