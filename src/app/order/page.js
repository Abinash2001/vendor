"use client"
import React from 'react'
import Wrapper from '../components/Wrapper'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const page = () => {
  return (
    <Wrapper>
        <div className='bg-white my-5 p-5 rounded'>
            <h1 className='text-[30px] font-semibold mb-5'>Order Details</h1>
            <div className=' md:text-center bg-white my-10 justify-between'>
                {/* <label className='text-[16px] mr-10'>Product Category</label>
                <select className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 mb-10 outline-blue-400'>
                    <option>Select Category</option>
                    <option>abi</option>
                    <option>abi</option>
                </select> */}
              {/* </div> */}
              {/* <div> */}
                <Table aria-label="Example static collection table" className=' overflow-x-auto'>
                  <TableHeader>
                    <TableColumn className='font-bold'>Product Id</TableColumn>
                    <TableColumn className='font-bold'>User Id</TableColumn>
                    <TableColumn className='font-bold'>User Name</TableColumn>
                    <TableColumn className='font-bold'>Address</TableColumn>
                    <TableColumn className='font-bold'>Number</TableColumn>
                    <TableColumn className='font-bold'>Price</TableColumn>
                    <TableColumn className='font-bold'>Gateway</TableColumn>
                    <TableColumn className='font-bold'>Status</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1" className='border-b'>
                      <TableCell>#1</TableCell>
                      <TableCell>##1</TableCell>
                      <TableCell>Abinash Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                      <TableCell>1000</TableCell>
                      <TableCell>Online</TableCell>
                      <TableCell><div className='bg-green-600 rounded text-white text-center justify-center'>Pending</div></TableCell>
                    </TableRow>
                    <TableRow key="2" className='border-b'>
                      <TableCell>#2</TableCell>
                      <TableCell>##2</TableCell>
                      <TableCell>Naman Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                      <TableCell>2000</TableCell>
                      <TableCell>COD</TableCell>
                      <TableCell><div className='bg-gray-600 rounded text-white text-center justify-center'>Delivered</div></TableCell>
                    </TableRow>
                    <TableRow key="3" className='border-b'>
                      <TableCell>#3</TableCell>
                      <TableCell>##3</TableCell>
                      <TableCell>Naman Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                      <TableCell>2000</TableCell>
                      <TableCell>COD</TableCell>
                      <TableCell><div className='bg-green-600 rounded text-white text-center justify-center'>Pending</div></TableCell>
                    </TableRow>
                    <TableRow key="4" className='border-b'>
                      <TableCell>#4</TableCell>
                      <TableCell>##4</TableCell>
                      <TableCell>Abinash Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                      <TableCell>2000</TableCell>
                      <TableCell>COD</TableCell>
                      <TableCell><div className='bg-gray-600 rounded text-white text-center justify-center'>Delivered</div></TableCell>
                    </TableRow>
                    
                  </TableBody>
              </Table>
            </div>
            
        </div>
    </Wrapper>
  )
}

export default page