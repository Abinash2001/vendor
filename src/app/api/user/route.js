import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/userDB";

connectMongoDB();

export async function GET(request) {
  const users = await User.find();
  return NextResponse.json(users, {
    status: 200,
  });
}
