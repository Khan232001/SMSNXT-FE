import React from "react";

const Features = () => {
  return (
    <section id="features" className="bg-gradient-to-r from-blue-950 to-blue-900 py-16 text-white">
      <div className="container mx-auto px-6">
        {/* Features Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Prepaid Card */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Prepaid</h3>
            <p className="mt-4">
              Send outgoing messages to customers on a DIY, pay-as-you-go
              messaging platform.
            </p>
            <button className="mt-5 bg-pink-200 text-black py-3 px-6 rounded-full hover:bg-pink-300 transition-colors">
              Try for Free
            </button>
          </div>

          {/* Connect Card */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Connect</h3>
            <p className="mt-4">
              SMS and WhatsApp messages, sent reliably, quickly, and at scale
              via API and web app.
            </p>
            <button className="mt-4 bg-blue-200 hover:bg-blue-300 text-black py-3 px-6 rounded-full transition-colors">
              Contact Sales
            </button>
          </div>

          {/* Interact Card */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Interact</h3>
            <p className="mt-4">
              Engage customers with rich, interactive conversations in chat that
              improve CX.
            </p>
            <button className="mt-6 bg-green-200 text-black py-3 px-6 rounded-full hover:bg-green-300 transition-colors">
              Contact Sales
            </button>
          </div>

          {/* Transact Card */}
          <div className="bg-white text-black p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold">Transact</h3>
            <p className="mt-4">
              Monetize messaging channels with rich payment acceptance
              functionality.
            </p>
            <button className="mt-6 bg-yellow-100 text-black py-3 px-6 rounded-full hover:bg-yellow-200 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-left bg-gradient-to-r from-blue-950 to-blue-900 rounded-lg py-12 px-4 lg:px-16 mt-16 flex items-center justify-between mb-0">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Step into the Future of Business Messaging
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white">
            SMS and two-way channels, automation, call center integration,
            payments - do it all with Clickatell's Chat Commerce platform.
          </p>
        </div>
        <a
          href="contact"
          className="inline-block bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-400 transition-colors"
        >
          Contact Now
        </a>
      </div>
    </section>
  );
};

export default Features;
