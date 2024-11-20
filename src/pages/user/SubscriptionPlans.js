import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';

const SubscriptionPlans = () => {
  // Sample subscription plans data
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic', price: 10, duration: '1 Month', description: 'Basic plan for small businesses.' },
    { id: 2, name: 'Standard', price: 25, duration: '1 Month', description: 'Standard plan with additional features.' },
    { id: 3, name: 'Premium', price: 50, duration: '1 Month', description: 'Premium plan with all features.' },
  ]);

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-64 w-full md:fixed">
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 bg-gray-100">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md md:ml-64">
          <UserNavbar />
        </div>

        {/* Subscription Plans Content */}
        <div className="mt-16 p-4 md:p-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plan Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Duration</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-700">{plan.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">${plan.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{plan.duration}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{plan.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
