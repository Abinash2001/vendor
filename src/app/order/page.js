// "use client";
import React from "react";
import Wrapper from "../components/Wrapper";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/react";
import { getOrders } from "../services/orderService";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Pagination from "../components/Pagination";

const Order = async ({ searchParams }) => {
  //pagination start here
  let page = parseInt(searchParams.page, 10); //?page= 4.1 then page = 4 or 4.9 then page = 4
  page = isNaN(page) || page < 1 ? 1 : page; //if page is not a number then page = 1
  const perPage = 10; //items per page
  //pagination end here

  const data = await getOrders(perPage, page);
  const orders = data.orders;
  const totalPages = Math.ceil(data.totalOrdersLength / perPage);

  // const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   getOrders().then((result) => setOrders(result));
  // }, []);
  // console.log("orders", orders);
  return (
    <Wrapper>
      <div className="bg-white my-5 p-5 rounded">
        <h1 className="text-[30px] font-semibold mb-5">Order Details</h1>
        <div className=" md:text-center bg-white my-10 justify-between">
          {/* <label className='text-[16px] mr-10'>Product Category</label>
                <select className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 mb-10 outline-blue-400'>
                    <option>Select Category</option>
                    <option>abi</option>
                    <option>abi</option>
                </select> */}
          {/* </div> */}
          {/* <div> */}
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Invoice
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    User Id
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Number
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Gateway
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Delivery Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <span>#{order?._id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <span>#{order?.userId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <span>Abinash</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <span>{order?.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <span>{order?.amount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                        {/* <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg> */}
                        <FaCheck size={12} />
                        <h2 className="text-[12px] font-normal">
                          {order?.status}
                        </h2>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                        {/* <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg> */}
                        <FaCheck />
                        <h2 className="text-[12px] font-normal">Delivered</h2>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <Link
                          href={`/order/${order?._id}`}
                          className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                        >
                          <MdOutlineRemoveRedEye size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* --------------------------------------------------------------------------------------------- */}
          {/* this Table is use for client side rendering */}
          {/* <Table
            aria-label="Example static collection table"
            className=" overflow-x-auto"
          >
            <TableHeader>
              <TableColumn className="font-bold text-center">Order Id</TableColumn>
              <TableColumn className="font-bold text-center">User Id</TableColumn>
              <TableColumn className="font-bold text-center">User Name</TableColumn>
              <TableColumn className="font-bold text-center">Number</TableColumn>
              <TableColumn className="font-bold text-center">Price</TableColumn>
              <TableColumn className="font-bold text-center">Gateway</TableColumn>
              <TableColumn className="font-bold text-center">Status</TableColumn>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} className="border-b">
                  <TableCell className="text-[12px]">#{order._id}</TableCell> 
                  <TableCell className="text-[12px]">#{order.userId}</TableCell>
                  <TableCell className="text-[12px]">Abinash Kr Chourasia</TableCell>
                  <TableCell className="text-[12px]">{order.phone}</TableCell>
                  <TableCell className="text-[12px]">{order.amount}</TableCell>
                  <TableCell className="text-[12px]">Online</TableCell>
                  <TableCell>
                    <div className={`text-[12px] p-1 rounded text-white text-center justify-center ${order.status === "Pending" ? "bg-green-600" : order.status === "Delivered" ? "bg-blue-600" : "bg-red-600"}`} >
                      {order.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow key="1" className="border-b">
                <TableCell>#1</TableCell>
                <TableCell>##1</TableCell>
                <TableCell>Abinash Kr Chourasia</TableCell>
                <TableCell>Ichapur</TableCell>
                <TableCell>801300000</TableCell>
                <TableCell>1000</TableCell>
                <TableCell>Online</TableCell>
                <TableCell>
                  <div className="bg-green-600 rounded text-white text-center justify-center">
                    Pending
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="1" className="border-b">
                <TableCell>#1</TableCell>
                <TableCell>##1</TableCell>
                <TableCell>Abinash Kr Chourasia</TableCell>
                <TableCell>Ichapur</TableCell>
                <TableCell>801300000</TableCell>
                <TableCell>1000</TableCell>
                <TableCell>Online</TableCell>
                <TableCell>
                  <div className="bg-green-600 rounded text-white text-center justify-center">
                    Pending
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="2" className="border-b">
                <TableCell>#2</TableCell>
                <TableCell>##2</TableCell>
                <TableCell>Naman Kr Chourasia</TableCell>
                <TableCell>Ichapur</TableCell>
                <TableCell>801300000</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>COD</TableCell>
                <TableCell>
                  <div className="bg-gray-600 rounded text-white text-center justify-center">
                    Delivered
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="3" className="border-b">
                <TableCell>#3</TableCell>
                <TableCell>##3</TableCell>
                <TableCell>Naman Kr Chourasia</TableCell>
                <TableCell>Ichapur</TableCell>
                <TableCell>801300000</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>COD</TableCell>
                <TableCell>
                  <div className="bg-green-600 rounded text-white text-center justify-center">
                    Pending
                  </div>
                </TableCell>
              </TableRow>
              <TableRow key="4" className="border-b">
                <TableCell>#4</TableCell>
                <TableCell>##4</TableCell>
                <TableCell>Abinash Kr Chourasia</TableCell>
                <TableCell>Ichapur</TableCell>
                <TableCell>801300000</TableCell>
                <TableCell>2000</TableCell>
                <TableCell>COD</TableCell>
                <TableCell>
                  <div className="bg-gray-600 rounded text-white text-center justify-center">
                    Delivered
                  </div>
                </TableCell>
              </TableRow> *
            </TableBody>
          </Table> */}
          {/* --------------------------------------------------------------------------------------------- */}
          {/* </div> */}
        </div>
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </Wrapper>
  );
};

export default Order;
