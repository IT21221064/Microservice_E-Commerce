const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product reference is required"],
    unique: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: [0, "Threshold cannot be negative"],
  },
  lastRestocked: Date,
  nextRestockEstimate: Date,
  status: {
    type: String,
    enum: ["in-stock", "low-stock", "out-of-stock", "discontinued"],
    default: "in-stock",
  },
  locations: [
    {
      warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      aisle: String,
      shelf: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
inventorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Update status based on quantity
  if (this.quantity <= 0) {
    this.status = "out-of-stock";
  } else if (this.quantity <= this.lowStockThreshold) {
    this.status = "low-stock";
  } else {
    this.status = "in-stock";
  }

  next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
