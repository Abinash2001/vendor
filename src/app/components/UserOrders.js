"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getOrdersByUserId } from "../services/orderService";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function UserOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrdersByUserId(userId);
        setOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [userId]);
  // console.log("orderUser",orders);
  // const orderLength = orders.length;
  // console.log("order length",orders.length);
  // console.log("abinash")
  return (
    <div className="bg-white p-5 rounded">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-semibold">Orders</h1>
        <h1 className="text-[15px] font-semibold text-gray-500">
          Total spent $100
        </h1>
      </div>
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
              Date
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order?._id}>
                <td className="px-4 py-4 text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    <span>#{order?._id}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs md:text-sm text-gray-500 whitespace-nowrap">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                    <svg
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
                    </svg>
                    <h2 className="text-xs md:text-sm font-normal">
                      {order?.status}
                    </h2>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                    <svg
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
                    </svg>
                    <h2 className="text-xs md:text-sm font-normal">
                      Delivered
                    </h2>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs md:text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <Link
                      href={`/order/${order?._id}`}
                      className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                    >
                      <MdOutlineRemoveRedEye size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-4 text-xs md:text-sm text-gray-500 whitespace-nowrap"
                colSpan={6}
              >
                <div className="flex items-center justify-center">
                  <h2 className="text-xl md:text-2xl font-light text-gray-500">
                    No orders found
                  </h2>
                </div>
              </td>
            </tr>
          )}

          {/* <tr>
              <td className="px-4 py-4 text-xs md:text-sm text-gray-500 whitespace-nowrap" colSpan={6}>
                <div className="flex items-center justify-center">
                  <h2 className="text-xl md:text-2xl font-light text-gray-500">
                    No orders found
                  </h2>
                </div>
              </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
}
