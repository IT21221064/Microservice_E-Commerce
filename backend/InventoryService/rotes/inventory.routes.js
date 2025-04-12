const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');
const { protect, authorize } = require('../middleware/auth');

// Protected admin routes
router.get('/', protect, authorize('admin'), inventoryController.getInventory);
router.get('/:id', protect, authorize('admin'), inventoryController.getInventoryItem);
router.put('/:id/quantity', protect, authorize('admin'), inventoryController.updateInventoryQuantity);
router.get('/low-stock', protect, authorize('admin'), inventoryController.getLowStockItems);
router.get('/out-of-stock', protect, authorize('admin'), inventoryController.getOutOfStockItems);

module.exports = router;