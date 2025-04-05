import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-5 text-gray-900 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="font-bold text-2xl text- ml-10">
        <Link to="/">NXT</Link>
      </div>

      {/* Links for larger screens */}
      <div className="hidden lg:flex space-x-6">
        <Link to="/" className="hover:text-blue-500 ">
          Home
        </Link>
        <div className="relative group">
          <Link to="product" className="hover:text-blue-500 ">
            Product<span className="ml-1">▼</span>
          </Link>
          {/* Dropdown on hover */}
          <div className="absolute hidden group-hover:block top-full mt-2 bg-white shadow-md w-40 rounded-lg">
            <Link to="#overview" className="block py-2 px-4 hover:bg-gray-100">Overview</Link>
            <Link to="#features" className="block py-2 px-4 hover:bg-gray-100">Features</Link>
            <Link to="#integrations" className="block py-2 px-4 hover:bg-gray-100">Integrations</Link>
          </div>
        </div>

        <Link to="pricing" className="hover:text-blue-500 ">
          Pricing
        </Link>

        <Link to="features" className="hover:text-blue-500 ">
          Features
        </Link>

        <div className="relative group">
          <Link to="solutions" className="hover:text-blue-500 ">
            Solutions<span className="ml-1">▼</span>
          </Link>
          {/* Dropdown on hover */}
          <div className="absolute hidden group-hover:block top-full mt-2 bg-white shadow-md w-40 rounded-lg">
            <Link to="industries" className="block py-2 px-4 hover:bg-gray-100">Industries</Link>
            <Link to="case-studies" className="block py-2 px-4 hover:bg-gray-100">Case Studies</Link>
            <Link to="services" className="block py-2 px-4 hover:bg-gray-100">Services</Link>
          </div>
        </div>

        <div className="relative group">
          <Link to="resources" className="hover:text-blue-500 ">
            Resources<span className="ml-1">▼</span>
          </Link>
          {/* Dropdown on hover */}
          <div className="absolute hidden group-hover:block top-full mt-2 bg-white shadow-md w-40 rounded-lg">
            <Link to="blog" className="block py-2 px-4 hover:bg-gray-100">Blog</Link>
            <Link to="guides" className="block py-2 px-4 hover:bg-gray-100">Guides</Link>
            <Link to="support" className="block py-2 px-4 hover:bg-gray-100">Support</Link>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="hidden lg:block">
      <a href="login">
          <button className="bg-white text-black px-4 py-2 rounded-lg  hover:bg-gray-100">
           Login
          </button>
          </a>
        <a href="contact">
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-500 mr-10">
            Start Free
          </button>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="bg-white hover:bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white p-5 flex flex-col space-y-4 shadow-md ">
          <Link to="/" className="hover:text-blue-500 ">
            Home
          </Link>
          <Link to="product" className="hover:text-blue-500 ">
            Product
          </Link>
          <Link to="pricing" className="hover:text-blue-500 ">
            Pricing
          </Link>
          <Link to="features" className="hover:text-blue-500 ">
            Features
          </Link>
          <Link to="solutions" className="hover:text-blue-500 ">
            Solutions
          </Link>
          <Link to="resources" className="hover:text-blue-500 ">
            Resources
          </Link>
          <Link to="login" className="hover:text-blue-500 ">
            Login
          </Link>
          <a href="contact">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-500">
              Start Free
            </button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;
