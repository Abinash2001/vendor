import Product from "@/app/models/productDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");
  const category = searchParams.get("category");

  const filter = category ? { category } : {};
  if (perPage && page) {
    const skip = parseInt(perPage) * (parseInt(page) - 1);
    const limit = parseInt(perPage);
    const products = await Product.find(filter)
      .populate("category")
      .skip(skip)
      .limit(limit);
    const totalProductLength = await Product.find().countDocuments(filter);
    return NextResponse.json({ products, totalProductLength }, { status: 200 });
  } else {
    const totalProductLength = await Product.find().countDocuments(filter);
    return NextResponse.json(totalProductLength, { status: 200 });
  }

  // if (!perPage && !page && !category) {
  //   const totalProductLength = await Product.find().countDocuments();
  //   return NextResponse.json(totalProductLength, {
  //     status: 200,
  //   });
  // } else {
  //   const filter = category ? { category } : {};
  //   const products = await Product.find(filter)
  //     .populate("category")
  //     .limit(parseInt(perPage))
  //     .skip(parseInt(perPage) * (parseInt(page) - 1));
  //   const totalProductLength = await Product.find().countDocuments(filter);
  //   return NextResponse.json(
  //     { products, totalProductLength },
  //     {
  //       status: 200,
  //     }
  //   );
}

export async function POST(request) {
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
  } = await request.json();
  const product = new Product({
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
  });
  try {
    // save the object to database
    const createProduct = await product.save();
    const response = NextResponse.json(createProduct, {
      message: "create product successfully!!",
      status: 200,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to create product !!",
      status: false,
    });
  }
}
