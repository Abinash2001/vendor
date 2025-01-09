import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";
import User from "@/app/models/userDB";
import Product from "@/app/models/productDB";
connectMongoDB();

export async function GET(request, { params }) {
  const { id } = params;
  const order = await Order.findById(id)
    .populate("userId") // Populates the user information
    .populate({
      path: "orderItems", // Populates orderItems
      populate: {
        path: "productId",
        model: Product,
        select: "product_name", // Only fetches the product name
      },
    });

    // working code----------------------------------------------------------
    // const order = await Order.findById(id)
    // .populate("userId") // Populates the user information
    // .populate({
    //   path: "orderItems", // Populates orderItems
    //   populate: {
    //     path: "productId", // Populates the productId within orderItems
    //     model: Product, // Specifies the model for productId (if not already inferred)
    //   },
    // });
    // ------------------------------------------------------------------------
  console.log("abinash", order.orderItems);
  return NextResponse.json(order, {
    status: 200,
  });
}
