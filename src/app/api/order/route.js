import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";
connectMongoDB();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");
  const orders = await Order.find()
    .limit(parseInt(perPage))
    .skip(parseInt(perPage) * (parseInt(page) - 1));
  const totalOrdersLength = await Order.find().countDocuments();
  return NextResponse.json(
    { orders, totalOrdersLength },
    {
      status: 200,
    }
  );
}
