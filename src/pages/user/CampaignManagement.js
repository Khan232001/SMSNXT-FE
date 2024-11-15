import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar'; 
import UserSidebar from '../../components/UserSidebar'; 

const CampaignManagement = () => {
  // Sample campaigns data
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Black Friday Sale', status: 'Active', startDate: '2024-11-01', endDate: '2024-11-30', targetAudience: 'Subscribers' },
    { id: 2, name: 'Holiday Promotions', status: 'Inactive', startDate: '2024-12-01', endDate: '2024-12-31', targetAudience: 'New Users' },
    { id: 3, name: 'Monthly Newsletter', status: 'Active', startDate: '2024-10-01', endDate: '2024-10-31', targetAudience: 'All Users' },
  ]);

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const handleCreateCampaign = () => {
    alert('Redirect to create campaign form');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 bottom-0">
        <UserSidebar /> 
      </div>

      <div className="flex-1 ml-64 bg-gray-100">
        {/* Navbar */}
        <UserNavbar />

        <div className="container mx-auto p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Campaign Management</h2>
            <button
              onClick={handleCreateCampaign}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create New Campaign
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Campaign Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">End Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Target Audience</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{campaign.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{campaign.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{campaign.endDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{campaign.targetAudience}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => alert('Edit campaign ' + campaign.name)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(campaign.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
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

export default CampaignManagement;
