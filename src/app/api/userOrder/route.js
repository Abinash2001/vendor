import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";
connectMongoDB();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  //change the userId object to string from order table model from frontend code
  const orders = await Order.find({ userId });
  return NextResponse.json(orders, {
    status: 200,
  });
}
