import React, { useState, useEffect } from "react";
import UserNavbar from "../../components/UserNavbar";
import UserSidebar from "../../components/UserSidebar";
import api from "../../utils/api";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const TagsManagement = () => {
  const [tags, setTags] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [tagName, setTagName] = useState("");
  const [signupKeyword, setSignupKeyword] = useState("");

  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");
  const [editSignupKeyword, setEditSignupKeyword] = useState("");

  // Fetch Tags from API
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await api.get("/tags"); // Fetch tags data from API
      setTags(response.data.data || []); // Update state with fetched data
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      alert("Failed to fetch tags.");
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      await api.delete(`/tags/${id}`);
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
    const newTag = {
      name: tagName,
      signupKeyword: signupKeyword,
    };

    try {
      const response = await api.post("/tags", newTag);
      setTags((prevTags) => [...prevTags, response.data.data]); // Add new tag to state
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
    const updatedTag = {
      name: editTagName,
      signupKeyword: editSignupKeyword,
    };

    try {
      const response = await api.put(`/tags/${editTagId}`, updatedTag);
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

          {/* Table */}
          <div className="overflow-x-auto rounded-md">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">Tag Name</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Signup Keyword</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Count (Unique/Total)</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <tr key={tag._id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">{tag.name}</td>
                      <td className="border border-gray-200 px-4 py-2">{tag.signupKeyword || "-"}</td>
                      <td className="border border-gray-200 px-4 py-2">{`${tag.contacts?.length || 0} / ${tag.contacts?.length || 0}`}</td>
                      <td className="px-4 py-2 flex space-x-2 items-center">
                        <button
                          onClick={() =>
                            handleEditTag(tag._id, tag.name, tag.signupKeyword)
                          }
                        >
                          <FaEdit className="text-gray-500" />
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

          {/* Add Tags Modal */}
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

          {/* Edit Tags Modal */}
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
        </div>
      </div>
    </div>
  );
};

export default TagsManagement;
