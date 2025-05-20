import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/AdminSidebar';
import api from '../../utils/api';

const StaffManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/user/all');
      const formattedUsers = response.data.data.map((user) => ({
        name: user.fullName,
        email: user.email,
        phonenumber: user.phoneNumber,
        role: user.role,
        id: user._id,
      }));
<<<<<<< HEAD
=======
      console.log('Formatted users:', formattedUsers);
>>>>>>> main
      setUsers(formattedUsers);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user',
  });

<<<<<<< HEAD
  const handleCreateUser = () => setIsModalOpen(true);
=======
  const handleCreateUser = () => {
    setIsModalOpen(true);
  };
>>>>>>> main

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password || !newUser.phoneNumber) {
=======
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password ||
      !newUser.phoneNumber
    ) {
>>>>>>> main
      alert('All fields are required!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
<<<<<<< HEAD
      await api.post('/user/signup', newUser);
=======
      await api.post('/user/signup', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      });

>>>>>>> main
      setIsModalOpen(false);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'user',
      });
      alert('User created successfully!');
      await fetchUsers();
    } catch (err) {
<<<<<<< HEAD
      setError(err.response?.data?.message || 'Failed to create user. Please try again.');
=======
      setError(
        err.response?.data?.message ||
          'Failed to create user. Please try again.'
      );
>>>>>>> main
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggle = async (userId) => {
<<<<<<< HEAD
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    try {
      const newRole = user.role === 'user' ? 'admin' : 'user';
      await api.patch(`/user/${userId}`, { role: newRole });

=======
    console.log('Attempting to toggle role for user ID:', userId);

    const user = users.find((u) => u.id === userId);
    console.log('All users:', users);
    console.log('Found user:', user);

    if (!user) {
      console.error('User not found for ID:', userId);
      return;
    }

    try {
      const newRole = user.role === 'user' ? 'admin' : 'user';
      console.log(`Updating user ${userId} to role: ${newRole}`);

      await api.patch(`/user/${userId}`, {
        role: newRole,
      });

      // Update the local state to reflect the role change
>>>>>>> main
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error('Error updating user role:', err);
<<<<<<< HEAD
      alert('Failed to update user role.');
=======
      alert('Failed to update user role. Please try again.');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/user/${userId}`);
        // Remove user from local state
        setUsers(users.filter((user) => user.id !== userId));
        alert('User deleted successfully');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleEdit = (user) => {
    const [firstName, lastName] = user.name.split(' ');
    setEditingUser({
      id: user.id,
      firstName,
      lastName,
      email: user.email,
      phoneNumber: user.phonenumber,
      password: '',
    });
    setIsEditModalOpen(true);
    setActiveDropdown(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.put(`/user/${editingUser.id}`, {
        fullName: `${editingUser.firstName} ${editingUser.lastName}`,
        email: editingUser.email,
        phoneNumber: editingUser.phoneNumber,
        ...(editingUser.password && { password: editingUser.password }),
      });

      setIsEditModalOpen(false);
      alert('User updated successfully!');
      await fetchUsers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to update user. Please try again.'
      );
    } finally {
      setIsLoading(false);
>>>>>>> main
    }
  };

  return (
    <div className='flex h-screen'>
<<<<<<< HEAD
      <div className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${isSidebarOpen ? 'w-64' : 'hidden'}`}>
=======
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${
          isSidebarOpen ? 'w-64' : 'hidden'
        }`}
      >
>>>>>>> main
        <Sidebar />
      </div>

      <div className='flex-1 flex flex-col bg-gray-100 relative'>
<<<<<<< HEAD
        <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md flex justify-between items-center px-4 lg:px-6'>
          <button className='text-gray-600 focus:outline-none lg:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
=======
        {/* Navbar */}
        <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md flex justify-between items-center px-4 lg:px-6'>
          <button
            className='text-gray-600 focus:outline-none lg:hidden'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              />
>>>>>>> main
            </svg>
          </button>
          <Navbar />
        </div>

<<<<<<< HEAD
        <div className='mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-700'>Staff Management</h2>
            <button onClick={handleCreateUser} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
=======
        {/* Main Content */}
        <div className='mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0'>
            <h2 className='text-2xl font-semibold text-gray-700 text-center lg:text-left'>
              Staff Management
            </h2>

            <button
              onClick={handleCreateUser}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full lg:w-auto'
            >
>>>>>>> main
              Create New User
            </button>
          </div>

<<<<<<< HEAD
          {isLoading && <div className='text-center py-4'>Loading users...</div>}
          {error && <div className='text-red-500 text-center py-4'>{error}</div>}

          {!isLoading && !error && (
            <div className='overflow-x-auto bg-white shadow-lg rounded-lg mb-6'>
              <table className='min-w-full table-auto'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>Name</th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>Email</th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>Phone</th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>Role</th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>Actions</th>
=======
          {/* Add loading and error states */}
          {isLoading && (
            <div className='text-center py-4'>Loading users...</div>
          )}

          {error && (
            <div className='text-red-500 text-center py-4'>{error}</div>
          )}

          {/* Users Table */}
          {!isLoading && !error && (
            <div className='overflow-x-auto bg-white shadow-lg rounded-lg mb-6'>
              <table className='min-w-full table-auto'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                      Email
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                      Phone Number
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                      Role
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-600'>
                      Actions
                    </th>
>>>>>>> main
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className='border-t border-gray-200'>
<<<<<<< HEAD
                      <td className='px-6 py-4'>{user.name}</td>
                      <td className='px-6 py-4'>{user.email}</td>
                      <td className='px-6 py-4'>{user.phonenumber}</td>
                      <td className='px-6 py-4 capitalize'>{user.role}</td>
                      <td className='px-6 py-4'>
                        <button
                          onClick={() => handleRoleToggle(user.id)}
                          className={`h-9 px-4 rounded-md text-white ${
                            user.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                        >
                          Switch to {user.role === 'user' ? 'Admin' : 'User'}
                        </button>
=======
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {user.name}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {user.email}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {user.phonenumber}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-700'>
                        {user.role}
                      </td>
                      <td className='px-6 py-4 text-sm flex items-center space-x-2 relative'>
                        <button
                          onClick={() => {
                            console.log('Clicked user:', user);
                            handleRoleToggle(user.id);
                          }}
                          className={`h-9 px-4 flex items-center justify-center ${
                            user.role === 'user'
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          } text-white rounded-md hover:opacity-80 min-w-[120px]`}
                        >
                          Switch to {user.role === 'user' ? 'Admin' : 'User'}
                        </button>

                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === user.id ? null : user.id
                            )
                          }
                          className='p-1 rounded-full hover:bg-gray-100 flex items-center'
                        >
                          <svg
                            className='w-6 h-6'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <circle cx='12' cy='6' r='2' />
                            <circle cx='12' cy='12' r='2' />
                            <circle cx='12' cy='18' r='2' />
                          </svg>
                        </button>

                        {activeDropdown === user.id && (
                          <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200'>
                            <div className='py-1'>
                              <button
                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                onClick={() => {
                                  handleEdit(user);
                                  setActiveDropdown(null);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                                onClick={() => {
                                  handleDelete(user.id);
                                  setActiveDropdown(null);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
>>>>>>> main
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* Modal */}
>>>>>>> main
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6'>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
<<<<<<< HEAD
                {['First Name', 'Last Name', 'Email', 'Phone Number', 'Password'].map((label, i) => (
                  <div key={i}>
                    <label className='block text-sm font-medium text-gray-700'>{label}</label>
                    <input
                      type={label === 'Password' ? 'password' : 'text'}
                      value={newUser[label.replace(' ', '').toLowerCase()] || ''}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          [label.replace(' ', '').toLowerCase()]: e.target.value,
                        })
                      }
                      className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                ))}

                <div>
                  <label className='block text-sm font-medium text-gray-700'>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500'
                  >
                    <option disabled>── StaffMember ──</option>
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                    <option value='super_admin'>Super Admin</option>
=======
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    First Name
                  </label>
                  <input
                    type='text'
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, firstName: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, lastName: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    value={newUser.phoneNumber}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phoneNumber: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    placeholder='+1234567890'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Password
                  </label>
                  <input
                    type='password'
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  >
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
>>>>>>> main
                  </select>
                </div>
              </div>

              {error && <p className='text-red-500 mt-4'>{error}</p>}

<<<<<<< HEAD
              <div className='mt-6 flex justify-end gap-3'>
=======
              <div className='mt-6 flex justify-end space-x-3'>
>>>>>>> main
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
                >
                  {isLoading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6'>Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    First Name
                  </label>
                  <input
                    type='text'
                    value={editingUser.firstName}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        firstName: e.target.value,
                      })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    value={editingUser.lastName}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        lastName: e.target.value,
                      })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    value={editingUser.phoneNumber}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        phoneNumber: e.target.value,
                      })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type='password'
                    value={editingUser.password}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        password: e.target.value,
                      })
                    }
                    className='mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
              </div>

              {error && <p className='text-red-500 mt-4'>{error}</p>}

              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setIsEditModalOpen(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
                >
                  {isLoading ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
>>>>>>> main
    </div>
  );
};

export default StaffManagement;
