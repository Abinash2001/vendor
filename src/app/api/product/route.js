import Product from "@/app/models/productDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request, params) {
  const { searchParams } = new URL(request.url);
  const perPage = searchParams.get("perPage");
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  // console.log("page: ",page);
  // // console.log("request: ",request.json());
  // // const {perPage} = await request.json();
  // console.log("perPage: ",perPage);
  console.log("category: ", category);
  const filter = category ? { category } : {};
  const products = await Product.find(filter)
    .populate("category")
    .limit(parseInt(perPage))
    .skip(parseInt(perPage) * (parseInt(page) - 1));
  const totalProductLength = await Product.find().countDocuments(filter);

  return NextResponse.json(
    { products, totalProductLength },
    {
      status: 200,
    }
  );
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
  // console.log("api: ",product_name,product_description,original_price,discounted_price,stock_available,category,images);
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
    // console.log("images",product.images);
    // save the object to database
    const createProduct = await product.save();
    // console.log("createProduct:",createProduct);
    const response = NextResponse.json(createProduct, {
      message: "create product !!",
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
