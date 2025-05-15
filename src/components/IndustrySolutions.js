import React from "react";
import {
  FaDollarSign,
  FaChurch,
  FaCar,
  FaUtensils,
  FaStore,
  FaCut,
  FaBus,
  FaRing,
  FaBeer,
  FaBuilding,
  FaTruck,
} from "react-icons/fa";
import { motion } from "framer-motion";

const industries = [
  { icon: <FaDollarSign />, label: "Finance" },
  { icon: <FaChurch />, label: "Religious Organizations" },
  { icon: <FaCar />, label: "Rental Services" },
  { icon: <FaUtensils />, label: "Restaurants" },
  { icon: <FaStore />, label: "Retail & Ecommerce" },
  { icon: <FaCut />, label: "Salons & Spas" },
  { icon: <FaBus />, label: "Transportation" },
  { icon: <FaRing />, label: "Wedding Services" },
  { icon: <FaBeer />, label: "Bars & Nightclubs" },
  { icon: <FaBuilding />, label: "Construction & Home Services" },
  { icon: <FaTruck />, label: "Delivery Services" },
];

const IndustrySolutions = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Powerful SMS Solutions for <span className="text-yellow-400">Every Industry</span>
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Reach your audience instantly with tailored messaging solutions.
        </p>
      </div>

      {/* Scrolling Icons */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
        >
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-xl shadow-xl text-blue-900 max-w-[160px] hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl text-blue-600 mb-3">{industry.icon}</div>
              <p className="text-center font-semibold">{industry.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10">
        <button className="bg-yellow-400 text-blue-900 px-6 py-3 text-lg font-semibold rounded-full shadow-md hover:bg-yellow-300 transition">
          Explore SMS Solutions
        </button>
      </div>
    </section>
  );
};

export default IndustrySolutions;
