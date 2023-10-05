"use client"
import React from 'react'
import Wrapper from '../components/Wrapper'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const page = () => {
  return (
    <Wrapper>
        <div className='bg-white my-5 p-5 rounded'>
            <h1 className='text-[30px] font-semibold mb-5'>Product Details</h1>
            <div className=' md:text-center bg-white my-10 justify-between'>
                <label className='text-[16px] mr-10'>Product Category</label>
                <select className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 mb-10 outline-blue-400'>
                    <option>Select Category</option>
                    <option>abi</option>
                    <option>abi</option>
                </select>
              {/* </div> */}
              {/* <div> */}
                <Table aria-label="Example static collection table" className=' overflow-x-auto'>
                  <TableHeader>
                    <TableColumn className='font-bold'>Product Name</TableColumn>
                    <TableColumn className='font-bold'>Price</TableColumn>
                    <TableColumn className='font-bold'>Original Price</TableColumn>
                    <TableColumn className='font-bold'>Total Quantity</TableColumn>
                    <TableColumn className='font-bold'>Sold</TableColumn>
                    <TableColumn className='font-bold'>Revenue</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1" className='border-b'>
                      <TableCell>Laptop</TableCell>
                      <TableCell>20000</TableCell>
                      <TableCell>25000</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>100000</TableCell>
                    </TableRow>
                    <TableRow key="2" className='border-b'>
                      <TableCell>Laptop</TableCell>
                      <TableCell>20000</TableCell>
                      <TableCell>25000</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>100000</TableCell>
                    </TableRow>
                    <TableRow key="3" className='border-b'>
                      <TableCell>Laptop</TableCell>
                      <TableCell>20000</TableCell>
                      <TableCell>25000</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>100000</TableCell>
                    </TableRow>
                    <TableRow key="4" className='border-b'>
                      <TableCell>Laptop</TableCell>
                      <TableCell>20000</TableCell>
                      <TableCell>25000</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>100000</TableCell>
                    </TableRow>
                    
                  </TableBody>
              </Table>
            </div>
            
        </div>
    </Wrapper>
  )
}

export default page