import React, { useState } from 'react';

const PricingSelector = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('boost');
  const [credits, setCredits] = useState('500');

  const plans = {
    launch: { name: 'Launch', description: '$0.15/credit' },
    boost: { name: 'Boost', description: '$0.12/credit' },
    scale: { name: 'Scale', description: '$0.10/credit' }
  };

  const creditOptions = [
    { amount: '500', monthly: 75.00, yearly: 810.00 },
    { amount: '1,500', monthly: 100.00, yearly: 1080.00 },
    { amount: '2,500', monthly: 125.00, yearly: 1350.00 },
    { amount: '5,000', monthly: 187.50, yearly: 2025.00 },
    { amount: '10,000', monthly: 312.50, yearly: 3375.00 },
  ];

  const calculateTotal = () => {
    const selectedCredit = creditOptions.find(option => option.amount === credits);
    return billingCycle === 'monthly' ? selectedCredit.monthly : selectedCredit.yearly;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Annual
            </button>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(plans).map(([key, plan]) => (
              <button
                key={key}
                className={`p-4 rounded-lg transition-all ${
                  selectedPlan === key
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(key)}
              >
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-sm mt-1">{plan.description}</p>
              </button>
            ))}
          </div>

          {/* Credit Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Included Credits</h3>
            {creditOptions.map((option) => (
              <button
                key={option.amount}
                className={`w-full p-4 rounded-lg flex justify-between items-center transition-all ${
                  credits === option.amount
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
                }`}
                onClick={() => setCredits(option.amount)}
              >
                <span>{option.amount} credits</span>
                <span>${billingCycle === 'monthly' ? option.monthly : option.yearly}/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Base Price ({selectedPlan})</span>
              <span>${calculateTotal()}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Plan Discount</span>
              <span>$0.00</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Bulk Credit Discount</span>
              <span>$0.00</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Taxes</span>
              <span>$0.00</span>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="ADD A PROMO CODE"
                  className="flex-1 p-2 border rounded-md"
                />
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="mt-6">
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-600">
                  I agree to the Terms and Conditions & Anti-Spam Policy
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSelector;