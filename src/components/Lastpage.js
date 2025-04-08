import React from 'react';
import { Link } from 'react-router-dom';
const TrialMessage = () => {
  return (
    <div className="max-w-xl mx-auto text-center p-6 rounded-lg shadow-md bg-gray-100 mt-24">
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
       <Link to ='/intro'>
            <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all shadow-md mt-10"
                  >
                    Continue
                  </button>
                  </Link>
      <div className="mt-4">
        <a href="#" className="text-blue-400 text-sm hover:underline">
          Upgrade now to unlock full sending capabilities
        </a>
      </div>
    </div>
  );
};

export default TrialMessage;
