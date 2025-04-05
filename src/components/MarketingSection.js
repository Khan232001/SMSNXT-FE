import React from 'react';
import { FaPhoneAlt, FaUsers, FaPen } from 'react-icons/fa'; // Importing icons from react-icons

const MarketingSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Accelerate Your Text Message Marketing
          </h2>
          <p className="text-lg text-gray-600">
            Take your messaging to the next level with tailored features that boost your marketing efforts.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Secure a Trusted Number */}
          <div className="bg-gradient-to-r from-blue-200 to-blue-300 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaPhoneAlt className="text-6xl mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Secure a Trusted Number</h3>
            <p className="text-lg text-center">
              Own a textable number within 1 business day thanks to EZ Texting's trusted relationship with wireless carriers.
            </p>
          </div>

          {/* Card 2: Build an Attentive Audience */}
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaUsers className="text-6xl mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Build an Attentive Audience</h3>
            <p className="text-lg text-center">
              Grow an engaged text marketing contact list with QR codes, sign-up forms, Keywords, and Team Inbox.
            </p>
          </div>

          {/* Card 3: Craft Effective Texts */}
          <div className="bg-gradient-to-r from-pink-200 to-pink-300 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaPen className="text-6xl mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Craft Effective Texts</h3>
            <p className="text-lg text-center">
              Engage your audience and drive action with automated text scheduling and personalized messages.
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-gradient-to-r from-purple-200 to-purple-300 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4 text-center">See What Makes EZ Texting the Best Mass Texting Service</h3>
            <button className="bg-white text-black font-semibold py-2 px-6 rounded-full mt-4 hover:bg-gray-200">
              <i className="fas fa-play"></i> Watch Video
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
