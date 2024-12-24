import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Users",
  // },
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
