import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import api from "../../utils/api";
import { FaTrash, FaEdit, FaPlus, FaSearch, FaTimes, FaUserPlus } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

const TagsManagement = () => {
  const [tags, setTags] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddContactsModalOpen, setIsAddContactsModalOpen] = useState(false);
  const [isSelectContactsModalOpen, setIsSelectContactsModalOpen] = useState(false);

  // Form states
  const [tagName, setTagName] = useState("");
  const [signupKeyword, setSignupKeyword] = useState("");
  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");
  const [editSignupKeyword, setEditSignupKeyword] = useState("");
  const [currentTagId, setCurrentTagId] = useState(null);
  const [currentTagName, setCurrentTagName] = useState("");
  const [currentSignupKeyword, setCurrentSignupKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const token = localStorage.getItem("token");
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTags = async () => {
    try {
      const response = await api.get("/tags", authHeaders);
      setTags(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const fetchContacts = async (tagId) => {
    try {
      const response = await api.get(`/tags/${tagId}/contacts`, authHeaders);
      setContacts(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      alert("Failed to fetch contacts.");
    }
  };

  const fetchAllContacts = async () => {
    try {
      const response = await api.get("/contacts", authHeaders);
      const availableContacts = response.data.data.filter(
        (contact) =>
          !contacts.some((addedContact) => addedContact._id === contact._id)
      );
      setAllContacts(availableContacts);
    } catch (error) {
      console.error("Failed to fetch all contacts:", error);
      alert("Failed to fetch contacts.");
    }
  };

  const handleAddContacts = (tagId, tagName, signupKeyword) => {
    setCurrentTagId(tagId);
    setCurrentTagName(tagName);
    setCurrentSignupKeyword(signupKeyword);
    setIsAddContactsModalOpen(true);
    fetchContacts(tagId);
  };

  const handleAddContactsCancel = () => {
    setIsAddContactsModalOpen(false);
    setCurrentTagId(null);
    setCurrentTagName("");
    setCurrentSignupKeyword("");
    fetchTags();
  };

  const handleOpenSelectContactsModal = () => {
    setIsSelectContactsModalOpen(true);
    fetchAllContacts();
  };

  const handleCheckboxChange = (contact) => {
    const isAlreadySelected = selectedContacts.some(
      (selected) => selected._id === contact._id
    );
    if (isAlreadySelected) {
      setSelectedContacts((prev) =>
        prev.filter((selected) => selected._id !== contact._id)
      );
    } else {
      setSelectedContacts((prev) => [...prev, contact]);
    }
  };

  const handleSaveSelectedContacts = () => {
    setContacts((prev) => [...prev, ...selectedContacts]);
    setSelectedContacts([]);
    setIsSelectContactsModalOpen(false);
    fetchAllContacts();
  };

  const handleSaveContactsToTag = async () => {
    try {
      const contactIds = contacts.map((contact) => contact._id);
      const response = await api.put(`/tags/${currentTagId}`, {
        contacts: contactIds,
        authHeaders
      });
      if (response.status === 200) {
        setIsAddContactsModalOpen(false);
        fetchTags();
      } else {
        alert("Failed to save contacts to tag.");
      }
    } catch (error) {
      console.error("Failed to save contacts to tag:", error);
      alert("An error occurred while saving contacts to the tag.");
    }
  };

  const handleDeleteContactFromTag = async (contactId) => {
    try {
      const response = await api.delete(`/tags/${currentTagId}/contacts`, {
        data: { contactId },
        ...authHeaders
      });

      if (response.status === 200) {
        fetchContacts(currentTagId);
      } else {
        alert("Failed to remove contact from tag.");
      }
    } catch (error) {
      console.error("Failed to remove contact from tag:", error);
      alert("An error occurred while removing the contact from the tag.");
    }
  };

  const handleDeleteTag = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;

    try {
      await api.delete(`/tags/${id}`, authHeaders);
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (error) {
      console.error("Failed to delete tag:", error);
      alert("Failed to delete tag.");
    }
  };

  const handleAddTagCancel = () => {
    setIsAddModalOpen(false);
    setTagName("");
    setSignupKeyword("");
  };

  const handleEditTagCancel = () => {
    setIsEditModalOpen(false);
    setEditTagId(null);
    setEditTagName("");
    setEditSignupKeyword("");
  };

  const handleSaveNewTag = async () => {
    if (!tagName.trim()) {
      alert("Tag name is required");
      return;
    }

    const newTag = { name: tagName, signupKeyword: signupKeyword };

    try {
      const response = await api.post("/tags", newTag, authHeaders);
      setTags((prevTags) => [...prevTags, response.data.data]);
      handleAddTagCancel();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create tag.");
    }
  };

  const handleEditTag = (id, name, signupKeyword) => {
    setIsEditModalOpen(true);
    setEditTagId(id);
    setEditTagName(name);
    setEditSignupKeyword(signupKeyword);
  };

  const handleSaveEditedTag = async () => {
    if (!editTagName.trim()) {
      alert("Tag name is required");
      return;
    }

    const updatedTag = { name: editTagName, signupKeyword: editSignupKeyword };

    try {
      const response = await api.put(`/tags/${editTagId}`, updatedTag, authHeaders);
      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag._id === editTagId ? { ...tag, ...response.data.data } : tag
        )
      );
      handleEditTagCancel();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update tag.");
    }
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (tag.signupKeyword && tag.signupKeyword.toLowerCase().includes(searchQuery.toLowerCase())))
  
  return (  <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              {/* <h1 className="text-2xl font-semibold text-gray-800">Tags Management</h1> */}
              <p className="text-sm text-gray-500 mt-1">Manage your contact tags and groups</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-500" />
                  </button>
                )}
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsAddModalOpen(true)}
              >
                <FaPlus className="mr-2" />
                Add Tag
              </button>
            </div>
          </div>

          {/* Tags Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tag Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signup Keyword
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <tr key={tag._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{tag.signupKeyword || "-"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {tag.contacts?.length || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(tag.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEditTag(tag._id, tag.name, tag.signupKeyword)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleAddContacts(tag._id, tag.name, tag.signupKeyword)}
                            className="text-green-600 hover:text-green-900"
                            title="Manage Contacts"
                          >
                            <RiContactsLine />
                          </button>
                          <button
                            onClick={() => handleDeleteTag(tag._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchQuery ? "No tags match your search." : "No tags found. Create your first tag."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Tag Modal */}
      {isAddModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Tag</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="tag-name" className="block text-sm font-medium text-gray-700">
                        Tag Name *
                      </label>
                      <input
                        type="text"
                        id="tag-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        placeholder="e.g. VIP Customers"
                      />
                    </div>
                    <div>
                      <label htmlFor="signup-keyword" className="block text-sm font-medium text-gray-700">
                        Signup Keyword
                      </label>
                      <input
                        type="text"
                        id="signup-keyword"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={signupKeyword}
                        onChange={(e) => setSignupKeyword(e.target.value)}
                        placeholder="e.g. VIP2023"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveNewTag}
                >
                  Create Tag
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={handleAddTagCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tag Modal */}
      {isEditModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Tag</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="edit-tag-name" className="block text-sm font-medium text-gray-700">
                        Tag Name *
                      </label>
                      <input
                        type="text"
                        id="edit-tag-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editTagName}
                        onChange={(e) => setEditTagName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-signup-keyword" className="block text-sm font-medium text-gray-700">
                        Signup Keyword
                      </label>
                      <input
                        type="text"
                        id="edit-signup-keyword"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={editSignupKeyword}
                        onChange={(e) => setEditSignupKeyword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveEditedTag}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={handleEditTagCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Contacts Modal */}
      {isAddContactsModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Manage Contacts for: <span className="text-blue-600">{currentTagName}</span>
                      </h3>
                      <button
                        onClick={handleOpenSelectContactsModal}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaUserPlus className="mr-1" /> Add Contacts
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mobile
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {contacts.length > 0 ? (
                              contacts.map((contact) => (
                                <tr key={contact._id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{contact.phoneNumber}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{contact.email || "-"}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                      onClick={() => handleDeleteContactFromTag(contact._id)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      <FaTrash />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                  No contacts added to this tag yet.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveContactsToTag}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddContactsCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Select Contacts Modal */}
      {isSelectContactsModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Select Contacts to Add
                    </h3>
                    <div className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Select
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mobile
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {allContacts.length > 0 ? (
                              allContacts.map((contact) => (
                                <tr key={contact._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                      type="checkbox"
                                      checked={selectedContacts.some(
                                        (selected) => selected._id === contact._id
                                      )}
                                      onChange={() => handleCheckboxChange(contact)}
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{contact.phoneNumber}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{contact.email || "-"}</div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                  No contacts available to add.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveSelectedContacts}
                >
                  Add Selected ({selectedContacts.length})
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsSelectContactsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsManagement;