import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"; // Ensure the path is correct
import Footer from "../../components/Footer"; // Ensure the path is correct

const ThankYou = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti effect after a short delay to simulate success animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-t from-blue-100 to-indigo-200 flex flex-col justify-center items-center py-10 relative">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute top-0 left-0 w-full h-full z-10">
            {/* Confetti Effect Here */}
          </div>
        )}

        <div className="w-full max-w-lg p-8 border border-blue-300 rounded-xl bg-white shadow-xl text-center transform transition duration-500 ease-in-out scale-100 hover:scale-105 relative z-20">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-2s">
            Your payment was successful. We appreciate your business.
          </p>

          <Link
            to="/" // Corrected the link to the root path ("/")
            className="text-xl font-medium text-blue-600 hover:text-blue-800 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 mt-6 inline-block"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;
