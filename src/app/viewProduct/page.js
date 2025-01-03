"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getCategory } from "../services/categoryService";
import { getProduct, activeInactiveProduct } from "../services/productService";
import Link from "next/link";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const page = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // fetch categories from the database and set the state of categories to show the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategory();
        setCategories(categories);
      } catch (error) {
        console.log(error);
        console.log("error on getCategory function call");
      }
    };
    const fetchProducts = async () => {
      try {
        const products = await getProduct();
        // console.log(products);
        setProducts(products);
      } catch (error) {
        console.log(error);
        console.log("error on getProduct function call");
      }
    };
    fetchCategories();
    fetchProducts();
  }, []);

    const handleActiveInactive = async (id, active) => {
      try {
        console.log(id, active);
        const result = await activeInactiveProduct(id, { active: !active });
        const updatedProducts = products.map((product) =>
          product._id === id ? result : product
        );
        setProducts(updatedProducts);
        toast.success(`product ${active ? "deactivated" : "activated"} !!`, {
          position: "bottom-right",
        });
      } catch (error) {
        console.log(error);
        console.log("error on updateProduct function call");
        toast.error("Product not Updated !!", {
          position: "bottom-right",
        });
      }
    };

  return (
    <Wrapper>
      <div className="bg-white my-5 p-5 rounded">
        <h1 className="text-[30px] font-semibold mb-5">
          View Total Product Details
        </h1>
        <div className=" md:text-center bg-white my-10 justify-between">
          <label className="text-[16px] mr-10">Product Category</label>
          <select className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 mb-10 outline-blue-400">
            <option value={null}>Select Category</option>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          {/* </div> */}
          {/* <div> */}
          <Table
            aria-label="Example static collection table"
            className=" overflow-x-auto"
          >
            <TableHeader>
              <TableColumn className="font-bold text-center">
                Product Name
              </TableColumn>
              <TableColumn className="font-bold text-center">
                Original Price
              </TableColumn>
              <TableColumn className="font-bold text-center">
                Discounted Price
              </TableColumn>
              <TableColumn className="font-bold text-center">
                Quantity
              </TableColumn>
              <TableColumn className="font-bold">Category</TableColumn>
              {/* <TableColumn className='font-bold'>Sold</TableColumn>
                    <TableColumn className='font-bold'>Revenue</TableColumn> */}
              <TableColumn className="font-bold text-center">
                Details
              </TableColumn>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => {
                return (
                  <TableRow key={index} className="border-b">
                    <TableCell className="text-[12px] font-medium">
                      {product.product_name}
                    </TableCell>
                    <TableCell className="text-[12px] font-medium">
                      {product.original_price}
                    </TableCell>
                    <TableCell className="text-[12px] font-medium">
                      {product.discounted_price}
                    </TableCell>
                    <TableCell className="text-[12px] font-medium">
                      {product.stock_available}
                    </TableCell>
                    <TableCell className="text-[12px] font-medium">
                      {product.category?.name}
                    </TableCell>
                    {/* <TableCell>{product.revenue}</TableCell> */}
                    <TableCell className="flex justify-center">
                      <Link
                        href={`/productDetail/${product._id}`}
                        className="px-2 py-1 rounded hover:bg-slate-200"
                      >
                        <BiSolidEditAlt
                          size={20}
                          className="text-green-500 cursor-pointer"
                        />
                      </Link>
                      <button className="px-2 py-1 rounded hover:bg-slate-200">
                        <RiDeleteBinLine
                          size={20}
                          className="text-red-500 cursor-pointer"
                        />
                      </button>
                      <button
                        className="px-2 py-1 rounded hover:bg-slate-200"
                        onClick={() =>
                          handleActiveInactive(product._id, product.active)
                        }
                      >
                        {product.active ? (
                          
                          <FiCheckCircle
                            size={20}
                            className="text-green-500 mr-1"
                          />
                        ) : (
                          <FiXCircle size={20} className="text-red-500 mr-1" />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
