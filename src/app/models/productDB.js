import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_name: String,
    product_description: String,
    original_price: Number,
    discounted_price: Number,
    quantity: Number,
    category: String,
    image: String,
} 
);

const Product = mongoose.models.Products || mongoose.model('Products', productSchema);

export default Product;