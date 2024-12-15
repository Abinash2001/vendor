import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  merchantTransactionId: String,
  paymentTransactionId: String,
  orderItems: Array,
  address: String,
  amount: Number,
  phone: Number,
  status: String,
});

const Order = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Order;
