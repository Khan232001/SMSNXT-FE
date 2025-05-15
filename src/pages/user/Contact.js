import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-gray-800">
      {/* Header */}
      <Header className="mb-10" />

      {/* Contact Info and Form Section */}
      <section className="pb-16 mt-20"> {/* Increased margin-top here */}
        <div className="container mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center items-center">
            {/* Left Column - Contact Info */}
            <div className="p-8 shadow-lg rounded-lg text-white mx-auto my-8 lg:w-3/4"> {/* Removed bg-blue-950 for transparent background */}
              <h2 className="text-3xl font-semibold mb-4 text-center text-white">Get in Touch with Us</h2>
              <p className="mb-4 text-lg">
                Our experts can help you find the right solution. Together we’ll create a tailored solution and start growing your business from day one.
              </p>
              <p className="mb-4 text-lg">
                We’d love to hear more about your business, and where you’re headed. In your message, please provide any extra information or questions you have about how your company can use Clickatell’s services.
              </p>
              <p className="mb-4 text-lg font-semibold">We’re here to help:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span> Find the right solution for you.
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span> Explain options for pricing.
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span> Connect you with helpful resources.
                </li>
              </ul>
              <p className="mt-4 text-lg font-semibold">Already a customer?</p>
              <p className="text-lg">Please contact our support team or send an email to support@clickatell.com.</p>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white p-8 shadow-lg rounded-lg mx-auto my-8 lg:w-3/4">
              <h2 className="text-3xl font-semibold mb-8 text-center">Contact Sales</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your country"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    rows="5"
                    placeholder="Type your message here"
                  ></textarea>
                </div>
                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
