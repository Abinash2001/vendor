import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_name: String,
    product_description: String,
    original_price: Number,
    discounted_price: Number,
    stock_available: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
    },
    images: [String], // to store multiple image in base64 format
} 
);

const Product = mongoose.models.Products || mongoose.model('Products', productSchema);

export default Product;