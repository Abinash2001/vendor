"use client"
import React from 'react'
import Wrapper from '../components/Wrapper'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { getUsers } from '../services/userService';

const page = () => {
  const users = getUsers();
  return (
    <Wrapper>
        <div className='bg-white my-5 p-5 rounded'>
            <h1 className='text-[30px] font-semibold mb-5'>User Details</h1>
            <div className=' md:text-center bg-white my-10 justify-between'>
                <Table aria-label="Example static collection table" className=' overflow-x-auto'>
                  <TableHeader>
                    {/* <TableColumn className='font-bold'>User Id</TableColumn> */}
                    <TableColumn className='font-bold'>User Email</TableColumn>
                    <TableColumn className='font-bold'>Address</TableColumn>
                    <TableColumn className='font-bold'>Number</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1" className='border-b'>
                      <TableCell>Abinash Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                    </TableRow>
                    <TableRow key="2" className='border-b'>
                      <TableCell>Naman Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                    </TableRow>
                    <TableRow key="3" className='border-b'>
                      <TableCell>Naman Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                    </TableRow>
                    <TableRow key="4" className='border-b'>
                      <TableCell>Abinash Kr Chourasia</TableCell>
                      <TableCell>Ichapur</TableCell>
                      <TableCell>801300000</TableCell>
                    </TableRow>
                    
                  </TableBody>
              </Table>
            </div>
            
        </div>
    </Wrapper>
  )
}

export default page