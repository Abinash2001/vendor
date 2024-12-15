import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import Order from "@/app/models/orderDB";
connectMongoDB();

export async function GET(request) {
    const orders = await Order.find();
    return NextResponse.json(orders, {
        status: 200,
    });
}