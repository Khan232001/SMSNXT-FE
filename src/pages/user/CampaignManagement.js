import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';
import Papa from 'papaparse';

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [uploadedRecipients, setUploadedRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to create a new campaign
  const handleCreateCampaign = () => {
    const campaignName = prompt('Enter Campaign Name');
    if (campaignName) {
      setCampaigns([
        ...campaigns,
        {
          id: campaigns.length + 1,
          name: campaignName,
          status: 'Draft',
          startDate: 'TBD',
          endDate: 'TBD',
          targetAudience: `${uploadedRecipients.length} Recipients`,
        },
      ]);
    }
  };

  // Function to handle file upload and parse CSV
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setUploadedRecipients(results.data);
          setFilteredRecipients(results.data); 
          alert(`Successfully imported ${results.data.length} recipients!`);
        },
        error: (error) => {
          alert('Error parsing CSV: ' + error.message);
        },
      });
    }
  };

  // Function to handle deleting a campaign
  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  // Function to filter recipients based on user input (e.g., filter by name, email, etc.)
  const handleFilterRecipients = (e) => {
    const filterText = e.target.value.toLowerCase();
    const filtered = uploadedRecipients.filter((recipient) =>
      recipient.name.toLowerCase().includes(filterText) || recipient.email.toLowerCase().includes(filterText)
    );
    setFilteredRecipients(filtered);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${isSidebarOpen ? 'w-64' : 'hidden'}`}>
        <UserSidebar />
      </div>

      <div className="flex-1 flex flex-col bg-gray-100 relative">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md flex justify-between items-center px-4 lg:px-6">
          <button
            className="text-gray-600 focus:outline-none lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <UserNavbar />
        </div>

        {/* Main Content */}
        <div className="mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
            <h2 className="text-2xl font-semibold text-gray-700 text-center lg:text-left">Campaign Management</h2>

            <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0 w-full lg:w-auto">
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full lg:w-auto"
              >
                Create New Campaign
              </button>

              <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer w-full lg:w-auto">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                Import Recipients (CSV)
              </label>
            </div>
          </div>

          {/* Filter Recipients */}
          {uploadedRecipients.length > 0 && (
            <div className="mb-6 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Filter recipients..."
                onChange={handleFilterRecipients}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Campaign Table */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-6">
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

          {/* Recipients Table */}
          {filteredRecipients.length > 0 && (
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecipients.map((recipient, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-6 py-4 text-sm text-gray-700">{recipient.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{recipient.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{recipient.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
