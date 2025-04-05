import React from 'react';
import { FaDollarSign, FaChurch, FaCar, FaUtensils, FaStore, FaCut, FaBus, FaRing, FaBeer, FaBuilding, FaTruck } from 'react-icons/fa';

const IndustrySolutions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">
            Solutions for <span className="text-blue-700">Your Industry</span>
          </h2>
        </div>

        {/* Icons Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Horizontal Scroll container */}
          <div className="overflow-hidden">
            <div className="flex scroll-icons gap-6">
              {/* Icon 1 - Finance */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaDollarSign className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Finance</p>
              </div>

              {/* Icon 2 - Religious Organizations */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaChurch className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Religious Organizations</p>
              </div>

              {/* Icon 3 - Rental Services */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaCar className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Rental Services</p>
              </div>

              {/* Icon 4 - Restaurants */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaUtensils className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Restaurants</p>
              </div>

              {/* Icon 5 - Retail and Ecommerce */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaStore className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Retail and Ecommerce</p>
              </div>

              {/* Icon 6 - Salons and Spas */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaCut className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Salons and Spas</p>
              </div>

              {/* Icon 7 - Transportation */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaBus className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Transportation</p>
              </div>

              {/* Icon 8 - Wedding Services */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaRing className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Wedding Services</p>
              </div>

              {/* Icon 9 - Bars and Nightclubs */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaBeer className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Bars and Nightclubs</p>
              </div>

              {/* Icon 10 - Construction and Home Services */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaBuilding className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Construction and Home Services</p>
              </div>

              {/* Icon 11 - Delivery Services */}
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-[160px]">
                <FaTruck className="text-4xl text-blue-600 mb-4" />
                <p className="text-center text-sm font-semibold text-gray-700">Delivery Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .scroll-icons {
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
};

export default IndustrySolutions;
