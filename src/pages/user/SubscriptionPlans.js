// import React, { useState } from 'react';
// import UserNavbar from '../../components/UserNavbar';
// import UserSidebar from '../../components/UserSidebar';
// import { useNavigate } from 'react-router-dom';

// const SubscriptionPlans = () => {
//   const [isAnnual, setIsAnnual] = useState(true);
//   const [selectedPlan, setSelectedPlan] = useState('Boost'); // Default selected plan
// console.log(selectedPlan);
//   const navigate = useNavigate();
 
//   const plans = [
//     {
//       name: 'Launch',
//       recommended: 'up to 500 contacts',
//       price: 20,
//       isPopular: false,
//       features: [
//         'Includes 6k yearly credits',
//         'Local Textable Number',
//         'Cost Per Additional Credits: $0.02'
//       ],
//       setupTime: 'Setup Time: Within 1 business day',
//       buttonText: 'SELECT',
//     },
//     {
//       name: 'Boost',
//       recommended: '500-2,000 contacts',
//       price: 60,
//       isPopular: true,
//       features: [
//         'Includes 8k yearly credits',
//         'Local High-Volume Number',
//         'Cost Per Additional Credits: $0.02'
//       ],
//       setupTime: 'Setup Time: Within 1 business day',
//       buttonText: 'SELECT',
//     },
//     {
//       name: 'Scale',
//       recommended: '2,000-50,000 contacts',
//       price: 100,
//       isPopular: false,
//       features: [
//         'Includes 8k yearly credits',
//         'Local High-Volume, High-Speed Number',
//         'Cost Per Additional Credits: $0.02',
//         'Onboarding Specialist'
//       ],
//       setupTime: 'Setup Time: Within 1 business day',
//       buttonText: 'SELECT',
//     },
//     {
//       name: 'Enterprise',
//       recommended: '50,000+ contacts',
//       price: 3000,
//       isPopular: false,
//       features: [
//         'Includes 200k monthly credits',
//         'Dedicated Short Code',
//         'Cost Per Additional Credits: $0.010',
//         'Onboarding Specialist'
//       ],
//       setupTime: 'Setup Time: 4 to 12 weeks',
//       buttonText: "LET'S TALK",
//     }
//   ];
//   const handlePlanSelect = (planName) => {
//     setSelectedPlan(planName);
//     navigate('/subscription-pricing');

//   };

//   // Custom CSS for the gradient
//   const customGradientStyle = {
//     background: 'linear-gradient(301deg, rgb(16, 67, 232) 7%, rgb(16, 67, 232) 24%, rgb(38, 166, 89) 93%)',
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <p className="text-sm text-gray-600 mb-4">
//           Select your plan, then choose how many credits you'd like included
//         </p>
//         <p className="text-xs text-gray-500 mb-4">
//           CURRENT PLAN - FREE TRIAL EXTENSION
//         </p>
        
//         {/* Toggle Switch */}
//         <div className="flex items-center justify-center gap-4">
//           <span className={`text-sm ${isAnnual ? 'text-red-500' : 'text-gray-600'}`}>
//             Annual Plans
//           </span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={!isAnnual}
//               onChange={() => setIsAnnual(!isAnnual)}
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
//                           peer-checked:after:translate-x-full peer-checked:after:border-white 
//                           after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
//                           after:bg-white after:border-gray-300 after:border after:rounded-full 
//                           after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500">
//             </div>
//           </label>
//           <span className={`text-sm ${!isAnnual ? 'text-red-500' : 'text-gray-600'}`}>
//             Monthly Plans
//           </span>
//           <span className="text-xs text-red-500">SAVE UP TO 20%</span>
//         </div>
//       </div>

//       {/* Pricing Cards */}
//       <div className="grid md:grid-cols-4 gap-6">
//         {plans.map((plan) => (
//           <div
//             key={plan.name}
//             className={`rounded-lg p-6 shadow-lg relative transition-all duration-300 cursor-pointer
//               ${selectedPlan === plan.name ? 'scale-105' : 'hover:scale-102'}`}
//             style={selectedPlan === plan.name ? customGradientStyle : { background: 'white' }}
//           >
//             {plan.isPopular && (
//               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                 <span className="bg-purple-900 text-white text-xs px-4 py-1 rounded-full">
//                   MOST POPULAR
//                 </span>
//               </div>
//             )}

//             <h3 className={`text-xl font-bold mb-4 ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
//               {plan.name}
//             </h3>
//             <p className={`text-sm mb-4 ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
//               Recommended for:
//             </p>
//             <p className={`text-sm mb-6 ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
//               {plan.recommended}
//             </p>
            
//             <div className="mb-6">
//               <p className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
//                 Starting at
//               </p>
//               <div className="flex items-baseline">
//                 <span className={`text-2xl font-bold ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
//                   $
//                 </span>
//                 <span className={`text-4xl font-bold ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
//                   {plan.price}
//                 </span>
//                 <span className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
//                   /month
//                 </span>
//               </div>
//               <p className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
//                 Billed Annually
//               </p>
//             </div>

