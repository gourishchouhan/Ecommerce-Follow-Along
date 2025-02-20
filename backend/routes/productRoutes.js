const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, productController.createProduct);
router.get("/", productController.getAllProducts);

module.exports = router;