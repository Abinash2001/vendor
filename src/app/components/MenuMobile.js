import { BsChevronDown } from "react-icons/bs";
import Link from 'next/link';
import React from 'react'

const data = [
    { id: 1, name: "Dashboard", url: "/" },
    { id: 2, name: "Product",subMenu:true },
    { id: 3, name: "Order", url:"/" },
    { id: 4, name: "Transaction", url:"transaction" },
    { id: 5, name: "Logout", url: "/logout" },
];

const subMenuData=[
    {id:1, name:"Add Product",url:"addProduct"},
    {id:2, name:"View Product",url:"viewProduct"}
];
// const orderSubMenuData=[
//     {id:1, name:"Add Product",url:"add-prodcut"},
//     {id:2, name:"View Product",url:"view-prodcut"}
// ];
// const transactionSubMenuData=[
//     {id:1, name:"Transaction List",url:"add-prodcut"},
//     {id:2, name:"View Product",url:"view-prodcut"}
// ];
const MenuMobile = ({showCatMenu,setShowCatMenu,setMobileMenu}) => {
  return (
    <ul className='flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black'>
        {data.map((item)=>{
            return(
                <React.Fragment key={item.id}>
                    {!!item?.subMenu ? (
                        <li className='cursor-pointer py-4 px-5 border-b flex flex-col relative'
                            onClick={()=>setShowCatMenu(!showCatMenu)}
                        >
                            <div className="flex justify-between items-center">
                                {item?.name}
                                <BsChevronDown size={20}/>
                            </div>
                            {showCatMenu && (
                                <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                                    {subMenuData.map((submenu)=>{
                                        return(
                                            <Link key={submenu.id} href={submenu.url} onClick={()=>{
                                                setShowCatMenu(true)
                                                setMobileMenu(false)
                                                }}>
                                                <li className="py-4 px-8 border-t flex justify-between">
                                                    {submenu.name}
                                                </li>
                                            </Link>
                                        )
                                    })}
                                </ul>
                            )}
                        </li>
                    ): (
                        <li className='py-4 px-5 border-b'>
                            <Link href={item?.url} onClick={()=>setMobileMenu(false)}>
                                {item.name}
                            </Link>
                        </li>
                    )}
                </React.Fragment>
            )
        })}
    </ul>
  )
}

export default MenuMobile