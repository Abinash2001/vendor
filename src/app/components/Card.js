'use client';
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { AiOutlineMore, AiOutlineShoppingCart } from "react-icons/ai";
import { getProductLength } from '../services/productService';
import { getOrdersLength } from '../services/orderService';
// import { getProduct } from '../services/productService';
// import { getOrders } from '../services/orderService';

export const Card = () => {
  // const totalProducts = await getProductLength();
  // const totalOrders = await getOrdersLength();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      const totalProducts = await getProductLength();
      setTotalProducts(totalProducts);
    };
    fetchTotalProducts();

    const fetchTotalOrders = async () => {
      const totalOrders = await getOrdersLength();
      setTotalOrders(totalOrders);
    };
    fetchTotalOrders();
  }, []);
  return (
    <Wrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
        <div className="bg-white rounded p-6 flex flex-col gap-5">
          <div className="flex items-center ">
            <p className="font-bold text-lg">Total Product</p>
            {/* <p className="text-black/[0.5] text-sm font-semibold">| Today</p> */}
            {/* <AiOutlineMore size={20} className="ml-auto text-base font-medium cursor-pointer"/> */}
          </div>
          <div className="flex items-center justify-between">
            <div className="w-20 md:w-25 h-20 md:h-25 rounded-full flex justify-center items-center bg-black/[0.05] relative ">
              <AiOutlineShoppingCart size={45} className="text-blue-600" />
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">{totalProducts}</p>
              {/* <p className="text-black/[0.5]">12% increase</p> */}
            </div>
          </div>
        </div>
        <div className="bg-white rounded p-6 flex flex-col gap-5">
          <div className="flex items-center ">
            <p className="font-bold text-lg">Total Orders</p>
            {/* <p className="text-black/[0.5] text-sm font-semibold">| Today</p> */}
            <AiOutlineMore
              size={20}
              className="ml-auto text-base font-medium cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-20 md:w-25 h-20 md:h-25 rounded-full flex justify-center items-center bg-black/[0.05] relative ">
              <AiOutlineShoppingCart size={45} className="text-blue-600" />
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">{totalOrders}</p>
              {/* <p className="text-black/[0.5]">12% increase</p> */}
            </div>
          </div>
        </div>
        <div className="bg-white rounded p-6 flex flex-col gap-5">
          <div className="flex items-center ">
            <p className="font-bold text-lg">Sales</p>
            <p className="text-black/[0.5] text-sm font-semibold">| Today</p>
            <AiOutlineMore
              size={20}
              className="ml-auto text-base font-medium cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-20 md:w-25 h-20 md:h-25 rounded-full flex justify-center items-center bg-black/[0.05] relative ">
              <AiOutlineShoppingCart size={45} className="text-blue-600" />
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">145</p>
              <p className="text-black/[0.5]">12% increase</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
