import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/userDB";

connectMongoDB();

export async function GET(request,{params}) {
  const users = await User.findById(params.id, { password: 0 });
  return NextResponse.json(users, {
    status: 200,
  });
}
