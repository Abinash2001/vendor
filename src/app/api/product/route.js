import Product from "@/app/models/productDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request){
    const products = await Product.find();//.populate("category");
    return NextResponse.json(products,{
        status: 200,
    });
}


export async function POST(request){
    const {product_name,product_slug,product_description,original_price,discounted_price,stock_available,category,size,color,images} = await request.json();
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
        const response=NextResponse.json(createProduct,{
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