const Inventory = require('../models/Inventory.model');
const Product = require('../models/Product.model');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all inventory items
// @route   GET /api/v1/inventory
// @access  Private/Admin
exports.getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find().populate({
      path: 'product',
      select: 'name sku price'
    });

    res.status(200).json({
      success: true,
      count: inventory.length,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single inventory item
// @route   GET /api/v1/inventory/:id
// @access  Private/Admin
exports.getInventoryItem = async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate({
      path: 'product',
      select: 'name sku price'
    });

    if (!inventory) {
      return next(new ErrorResponse(`Inventory item not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update inventory quantity
// @route   PUT /api/v1/inventory/:id/quantity
// @access  Private/Admin
exports.updateInventoryQuantity = async (req, res, next) => {
  try {
    const { action, quantity, reason } = req.body;

    if (!['add', 'subtract', 'set'].includes(action)) {
      return next(new ErrorResponse(`Invalid action type: ${action}`, 400));
    }

    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return next(new ErrorResponse(`Inventory item not found with id of ${req.params.id}`, 404));
    }

    // Update quantity based on action
    switch (action) {
      case 'add':
        inventory.quantity += quantity;
        break;
      case 'subtract':
        if (inventory.quantity < quantity) {
          return next(new ErrorResponse(`Not enough stock to subtract ${quantity}`, 400));
        }
        inventory.quantity -= quantity;
        break;
      case 'set':
        inventory.quantity = quantity;
        break;
    }

    // Update last restocked if adding inventory
    if (action === 'add') {
      inventory.lastRestocked = new Date();
    }

    await inventory.save();

    res.status(200).json({
      success: true,
      data: inventory
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get low stock items
// @route   GET /api/v1/inventory/low-stock
// @access  Private/Admin
exports.getLowStockItems = async (req, res, next) => {
  try {
    const lowStockItems = await Inventory.find({
      status: 'low-stock'
    }).populate({
      path: 'product',
      select: 'name sku price'
    });

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get out of stock items
// @route   GET /api/v1/inventory/out-of-stock
// @access  Private/Admin
exports.getOutOfStockItems = async (req, res, next) => {
  try {
    const outOfStockItems = await Inventory.find({
      status: 'out-of-stock'
    }).populate({
      path: 'product',
      select: 'name sku price'
    });

    res.status(200).json({
      success: true,
      count: outOfStockItems.length,
      data: outOfStockItems
    });
  } catch (err) {
    next(err);
  }
};