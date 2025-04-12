const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Protected admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  upload.array('images', 5),
  productController.createProduct
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  productController.updateProduct
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  productController.deleteProduct
);

module.exports = router;