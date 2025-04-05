import React from "react";
import { useNavigate } from "react-router-dom";  // Importing useNavigate from react-router-dom

const ComparePackages = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  // Function to handle the redirection when "Contact Sales" button is clicked
  const handleContactSales = () => {
    navigate("/contact");  // Redirect to '/contact' route
  };

  return (
    <section id="compare-packages" className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 py-16 text-white">
      <div className="container mx-auto px-6">
        {/* Compare Packages Title */}
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Compare Packages
        </h2>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Prepaid Package */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Prepaid</h3>
            <p className="mt-4">
              SMS, WhatsApp, USSD, Number Provisioning, and Enterprise-Grade Channel APIs for throughput management.
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li>Pay-as-you-go</li>
              <li>Campaign Messaging Tool</li>
              <li>Reporting & Dashboards</li>
            </ul>
            <button
              className="mt-5 bg-pink-200 text-black py-3 px-6 rounded-full hover:bg-pink-300 transition-colors"
              onClick={handleContactSales}  // Added onClick handler for redirection
            >
              Try for Free
            </button>
          </div>

          {/* Connect Package */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Connect</h3>
            <p className="mt-4">
              SMS, WhatsApp, and Apple Messages with number provisioning for enterprise-grade messaging at scale.
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li>Campaign Messaging Tool</li>
              <li>Reporting & Dashboards</li>
              <li>Enterprise APIs</li>
            </ul>
            <button
              className="mt-5 bg-blue-200 text-black py-3 px-6 rounded-full hover:bg-blue-300 transition-colors"
              onClick={handleContactSales}  // Added onClick handler for redirection
            >
              Contact Sales
            </button>
          </div>

          {/* Interact Package */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Interact</h3>
            <p className="mt-4">
              Engage customers with AI-powered messaging, live agent support, and chat workflows.
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li>Chatbot Workflow Builder</li>
              <li>Live Agent Desk</li>
              <li>CRM Integrations</li>
              <li>Reporting & Dashboards</li>
            </ul>
            <button
              className="mt-5 bg-green-200 text-black py-3 px-6 rounded-full hover:bg-green-300 transition-colors"
              onClick={handleContactSales}  // Added onClick handler for redirection
            >
              Contact Sales
            </button>
          </div>

          {/* Transact Package */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Transact</h3>
            <p className="mt-4">
              Monetize messaging channels with payment integration, chat commerce, and OMS integrations.
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li>Payments in Messaging</li>
              <li>Product Catalog in Chat</li>
              <li>OMS Integrations</li>
              <li>Reporting & Dashboards</li>
            </ul>
            <button
              className="mt-5 bg-yellow-100 text-black py-3 px-6 rounded-full hover:bg-yellow-200 transition-colors"
              onClick={handleContactSales}  // Added onClick handler for redirection
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 rounded-lg py-12 px-4 lg:px-16 mt-16 flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Choose the Right Package for Your Business
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            Whether you're looking to send bulk messages or need advanced interactions and payments, we have a plan for you.
          </p>
        </div>
        <a
          href="contact"
          className="inline-block bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-400 transition-colors mt-4 lg:mt-0"
        >
          Contact Now
        </a>
      </div>
    </section>
  );
};

export default ComparePackages;
