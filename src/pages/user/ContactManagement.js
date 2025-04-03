import React, { useState, useEffect } from 'react';
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import Select from 'react-select';
import Tooltip from '../../components/Tooltip';
import api from '../../utils/api';
import Papa from 'papaparse';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);

  // States for adding a contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  // States for editing a contact
  const [editContactName, setEditContactName] = useState('');
  const [editContactEmail, setEditContactEmail] = useState('');
  const [editContactPhone, setEditContactPhone] = useState('');
  const [currentContact, setCurrentContact] = useState(null);

  // States for import contact
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [importMode, setImportMode] = useState('importNew');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchContacts();
    fetchTags();
  }, []);

  const token = localStorage.getItem('token');
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contacts', authHeaders);
      setContacts(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
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
        alert(error.response.data.message);
      }
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
      console.error('Failed to update contact:', error);
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
      console.error('Failed to delete contact:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.get('/tags', authHeaders);
      setAvailableTags(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch tags', error);
    }
  };

  const handleImportModeChange = (mode) => {
    setImportMode(mode);
  };

  const handleImportCSV = async () => {
    if (!selectedFile) {
      alert('Please select a CSV file.');
      return;
    }

    Papa.parse(selectedFile, {
      complete: async (result) => {
        const parsedData = result.data;

        if (!Array.isArray(parsedData) || parsedData.length === 0) {
          alert('Invalid or empty CSV file.');
          return;
        }

        const nameKey = Object.keys(parsedData[0]).find(h => h.trim().toLowerCase() === "name");
        const emailKey = Object.keys(parsedData[0]).find(h => h.trim().toLowerCase() === "email");
        const phoneKey = Object.keys(parsedData[0]).find(h => h.trim().toLowerCase() === "phone");

        if (!nameKey || !emailKey || !phoneKey) {
          alert('Invalid CSV format. Ensure columns: Name, Email, Phone.');
          return;
        }

        const tags = selectedTags.map(tag => tag.value);

        const contacts = parsedData
          .map(row => ({
            name: row[nameKey]?.trim(),
            email: row[emailKey]?.trim(),
            phoneNumber: row[phoneKey]?.trim(),
            tags: tags,
          }))
          .filter(contact => contact.name  && contact.email && contact.phoneNumber);

        if (contacts.length === 0) {
          alert('No valid contacts found in the CSV file.');
          return;
        }

        try {
          const response = await api.post('/contacts/import', { contacts, importMode }, authHeaders);
          const { totalImported, totalSkipped, skippedContacts } = response.data;

          let message = `✅ Imported: ${totalImported} contacts.\n`;
          if (totalSkipped > 0) {
            message += `⚠️ Skipped: ${totalSkipped} due to duplicates.\n`;
          }

          alert(message);
          fetchContacts();
          setIsImportModalOpen(false);
        } catch (error) {
          alert('❌ Failed to import contacts.');
          console.error('Import Error:', error.response?.data || error.message);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 mt-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My contacts</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsAddContactModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <span>+ New contact</span>
            </button>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            >
              <span>Import & Download</span>
            </button>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
           
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Show on page:</span>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                <option>10 rows</option>
                <option>20 rows</option>
                <option>50 rows</option>
              </select>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created by</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.tags && contact.tags.length > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {contact.tags[0].name}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 Feb, 1:44 am</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 Feb, 1:44 am</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sameer Dagga</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{contacts.length}</span> results
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Columns */}
        {/* <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filters</span>
            <span className="text-sm font-medium text-gray-700">Columns</span>
          </div>
        </div> */}
      </div>

      {/* Add Contact Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Contact</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAddContactCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Contact</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editContactName}
                  onChange={(e) => setEditContactName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
             
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={editContactEmail}
                onChange={(e) => setEditContactEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={editContactPhone}
                onChange={(e) => setEditContactPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleEditContactCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Import Contacts</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Import Mode</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={importMode === 'importNew'}
                    onChange={() => handleImportModeChange('importNew')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Import new contacts only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={importMode === 'updateOnly'}
                    onChange={() => handleImportModeChange('updateOnly')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Update contacts only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={importMode === 'importAndUpdate'}
                    onChange={() => handleImportModeChange('importAndUpdate')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Import and update contacts</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">CSV File</label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <Select
                isMulti
                options={availableTags.map(tag => ({ value: tag._id, label: tag.name }))}
                value={selectedTags}
                onChange={setSelectedTags}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleImportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;