const Product = require("../models/productModel");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const fs = require("fs").promises; // For file cleanup

const upload = multer({ dest: "uploads/" });

const createProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const { name, description, price, category, stock } = req.body;
    const files = req.files;

    if (!name || !description || !price || !category || !stock || !files || files.length === 0) {
      console.log("Missing fields:", { name, description, price, category, stock, files });
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ status: "error", message: "Invalid creator ID" });
    }

    // Upload images to Cloudinary and clean up temp files
    const imageUploads = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, { folder: "products" });
          console.log("Cloudinary Upload Result:", result);
          await fs.unlink(file.path); // Delete temp file after upload
          return result.secure_url;
        } catch (err) {
          console.error("Cloudinary Upload Error:", err);
          throw new Error("Failed to upload image to Cloudinary");
        }
      })
    );

    console.log("Image URLs:", imageUploads);

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
    console.error("Detailed Error in createProduct:", error);
    res.status(500).json({ status: "error", message: error.message || "Server error" });
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

module.exports = {
  createProduct: [upload.array("images"), createProduct],
  getAllProducts,
};