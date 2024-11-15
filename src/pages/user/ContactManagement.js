import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';

const ContactManagement = () => {
  // Sample contacts data
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Sam Wilson', email: 'sam.wilson@example.com', phone: '345-678-9012' },
  ]);

  // Add new contact
  const handleAddContact = () => {
    const newContact = {
      id: Date.now(), // unique id
      name: 'New Contact',
      email: 'new.contact@example.com',
      phone: '000-000-0000',
    };
    setContacts([...contacts, newContact]);
  };

  // Delete contact by id
  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Edit contact (for simplicity, we will just show an alert)
  const handleEditContact = (contact) => {
    alert(`Edit contact: ${contact.name}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <UserSidebar />

      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        <UserNavbar />

        <div className="container mx-auto p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Management</h2>
            <button
              onClick={handleAddContact}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add New Contact
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{contact.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{contact.phone}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
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

export default ContactManagement;
