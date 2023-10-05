import React from "react";
import Wrapper from "./Wrapper";
import { AiOutlineMore,AiOutlineShoppingCart } from "react-icons/ai";
import { Card } from "./Card";
import SaleReport from "./SaleReport";

const Dashboard = () => {
  return (
    <div>
        <Card/>
        <SaleReport/>
    </div>
  );
};

export default Dashboard;
