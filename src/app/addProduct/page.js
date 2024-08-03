"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { toast } from "react-toastify";
import { addProduct } from "../services/productService";
import { getCategory } from "../services/categoryService";
// import { set } from 'mongoose';

const page = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    original_price: "",
    discounted_price: "",
    quantity: "",
    category: "",
    image: "",
  });

  const handleAddProduct = async (event) => {
    event.preventDefault();
    // validate data....

    try {
      const result = await addProduct(product);
      // console.log(product);
      toast.success("Product added", {
        position: "bottom-right",
      });

      // reset the form data after adding the product
      setProduct({
        product_name: "",
        product_description: "",
        original_price: "",
        discounted_price: "",
        quantity: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      console.log("error on addCategory function call");
      toast.error("Category not added !!", {
        position: "bottom-right",
      });
    }
    // console.log('Product added');
  };

  //convert image to base64 and set the state of image
  const handleImageChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setProduct({
        ...product,
        image: reader.result,
      });
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };
  };

  // fetch categories from the database and set the state of categories to show the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategory();
        setCategories(categories);
        // console.log("before add category call");
        // console.log(categories);
      } catch (error) {
        console.log(error);
        console.log("error on getCategory function call");
      }
    };
    fetchCategories();
  }, []);

  return (
    <Wrapper>
      <form className="bg-white my-5 p-5 rounded" onSubmit={handleAddProduct}>
        <h1 className="text-[30px] font-semibold mb-5">Add Product</h1>
        <div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="category" className="text-[16px]">
              Product Category
            </label>
            <select
              /*name="category"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  category: event.target.value,
                });
              }}
              value={product.category}
            >
              <option>Select Category</option>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product_name" className="text-[16px]">
              Product Name
            </label>
            <input
              type="text"
              /*name="product_name"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  product_name: event.target.value,
                });
              }}
              value={product.product_name}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product_description" className="text-[16px]">
              Product Description
            </label>
            <textarea
              type="area"
              /*name="product_description"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  product_description: event.target.value,
                });
              }}
              value={product.product_description}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="original_price" className="text-[16px]">
              Original Price (in INR)
            </label>
            <input
              type="number"
              /*name="original_price"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  original_price: event.target.value,
                });
              }}
              value={product.original_price}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="discounted_price" className="text-[16px]">
              Discounted Price (in INR)
            </label>
            <input
              type="number"
              /*name="discounted_price"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  discounted_price: event.target.value,
                });
              }}
              value={product.discounted_price}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="quantity" className="text-[16px]">
              Quantity
            </label>
            <input
              type="number"
              /*name="quantity"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  quantity: event.target.value,
                });
              }}
              value={product.quantity}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="image" className="text-[17px]">
              Product Image
            </label>
            <input
              type="file"
              /*name="image"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[10px] mt-2 md:mt-0"
              onChange={handleImageChange}
              // onChange={(event)=> {
              // setProduct({
              //   ...product,
              //   image:images
              // });
              // }}
              value=""
            />
          </div>
        </div>
        <div className="flex gap-5 justify-center w-full">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded font-semibold text-white outline-none"
          >
            Add Product
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 py-2 px-3 rounded font-semibold text-white outline-none">
            Reset
          </button>
        </div>
        {/* {
              JSON.stringify(product)
            } */}
      </form>
    </Wrapper>
  );
};

export default page;
