import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/userDB";

connectMongoDB();

export async function GET(request) {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) {
      return NextResponse.json({ message: "No users found" }, {
        status: 404,
      });
    }
    return NextResponse.json(users, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, {
      status: 500,
    });
  }
}
