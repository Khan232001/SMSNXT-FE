import React from 'react';
import { FaSearch } from "react-icons/fa";
const DLC = () => {
  return (
    <div className='min-h-screen bg-gray-200 py-10 px-10'>
      <h1 className='text-black font-bold text-2xl md:text-3xl text-center '>User Data</h1>
      {/* Search Bar */}
      <div className="flex justify-center mb-8 mt-6">
        <div className="flex items-center border rounded-full shadow-md bg-white overflow-hidden w-full max-w-lg">
          <input
            type="text"
            placeholder="Enter Company name"
            className="flex-1 h-12 px-4 text-lg outline-none"
          />
          <button className="h-12 w-14 flex justify-center items-center bg-blue-600 text-white">
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </div>

     <div className='mt-10  space-y-4'>
        <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-lg md:text-xl font-semibold">Selected Numbers:</h2>
          <span className="text-lg text-gray-700 ">677-8777</span>
        </div>

        <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Brand name:</h2>
          <span className="text-lg text-gray-700 ">BLUECATE</span>
        </div>

        <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Contact Email Address:</h2>
          <span className="text-lg text-gray-700 ">INFO@BLUECATE.COM</span>
        </div>

        <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Contact Phone:</h2>
          <span className="text-lg text-gray-700 ">(973) 345-6784</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Campaign Description:</h2>
          <p className="text-lg text-gray-700 mt-4">
            Marketing Product for our new launch in Chicago and Vegas areas. We send weekly marketing messages about sales and offers.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Opt-in Flow Description</h2>
          <p className="text-lg text-gray-700 mt-6">
          End users opt-in by visitingwww.smsnxt.com. SMS terms atwww.smsnxt.com. Privacy policy atwww.smsnxt.com.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-center">Sample Messages</h2>
          <p className="text-lg bg-gray-300 px-10 py-4 rounded-lg text-gray-700 mt-5">
          Hello, please join our marketing event. Reply STOP to opt out.
          </p>
          <p className="text-lg bg-gray-300 px-10 py-4 rounded-lg text-gray-700 mt-5">
          Don't miss out! Exclusive offer inside. Reply STOP to opt out.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-center">2. Costs and Terms</h2>
          <div className="space-y-4"> 
          <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Brand Registration</h2>
          <span className="text-lg text-gray-700 ml-20">FREE</span>

          </div>
          <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Campaign vetting</h2>
          <span className="text-lg text-gray-700 ml-20">FREE</span>
          
          </div>
          <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Campaign monthly fee</h2>
          <span className="text-lg text-gray-700 ml-20">FREE for 1 month, later $10 per month</span>
          
          </div>
          <div className='flex flex-col sm:flex-row justify-between'>
          <h2 className="text-xl font-semibold">Total</h2>
          <span className="text-lg text-gray-700 ml-20">$0.00 (due now)</span>
          </div>
          </div>
        </div>

        <div>

        </div>
     
        </div>
        </div> 
    
    
  );
};

export default DLC;