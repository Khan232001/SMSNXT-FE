import React, { useState, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import UserSidebar from "../../components/UserSidebar";
import api from "../../utils/api";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";

const TagsManagement = () => {
  const [tags, setTags] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]); // All fetched contacts for selection
  const [selectedContacts, setSelectedContacts] = useState([]); // Contacts selected from Select Contacts Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddContactsModalOpen, setIsAddContactsModalOpen] = useState(false);
  const [isSelectContactsModalOpen, setIsSelectContactsModalOpen] =
    useState(false);

  const [tagName, setTagName] = useState("");
  const [signupKeyword, setSignupKeyword] = useState("");

  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");
  const [editSignupKeyword, setEditSignupKeyword] = useState("");

  const [currentTagId, setCurrentTagId] = useState(null);
  const [currentTagName, setCurrentTagName] = useState("");
  const [currentSignupKeyword, setCurrentSignupKeyword] = useState("");

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
      // Exclude already added contacts
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
    setIsAddContactsModalOpen(!isAddContactsModalOpen);
    fetchContacts(tagId);
  };

  const handleAddContactsCancel = () => {
    setIsAddContactsModalOpen(!isAddContactsModalOpen);
    setCurrentTagId(null);
    setCurrentTagName("");
    setCurrentSignupKeyword("");
    fetchTags(); 
  };

  const handleOpenSelectContactsModal = () => {
    setIsSelectContactsModalOpen(!isSelectContactsModalOpen);
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
    setIsSelectContactsModalOpen(!isSelectContactsModalOpen);
  
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
        // alert("Contacts saved to tag successfully!");
        setIsAddContactsModalOpen(!isAddContactsModalOpen);
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
        // alert("Contact removed from tag successfully!");
  
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
    try {
      await api.delete(`/tags/${id}`, authHeaders);
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (error) {
      console.error("Failed to delete tag:", error);
      alert("Failed to delete tag.");
    }
  };

  const handleAddTagCancel = () => {
    setIsAddModalOpen(!isAddModalOpen);
    setTagName("");
    setSignupKeyword("");
  };

  const handleEditTagCancel = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setEditTagId(null);
    setEditTagName("");
    setEditSignupKeyword("");
  };

  const handleSaveNewTag = async () => {
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
    setIsEditModalOpen(!isEditModalOpen);
    setEditTagId(id);
    setEditTagName(name);
    setEditSignupKeyword(signupKeyword);
  };

  const handleSaveEditedTag = async () => {
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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-64 bg-blue-700 text-white">
        <UserSidebar />
      </div>

      <div className="flex-1 bg-blue-50">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full bg-blue-700 text-white z-50 shadow-md">
          <UserNavbar />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-16">
          <h1 className="text-xl font-semibold mb-4">Tags</h1>

          {/* Search Input */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              className="bg-blue-600 text-white rounded-md px-4 py-2"
              onClick={() => setIsAddModalOpen(!isAddModalOpen)}
            >
              Add Tag
            </button>
          </div>

          {/* Tags Table */}
          <div className="overflow-x-auto rounded-md">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Tag Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Signup Keyword
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Count (Unique/Total)
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Actions
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <tr key={tag._id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">
                        {tag.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {tag.signupKeyword || "-"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {`${tag.contacts?.length || 0} / ${tag.contacts?.length || 0}`}
                      </td>
                      <td className="px-4 py-2 flex space-x-2 items-center">
                        <button
                          onClick={() =>
                            handleEditTag(tag._id, tag.name, tag.signupKeyword)
                          }
                        >
                          <FaEdit className="text-gray-500" />
                        </button>
                        <button
                          onClick={() =>
                            handleAddContacts(
                              tag._id,
                              tag.name,
                              tag.signupKeyword
                            )
                          }
                        >
                          <RiContactsLine className="text-gray-500" />
                        </button>
                        <button onClick={() => handleDeleteTag(tag._id)}>
                          <FaTrashCan className="text-gray-500" />
                        </button>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Date(tag.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="border border-gray-200 px-4 py-2 text-center"
                      colSpan="5"
                    >
                      No tags found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add Tag Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Tag</h2>

                {/* Input Fields */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="Enter tag name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Signup Keyword</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    value={signupKeyword}
                    onChange={(e) => setSignupKeyword(e.target.value)}
                    placeholder="Enter signup keyword"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
                    onClick={handleAddTagCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white rounded-md px-4 py-2"
                    onClick={handleSaveNewTag}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Tag Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Tag</h2>

                {/* Input Fields */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    value={editTagName}
                    onChange={(e) => setEditTagName(e.target.value)}
                    placeholder="Enter tag name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Signup Keyword</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    value={editSignupKeyword}
                    onChange={(e) => setEditSignupKeyword(e.target.value)}
                    placeholder="Enter signup keyword"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
                    onClick={handleEditTagCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white rounded-md px-4 py-2"
                    onClick={handleSaveEditedTag}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Add Contacts Modal */}
        {isAddContactsModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6">
              <h2 className="text-xl font-semibold mb-4">Add Contacts to Tag</h2>

              {/* Tag Details */}
              <div className="flex justify-between">
                <div className="mb-4">
                  <p>
                    <strong>Tag Name:</strong> {currentTagName}
                  </p>
                  <p>
                    <strong>Signup Keyword:</strong> {currentSignupKeyword}
                  </p>
                </div>
                {/* Add Contact Button */}
                <button
                  className="bg-blue-600 text-white rounded-md px-4 py-2 mb-4"
                  onClick={handleOpenSelectContactsModal}
                >
                  Add Contact
                </button>
              </div>


              {/* Contacts Table */}
              <div className="overflow-x-auto mb-4">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Name
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Mobile
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Email
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length > 0 ? (
                      contacts.map((contact) => (
                        <tr key={contact._id} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-2">
                            {contact.name}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {contact.phoneNumber}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                            {contact.email || "-"}
                          </td>
                          <td className="border border-gray-200 px-4 py-2">
                          <button
                            className="text-white rounded-md px-4 py-1"
                            onClick={() => handleDeleteContactFromTag(contact._id)}
                          >
                            <FaTrashCan className="text-gray-500" />
                          </button>
                        </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="border border-gray-200 px-4 py-2 text-center"
                          colSpan="3"
                        >
                          No contacts added yet.
                        </td>
                      </tr>
                      )}
                      </tbody>
                    </table>
                  </div>

                  
                  {/* Footer */}
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
                      onClick={handleAddContactsCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-600 text-white rounded-md px-4 py-2"
                      onClick={handleSaveContactsToTag} // Save contacts to tag
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}


          {/* Select Contacts Modal */}
          {isSelectContactsModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
                <h2 className="text-xl font-semibold mb-4">Select Contacts</h2>

                {/* Contacts Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Select
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Name
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Mobile
                        </th>
                        <th className="border border-gray-200 px-4 py-2 text-left">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allContacts.length > 0 ? (
                        allContacts.map((contact) => (
                          <tr key={contact._id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-2">
                              <input
                                type="checkbox"
                                checked={selectedContacts.some(
                                  (selected) => selected._id === contact._id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(contact)
                                }
                              />
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {contact.name}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {contact.phoneNumber}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {contact.email || "-"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="border border-gray-200 px-4 py-2 text-center"
                            colSpan="4"
                          >
                            No contacts available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
                    onClick={() => setIsSelectContactsModalOpen((prev) => !prev)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white rounded-md px-4 py-2"
                    onClick={handleSaveSelectedContacts}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsManagement;
