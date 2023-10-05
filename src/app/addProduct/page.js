import React from 'react'
import Wrapper from '../components/Wrapper'

const page = () => {
  return (
    <Wrapper >
        <form className='bg-white my-5 p-5 rounded'>
            <h1 className='text-[30px] font-semibold mb-5'>Add Product</h1>
            <div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label className='text-[16px]'>Product Name</label>
                  <input type="text" className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400'/>
              </div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label className='text-[16px]'>Product Description</label>
                  <textarea type="area" className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0'/>
              </div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label className='text-[16px]'>Original Price (in INR)</label>
                  <input type="text" className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400'/>
              </div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label className='text-[16px]'>Discounted Price (in INR)</label>
                  <input type="text" className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400'/>
              </div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label className='text-[16px]'>Number of Product</label>
                  <input type="number" className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400'/>
              </div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label className='text-[16px]'>Product Category</label>
                  <select className='border w-full lg:w-[80%] md:w-[70%] rounded p-[8px] mt-2 md:mt-0 outline-blue-400'>
                    <option>Select Category</option>
                    <option>abi</option>
                    <option>abi</option>
                  </select>
              </div>
              <div className='md:flex gap-10 md:text-center mb-5 justify-between'>
                  <label  className='text-[17px]'>Product Image</label>
                  <input type="file" className='border w-full lg:w-[80%] md:w-[70%] rounded p-[10px] mt-2 md:mt-0'/>
              </div>
            </div>
            <div className='flex gap-5 justify-center w-full'>
              <button className='bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded font-semibold text-white outline-none'>Add Product</button>
              <button className='bg-gray-500 hover:bg-gray-600 py-2 px-3 rounded font-semibold text-white outline-none'>Reset</button>
            </div>
        </form>
    </Wrapper>
  )
}

export default page