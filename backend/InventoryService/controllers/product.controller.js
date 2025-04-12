const Product = require('../models/Product.model');
const Inventory = require('../models/Inventory.model');
const cloudinary = require('../config/cloudinary');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
  try {
    // Handle image uploads
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push({
          url: result.secure_url,
          public_id: result.public_id,
          isPrimary: images.length === 0 // First image is primary
        });
      }
    }

    const productData = {
      ...req.body,
      images
    };

    const product = await Product.create(productData);
    
    // Create initial inventory record
    await Inventory.create({
      product: product._id,
      quantity: req.body.initialStock || 0,
      lowStockThreshold: req.body.lowStockThreshold || 10
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    // Advanced filtering, sorting, pagination
    const features = new ApiFeatures(Product.find().populate('category'), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    
    const products = await features.query.populate('inventory');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('inventory');

    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    // Handle image updates if needed
    // (Implementation depends on your requirements)

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    // Delete images from Cloudinary
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Delete inventory record
    await Inventory.findOneAndDelete({ product: product._id });

    await product.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};