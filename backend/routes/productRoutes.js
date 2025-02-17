const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct); // Create a product
router.get('/', productController.getAllProducts); // Get all products

module.exports = router;