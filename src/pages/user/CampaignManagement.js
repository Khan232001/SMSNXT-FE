import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import TextBlast from "./TextBlast";
import Papa from "papaparse";
import api from "../../utils/api";

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  console.log("campaigns", campaigns);
  const [uploadedRecipients, setUploadedRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [createTextBlast, setCreateTextBlast] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [viewCampaign, setViewCampaign] = useState(false);

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setViewCampaign(true);
    setCreateTextBlast(true)
  };

  const token = localStorage.getItem("token");
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCampaigns();
  }, [createTextBlast]);

  const fetchCampaigns = async () => {
    try {
      const response = await api.get("/campaign", authHeaders);
      setCampaigns(response.data.data);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  };

  const handleCreateCampaign = () => {
    setCreateTextBlast(true);
    setSelectedCampaign(null);
  };

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
          alert("Error parsing CSV: " + error.message);
        },
      });
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await api.delete(`/campaign/${id}`, authHeaders);
      setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
    } catch (error) {
      console.error("Failed to delete campaign:", error);
    }
  };

  const handleFilterRecipients = (e) => {
    const filterText = e.target.value.toLowerCase();
    const filtered = uploadedRecipients.filter(
      (recipient) =>
        recipient.name.toLowerCase().includes(filterText) ||
        recipient.email.toLowerCase().includes(filterText)
    );
    setFilteredRecipients(filtered);
  };

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setCreateTextBlast(true);
  };

  const handleDuplicateCampaign = async (campaign) => {

      const campaignData = {
        name: campaign?.name,
        tags: campaign?.tags,
        message:campaign?.message,
        schedule:campaign?.schedule,
        dailyLimit: campaign?.dailyLimit,
        status:campaign?.status,
        campaignid:campaign?._id,
        duplicate:true
      };
  
      try {
        let response;
          response = await api.post(
            "/campaign",
            campaignData,
            authHeaders
          );
          console.log(response.data)
          if(response?.data?.message === 'Campaign duplicated successfully'){
            fetchCampaigns()

          }
      } catch (error) {
        console.error("Error saving campaign:", error);
      }
   
  };

  return (
    <>
      {!createTextBlast && (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${
              isSidebarOpen ? "w-64" : "hidden"
            }`}
          >
            <Sidebar />
          </div>

          <div className="flex-1 flex flex-col bg-gray-100 relative">

     
            <Navbar />
            {/* Main Content */}
            <div className="mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
                <h2 className="text-2xl font-semibold text-gray-700 text-center lg:text-left">
                  Campaign Management
                </h2>

                <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0 w-full lg:w-auto">
                  <button
                    onClick={handleCreateCampaign}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full lg:w-auto"
                  >
                    Create New Campaign
                  </button>

                  <label className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer w-full lg:w-auto">
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
                    <tr className="">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Campaign Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Start Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        End Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Target Audience
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr
                        key={campaign._id}
                        className="border-t border-gray-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {campaign.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {campaign.status}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(campaign.schedule.date).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {campaign.schedule.fromTime
                            ? campaign.schedule.fromTime
                            : "Now"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {campaign.schedule.toTime}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {campaign.tags.map((tag) => tag.tagName).join(", ")}
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          {campaign?.status === "completed" ||
                          campaign?.status === "sending" ||
                          campaign?.status === "scheduled" ? (
                            <>
                              <button
                                onClick={() => handleViewCampaign(campaign)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-yellow-600"
                              >
                                View
                              </button>

                              <button
                                onClick={() => handleDuplicateCampaign(campaign)}
                                className="px-3 py-1 bg-lime-800 text-white rounded-md hover:bg-yellow-600"
                              >
                                Duplicate
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEditCampaign(campaign)}
                              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCampaign(campaign._id)}
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
      )}

      {createTextBlast && (
        <TextBlast
          createTextBlast={createTextBlast}
          viewCampaign={viewCampaign}
          setCreateTextBlast={setCreateTextBlast}
          selectedCampaign={selectedCampaign}
          setViewCampaign={setViewCampaign}
          handleDuplicateCampaign={handleDuplicateCampaign}
        />
      )}
    </>
  );
};

export default CampaignManagement;
