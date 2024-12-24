import React from "react";
import Wrapper from "../../components/Wrapper";
import { getOrderById } from "../../services/orderService";
import OrderItems from "@/app/components/OrderItems";
export default async function page({ params }) {
  const orderId = params.slug;
  const deliveryCharges = 50;
  //   if (!session) return <div className="text-center p-10">Please login to see your order details</div>;
  const order = await getOrderById(orderId);
  // console.log(order);
  return (
    <Wrapper>
      <div className="bg-white my-5 p-5 rounded">
        <h1 className="text-[30px] font-semibold mb-5">Order #{order?._id}</h1>
        <div className="flex justify-between">
          <div>
            <p className="text-[18px] font-semibold">Transaction details</p>
            <p className="text-[15px] text-gray-500">
              Transaction Id: #{order?.paymentTransactionId}
            </p>
            <p className="text-[15px] text-gray-500">Amount: {order?.amount}</p>
            <p className="text-[15px] text-gray-500">
              Payment Mode: {order?.paymentMode}
            </p>
            <p className="text-[15px] text-gray-500">
              Payment Status: {order?.status}
            </p>
          </div>
          <div>
            <p className="text-[18px] font-semibold">Delivery details</p>
            <p className="text-[15px] text-gray-500">
              Delivery Status: {order?.deliveryStatus}
            </p>
            <p className="text-[15px] text-gray-500">
              Delivery Charges: {deliveryCharges}
            </p>
            <p className="text-[15px] text-gray-500 font-medium">
              Total Amount: {order?.amount + deliveryCharges}
            </p>
            <p className="text-[15px] text-gray-500 font-medium">
              Delivery Address: {order?.address}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[18px] font-semibold">User details</p>
          <p className="text-[15px] text-gray-500">
            Name: abinash{/*{order?.user?.name}*/}
          </p>
          <p className="text-[15px] text-gray-500">
            Email: abinash{/*order?.user?.email*/}
          </p>
          <p className="text-[15px] text-gray-500">
            Phone: {order?.phone}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 py-10 bg-white my-5 p-5 rounded">
        {/* Order items start */}
        <div className="flex-[2]">
          <div className="text-lg font-bold">
            Order Id :{" "}
            <span className="text-[15px] font-normal">#{orderId}</span>
          </div>
          {order?.orderItems?.length > 0 ? (
            order?.orderItems.map((item) => (
              <OrderItems key={item._id} orderDetail={item} />
            ))
          ) : (
            <div>Your order is empty</div>
          )}
        </div>
        {/* Order items end */}

        {/* Summary start */}
        <div className="flex-[1]">
          <div className="text-lg font-bold">Summary</div>
          <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
            <div className="flex justify-between">
              <div className="text-sm md:text-md font-medium text-black">
                Price ({order?.orderItems.length} item)
              </div>
              <div className="text-sm md:text-md font-medium text-black">
                ${order?.amount?.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm md:text-md font-medium text-black">
                Delivery Charges
              </div>
              <div className="text-sm md:text-md font-medium text-black">
                ${deliveryCharges.toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <div className="text-sm md:text-md font-bold text-black">
                Total Amount
              </div>
              <div className="text-sm md:text-md font-bold text-black">
                ${(order?.amount + deliveryCharges).toFixed(2)}
              </div>
            </div>
            <div className="text-sm md:text-md py-5 border-t mt-5">
              The subtotal reflects the total price of your order, including
              duties and taxes.
              {/*, before any applicable discounts. It does not
                  include delivery costs and international transaction fees. */}
            </div>
          </div>
        </div>
        {/* Summary end */}
      </div>
    </Wrapper>
  );
}
