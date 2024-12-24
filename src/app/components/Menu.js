import Link from 'next/link';
import React from 'react'
import {BsChevronDown} from "react-icons/bs";

const data = [
    { id: 1, name: "Dashboard", url: "/" },
    { id: 2, name: "Product",subMenu:true },
    { id: 3, name: "Category", url:"/category" },
    { id: 4, name: "Order", url:"/order" },
    { id: 5, name: "Transaction", url:"transaction" },
    { id : 6, name: "Users", url:"/userDetails" },
];

const subMenuData=[
    {id:1, name:"Add Product",url:"/addProduct"},
    {id:2, name:"View Product",url:"/viewProduct"}
];
// const orderSubMenuData=[
//     {id:1, name:"Add Product",url:"add-prodcut"},
//     {id:2, name:"View Product",url:"view-prodcut"}
// ];
// const transactionSubMenuData=[
//     {id:1, name:"Transaction List",url:"add-prodcut"},
//     {id:2, name:"View Product",url:"viewProdcut"}
// ];


const Menu = ({showCatMenu,setShowCatMenu}) => {
  return (
    <>
        <ul className='hidden md:flex gap-8 iteams-center font-medium text-black'>
            {
                data.map((item)=>{
                    return (
                        <React.Fragment key={item.id}>
                        {!!item?.subMenu ? (
                            <li className='p-[10px] cursor-pointer hover:bg-black/[0.03] flex items-center gap-2 relative'
                                onMouseEnter={()=>setShowCatMenu(true)}
                                onMouseLeave={()=>setShowCatMenu(false)}
                            >
                                {item?.name}
                                <BsChevronDown size={20}/>
                                {showCatMenu && (
                                    <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black-shadow-lg">
                                        {subMenuData.map((submenu)=>{
                                            return(
                                                <Link key={submenu.id} href={submenu.url}>
                                                    <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                                                        {submenu.name}
                                                    </li>
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                )}
                            </li>
                        ): (
                            <li className='p-[10px] cursor-pointer hover:bg-black/[0.03] hover:rounded-md'>
                                <Link href={item?.url}>
                                    {item.name}
                                </Link>
                            </li>
                        )}
                    </React.Fragment>
                    )
                })
            }
        </ul>
    </>
  )
}

export default Menu