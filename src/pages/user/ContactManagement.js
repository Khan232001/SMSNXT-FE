import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import Papa from 'papaparse';
import api from '../../utils/api';
import { useTags } from '../../context/TagsContext';
import { useContacts } from '../../context/ContactsContext';

const ContactManagement = () => {
  const { tags: availableTags, fetchTags, setTags } = useTags();
  const { contacts, setContacts, fetchAllContacts: fetchContacts } = useContacts();
  console.log(contacts)
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importStep, setImportStep] = useState(1);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [newContact, setNewContact] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', tag: '' });
  const [editContact, setEditContact] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', tag: '' });
  const [currentContact, setCurrentContact] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [importMode, setImportMode] = useState('importNew');
  const [fileError, setFileError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchContacts();
    fetchTags();
  }, []);

  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setFileError('');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) validateFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) validateFile(e.target.files[0]);
  };

  const validateFile = (file) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) setSelectedFile(file);
    else {
      setFileError('Invalid file format. Only CSV files are allowed.');
      setSelectedFile(null);
    }
  };

  // Validate US phone number format
  const validatePhoneNumber = (phone) => {
    const usPhoneRegex = /^(\+1|1)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/;
    return usPhoneRegex.test(phone);
  };

  const validateContact = (contact) => {
    const errors = {};

    if (!contact.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!contact.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!contact.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errors.email = 'Invalid email format';
    }

    if (!contact.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(contact.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be in US format (e.g., 123-456-7890)';
    }

    return errors;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const handleAddContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContact = async () => {
    const errors = validateContact(newContact);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const contactData = {
      name: `${newContact.firstName} ${newContact.lastName}`.trim(),
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      email: newContact.email,
      phoneNumber: newContact.phoneNumber,
      tags: newContact.tag ? [{ name: newContact.tag }] : []
    };

    try {
      const response = await api.post('/contacts', contactData, authHeaders);
      setContacts(prev => [...prev, response.data.data]);
      handleAddContactCancel();
    } catch (error) {
      if (error.response?.status === 400) alert(error.response.data.message);
    }
  };

  const handleAddContactCancel = () => {
    setNewContact({ firstName: '', lastName: '', email: '', phoneNumber: '', tag: '' });
    setValidationErrors({});
    setIsAddContactModalOpen(false);
  };

  const handleEditContact = (contact) => {
    // Split the name into first and last names
    const nameParts = contact.name ? contact.name.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    setCurrentContact(contact);
    setEditContact({
      firstName,
      lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      tag: contact.tags?.[0]?.name || ''
    });
    setIsEditContactModalOpen(true);
  };

  const handleEditContactChange = (e) => {
    const { name, value } = e.target;
    setEditContact(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateContact = async () => {
    const errors = validateContact(editContact);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const updatedContact = {
      name: `${editContact.firstName} ${editContact.lastName}`.trim(),
      firstName: editContact.firstName,
      lastName: editContact.lastName,
      email: editContact.email,
      phoneNumber: editContact.phoneNumber,
      tags: editContact.tag ? [{ name: editContact.tag }] : []
    };

    try {
      const response = await api.put(`/contacts/${currentContact._id}`, updatedContact, authHeaders);
      setContacts(prev =>
        prev.map(c =>
          c._id === currentContact._id ? response.data.data : c
        )
      );

      handleEditContactCancel();
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  };

  const handleEditContactCancel = () => {
    setEditContact({ firstName: '', lastName: '', email: '', phoneNumber: '', tag: '' });
    setValidationErrors({});
    setCurrentContact(null);
    setIsEditContactModalOpen(false);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.delete(`/contacts/${id}`, authHeaders);
        setContacts(prev => prev.filter(contact => contact._id !== id));
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }
  };

  const handleImportModeChange = (mode) => setImportMode(mode);
  const handleImportCSV = async () => {
    if (!selectedFile) return alert('Please select a CSV file.');

    setIsImporting(true);
    setImportProgress(0);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const parsedData = result.data;

        if (!Array.isArray(parsedData) || parsedData.length === 0) {
          alert('Invalid or empty CSV file.');
          setIsImporting(false);
          return;
        }

        setImportProgress(60);

        // Detect column keys
        const firstNameKey = Object.keys(parsedData[0]).find(h =>
          h.trim().toLowerCase().includes("first") || h.trim().toLowerCase().includes("given")
        );
        const lastNameKey = Object.keys(parsedData[0]).find(h =>
          h.trim().toLowerCase().includes("last") || h.trim().toLowerCase().includes("family")
        );
        const nameKey = (!firstNameKey || !lastNameKey) &&
          Object.keys(parsedData[0]).find(h => h.trim().toLowerCase() === "name");

        const emailKey = Object.keys(parsedData[0]).find(h =>
          h.trim().toLowerCase().includes("email")
        );
        const phoneKey = Object.keys(parsedData[0]).find(h =>
          h.trim().toLowerCase().includes("phone") ||
          h.trim().toLowerCase().includes("mobile") ||
          h.trim().toLowerCase().includes("tel")
        );

        if ((!firstNameKey || !lastNameKey) && !nameKey || !emailKey || !phoneKey) {
          alert('Invalid CSV format. Make sure it contains name (or first/last), email, and phone.');
          setIsImporting(false);
          return;
        }

        const contacts = parsedData.map(row => {
          let firstName = '';
          let lastName = '';

          if (nameKey) {
            const nameParts = row[nameKey]?.trim().split(' ') || [];
            firstName = nameParts[0] || '';
            lastName = nameParts.slice(1).join(' ') || '';
          } else {
            firstName = row[firstNameKey]?.trim() || '';
            lastName = row[lastNameKey]?.trim() || '';
          }

          const email = row[emailKey]?.trim();
          const phoneNumber = row[phoneKey]?.trim();

          const tagIds = selectedTags
            .map(tag => {
              const matchedTag = availableTags.find(t => t.name === tag.label);
              return matchedTag ? matchedTag._id : null;
            })
            .filter(Boolean);

          return {
            name: `${firstName} ${lastName}`.trim(), // ✅ Add this
            firstName,
            lastName,
            email,
            phoneNumber,
            tags: tagIds,
          };
        }).filter(c =>
          c.firstName && c.lastName &&
          c.email &&
          c.phoneNumber &&
          validatePhoneNumber(c.phoneNumber)
        );

        if (contacts.length === 0) {
          alert('No valid contacts found. Ensure all required fields are present and phone numbers are valid US format.');
          setIsImporting(false);
          return;
        }

        setImportProgress(80);

        try {
          const response = await api.post('/contacts/import', { contacts, importMode }, authHeaders);
          const { totalImported, totalSkipped } = response.data.data;


          let message = `✅ Imported: ${totalImported} contacts.\n`;
          if (totalSkipped > 0) message += `⚠️ Skipped: ${totalSkipped} duplicate(s).\n`;

          setImportProgress(100);
          setTimeout(() => {
            setIsImporting(false);
            alert(message);
            fetchContacts();
            setIsImportModalOpen(false);
          }, 500);
        } catch (error) {
          setIsImporting(false);
          alert('❌ Failed to import contacts.');
          console.error('Import Error:', error.response?.data || error.message);
        }
      },
      error: (error) => {
        setIsImporting(false);
        alert('Error parsing CSV file: ' + error.message);
      }
    });

    setSelectedFile(null);
    setImportStep(1);
  };
  console.log(contacts)


  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 mt-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Contacts</h2>
          <div className="flex space-x-2 mt-4 lg:mt-0">
            <button
              onClick={() => setIsAddContactModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span>New Contact</span>
            </button>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Import Contacts</span>
            </button>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Show:</span>
              <select className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>10 rows</option>
                <option>20 rows</option>
                <option>50 rows</option>
              </select>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.name.trim().split(" ")[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.name.trim().split(" ")[1]}</td>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                    No contacts found. Add your first contact to get started.
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
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
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
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Contact</h3>
              <button
                onClick={handleAddContactCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newContact.firstName}
                  onChange={handleAddContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  required
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newContact.lastName}
                  onChange={handleAddContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  required
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleAddContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  required
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (US Format)</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={newContact.phoneNumber}
                  onChange={handleAddContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  placeholder="e.g., 123-456-7890"
                  required
                />
                {validationErrors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={newContact.tag}
                  onChange={handleAddContactChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={handleAddContactCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {isEditContactModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Contact</h3>
              <button
                onClick={handleEditContactCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editContact.firstName}
                  onChange={handleEditContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  required
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editContact.lastName}
                  onChange={handleEditContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  required
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editContact.email}
                  onChange={handleEditContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  required
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (US Format)</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editContact.phoneNumber}
                  onChange={handleEditContactChange}
                  className={`w-full px-4 py-2 border ${validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  placeholder="e.g., 123-456-7890"
                  required
                />
                {validationErrors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={editContact.tag}
                  onChange={handleEditContactChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={handleEditContactCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateContact}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Update Contact
                </button>
              </div>
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
                <h3 className="text-2xl font-semibold text-gray-800">Import Contacts</h3>
                <button
                  onClick={() => {
                    setIsImportModalOpen(false);
                    setImportStep(1);
                    setSelectedFile(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isImporting ? (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <h4 className="text-lg font-medium text-gray-800 mt-4">Importing Contacts</h4>
                    <p className="text-sm text-gray-600 mt-2">Please wait while we process your file...</p>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${importProgress}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{importProgress}% complete</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Upload Contact Data</h4>
                    <p className="text-sm text-gray-600">Select a way how you would like to upload contacts.</p>
                  </div>

                  {importStep === 1 && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h5 className="font-medium text-gray-800 mb-3">Upload a CSV File</h5>
                        <p className="text-sm text-gray-600 mb-4">Upload a CSV file with contacts information including phone numbers, names, and emails.</p>

                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} transition-colors duration-200`}
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
                                className="mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                Change file
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="font-medium text-gray-800 mb-1">Drag & drop your CSV file here</p>
                              <p className="text-sm text-gray-500 mb-3">or</p>
                              <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block transition-colors duration-200">
                                Browse files...
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".csv"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="text-xs text-gray-500 mt-3">Only CSV (.csv) files are supported</p>
                              {fileError && (
                                <p className="text-xs text-red-500 mt-2">{fileError}</p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {importStep === 2 && (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <h5 className="font-medium text-gray-800 mb-4">Map Your Fields</h5>
                          <p className="text-sm text-gray-600 mb-4">Match your file's columns to the correct contact fields.</p>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="font-medium text-sm text-gray-700">File Column</div>
                              <div className="font-medium text-sm text-gray-700">Contact Field</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                              <div className="text-sm text-gray-600">First Name</div>
                              <Select
                                options={[
                                  { value: 'firstName', label: 'First Name' },
                                  { value: 'lastName', label: 'Last Name' },
                                  { value: 'email', label: 'Email' },
                                  { value: 'phone', label: 'Phone' },
                                  { value: 'tag', label: 'Tag' }
                                ]}
                                defaultValue={{ value: 'firstName', label: 'First Name' }}
                                className="basic-select"
                                classNamePrefix="select"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                              <div className="text-sm text-gray-600">Last Name</div>
                              <Select
                                options={[
                                  { value: 'firstName', label: 'First Name' },
                                  { value: 'lastName', label: 'Last Name' },
                                  { value: 'email', label: 'Email' },
                                  { value: 'phone', label: 'Phone' },
                                  { value: 'tag', label: 'Tag' }
                                ]}
                                defaultValue={{ value: 'lastName', label: 'Last Name' }}
                                className="basic-select"
                                classNamePrefix="select"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                              <div className="text-sm text-gray-600">Email Address</div>
                              <Select
                                options={[
                                  { value: 'firstName', label: 'First Name' },
                                  { value: 'lastName', label: 'Last Name' },
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
                                  { value: 'firstName', label: 'First Name' },
                                  { value: 'lastName', label: 'Last Name' },
                                  { value: 'email', label: 'Email' },
                                  { value: 'phone', label: 'Phone' },
                                  { value: 'tag', label: 'Tag' }
                                ]}
                                defaultValue={{ value: 'phone', label: 'Phone' }}
                                className="basic-select"
                                classNamePrefix="select"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                              <div className="text-sm text-gray-600">Tags</div>
                              <Select
                                options={[
                                  { value: 'firstName', label: 'First Name' },
                                  { value: 'lastName', label: 'Last Name' },
                                  { value: 'email', label: 'Email' },
                                  { value: 'phone', label: 'Phone' },
                                  { value: 'tags', label: 'Tag' }
                                ]}
                                defaultValue={{ value: 'tags', label: 'Tag' }}
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

                  {selectedFile && importStep === 3 && (
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
                </>
              )}

              <div className="flex justify-between mt-8">
                {importStep > 1 && !isImporting ? (
                  <button
                    onClick={() => setImportStep(importStep - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsImportModalOpen(false);
                      setImportStep(1);
                      setSelectedFile(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    disabled={isImporting}
                  >
                    Cancel
                  </button>
                )}

                {importStep < 3 && !isImporting ? (
                  <button
                    onClick={() => setImportStep(importStep + 1)}
                    disabled={!selectedFile}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${selectedFile ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  >
                    Next
                  </button>
                ) : !isImporting ? (
                  <button
                    onClick={handleImportCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Import Contacts
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;