import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-950 to-blue-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <section className="mt-10 py-16 bg-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Plan</h1>
            <p className="text-lg text-gray-600 mb-12">
              We offer flexible pricing plans to suit your business needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Basic</h3>
                <p className="text-5xl font-bold text-gray-900 mb-4">$19<span className="text-xl text-gray-600">/mo</span></p>
                <p className="text-gray-600 mb-8">Ideal for small businesses and startups</p>
                <ul className="mb-8 space-y-4">
                  <li className="text-gray-700">50 SMS messages</li>
                  <li className="text-gray-700">Basic support</li>
                  <li className="text-gray-700">Access to all features</li>
                </ul>
                <a href="#" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </a>
              </div>

              {/* Pro Plan */}
              <div className="bg-white shadow-lg rounded-lg p-8 border-4 border-blue-600">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pro</h3>
                <p className="text-5xl font-bold text-gray-900 mb-4">$49<span className="text-xl text-gray-600">/mo</span></p>
                <p className="text-gray-600 mb-8">Best for growing businesses</p>
                <ul className="mb-8 space-y-4">
                  <li className="text-gray-700">500 SMS messages</li>
                  <li className="text-gray-700">Priority support</li>
                  <li className="text-gray-700">Advanced analytics</li>
                </ul>
                <a href="#" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </a>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white shadow-lg rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Enterprise</h3>
                <p className="text-5xl font-bold text-gray-900 mb-4">Custom</p>
                <p className="text-gray-600 mb-8">Tailored solutions for large companies</p>
                <ul className="mb-8 space-y-4">
                  <li className="text-gray-700">Unlimited SMS messages</li>
                  <li className="text-gray-700">24/7 dedicated support</li>
                  <li className="text-gray-700">Custom integrations</li>
                </ul>
                <a href="#" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
