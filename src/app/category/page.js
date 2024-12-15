"use client"
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { addCategory, getCategory, removeCategory } from '../services/categoryService';
import { toast } from 'react-toastify';


function page() {
  const[data,setData]= useState({
    name:"",
  });

  const [categories, setCategories] = useState([]);
  const handleAddCategory=async (event)=>{
    event.preventDefault();
    // validate data
    // .....

    try {
      const result=await addCategory(data);
      setCategories([...categories,result]);
      toast.success("Your category is added !!",{
        position: "bottom-right"
      });
      setData({
        name:'',
      });
    } catch (error) {
      console.log(error);
      console.log("error on addCategory function call");
      toast.error("Category not added !!",{
        position: "bottom-right"
      });
    }
  }

  const handleRemoveACategory = async (id) => {
    try {
      // console.log(id);
      const result = await removeCategory(id);
      if (result) {
        const updatedCategories = categories.filter((item) => item._id !== id);
        setCategories(updatedCategories);
        toast.success("Your category is removed !!", {
          position: "bottom-right"
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Category not found !!", {
          position: "bottom-right"
        });
      } else {
        console.log(error);
        console.log("error on removeCategory function call");
        toast.error("Category not removed !!", {
          position: "bottom-right"
        });
      }
    }
  };




  useEffect(()=>{
    const fetchCategories=async()=>{
      try {
        const categories=await getCategory();
        setCategories(categories);
        // console.log("before add category call");
        // console.log(categories);
      } catch (error) {
        console.log(error);
        console.log("error on getCategory function call");
      }
    }
    fetchCategories();
  },[]);
  return (
      <Wrapper >
        <form className='bg-white my-5 p-5 rounded' onSubmit={handleAddCategory}>
            <h1 className='text-[30px] font-semibold mb-5'>Add Category</h1>
            <div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label htmlFor='category_name' className='text-[16px]'>Category Name</label>
                  <input type="text" name='category_name' onChange={(event)=>{setData({name:event.target.value,});}} value={data.name} className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400'/>
              </div>
            </div>
            <div className='flex gap-5 justify-center w-full'>
              <button type='submit' className='bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded font-semibold text-white outline-none'>Add Product</button>
            </div>
            {/* {
              JSON.stringify(data)
            } */}
        </form>
        <div className='bg-white my-5 p-5 rounded'>
            <Table aria-label="Example static collection table" className=' overflow-x-auto'>
                <TableHeader>
                    <TableColumn className='font-bold'>Category Name</TableColumn>
                    <TableColumn className='font-bold'>Remove Button</TableColumn>
                </TableHeader>
                    <TableBody >
                        {categories.map((category, index) => (
                          <TableRow key={index} className='border-b'>
                            <TableCell className='text-center'>{category.name}</TableCell>
                            <TableCell className='text-center'>
                              <button onClick={()=>handleRemoveACategory(category._id)}
                              className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white'>Remove</button>
                            </TableCell>
                          </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    </Wrapper>
  )
}

export default page

