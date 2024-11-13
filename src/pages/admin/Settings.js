import React, { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    siteName: '',
    adminEmail: '',
    contactNumber: ''
  });

  useEffect(() => {
    // Fetch settings data
    const fetchSettings = async () => {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = () => {
    // Logic to save settings (API call)
    console.log('Save settings', settings);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">System & Website Settings</h1>

      <div className="mb-4">
        <label htmlFor="siteName" className="block text-lg font-medium">Site Name</label>
        <input
          id="siteName"
          type="text"
          value={settings.siteName}
          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="adminEmail" className="block text-lg font-medium">Admin Email</label>
        <input
          id="adminEmail"
          type="email"
          value={settings.adminEmail}
          onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="contactNumber" className="block text-lg font-medium">Contact Number</label>
        <input
          id="contactNumber"
          type="text"
          value={settings.contactNumber}
          onChange={(e) => setSettings({ ...settings, contactNumber: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
