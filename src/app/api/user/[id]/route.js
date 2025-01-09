import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/userDB";

connectMongoDB();

export async function GET(request, { params }) {
  const user = await User.findById(params.id, { password: 0 });
  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user, {
    status: 200,
  });
}

