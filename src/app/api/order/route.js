import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";

connectMongoDB();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");

  const filter = {};
  if (perPage && page) {
    const skip = parseInt(perPage) * (parseInt(page) - 1);
    const limit = parseInt(perPage);
    const orders = await Order.find(filter).skip(skip).limit(limit);
    const totalOrdersLength = await Order.find(filter).countDocuments();
    return NextResponse.json({ orders, totalOrdersLength }, { status: 200 });
  } else {
    const totalOrdersLength = await Order.find(filter).countDocuments();
    return NextResponse.json(totalOrdersLength, { status: 200 });
  }
}
