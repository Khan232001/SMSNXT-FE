import React, { useState } from 'react';
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

const SenderIDManagement = () => {
  const [senderIDs, setSenderIDs] = useState([
    { id: 1, senderID: 'ABC123', status: 'Approved', dateRequested: '2024-11-10' },
    { id: 2, senderID: 'XYZ456', status: 'Pending', dateRequested: '2024-11-12' },
    { id: 3, senderID: 'LMN789', status: 'Rejected', dateRequested: '2024-11-13' },
    { id: 4, senderID: 'PQR012', status: 'Approved', dateRequested: '2024-11-15' },
  ]);

  const [newSenderID, setNewSenderID] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAddSenderID = () => {
    if (newSenderID) {
      const newSender = {
        id: senderIDs.length + 1,
        senderID: newSenderID,
        status: 'Pending',
        dateRequested: new Date().toLocaleDateString(),
      };
      setSenderIDs([...senderIDs, newSender]);
      setNewSenderID('');
    }
  };

  const handleApproveSenderID = (id) => {
    setSenderIDs(senderIDs.map(sender => sender.id === id ? { ...sender, status: 'Approved' } : sender));
  };

  const handleRejectSenderID = (id) => {
    setSenderIDs(senderIDs.map(sender => sender.id === id ? { ...sender, status: 'Rejected' } : sender));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on small screens */}
      <div className={`lg:block ${sidebarOpen ? 'w-64' : 'w-0'} transition-all`}>
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-6 pt-20"> {/* Add padding-top to avoid navbar overlap */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Sender ID Management</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Enter Sender ID"
                value={newSenderID}
                onChange={(e) => setNewSenderID(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddSenderID}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Sender ID
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Sender ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date Requested</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {senderIDs.map((sender) => (
                  <tr key={sender.id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{sender.senderID}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sender.dateRequested}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          sender.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : sender.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {sender.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {sender.status === 'Pending' && (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleApproveSenderID(sender.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectSenderID(sender.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
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

export default SenderIDManagement;
