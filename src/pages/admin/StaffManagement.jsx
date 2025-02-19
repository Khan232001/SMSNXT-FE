import React, { useState } from 'react';
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/AdminSidebar';

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

  const handleCreateUser = () => {
    // Handle create user logic
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
    </div>
  );
};

export default StaffManagement;
