import connectMongoDB from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/userDB";
import Order from "@/app/models/orderDB";
connectMongoDB();

export async function GET(request, { params }) {
    const { id } = params;
    const order = await Order.findById(id).populate("userId");
    // console.log("abinash",order);
    return NextResponse.json(order, {
        status: 200,
    });
}

