const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/multer");

// Register user with file upload
router.post("/register", upload.single("profilePicture"), userController.registerUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUser);

// Update user
router.put("/:id", upload.single("profilePicture"), userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
