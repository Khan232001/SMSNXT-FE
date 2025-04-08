import React from 'react';
import { Link } from 'react-router-dom';

const TrialMessage = () => {
  const userName = 'Tayyab'; // Dynamically pull this from auth/user context if needed

  return (
    <div className="max-w-xl mx-auto text-center p-6 rounded-lg shadow-md bg-gray-100 mt-24">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">🎉 Welcome, {userName}!</h1>
      <p className="text-gray-600 mb-6">You're just a step away from unlocking the power of smsNxt.</p>

      <h2 className="text-blue-600 text-2xl font-bold mb-4">One last thing:</h2>
      <p className="text-gray-700 mb-3">
        During your trial, you can only text to the number you signed up with.
      </p>
      <p className="text-gray-700 mb-6">
        Yes, this is a little frustrating. But our carrier partners require this of us to
        protect against spam. Once you upgrade to a paid plan we’ll help you register
        with the carriers as an approved sender and you’ll have the full power of texting
        at your fingertips.
      </p>

      
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
          Got it! Show me around!
        </button>
      
      <div className="mt-4">
        <a href="#" className="text-blue-400 text-sm hover:underline">
          Upgrade now to unlock full sending capabilities
        </a>
      </div>
    </div>
  );
};

export default TrialMessage;
