import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get('/admin/staff');
        setStaff(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };
    fetchStaff();
  }, []);

  const handleAddStaff = () => {
    navigate('/admin/staff/create');
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/staff/${userId}/role`, { role: newRole });
      setStaff((prevStaff) =>
        prevStaff.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error("Failed to update role", err);
      alert("Failed to update role.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Staff Management</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.firstName} {user.lastName}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
              <td className="py-2 px-4 border-b capitalize">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="px-3 py-1 border rounded bg-white shadow-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddStaff}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Create New User
      </button>
    </div>
  );
}

export default Staff;
