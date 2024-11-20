import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '345-678-9012' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleAddContact = () => {
    const newContact = {
      id: Date.now(),
      name: 'New Contact',
      email: 'new.contact@example.com',
      phone: '000-000-0000',
    };
    setContacts([...contacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleImportCSV = (event) => {
    alert("CSV import feature coming soon!");
  };

  const handleCreateGroup = () => {
    // You can handle the group creation logic here (e.g., store in database, etc.)
    alert(`Group Created: ${groupName}\nDescription: ${groupDescription}`);
    setIsModalOpen(false); // Close the modal after creating the group
    setGroupName(''); // Reset the group name
    setGroupDescription(''); // Reset the group description
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white">
        <UserSidebar />
      </div>

      <div className="flex-1 bg-blue-50">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full bg-blue-700 text-white z-50 shadow-md">
          <UserNavbar />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 mt-16 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-blue-700">Contact Management</h2>
            <div className="space-x-2">
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Add New Contact
              </button>
              <label className="cursor-pointer px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600">
                Import CSV
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleImportCSV}
                />
              </label>
              {/* Create Group Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Create Group
              </button>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-blue-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-blue-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-blue-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact => (
                  <tr key={contact.id} className="border-t border-blue-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{contact.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{contact.phone}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                        onClick={() => alert(`Edit contact: ${contact.name}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-500"
                        onClick={() => handleDeleteContact(contact.id)}
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

      {/* Modal for Creating Group */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Create New Group</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
