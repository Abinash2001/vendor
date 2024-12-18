import React from "react";
import Wrapper from "@/app/components/Wrapper";
import { getUserById } from "@/app/services/userService";
import UserAddress from "@/app/components/UserAddress";
import UserOrders from "@/app/components/UserOrders";

export default async function UserDetail({ params }) {
  const userId = params.slug;
  const userDetail = await getUserById(userId);
//   console.log(userDetail);
  return (
    <Wrapper>
      <h1 className="text-[25px] font-semibold mb-5 mt-5">
        {userDetail?.username}
      </h1>
      <div className="flex gap-5 ">
        <div className="p-5 w-1/5 flex rounded flex-col gap-4 bg-white">
          <div className="flex justify-center">
            <img
              className="w-[100px] h-[100px] rounded-full"
              src={userDetail?.profilePic}
              alt="profile pic"
              style={{
                backgroundColor: userDetail?.profilePic ? "" : "lightgrey",
              }}
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">{userDetail?.username}</p>
            <p className="text-[13px] text-blue-500 font-medium">
              {userDetail?.email}
            </p>
            <p className="text-[15px] text-gray-400 font-semibold">
              +91 {userDetail?.phone}
            </p>
          </div>

          <div className="border-t-2 border-black">
            <div className="mt-5">
              <p className="text-[15px] font-semibold">Subscription</p>
              <p className="text-[13px] text-gray-500">Active</p>
            </div>
            <div className="mt-2">
              <p className="text-[15px] font-semibold">Total Orders</p>
              <p className="text-[13px] text-gray-500">3</p>
            </div>
            <div className="mt-2">
              <p className="text-[15px] font-semibold">Registered On</p>
              <p className="text-[13px] text-gray-500">01/01/2023</p>
            </div>
          </div>
        </div>
        <div className="w-4/5 flex rounded flex-col gap-4">
          <UserAddress userId={userId} />
          <UserOrders userId={userId}/>
        </div>
      </div>
    </Wrapper>
  );
}
