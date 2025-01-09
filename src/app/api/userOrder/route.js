export const dynamic = 'force-dynamic';

import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";
import {ObjectId} from "mongodb";
connectMongoDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
      const orders = await Order.find({ userId: new ObjectId(userId) }).populate("userId");

      return NextResponse.json(orders, { status: 200 });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
  } catch (error) {
    console.error("Invalid request URL:", error);
    return NextResponse.json({ error: "Invalid request URL" }, { status: 400 });
  }
}




// import connectMongoDB from "@/app/libs/mongodb";
// import { NextResponse } from "next/server";
// import Order from "@/app/models/orderDB";
// import {ObjectId} from "mongodb";

// connectMongoDB();

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const userId = searchParams.get("userId");

//   try {
//     // Convert userId to a MongoDB ObjectId
//     const orders = await Order.find({ userId: new ObjectId(userId) }).populate("userId");
//     // console.log("Order route:", orders);

//     return NextResponse.json(orders, {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return NextResponse.json({ error: "Failed to fetch orders" }, {
//       status: 500,
//     });
//   }
// }