import Product from "@/app/models/productDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request,{params}){
    // console.log("abinash")
    // console.log(params.product);
    // const {productId} = params.product;
    // console.log(productId+'abinash');
    const product = await Product.findById(params.product);
    // console.log(params);
    // console.log("params");
    return NextResponse.json(product,{
        status: 200,
    });
}