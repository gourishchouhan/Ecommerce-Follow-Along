const Product = require('../models/productModel');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, stock, createdBy } = req.body;

    // Validate input
    if (!name || !description || !price || !category || !images || !stock || !createdBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      stock,
      createdBy,
    });

    await newProduct.save();

    res.status(201).json({message: "Product created successfully", newProduct});
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'username email');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};