//             <button
//               className={`w-full py-2 px-4 rounded-full font-medium mb-6 transition-colors
//                 ${selectedPlan === plan.name 
//                   ? 'bg-white text-blue-600' 
//                   : 'bg-[#ff4d2e] text-white hover:bg-[#ff3d1e]'}`}
//             onClick={() => handlePlanSelect(plan.name)}

//             >
//               {plan.buttonText}
//             </button>

//             <ul className="space-y-3 mb-6">
//               {plan.features.map((feature, idx) => (
//                 <li key={idx} className="flex items-start gap-2">
//                   <svg
//                     className={`w-5 h-5 mt-1 ${selectedPlan === plan.name ? 'text-white' : 'text-yellow-400'}`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
//                     {feature}
//                   </span>
//                 </li>
//               ))}
//             </ul>

//             <p className={`text-xs text-center ${selectedPlan === plan.name ? 'text-white' : 'text-gray-500'}`}>
//               {plan.setupTime}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPlans;

import React, { useState, useEffect } from 'react';
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Import your axios utility

const SubscriptionPlans = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // Track the selected plan
  const [plans, setPlans] = useState([]); // State to store plans fetched from the API
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/payment/get-plans'); // Fetch plans from the API
        console.log('Plans API Response:', response.data); // Log the response
        setPlans(response.data); // Update the plans state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Failed to fetch plans. Please try again later.'); // Set error message
        setLoading(false); // Set loading to false
      }
    };
    fetchPlans();
  }, []);

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.name); // Update the selected plan
    navigate('/subscription-pricing', { state: { selectedPlan: plan } }); // Pass the selected plan data
  };

  // Custom CSS for the gradient
  const customGradientStyle = {
    background: 'linear-gradient(301deg, rgb(16, 67, 232) 7%, rgb(16, 67, 232) 24%, rgb(38, 166, 89) 93%)',
  };

  // Loading state
  if (loading) {
    return <div className="text-center py-8">Loading plans...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl px-4 py-8" style={{ marginLeft: '20rem', marginTop: '5rem' }}>
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white">
        <Sidebar />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-blue-700 text-white z-50 shadow-md">
        <Navbar />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600 mb-4">
          Select your plan, then choose how many credits you'd like included
        </p>
        {/* <p className="text-xs text-gray-500 mb-4">CURRENT PLAN - FREE TRIAL EXTENSION</p> */}

        {/* Toggle Switch */}
        {/* <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${isAnnual ? 'text-red-500' : 'text-gray-600'}`}>
            Annual Plans
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500">
            </div>
          </label>
          <span className={`text-sm ${!isAnnual ? 'text-red-500' : 'text-gray-600'}`}>
            Monthly Plans
          </span>
          <span className="text-xs text-red-500">SAVE UP TO 20%</span>
        </div> */}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id} // Use plan._id as the key
            className={`rounded-lg p-6 shadow-lg relative transition-all duration-300 cursor-pointer
              ${selectedPlan === plan.name ? 'scale-105' : 'hover:scale-102'}`}
            style={selectedPlan === plan.name ? customGradientStyle : { background: 'white' }}
            onClick={() => handlePlanSelect(plan)} // Select the plan on card click
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-900 text-white text-xs px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            <h3 className={`text-xl font-bold mb-4 ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
              {plan.name}
            </h3>
            <p className={`text-sm mb-4 ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
              Recommended for:
            </p>
            <p className={`text-sm mb-6 ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
              {plan.recommended}
            </p>

            <div className="mb-6">
              <p className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
                Starting at
              </p>
              <div className="flex items-baseline">
                <span className={`text-2xl font-bold ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
                  $
                </span>
                <span className={`text-4xl font-bold ${selectedPlan === plan.name ? 'text-white' : 'text-gray-800'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
                  /month
                </span>
              </div>
              <p className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
                Billed Monthly
              </p>
            </div>

            <button
              className={`w-full py-2 px-4 rounded-full font-medium mb-6 transition-colors
                ${selectedPlan === plan.name 
                  ? 'bg-white text-blue-600' 
                  : 'bg-[#ff4d2e] text-white hover:bg-[#ff3d1e]'}`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.buttonText || 'SELECT'}
            </button>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg
                    className={`w-5 h-5 mt-1 ${selectedPlan === plan.name ? 'text-white' : 'text-yellow-400'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
              {/* Add the tokens line */}
              <li className="flex items-start gap-2">
                <svg
                  className={`w-5 h-5 mt-1 ${selectedPlan === plan.name ? 'text-white' : 'text-yellow-400'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className={`text-sm ${selectedPlan === plan.name ? 'text-white' : 'text-gray-600'}`}>
                  Subscribe to get {plan.tokens} tokens
                </span>
              </li>
            </ul>

            <p className={`text-xs text-center ${selectedPlan === plan.name ? 'text-white' : 'text-gray-500'}`}>
              {plan.setupTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;