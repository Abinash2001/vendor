// export const dynamic = 'force-dynamic';
import Category from "@/app/models/categoryDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request) {
  const categories = await Category.find();
  return NextResponse.json(categories, {
    status: 200,
  });
}

export async function POST(request) {
  const { name } = await request.json();

  const category = new Category({
    name,
  });
  try {
    // save the object to database
    const createCategory = await category.save();
    const response = NextResponse.json(createCategory, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to create category !!",
      status: false,
    }, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const deleteCategory = await Category.findByIdAndDelete(categoryId);
  if (deleteCategory) {
    return NextResponse.json({
      status: 200,
    });
  } else {
    return NextResponse.json(
      {
        message: "failed to delete category !!",
        status: false,
      },
      {
        status: 404,
      }
    );
  }
}


