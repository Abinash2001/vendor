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
import Pagination from "../components/Pagination";

const page = ({ searchParams }) => {
  // console.log("searchParams.page",page);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //add pagination start here
  let page = parseInt(searchParams.page, 10); //?page= 4.1 then page = 4 or 4.9 then page = 4
  page = isNaN(page) || page < 1 ? 1 : page; //if page is not a number then page = 1
  const perPage = 10; //items per page
  // const prevPage = page - 1 > 0 ? page - 1 : 1;
  // const nextPage = page + 1;

  // const pageNumber = [];
  // const offsetNumber = 3;
  // for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
  //   if (i > 0 && i <= totalPages) {
  //     pageNumber.push(i);
  //   }
  // }
  //add pagination end here

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
        const data = await getProduct(perPage, page, selectedCategory); //perPage and page for pagination
        const products = data.products;
        //pagination start here
        setTotalPages(Math.ceil(data.totalProductLength / perPage));
        // totalPages = Math.ceil( data.totalProductLength / perPage);
        //pagination end here
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.log(error);
        console.log("error on getProduct function call");
      }
    };
    fetchCategories();
    fetchProducts();
  }, [page, selectedCategory]);

  //-----------------------------------filter product by category-----------------------------------
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // if (categoryId) {
    //   const filtered = products.filter(
    //     (product) => product.category?._id === categoryId
    //   );
    //   setFilteredProducts(filtered);
    // } else {
    //   setFilteredProducts(products); // Show all products if no category is selected
    // }
  };
  //-----------------------------------filter product by category-----------------------------------

  const handleActiveInactive = async (id, active) => {
    try {
      const result = await activeInactiveProduct(id, { active: !active });
      const updatedProducts = products.map((product) =>
        product._id === id ? result : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(
        updatedProducts.filter(
          (product) =>
            !selectedCategory || product.category?._id === selectedCategory
        )
      );
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
        <h1 className="text-[30px] font-semibold mb-5">View Product</h1>
        <div className=" md:text-center bg-white my-10 justify-between">
          <label className="text-[16px] mr-10">Product Category</label>
          <select
            className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 mb-10 outline-blue-400"
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
          >
            {/* <option value="">Select Category</option> */}
            <option value="">All Categories</option>
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
            <TableHeader className="bg-gray-50">
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
              <TableColumn className="font-bold text-center">
                Category
              </TableColumn>
              {/* <TableColumn className='font-bold'>Sold</TableColumn>
                    <TableColumn className='font-bold'>Revenue</TableColumn> */}
              <TableColumn className="font-bold text-center">
                Details
              </TableColumn>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product, index) => {
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
        <Pagination page={page} totalPages={totalPages} />
      </div>
      {/* <div className="flex justify-center">
        <div className="flex w-1/2 justify-between">
          {
            //pagination start here
            page === 1 ? (
              <div className="opacity-50 cursor-not-allowed p-2">Previous</div>
            ) : (
              <Link href={`?page=${prevPage}`}>
                <div className="cursor-pointer p-2">Previous</div>
              </Link>
            )
          }
          <div className="flex gap-2">
            {pageNumber.map((number) => (
              <Link key={number} href={`?page=${number}`}>
                <div
                  className={`cursor-pointer ${
                    page === number ? "bg-white p-2 rounded" : "p-2"
                  }`}
                >
                  {number}
                </div>
              </Link>
            ))}
          </div>
          {
            page === totalPages ? (
              <div className="opacity-50 cursor-not-allowed p-2">Next</div>
            ) : (
              <Link href={`?page=${nextPage}`}>
                <div className="cursor-pointer p-2">Next</div>
              </Link>
            )
            //pagination end here
          }
        </div>
      </div> */}
      {/* <Pagination page={page} prevPage={5} pageNumber={pageNumber} totalPages={totalPages} nextPage={nextPage}/> */}
    </Wrapper>
  );
};

export default page;
