const Product = require("../models/productModel");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const fs = require("fs").promises;

const upload = multer({ dest: "uploads/" });

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const files = req.files;

    if (!name || !description || !price || !category || !stock || !files || files.length === 0) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const imageUploads = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
        await fs.unlink(file.path);
        return result.secure_url;
      })
    );

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images: imageUploads,
      stock,
      createdBy: req.user.id,
    });

    await newProduct.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: { product: newProduct },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");
    res.status(200).json({
      status: "success",
      data: { products },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ createdBy: userId }).populate("createdBy", "name email");
    res.status(200).json({
      status: "success",
      data: { products },
    });
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const files = req.files;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "error", message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    
    console.log("User ID from token:", req.user.id); // Added
    console.log("Product createdBy:", product.createdBy.toString()); // Added
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: "error", message: "Not authorized to edit this product" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    if (files && files.length > 0) {
      const imageUploads = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
          await fs.unlink(file.path);
          return result.secure_url;
        })
      );
      product.images = imageUploads;
    }

    await product.save();

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "error", message: "Invalid product ID" });
    }

    const product = await Product.findById(id).populate("createdBy", "name email");
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: "error", message: "Not authorized" });
    }

    res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  createProduct: [upload.array("images"), createProduct],
  getAllProducts,
  getUserProducts,
  updateProduct: [upload.array("images"), updateProduct],
  getProductById,
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "error", message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ status: "error", message: "Not authorized to delete this product" });
    }

    // Optionally delete images from Cloudinary (if needed)
    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map(async (imageUrl) => {
          const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
          await cloudinary.uploader.destroy(`products/${publicId}`);
        })
      );
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Add to exports
module.exports = {
  createProduct: [upload.array("images"), createProduct],
  getAllProducts,
  getUserProducts,
  updateProduct: [upload.array("images"), updateProduct],
  getProductById,
  deleteProduct, // Added
};