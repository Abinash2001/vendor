"use client";
import Wrapper from "@/app/components/Wrapper";
import React, { useState, useEffect } from "react";
import { getProductById } from "@/app/services/productService";
import Link from "next/link";
const page = ({ params }) => {
  console.log(params?.slug);

  // update previous value from the db
  // const [productName,setProductName]=useState('abinash')
  // const [productDesc,setProductDesc]=useState('abinash')
  // const [originalPrice,setOriginalPrice]=useState(1000)
  // const [discountPrice,setDiscountPrice]=useState(500)

  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductById(params.slug);
        setProducts(product);
        console.log(products);
      } catch (error) {
        console.log(error);
        console.log("error on getProduct function call");
      }
    };
    fetchProductDetails();
  }, []);

  return (
    <Wrapper>
      <form className="bg-white my-5 p-5 rounded">
        <h1 className="text-[30px] font-semibold mb-5">Product Detail</h1>
        <div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product name" className="text-[16px]">
              Product Name
            </label>
            <input
              type="text"
              value={products.product_name}
              /*value={productName} onChange={(e)=>setProductName(e.target.value)}*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product description" className="text-[16px]">
              Product Description
            </label>
            <textarea
              type="area"
              value={products.product_description}
              /*value={productDesc} onChange={(e)=>setProductDesc(e.target.value)}*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="original price" className="text-[16px]">
              Original Price (in INR)
            </label>
            <input
              type="text"
              value={products.original_price}
              /*value={originalPrice} onChange={(e)=>setOriginalPrice(e.target.value)}*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="discounted price" className="text-[16px]">
              Discounted Price (in INR)
            </label>
            <input
              type="text"
              value={products.discounted_price}
              /*value={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)}*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="total product" className="text-[16px]">
              Number of Product
            </label>
            <input
              type="number"
              value={products.quantity}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product category" className="text-[16px]">
              Product Category
            </label>
            <select className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400">
              <option>Select Category</option>
              <option>abi</option>
              <option>abi</option>
            </select>
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product image" className="text-[17px]">
              Product Image
            </label>
            <input
              type="file"
              // value={products.image}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[10px] mt-2 md:mt-0"
            />
          </div>
        </div>
        <div className="flex gap-5 justify-center w-full">
          <button className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded font-semibold text-white outline-none">
            Update Product
          </button>
          <Link href="/viewProduct">
            <button className="bg-gray-500 hover:bg-gray-600 py-2 px-3 rounded font-semibold text-white outline-none">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};

export default page;
