"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { toast } from "react-toastify";
import { addProduct } from "../services/productService";
import { getCategory } from "../services/categoryService";
import { FaRegImages } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    original_price: "",
    discounted_price: "",
    stock_available: "",
    category: "",
    images: [], // to store multiple image in base64 format
  });

  const handleAddProduct = async (event) => {
    event.preventDefault();
    // validate data....

    try {
      if (
        !product.product_name ||
        !product.product_description ||
        !product.original_price ||
        !product.discounted_price ||
        !product.stock_available ||
        !product.category ||
        !product.images.length
      ) {
        toast.error("Please fill all the fields !!", {
          position: "bottom-right",
        });
        return;
      }
      const result = await addProduct(product);
      console.log("product add result", result);
      toast.success("Product added", {
        position: "bottom-right",
      });

      // reset the form data after adding the product
      setProduct({
        product_name: "",
        product_description: "",
        original_price: "",
        discounted_price: "",
        stock_available: "",
        category: "",
        images: [],
      });
    } catch (error) {
      console.log(error);
      console.log("error on addCategory function call");
      toast.error("Product not added !!", {
        position: "bottom-right",
      });
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });
    Promise.all(promises)
      .then((imagesArray) => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, ...imagesArray],
        }));
      })
      .catch((error) => console.error("Error: ", error));
  };

  const handleRemoveImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((image, i) => i !== index),
    }));
  };

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
            <label htmlFor="stock_available" className="text-[16px]">
              Stock Available
            </label>
            <input
              type="number"
              /*name="stock_available"*/ className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              onChange={(event) => {
                setProduct({
                  ...product,
                  stock_available: event.target.value,
                });
              }}
              value={product.stock_available}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <h1 className="text-[17px]">Images uploads</h1>
            <div className="flex gap-5">
              {product?.images.map((image, index) => (
                <div
                  key={index}
                  className="w-[150px] h-[150px] p-[10px] border rounded flex justify-center items-center relative"
                >
                  <img src={image} alt="image" className="w-full h-full" />
                  <div
                    className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <IoMdClose className="text-lg text-red-500" />
                  </div>
                </div>
              ))}
              <div className="w-[150px] h-[150px] p-[10px] border rounded relative">
                <input
                  multiple
                  type="file"
                  className="absolute w-full h-full opacity-0 left-0 top-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <div className="w-full h-full flex justify-center items-center flex-col pointer-events-none">
                  <FaRegImages className="text-[50px] opacity-10" />
                  <h5 className="text-lg font-semibold opacity-20">
                    Upload Image
                  </h5>
                </div>
              </div>
            </div>
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
      </form>
    </Wrapper>
  );
};

export default page;
