const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be at least 0"],
    },
    cost: {
      type: Number,
      required: [true, "Product cost is required"],
      min: [0, "Cost must be at least 0"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    sku: {
      type: String,
      required: [true, "Product SKU is required"],
      unique: true,
    },
    barcode: {
      type: String,
      unique: true,
      sparse: true,
    },
    images: [
      {
        url: String,
        public_id: String,
        isPrimary: Boolean,
      },
    ],
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for inventory data
productSchema.virtual("inventory", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "product",
  justOne: true,
});

// Update timestamp on save
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
