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
} from "@nextui-org/react";
import {
  addCategory,
  getCategory,
  removeCategory,
  updateCategory,
  activeInactiveCategory,
} from "../services/categoryService";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Loading from "../loading";

function Category() {
  const [data, setData] = useState({
    name: "",
  });

  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategory();
        setCategories(categories);
        setLoading(false);
        // console.log("before add category call");
        // console.log(categories);
      } catch (error) {
        console.log(error);
        console.log("error on getCategory function call");
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    // validate data
    // .....

    try {
      if (editingCategory) {
        const result = await updateCategory(editingCategory._id, {
          name: data.name,
        });
        const updatedCategories = categories.map((category) =>
          category._id === editingCategory._id ? result : category
        );
        setCategories(updatedCategories);
        setEditingCategory(null);
        toast.success("Your category is updated !!", {
          position: "bottom-right",
        });
      } else {
        const result = await addCategory(data);
        setCategories([...categories, result]);
        toast.success("Your category is added !!", {
          position: "bottom-right",
        });
      }
      setData({
        name: "",
      });
    } catch (error) {
      console.log(error);
      console.log("error on addCategory function call");
      toast.error("Category not added !!", {
        position: "bottom-right",
      });
    }
  };

  const handleRemoveACategory = async (id) => {
    try {
      // console.log(id);
      const result = await removeCategory(id);
      if (result) {
        const updatedCategories = categories.filter((item) => item._id !== id);
        setCategories(updatedCategories);
        toast.success("Your category is removed !!", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Category not found !!", {
          position: "bottom-right",
        });
      } else {
        console.log(error);
        console.log("error on removeCategory function call");
        toast.error("Category not removed !!", {
          position: "bottom-right",
        });
      }
    }
  };

  const handleActiveInactive = async (id, active) => {
    try {
      const result = await activeInactiveCategory(id, { active: !active });
      const updatedCategories = categories.map((category) =>
        category._id === id ? result : category
      );
      setCategories(updatedCategories);
      toast.success(`Category ${active ? "deactivated" : "activated"} !!`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
      console.log("error on updateCategory function call");
      toast.error("Category not Updated !!", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      {loading && <Loading />}

      <Wrapper>
        <form
          className="bg-white my-5 p-5 rounded"
          onSubmit={handleAddCategory}
        >
          <h1 className="text-[30px] font-semibold mb-5">Add Category</h1>
          <div>
            <div className="md:flex gap-10 md:text-center mb-5 justify-between">
              <label htmlFor="category_name" className="text-[16px]">
                Category Name
              </label>
              <input
                type="text"
                name="category_name"
                onChange={(event) => {
                  setData({ name: event.target.value });
                }}
                value={data.name}
                className="border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-5 justify-center w-full">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded font-semibold text-white outline-none"
            >
              {editingCategory ? "Update" : "Add Product"}
              {/* Add Product */}
            </button>
          </div>
          {/* {
              JSON.stringify(data)
            } */}
        </form>
        <div className="bg-white my-5 p-5 rounded">
          {categories.length === 0 && !loading ? (
            <div className="text-center text-2xl font-semibold my-10">
              No Categories found, please add some category first.
            </div>
          ) : (
            <Table
              aria-label="Example static collection table"
              className=" overflow-x-auto"
            >
              <TableHeader>
                <TableColumn className="font-bold text-center">
                  Category Name
                </TableColumn>
                {/* <TableColumn className="font-bold text-center">
              Edit Button
            </TableColumn> */}
                <TableColumn className="font-bold text-center">
                  Action
                </TableColumn>
              </TableHeader>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="text-center">
                      {category.name}
                    </TableCell>
                    {/* <TableCell className="text-center">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setData({ name: category.name });
                    }}
                    className="px-2 py-1 rounded hover:bg-slate-200"
                  >
                    <BiSolidEditAlt
                      size={20}
                      className="text-blue-500 cursor-pointer"
                    />
                  </button>
                </TableCell> */}
                    <TableCell className="text-center">
                      <button
                        onClick={() => {
                          setEditingCategory(category);
                          setData({ name: category.name });
                        }}
                        className="px-2 py-1 rounded hover:bg-slate-200"
                      >
                        <BiSolidEditAlt
                          size={20}
                          className="text-blue-500 cursor-pointer"
                        />
                      </button>
                      {/* <button onClick={()=>handleRemoveACategory(category._id)}
                              className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white'>Remove</button> */}
                      <button
                        onClick={() => handleRemoveACategory(category._id)}
                        className="px-2 py-1 rounded hover:bg-slate-200"
                      >
                        <RiDeleteBinLine
                          size={20}
                          className="text-red-500 cursor-pointer"
                        />
                      </button>
                      <button
                        className="px-2 py-1 rounded hover:bg-slate-200"
                        onClick={() =>
                          handleActiveInactive(category._id, category.active)
                        }
                      >
                        {category.active ? (
                          <FiCheckCircle
                            size={20}
                            className="text-green-500 mr-1"
                          />
                        ) : (
                          <FiXCircle size={20} className="text-red-500 mr-1" />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Wrapper>
    </>
  );
}

export default Category;
