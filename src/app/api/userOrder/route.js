import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";
import {ObjectId} from "mongodb";

connectMongoDB();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    // Convert userId to a MongoDB ObjectId
    const orders = await Order.find({ userId: new ObjectId(userId) }).populate("userId");
    // console.log("Order route:", orders);

    return NextResponse.json(orders, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, {
      status: 500,
    });
  }
}