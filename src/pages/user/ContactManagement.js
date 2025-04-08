import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Tooltip from '../../components/Tooltip';
import api from '../../utils/api';
import Papa from 'papaparse';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importStep, setImportStep] = useState(1); // 
  // States for adding a contact
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactTag, setNewContactTag] = useState('');

  // States for editing a contact
  const [editContactName, setEditContactName] = useState('');
  const [editContactEmail, setEditContactEmail] = useState('');
  const [editContactPhone, setEditContactPhone] = useState('');
  const [editContactTag, setEditContactTag] = useState('');
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




  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
      } else {
        alert('Please upload a CSV or Excel file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
      } else {
        alert('Please upload a CSV or Excel file');
      }
    }
  };


  const fetchContacts = async () => {
    try {
      const response = await api.get('/contacts', authHeaders);
      setContacts(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-'; // Handle invalid dates

    const options = { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  const handleAddContact = async () => {
    const newContact = {
      name: newContactName,
      email: newContactEmail,
      phoneNumber: newContactPhone,
      tags: newContactTag ? [{ name: newContactTag }] : []
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
    setNewContactTag('');
    setIsAddContactModalOpen(false);
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact);
    setEditContactName(contact.name);
    setEditContactEmail(contact.email);
    setEditContactPhone(contact.phoneNumber);
    setEditContactTag(contact.tags?.[0]?.name || '');
    setIsEditContactModalOpen(true);
  };

  const handleUpdateContact = async () => {
    const updatedContact = {
      name: editContactName,
      email: editContactEmail,
      phoneNumber: editContactPhone,
      tags: editContactTag ? [{ name: editContactTag }] : []
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
    setEditContactTag('');
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
        const tagKey = Object.keys(parsedData[0]).find(h => h.trim().toLowerCase() === "tag");

        if (!nameKey || !emailKey || !phoneKey) {
          alert('Invalid CSV format. Ensure columns: Name, Email, Phone.');
          return;
        }

        const contacts = parsedData
          .map(row => ({
            name: row[nameKey]?.trim(),
            email: row[emailKey]?.trim(),
            phoneNumber: row[phoneKey]?.trim(),
            tags: row[tagKey]?.trim() ? [{ name: row[tagKey].trim() }] : []
          }))
          .filter(contact => contact.name && contact.email && contact.phoneNumber);

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
              <span>Import Contacts</span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.updatedAt)}
                    </td>
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tag</label>
              <input
                type="text"
                value={newContactTag}
                onChange={(e) => setNewContactTag(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                // placeholder="Enter a tag name"
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tag</label>
              <input
                type="text"
                value={editContactTag}
                onChange={(e) => setEditContactTag(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a tag name"
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Import contacts</h3>
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Upload contact data</h4>
                <p className="text-sm text-gray-600">Select a way how you would like to upload contacts.</p>
              </div>

              {importStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-3">Upload a file</h5>
                    <p className="text-sm text-gray-600 mb-4">Upload a file with contacts phone numbers, names, organization etc.</p>

                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="font-medium text-gray-800">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                          <button
                            onClick={() => setSelectedFile(null)}
                            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Change file
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="font-medium text-gray-800 mb-1">Drag & drop your file here</p>
                          <p className="text-sm text-gray-500 mb-3">or</p>
                          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block">
                            Browse files...
                            <input
                              type="file"
                              className="hidden"
                              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-3">Supported file types: Excel (.xls or .xlsx) and CSV (.csv)</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-3">Copy and paste phone numbers</h5>
                    <p className="text-sm text-gray-600 mb-4">Simply copy and paste multiple numbers to add many contacts at once (no field matching).</p>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Paste phone numbers here, one per line..."
                    ></textarea>
                  </div>

                 
                </div>
              )}

              {importStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-4">Map your fields</h5>
                    <p className="text-sm text-gray-600 mb-4">Match your file's columns to the correct contact fields.</p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="font-medium text-sm text-gray-700">File Column</div>
                        <div className="font-medium text-sm text-gray-700">Contact Field</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="text-sm text-gray-600">Name</div>
                        <Select
                          options={[
                            { value: 'name', label: 'Name' },
                            { value: 'email', label: 'Email' },
                            { value: 'phone', label: 'Phone' },
                            { value: 'tag', label: 'Tag' }
                          ]}
                          defaultValue={{ value: 'name', label: 'Name' }}
                          className="basic-select"
                          classNamePrefix="select"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="text-sm text-gray-600">Email Address</div>
                        <Select
                          options={[
                            { value: 'name', label: 'Name' },
                            { value: 'email', label: 'Email' },
                            { value: 'phone', label: 'Phone' },
                            { value: 'tag', label: 'Tag' }
                          ]}
                          defaultValue={{ value: 'email', label: 'Email' }}
                          className="basic-select"
                          classNamePrefix="select"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="text-sm text-gray-600">Phone</div>
                        <Select
                          options={[
                            { value: 'name', label: 'Name' },
                            { value: 'email', label: 'Email' },
                            { value: 'phone', label: 'Phone' },
                            { value: 'tag', label: 'Tag' }
                          ]}
                          defaultValue={{ value: 'phone', label: 'Phone' }}
                          className="basic-select"
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-3">Import Options</h5>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={importMode === 'importNew'}
                          onChange={() => handleImportModeChange('importNew')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Import new contacts only (skip duplicates)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={importMode === 'updateOnly'}
                          onChange={() => handleImportModeChange('updateOnly')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Update existing contacts only</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={importMode === 'importAndUpdate'}
                          onChange={() => handleImportModeChange('importAndUpdate')}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Import new and update existing contacts</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-3">Add Tags</h5>
                    <Select
                      isMulti
                      options={availableTags.map(tag => ({ value: tag._id, label: tag.name }))}
                      value={selectedTags}
                      onChange={setSelectedTags}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select tags to apply to all imported contacts..."
                    />
                  </div>
                </div>
              )}

              {importStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h5 className="font-medium text-gray-800 mb-4">Review and Import</h5>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm text-gray-600">File Name:</div>
                        <div className="text-sm font-medium text-gray-800">{selectedFile?.name}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm text-gray-600">File Size:</div>
                        <div className="text-sm font-medium text-gray-800">{(selectedFile?.size / 1024).toFixed(2)} KB</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm text-gray-600">Import Mode:</div>
                        <div className="text-sm font-medium text-gray-800">
                          {importMode === 'importNew' && 'Import new contacts only'}
                          {importMode === 'updateOnly' && 'Update existing contacts only'}
                          {importMode === 'importAndUpdate' && 'Import new and update existing'}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm text-gray-600">Tags to Apply:</div>
                        <div className="text-sm font-medium text-gray-800">
                          {selectedTags.length > 0
                            ? selectedTags.map(tag => tag.label).join(', ')
                            : 'No tags selected'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Note:</span> This action cannot be undone. We'll import {selectedFile?.name} with the selected settings.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {importStep > 1 ? (
                  <button
                    onClick={() => setImportStep(importStep - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}

                {importStep < 3 ? (
                  <button
                    onClick={() => setImportStep(importStep + 1)}
                    disabled={!selectedFile}
                    className={`px-4 py-2 rounded-md ${selectedFile ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleImportCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Import Contacts
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;