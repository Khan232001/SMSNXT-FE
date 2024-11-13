// src/pages/Login.js
import React from 'react';
import './Login.css'; // Custom CSS for additional styling

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Login Form with New Branding */}
      <div className="login-left w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="logo mb-9 text-2xl font-bold mb-4 text-primary text-center">
            BYT
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Login</h2>
        <hr className="w-2/3 border-t-2 border-primary mb-6" /> {/* Line beneath the heading */}

        <form className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email"> {/* Increased font size */}
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              placeholder="user@me.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password"> {/* Increased font size */}
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Keep me logged in</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">
            Log In
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-500">or</p>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 mt-2 rounded-md hover:bg-gray-200 transition duration-300">
              Continue with Google
            </button>
          </div>
        </form>
      </div>

      {/* Right Side - Gradient Background with Wave Effect */}
      <div className="w-1/2 flex justify-center items-center p-8 wave-background">
        <div className="text-white max-w-md relative z-10">
          <h3 className="text-4xl font-bold mb-4">Plan a Year of SMS Campaigns in Minutes</h3>
          <p className="text-lg">Try our new Campaign Calendar — set up key moments and holiday campaigns today!</p>
          <div className="bg-white text-gray-900 p-4 mt-4 rounded-lg">
            <h4 className="font-bold mb-2">Holiday Campaigns</h4>
            <ul>
              <li className="mb-2">🎉 <strong>New Years Day:</strong> Start the year with compassion.</li>
              <li className="mb-2">🦃 <strong>Thanksgiving:</strong> Share gratitude-filled moments.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
