import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/AdminSidebar';
import api from '../../utils/api';

const StaffManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phonenumber: '+1234567890',
      role: 'user',
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phonenumber: '+1987654321',
      role: 'admin',
    },
    {
      name: 'Alice Johnson',
      email: 'alicejohnson@example.com',
      phonenumber: '+1122334455',
      role: 'user',
    },
    {
      name: 'Bob Williams',
      email: 'bobwilliams@example.com',
      phonenumber: '+1567890123',
      role: 'admin',
    },
    {
      name: 'Charlie Brown',
      email: 'charliebrown@example.com',
      phonenumber: '+1654321987',
      role: 'user',
    },
    {
      name: 'Diana Prince',
      email: 'dianaprince@example.com',
      phonenumber: '+1765432109',
      role: 'admin',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateUser = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password ||
      !newUser.phoneNumber
    ) {
      alert('All fields are required!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/user/signup', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      });

      // Add new user to the list
      setUsers([
        ...users,
        {
          name: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
          phonenumber: newUser.phoneNumber,
          role: newUser.role,
        },
      ]);

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
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to create user. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggle = (email) => {
    setUsers(
      users.map((user) => {
        if (user.email === email) {
          return {
            ...user,
            role: user.role === 'user' ? 'admin' : 'user',
          };
        }
        return user;
      })
    );
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 bg-white shadow-md lg:relative lg:w-64 lg:block ${
          isSidebarOpen ? 'w-64' : 'hidden'
        }`}
      >
        <Sidebar />
      </div>

      <div className='flex-1 flex flex-col bg-gray-100 relative'>
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
            </svg>
          </button>
          <Navbar />
        </div>

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
              Create New User
            </button>
          </div>

          {/* Users Table */}
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
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className='border-t border-gray-200'>
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
                    <td className='px-6 py-4 text-sm space-x-2'>
                      <button
                        onClick={() => handleRoleToggle(user.email)}
                        className={`px-3 py-1 ${
                          user.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                        } text-white rounded-md hover:opacity-80`}
                      >
                        Switch to {user.role === 'user' ? 'Admin' : 'User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6'>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
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
                  </select>
                </div>
              </div>

              {error && <p className='text-red-500 mt-4'>{error}</p>}

              <div className='mt-6 flex justify-end space-x-3'>
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
