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

  const handleCreateUser = () => setIsModalOpen(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password || !newUser.phoneNumber) {
      alert('All fields are required!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.post('/user/signup', newUser);
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
      setError(err.response?.data?.message || 'Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggle = async (userId) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    try {
      const newRole = user.role === 'user' ? 'admin' : 'user';
      await api.patch(`/user/${userId}`, { role: newRole });

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error('Error updating user role:', err);
      alert('Failed to update user role.');
    }
  };

  return (
    <div className='flex h-screen'>
      <div className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${isSidebarOpen ? 'w-64' : 'hidden'}`}>
        <Sidebar />
      </div>

      <div className='flex-1 flex flex-col bg-gray-100 relative'>
        <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white shadow-md flex justify-between items-center px-4 lg:px-6'>
          <button className='text-gray-600 focus:outline-none lg:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
          <Navbar />
        </div>

        <div className='mt-16 flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-700'>Staff Management</h2>
            <button onClick={handleCreateUser} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              Create New User
            </button>
          </div>

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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className='border-t border-gray-200'>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6'>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
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
                  </select>
                </div>
              </div>

              {error && <p className='text-red-500 mt-4'>{error}</p>}

              <div className='mt-6 flex justify-end gap-3'>
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
    </div>
  );
};

export default StaffManagement;
