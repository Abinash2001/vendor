import Product from "@/app/models/productDB";
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";

connectMongoDB();

export async function GET(request,{params}){
    // console.log("abinash")
    // console.log(params.product);
    // const {productId} = params.product;
    // console.log(productId+'abinash');
    const product = await Product.findById(params.productId);
    // console.log(params);
    // console.log("params");
    return NextResponse.json(product,{
        status: 200,
    });
}

export async function PUT(request,{params}){
    // console.log("params",params);
    const {product_name,product_description,original_price,discounted_price,stock_available,category,images,active} = await request.json();
    // console.log("product route: ",product_name,product_description,original_price,discounted_price,stock_available,category,active);
    
    const product = await Product.findByIdAndUpdate(params.productId,{product_name,product_description,original_price,discounted_price,stock_available,category,images,active},{new:true});
    // console.log("update product",product);
    return NextResponse.json(product);
}

// export async function PUT(request,{params}){
//     const {active} = await request.json();
//     const product = await Product.findByIdAndUpdate(params.productId,{active},{new:true});
//     return NextResponse.json(product);
// }