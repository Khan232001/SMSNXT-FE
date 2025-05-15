import React from 'react';
import { Link } from 'react-router-dom';
const WelcomeSMSNXT = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-blue-100 to-gray-200 min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 flex flex-col items-center w-full max-w-md">
        <img
          src="/imgs/sms-marketing-posts-design_290562-48.avif"
          alt="SMSNXT Illustration"
          className="w-52 md:w-64 mb-6 rounded-xl shadow-md"
        />

        <h1 className="text-4xl font-extrabold text-blue-600 text-center leading-snug">
          Welcome to <span className="text-black">SMSNXT!</span>
        </h1>

        <p className="text-lg text-gray-700 mt-3 text-center">
          Let’s personalize your trial and get you started in style.
        </p>
      <Link to='/step1'>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-3 rounded-full shadow-md text-lg font-medium">
          🚀 Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSMSNXT;
