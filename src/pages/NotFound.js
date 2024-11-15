import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate(); // Replacing useHistory with useNavigate

  const handleRedirect = () => {
    navigate('/'); // Redirect to homepage or another relevant page
  };

  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-900 h-screen flex items-center justify-center text-white">
      <div className="text-center p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-6xl font-bold mb-4 animate__animated animate__fadeIn">404</h1>
        <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-400 transition-colors mt-4 transform hover:scale-105"
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
