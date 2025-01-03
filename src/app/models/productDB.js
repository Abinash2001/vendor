import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_slug: {
      type: String,
      required: true,
      unique: true,
    },
    product_description: {
      type: String,
    },
    original_price: {
      type: Number,
      required: true,
    },
    discounted_price: {
      type: Number,
      required: true,
    },
    stock_available: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    size: [String],
    color: [String],
    images: [String], // to store multiple image in base64 format
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;
