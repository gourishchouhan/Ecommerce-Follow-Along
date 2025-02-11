const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  images: [{
    type: String,
    required: [true, 'At least one product image is required']
  }],
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;