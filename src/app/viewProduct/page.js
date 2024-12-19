"use client"
import React, { useEffect , useState } from 'react'
import Wrapper from '../components/Wrapper'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { getCategory } from '../services/categoryService';
import { getProduct } from '../services/productService';
import Link from 'next/link';

const page = () => {

const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 

// fetch categories from the database and set the state of categories to show the dropdown
useEffect(()=>{
  const fetchCategories=async()=>{
    try {
      const categories=await getCategory();
      setCategories(categories);
    } catch (error) {
      console.log(error);
      console.log("error on getCategory function call");
    }
  }
  const fetchProducts=async()=>{
    try {
      const products=await getProduct();
      console.log(products);
      setProducts(products);
    } catch (error) {
      console.log(error);
      console.log("error on getProduct function call");
    }
  }
  fetchCategories();
  fetchProducts();
  },[]);

  return (
    <Wrapper>
        <div className='bg-white my-5 p-5 rounded'>
            <h1 className='text-[30px] font-semibold mb-5'>View Total Product Details</h1>
            <div className=' md:text-center bg-white my-10 justify-between'>
                <label className='text-[16px] mr-10'>Product Category</label>
                <select className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 mb-10 outline-blue-400'>
                    <option value={null}>Select Category</option>
                    {
                      categories.map((category) => {
                        return (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        )
                      })
                    }
                </select>
              {/* </div> */}
              {/* <div> */}
                <Table aria-label="Example static collection table" className=' overflow-x-auto'>
                  <TableHeader>
                    <TableColumn className='font-bold text-center'>Product Name</TableColumn>
                    <TableColumn className='font-bold text-center'>Original Price</TableColumn>
                    <TableColumn className='font-bold text-center'>Discounted Price</TableColumn>
                    <TableColumn className='font-bold text-center'>Quantity</TableColumn>
                    <TableColumn className='font-bold'>Category</TableColumn>
                    {/* <TableColumn className='font-bold'>Sold</TableColumn>
                    <TableColumn className='font-bold'>Revenue</TableColumn> */}
                    <TableColumn className='font-bold text-center'>Details</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {
                      products.map((product, index) => {
                        return (
                          <TableRow key={index} className='border-b'>
                            <TableCell>{product.product_name}</TableCell>
                            <TableCell>{product.original_price}</TableCell>
                            <TableCell>{product.discounted_price}</TableCell>
                            <TableCell>{product.stock_available}</TableCell>
                            <TableCell>{product.category?.name}</TableCell>
                            {/* <TableCell>{product.revenue}</TableCell> */}
                            <TableCell><Link href={`/productDetail/${product._id}`} className='bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded font-semibold text-white outline-none'>click</Link></TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
              </Table>
            </div>
            
        </div>
    </Wrapper>
  )
}

export default page