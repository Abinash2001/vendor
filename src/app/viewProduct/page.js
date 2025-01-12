"use client";
import React, { useEffect, useState, Suspense } from "react";
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
import Loading from "../loading";

const ViewProduct = ({ searchParams }) => {
  // console.log("searchParams.page",page);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  //add pagination start here
  let page = parseInt(searchParams.page, 10); //?page= 4.1 then page = 4 or 4.9 then page = 4
  page = isNaN(page) || page < 1 ? 1 : page; //if page is not a number then page = 1
  const perPage = 10; //items per page

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
        // setLoading(true);
        const data = await getProduct(perPage, page, selectedCategory); //perPage and page for pagination
        const products = data.products;

        //pagination start here
        setTotalPages(Math.ceil(data.totalProductLength / perPage));
        //pagination end here
        setProducts(products);
        setFilteredProducts(products);
        setLoading(false);
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
    <>
      {loading && <Loading />}
      {products.length === 0 && !loading ? (
        <div className="text-center text-2xl font-semibold my-10">No products found, please add some products first.</div>
      ) : (
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
              <Suspense fallback={<p>Loading feed...</p>}>
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
                                handleActiveInactive(
                                  product._id,
                                  product.active
                                )
                              }
                            >
                              {product.active ? (
                                <FiCheckCircle
                                  size={20}
                                  className="text-green-500 mr-1"
                                />
                              ) : (
                                <FiXCircle
                                  size={20}
                                  className="text-red-500 mr-1"
                                />
                              )}
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Suspense>
            </div>
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default ViewProduct;
