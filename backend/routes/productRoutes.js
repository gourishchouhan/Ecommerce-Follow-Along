const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

console.log("productController:", productController); // Debug log

router.post("/", authMiddleware, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/my-products", authMiddleware, productController.getUserProducts);
router.put("/:id", authMiddleware, productController.updateProduct);
router.get("/:id", authMiddleware, productController.getProductById);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;