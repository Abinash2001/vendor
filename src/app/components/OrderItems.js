import Image from "next/image";
import React from "react";

const OrderItems = ({ orderDetail }) => {
  // console.log("orderDetail",orderDetail);
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* Image Start */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        {/* <img
          src={orderDetail?.productImg}
          // alt={orderDetail?.product_name}
          alt="product"
        /> */}
        <Image
          src={orderDetail?.productImg}
          alt={orderDetail?.product_name}
          width={120}
          height={120}
        />
      </div>
      {/* Image End */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Product Title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.5]">
            {/* {orderDetail?.product_name} */}
            product_name
          </div>

          {/* Product Price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : $ {orderDetail?.price}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size: 10</div>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">
                Quantity: {orderDetail?.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
