import Product from "@/app/models/productDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request, { params }) {
  try {
    const product = await Product.findById(params.productId).populate("category");
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Error fetching product" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const {
      product_name,
      product_slug,
      product_description,
      original_price,
      discounted_price,
      stock_available,
      category,
      size,
      color,
      images,
      active,
    } = await request.json();

    const product = await Product.findByIdAndUpdate(
      params.productId,
      {
        product_name,
        product_slug,
        product_description,
        original_price,
        discounted_price,
        stock_available,
        category,
        size,
        color,
        images,
        active,
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

