import Category from "@/app/models/categoryDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function PUT(request, { params }) {
  const categoryId = params.id;
  const { name, active } = await request.json();
  const updateCategory = await Category.findByIdAndUpdate(
    categoryId,
    { name, active },
    { new: true }
  );
  // console.log("updateCategory", updateCategory);
  return NextResponse.json(updateCategory, {
    status: 200,
  });
}
