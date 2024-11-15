import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar'; // Importing UserNavbar
import UserSidebar from '../../components/UserSidebar'; // Importing UserSidebar

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
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '250px' }}>
        {/* Navbar */}
        <UserNavbar />

        {/* Subscription Plans Content */}
        <div className="container mx-auto p-6 mt-24">
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
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
  );
};

export default SubscriptionPlans;
