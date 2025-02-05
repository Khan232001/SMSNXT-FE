import React, { useState, useEffect } from 'react';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';
import api from '../../utils/api';
import Papa from 'papaparse';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add Group Modal

  // States for creating a group
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  // States for adding a contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  // States for editing a contact
  const [editContactName, setEditContactName] = useState('');
  const [editContactEmail, setEditContactEmail] = useState('');
  const [editContactPhone, setEditContactPhone] = useState('');
  const [currentContact, setCurrentContact] = useState(null); 

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    fetchContacts();
  }, []);

    const token = localStorage.getItem('token');
    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchContacts = async () => {
    try {
      console.log(token)
      const response = await api.get('/contacts', authHeaders);
      setContacts(response.data.data || []);
    } catch (error) {
      // alert('Failed to fetch contacts.');
    }
  };

  const handleAddContact = async () => {
    const newContact = {
      name: newContactName,
      email: newContactEmail,
      phoneNumber: newContactPhone,
    };

    try {
      const response = await api.post('/contacts', newContact, authHeaders);
      setContacts([...contacts, response.data.data]);
      handleAddContactCancel();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message)
      }
      // alert('Failed to add contact.');
    }
  };

  const handleAddContactCancel = () => {
    setNewContactName('');
    setNewContactEmail('');
    setNewContactPhone('');
    setIsAddContactModalOpen(false);
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setEditContactName(contact.name);
    setEditContactEmail(contact.email);
    setEditContactPhone(contact.phoneNumber);
    setIsEditContactModalOpen(true);
  };

  const handleUpdateContact = async () => {
    const updatedContact = {
      name: editContactName,
      email: editContactEmail,
      phoneNumber: editContactPhone,
    };

    try {
      const response = await api.put(`/contacts/${currentContact._id}`, updatedContact, authHeaders);
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === currentContact._id ? response.data.data : contact
        )
      );
      handleEditContactCancel();
    } catch (error) {
      // alert('Failed to update contact.');
    }
  };

  const handleEditContactCancel = () => {
    setEditContactName('');
    setEditContactEmail('');
    setEditContactPhone('');
    setCurrentContact(null);
    setIsEditContactModalOpen(false);
  };

  const handleDeleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`, authHeaders);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    } catch (error) {
      // alert('Failed to delete contact.');
    }
  };

  const handleImportCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
        complete: async (result) => {
            const parsedData = result.data;

            // Ensure parsedData is an array and has at least one row
            if (!Array.isArray(parsedData) || parsedData.length === 0) {
                alert("Empty or invalid CSV file.");
                return;
            }

            // Extract headers dynamically
            const headers = Object.keys(parsedData[0]);
            console.log("CSV Headers:", headers);

            if (!headers.includes("Name") || !headers.includes("Email") || !headers.includes("Phone")) {
                alert("Invalid CSV format. Ensure columns: 'Name', 'Email', 'Phone'.");
                return;
            }

            // Convert CSV rows to JSON
            const contacts = parsedData.map(row => ({
                name: row.Name,
                email: row.Email,
                phoneNumber: row.Phone
            })).filter(contact => contact.name && contact.email && contact.phoneNumber); 

            if (contacts.length === 0) {
                alert("No valid contacts found in the CSV file.");
                return;
            }

            try {
                const response = await api.post("/contacts/import", { contacts }, authHeaders);

                alert(response.data.message);
                fetchContacts(); // Refresh contacts
            } catch (error) {
                alert("Failed to import contacts.");
            }
        },
        header: true, // Treat the first row as headers
    });
};


  const handleCreateGroup = () => {
    if (!groupName || !groupDescription) {
      alert('Group name and description are required!');
      return;
    }
    alert(`Group Created: ${groupName}\nDescription: ${groupDescription}`);
    setGroupName('');
    setGroupDescription('');
    setIsModalOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                onClick={() => setIsAddContactModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Add New Contact
              </button>
              <label className="cursor-pointer px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600">
                Import CSV
                <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
              </label>
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
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr key={contact._id} className="border-t border-blue-200">
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.phoneNumber}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                          onClick={() => handleEditContact(contact)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-500"
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
      <div className='flex justify-between items-center space-x-2 p-4 border-t'>
              <div className='flex-1'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-700'
                  }`}
                >
                  Previous
                </button>
              </div>

              <span className='text-gray-600 flex-1 text-center'>
                Page {currentPage} of {totalPages}
              </span>

              <div className='flex-1 text-right'>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Add Contact Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Add Contact</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAddContactCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {isEditContactModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Edit Contact</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={editContactName}
                onChange={(e) => setEditContactName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={editContactEmail}
                onChange={(e) => setEditContactEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={editContactPhone}
                onChange={(e) => setEditContactPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleEditContactCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateContact}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
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
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
