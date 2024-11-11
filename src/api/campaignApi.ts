import React, { useEffect, useState } from 'react';
import { createCampaign, fetchCampaigns, fetchReports } from '../../api/campaignApi';
import { toast } from 'react-toastify';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns when the component is mounted
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load campaigns');
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const handleCreateCampaign = async (newCampaignData) => {
    try {
      await createCampaign(newCampaignData);
      toast.success('Campaign created successfully');
      // Refresh the campaign list
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (error) {
      toast.error('Failed to create campaign');
    }
  };

  const handleViewReports = async (campaignId) => {
    try {
      const reports = await fetchReports(campaignId);
      // You can handle reports display here
      console.log('Reports:', reports);
    } catch (error) {
      toast.error('Failed to fetch reports');
    }
  };

  return (
    <div>
      <h1>Campaigns</h1>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : (
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign.id}>
              <h3>{campaign.name}</h3>
              <button onClick={() => handleViewReports(campaign.id)}>View Reports</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => handleCreateCampaign({ name: 'New Campaign' })}>Create Campaign</button>
    </div>
  );
};

export default Campaigns;
