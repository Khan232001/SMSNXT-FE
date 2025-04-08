import React from 'react';
import { Link } from 'react-router-dom';
const Businesspage = () => {
  return (
    <div className='min-h-screen bg-blue-200 flex flex-col font-poppins pt-10 px-4 md:px-0'>
      <div className='max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-lg rounded-lg'>
        <h2 className='text-black text-3xl font-bold mb-5 text-center md:text-left'>Business Type</h2>
        
        {/* Business Classification Dropdown */}
        <div className='mb-6'>
          <label className='block text-lg font-semibold text-gray-700 mb-2'>
            Business Classification <span className="text-red-500">*</span>
          </label>
          <select className='w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'>
            <option value=''>Select Classification</option>
            <option value='Retail'>Retail</option>
            <option value='Tech'>Tech</option>
            <option value='Healthcare'>Healthcare</option>
            <option value='Finance'>Finance</option>
          </select>
        </div>

        {/* Brand Details */}
        <h3 className='text-2xl font-bold text-black mb-4'>Brand Details</h3>
        <p className='text-gray-700 mb-6 text-sm md:text-base'>
          Ensure that all brand details are accurate and verified before finalizing. Cross-check the details with official records to maintain authenticity.
        </p>

        {/* Input Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[
            { label: 'Company Name', id: 'company' },
            { label: 'Display Name', id: 'display-name' },
            { label: 'Country Registration', id: 'country-registration' },
            { label: 'EIN', id: 'ein' },
            { label: 'Website', id: 'website' }
          ].map(({ label, id }) => (
            <div key={id}>
              <label className='block text-lg font-semibold text-gray-700 mb-2'>
                {label} <span className="text-red-500">*</span>
              </label>
              <input type="text" id={id} className='w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500' />
            </div>
          ))}
        </div>

        {/* Address Information */}
        <h4 className='text-2xl font-bold text-black mt-8 mb-4'>Address Information</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[
            { label: 'Street', id: 'street' },
            { label: 'City', id: 'city' },
            { label: 'Postal Code', id: 'postal-code' }
          ].map(({ label, id }) => (
            <div key={id}>
              <label className='block text-lg font-semibold text-gray-700 mb-2'>
                {label} <span className="text-red-500">*</span>
              </label>
              <input type="text" id={id} className='w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500' />
            </div>
          ))}
        </div>

        {/* Contact Details */}
        <h5 className='text-2xl font-bold text-black mt-8 mb-4'>Contact Details</h5>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[
            { label: 'Email', id: 'email' },
            { label: 'Phone', id: 'phone' }
          ].map(({ label, id }) => (
            <div key={id}>
              <label className='block text-lg font-semibold text-gray-700 mb-2'>
                {label} <span className="text-red-500">*</span>
              </label>
              <input type="text" id={id} className='w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500' />
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <Link to='/usecase'>
        <div className="flex justify-center mt-6">
          <button className="bg-green-700 text-white h-12 px-8 rounded-lg hover:bg-green-800 font-semibold text-lg">
            Continue
          </button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Businesspage;
