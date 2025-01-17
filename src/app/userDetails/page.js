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
  user,
} from "@nextui-org/react";
import { getUsers } from "../services/userService";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";

const UserDetails = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);
  // console.log(users);
  return (
    <>
      {users.length === 0 ? (
        <div className="text-center text-2xl font-semibold my-10">
          No Users found.
        </div>
      ) : (
        <Wrapper>
          <div className="bg-white my-5 p-5 rounded">
            <h1 className="text-[30px] font-semibold mb-5">Users</h1>
            <div className=" md:text-center bg-white my-10 justify-between">
              <Table
                aria-label="Example static collection table"
                className=" overflow-x-auto"
              >
                <TableHeader>
                  {/* <TableColumn className='font-bold'>User Id</TableColumn> */}
                  <TableColumn className="font-bold text-center">
                    S.No
                  </TableColumn>
                  <TableColumn className="font-bold text-center">
                    Name
                  </TableColumn>
                  <TableColumn className="font-bold text-center">
                    Email
                  </TableColumn>
                  <TableColumn className="font-bold text-center">
                    Create On
                  </TableColumn>
                  {/* <TableColumn className="font-bold">Number</TableColumn> */}
                  <TableColumn className="font-bold text-center">
                    Action
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {users.length > 0 &&
                    users.map((user, index) => (
                      <TableRow key={index} className="border-b">
                        <TableCell className="text-gray-400">
                          {index + 1}
                        </TableCell>
                        <TableCell>{user?.username}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>
                          {new Date(user?.createdAt).toLocaleString()}
                        </TableCell>
                        {/* <TableCell>801300000</TableCell> */}
                        <TableCell className="flex gap-2 justify-center">
                          <Link
                            href={`/userDetails/${user?._id}`}
                            className="px-2 py-1 rounded"
                          >
                            <MdOutlineRemoveRedEye
                              size={20}
                              className="text-green-500 cursor-pointer"
                            />
                          </Link>
                          {/* <button className= 'px-2 py-1 rounded'> <BiSolidEditAlt size={20} className='text-blue-500 cursor-pointer'/></button>
                        <button className='px-2 py-1 rounded'><RiDeleteBinLine size={20} className='text-red-500 cursor-pointer'/></button> */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default UserDetails;
