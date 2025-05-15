import React from 'react'
import { Link } from 'react-router-dom'
const Step2 = () => {
  return (
   
      <div className="px-4 sm:px-8">
      <div className="text-center mb-8">
        <span className="text-sm font-semibold text-gray-500">STEP 2 OF 4</span>
        <h1 className="text-3xl font-bold mt-2">Which of these best describes your industry?</h1>
        <select className='w-full mt-7 items-center h-12 px-4  bg-blue-300 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-green-500'>
            <option value=''>Select Option</option>
            <option value='Retail'>Retail</option>
            <option value='Tech'>Tech</option>
            <option value='Healthcare'>Healthcare</option>
            <option value='Finance'>Finance</option>
          </select>
         <Link to='/step3'>
          <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all shadow-md mt-10"
            >
              Continue
            </button>
            </Link>
        </div>
      </div>
 
  )
}

export default Step2
