import React from 'react';

const MarketingCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900">
            Text messaging marketing has never been easier
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Unlock your full potential with flexibility, control, and performance you won't find anywhere else.
          </p>
        </div>

        {/* Marketing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Retail Text Marketing */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex flex-col items-start">
            <p className="text-lg text-gray-800 mb-4">
              Thanks for joining our mobile club. Come in today, and receive 20% off any purchase in the store. Show this text and also get a coupon for your next visit.
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500 text-white rounded-full p-2">
                <i className="fas fa-tag"></i>
              </span>
              <span className="text-blue-500 font-semibold">Retail Text Marketing</span>
            </div>
          </div>

          {/* School SMS Text Messaging */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg flex flex-col items-start">
            <p className="text-lg text-gray-800 mb-4">
              Reminder to all parents of Mesa Elementary School. Tomorrow is minimum day. Please pick up your kid's by 12 noon. And all homework is due tomorrow as well.
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-green-500 text-white rounded-full p-2">
                <i className="fas fa-school"></i>
              </span>
              <span className="text-green-500 font-semibold">School SMS Text Messaging</span>
            </div>
          </div>

          {/* Sales SMS Text Marketing */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-lg flex flex-col items-start">
            <p className="text-lg text-gray-800 mb-4">
              Come to our website today and get 20% off all Apple iPhone accessories and 10% off Apple Watches. Use code APW20 when checking out.
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-purple-500 text-white rounded-full p-2">
                <i className="fas fa-shopping-cart"></i>
              </span>
              <span className="text-purple-500 font-semibold">Sales SMS Text Marketing</span>
            </div>
          </div>

          {/* Restaurant Text Marketing */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg flex flex-col items-start">
            <p className="text-lg text-gray-800 mb-4">
              Text members: Republic Brewery just tapped Pliny the Younger beer! Come in before 5 PM and get $2 off any craft beer on tap. Show this text.
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-500 text-white rounded-full p-2">
                <i className="fas fa-utensils"></i>
              </span>
              <span className="text-yellow-500 font-semibold">Restaurant Text Marketing</span>
            </div>
          </div>

          {/* SMS Appointment Reminders */}
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg flex flex-col items-start">
            <p className="text-lg text-gray-800 mb-4">
              Reminder: Jacqueline Burns. Your dentist appointment with Dr. Smith is tomorrow at 12 noon. Please don’t be late. We look forward to seeing you!
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-orange-500 text-white rounded-full p-2">
                <i className="fas fa-calendar-check"></i>
              </span>
              <span className="text-orange-500 font-semibold">SMS Appointment Reminders</span>
            </div>
          </div>

          {/* Lead Generation SMS */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-lg flex flex-col items-start">
            <p className="text-lg text-gray-800 mb-4">
              Rates are at an all-time low. Call us today at (212) 555-5555 to see how you can qualify. Or click here to get an instant quote.
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-teal-500 text-white rounded-full p-2">
                <i className="fas fa-users"></i>
              </span>
              <span className="text-teal-500 font-semibold">Lead Generation SMS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingCards;
