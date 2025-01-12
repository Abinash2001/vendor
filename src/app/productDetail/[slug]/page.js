"use client";
import Wrapper from "@/app/components/Wrapper";
import React, { useState, useEffect } from "react";
import { getProductById } from "@/app/services/productService";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { updateProduct } from "@/app/services/productService";
import { toast } from "react-toastify";
import Select from "react-select";
import Image from "next/image";

const ProductDetail = ({ params }) => {
  const [products, setProducts] = useState({ images: [] });
  const [state, setState] = useState({});
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await getProductById(params.slug);
        setProducts(product);
        setState(product);
        // console.log(product);
      } catch (error) {
        console.log(error);
        console.log("error on getProduct function call");
      }
    };
    fetchProductDetails();
  }, [params.slug]);

  // console.log("color", products?.color);

  const handleRemoveImage = (index) => {
    const updatedImages = products.images.filter((image, i) => i !== index);
    setProducts({ ...products, images: updatedImages });
  };

  const handleRemoveColor = (index) => {
    const updatedColor = products.color.filter((color, i) => i !== index);
    setProducts({ ...products, color: updatedColor });
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
        setProducts((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, ...imagesArray],
        }));
      })
      .catch((error) => console.error("Error: ", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const product = {
      product_name: state.product_name,
      product_slug: state.product_slug,
      product_description: state.product_description,
      original_price: state.original_price,
      discounted_price: state.discounted_price,
      stock_available: state.stock_available,
      category: state.category,
      color: products.color,
      size: products.size,
      images: products.images,
    };

    try {
      const result = await updateProduct(params.slug, product);
      toast.success("Product updated", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
      console.log("error on addProduct function call");
      toast.error("Product not updated !!", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Wrapper>
      <form className="bg-white my-5 p-5 rounded" onSubmit={handleAddProduct}>
        <h1 className="text-[30px] font-semibold mb-5">Product Detail</h1>
        <div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product category" className="text-[16px]">
              Category
            </label>
            <select
              disabled
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              name="category"
              // onChange={handleChange}
            >
              <option>{products?.category?.name}</option>
              {/* <option>Select Category</option>
              <option selected>abi</option>
              <option>abi</option> */}
            </select>
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product name" className="text-[16px]">
              Name
            </label>
            <input
              type="text"
              value={state.product_name}
              name="product_name"
              onChange={handleChange}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product name" className="text-[16px]">
              Slug
            </label>
            <input
              type="text"
              value={state.product_slug}
              name="product_name"
              onChange={handleChange}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="product description" className="text-[16px]">
              Description
            </label>
            <textarea
              type="area"
              value={state.product_description}
              name="product_description"
              onChange={handleChange}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="original price" className="text-[16px]">
              Original Price (in INR)
            </label>
            <input
              type="text"
              value={state.original_price}
              name="original_price"
              onChange={handleChange}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="discounted price" className="text-[16px]">
              Discounted Price (in INR)
            </label>
            <input
              type="text"
              value={state.discounted_price}
              name="discounted_price"
              onChange={handleChange}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="total product" className="text-[16px]">
              Stock
            </label>
            <input
              type="number"
              value={state.stock_available}
              name="quantity"
              onChange={handleChange}
              className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
            />
          </div>
          <div className="md:flex gap-10 mb-5 justify-between">
            <label htmlFor="size" className="text-[16px]">
              Size
            </label>
            <Select
              isMulti={true}
              className="w-full lg:w-[80%] md:w-[70%] rounded mt-2 md:mt-0 outline-blue-400"
              value={
                products.size?.map((size) => ({
                  value: size,
                  label: size, // Capitalize the size label
                })) || []
              }
              onChange={(event) => {
                setProducts({
                  ...products,
                  size: event.map((item) => item.value),
                });
              }}
              options={[
                { value: "S", label: "S" },
                { value: "M", label: "M" },
                { value: "L", label: "L" },
                { value: "XL", label: "XL" },
                { value: "XXL", label: "XXL" },
              ]}
            />
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <label htmlFor="stock_available" className="text-[16px]">
              Color
            </label>
            <div className="flex gap-2 flex-col w-full lg:w-[80%] md:w-[70%]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  /*name="stock_available"*/ className="border w-full lg:w-full md:w-[95%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                  placeholder="Enter color"
                />
                <div
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => {
                    setProducts({
                      ...products,
                      color: [...products.color, color],
                    });
                    setColor("");
                  }}
                >
                  Add
                </div>
              </div>
              <div className="w-full gap-2">
                {Array.isArray(products?.color) &&
                  products.color.map((color, index) => (
                    <div
                      key={index}
                      className="w-[70px] flex items-center gap-2 border p-2 relative rounded"
                    >
                      <div
                        className="w-[20px] h-[20px] rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      {/* <div
                      className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                      onClick={() => handleRemoveColor(index)}
                    >
                      Remove
                    </div> */}
                      <div
                        className="absolute right-2 top-2 bg-white rounded-full px-0 py-0 cursor-pointer"
                        onClick={() => handleRemoveColor(index)}
                      >
                        <IoMdClose className="text-lg text-red-500" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="md:flex gap-10 md:text-center mb-5 justify-between">
            <h1 className="text-[17px]">Images uploads</h1>
            <div className="flex gap-5">
              {products?.images.map((image, index) => (
                <div
                  key={index}
                  className="w-[150px] h-[150px] p-[10px] border rounded flex justify-center items-center relative"
                >
                  {/* <img src={image} alt="image" className="w-full h-full" /> */}
                  <Image src={image} alt="image" width={0} height={0} className="w-full h-full" />
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

export default ProductDetail;
