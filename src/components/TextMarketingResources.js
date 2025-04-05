import React from 'react';
import { FaFileAlt, FaImages, FaPlayCircle } from 'react-icons/fa';

const TextMarketingResources = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Text Marketing Resources</h2>
        </div>

        {/* Resources Categories */}
        <div className="space-y-8">

          {/* Guides Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Guide Card 1 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaFileAlt className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">SMS Messaging for Business</h4>
                <p className="text-center text-sm text-gray-700">
                  Learn how SMS can help your business connect with customers and drive growth.
                </p>
              </div>

              {/* Guide Card 2 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaFileAlt className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Effortless Text Marketing for Small Businesses</h4>
                <p className="text-center text-sm text-gray-700">
                  Discover how small businesses can utilize text marketing to increase engagement.
                </p>
              </div>

              {/* Guide Card 3 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaFileAlt className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Reach Your Entire Audience Fast with SMS Blasts</h4>
                <p className="text-center text-sm text-gray-700">
                  Unlock the power of SMS blasts to quickly reach your entire audience.
                </p>
              </div>
            </div>
            <a href="#" className="text-blue-600 font-semibold">View All Guides</a>
          </div>

          {/* Articles Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Article Card 1 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaImages className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Text Marketing 101: How Text Marketing Works</h4>
                <p className="text-center text-sm text-gray-700">
                  A complete guide to understand how text marketing can help your business grow.
                </p>
              </div>

              {/* Article Card 2 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaImages className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">How to Craft the Perfect SMS Landing Page</h4>
                <p className="text-center text-sm text-gray-700">
                  Learn the best practices for creating an SMS-friendly landing page.
                </p>
              </div>

              {/* Article Card 3 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaImages className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">How to Send SMS Review Requests to Customers</h4>
                <p className="text-center text-sm text-gray-700">
                  Discover how SMS can help you get valuable reviews from your customers.
                </p>
              </div>

              {/* Article Card 4 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaImages className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">How to Grow Your Text Marketing Contacts List</h4>
                <p className="text-center text-sm text-gray-700">
                  Learn strategies to expand your SMS marketing contacts list effectively.
                </p>
              </div>
            </div>
            <a href="#" className="text-blue-600 font-semibold">View All Articles</a>
          </div>

          {/* Videos Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Video Card 1 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaPlayCircle className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">How to Reach More Customers with Text Blasts</h4>
                <p className="text-center text-sm text-gray-700">
                  Learn the best practices for using SMS blasts to reach a wide audience effectively.
                </p>
              </div>

              {/* Video Card 2 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaPlayCircle className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">How Much Does Text Marketing Cost?</h4>
                <p className="text-center text-sm text-gray-700">
                  Understand the pricing structure and cost-effectiveness of text marketing campaigns.
                </p>
              </div>

              {/* Video Card 3 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaPlayCircle className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">How to Send Automated Text Marketing Messages</h4>
                <p className="text-center text-sm text-gray-700">
                  This video walks you through setting up automated SMS marketing for your business.
                </p>
              </div>

              {/* Video Card 4 */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <FaPlayCircle className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2">Grow Your Business with Bulk SMS</h4>
                <p className="text-center text-sm text-gray-700">
                  Learn how bulk SMS can help scale your business and improve customer engagement.
                </p>
              </div>
            </div>
            <a href="#" className="text-blue-600 font-semibold">View All Videos</a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TextMarketingResources;
