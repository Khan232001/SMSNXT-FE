// import React, { useState } from 'react';

// const PricingSelector = () => {
//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [selectedPlan, setSelectedPlan] = useState('boost');
//   const [credits, setCredits] = useState('500');

//   const plans = {
//     launch: { name: 'Launch', description: '$0.15/credit' },
//     boost: { name: 'Boost', description: '$0.12/credit' },
//     scale: { name: 'Scale', description: '$0.10/credit' }
//   };

//   const creditOptions = [
//     { amount: '500', monthly: 75.00, yearly: 810.00 },
//     { amount: '1,500', monthly: 100.00, yearly: 1080.00 },
//     { amount: '2,500', monthly: 125.00, yearly: 1350.00 },
//     { amount: '5,000', monthly: 187.50, yearly: 2025.00 },
//     { amount: '10,000', monthly: 312.50, yearly: 3375.00 },
//   ];

//   const calculateTotal = () => {
//     const selectedCredit = creditOptions.find(option => option.amount === credits);
//     return billingCycle === 'monthly' ? selectedCredit.monthly : selectedCredit.yearly;
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-50">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Section */}
//         <div className="space-y-6">
//           {/* Billing Toggle */}
//           <div className="flex items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
//             <button
//               className={`px-4 py-2 rounded-md transition-all ${
//                 billingCycle === 'monthly'
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 text-gray-600'
//               }`}
//               onClick={() => setBillingCycle('monthly')}
//             >
//               Monthly
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md transition-all ${
//                 billingCycle === 'yearly'
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-100 text-gray-600'
//               }`}
//               onClick={() => setBillingCycle('yearly')}
//             >
//               Annual
//             </button>
//           </div>

//           {/* Plan Selection */}
//           <div className="grid grid-cols-3 gap-4">
//             {Object.entries(plans).map(([key, plan]) => (
//               <button
//                 key={key}
//                 className={`p-4 rounded-lg transition-all ${
//                   selectedPlan === key
//                     ? 'bg-blue-500 text-white shadow-lg scale-105'
//                     : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
//                 }`}
//                 onClick={() => setSelectedPlan(key)}
//               >
//                 <h3 className="font-bold text-lg">{plan.name}</h3>
//                 <p className="text-sm mt-1">{plan.description}</p>
//               </button>
//             ))}
//           </div>

//           {/* Credit Selection */}
//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg">Included Credits</h3>
//             {creditOptions.map((option) => (
//               <button
//                 key={option.amount}
//                 className={`w-full p-4 rounded-lg flex justify-between items-center transition-all ${
//                   credits === option.amount
//                     ? 'bg-blue-500 text-white shadow-lg'
//                     : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
//                 }`}
//                 onClick={() => setCredits(option.amount)}
//               >
//                 <span>{option.amount} credits</span>
//                 <span>${billingCycle === 'monthly' ? option.monthly : option.yearly}/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right Section - Order Summary */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Base Price ({selectedPlan})</span>
//               <span>${calculateTotal()}</span>
//             </div>
            
//             <div className="flex justify-between text-gray-600">
//               <span>Plan Discount</span>
//               <span>$0.00</span>
//             </div>
            
//             <div className="flex justify-between text-gray-600">
//               <span>Bulk Credit Discount</span>
//               <span>$0.00</span>
//             </div>
            
//             <div className="border-t pt-4">
//               <div className="flex justify-between font-semibold">
//                 <span>Subtotal</span>
//                 <span>${calculateTotal()}</span>
//               </div>
//             </div>
            
//             <div className="flex justify-between text-gray-600">
//               <span>Taxes</span>
//               <span>$0.00</span>
//             </div>
            
//             <div className="border-t pt-4">
//               <div className="flex justify-between text-xl font-bold">
//                 <span>Total</span>
//                 <span>${calculateTotal()}</span>
//               </div>
//             </div>

//             {/* Promo Code */}
//             <div className="mt-6">
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   placeholder="ADD A PROMO CODE"
//                   className="flex-1 p-2 border rounded-md"
//                 />
//                 <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
//                   Apply
//                 </button>
//               </div>
//             </div>

//             {/* Terms Checkbox */}
//             <div className="mt-6">
//               <label className="flex items-start space-x-2">
//                 <input type="checkbox" className="mt-1" />
//                 <span className="text-sm text-gray-600">
//                   I agree to the Terms and Conditions & Anti-Spam Policy
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingSelector;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../utils/api'; // Import your axios utility

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QIduMEmISd2a2NngTnwolInv0rkwslk8Ui3UxEnwRg21xHTKJEjh6TC5PHZX52fKhZHJsTC9iNjHN38wTfiMHyN00EOde948R');

const SubscriptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan } = location.state || {}; // Get the selected plan from state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = localStorage.getItem("user");
  let userId = "";
  if (userData) {
    // Step 2: Parse the JSON string into a JavaScript object
    const user = JSON.parse(userData);

    // Step 3: Access the _id property
    userId = user._id;

    console.log("User ID:", userId);
  } else {
    console.log("No user data found in localStorage.");
  }


  // Call useStripe and useElements at the top level
  const stripe = useStripe();
  const elements = useElements();

  if (!selectedPlan) {
    navigate('/'); // Redirect if no plan is selected
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      setLoading(false);
      return;
    }

    // Create a payment method
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    // Call your backend to create the subscription
    try {
      const response = await api.post('/payment/subscribe-user', {
        userId: userId,
        priceId: selectedPlan.stripePriceId,
        paymentMethodId: paymentMethod.id,
      });

      console.log('Subscription created:', response.data);
      navigate('/success'); // Redirect to a success page
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('Failed to create subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Subscribe to {selectedPlan.name}</h1>
      <p className="text-gray-600 mb-6">
        You are subscribing to the <strong>{selectedPlan.name}</strong> plan for ${selectedPlan.price}/month.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
                hidePostalCode: true, // This line hides the postal code field
              }}
            />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading || !stripe || !elements}
        >
          {loading ? 'Processing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

const SubscriptionFormWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionForm />
    </Elements>
  );
};

export default SubscriptionFormWrapper;