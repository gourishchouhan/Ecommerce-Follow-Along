// backend/controllers/productController.js
const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id
    });
    
    res.status(201).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name');
    
    res.status(200).json({
      status: 'success',
      data: { products }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};