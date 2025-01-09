import Category from "@/app/models/categoryDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function PUT(request, { params }) {
  const categoryId = params.id;
  const { name, active } = await request.json();
  
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, active },
      { new: true }
    );

    if (!updateCategory) {
      return NextResponse.json(
        { message: "Category not found", status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(updateCategory, {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Failed to update category", status: false },
      { status: 500 }
    );
  }
}

