import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';

function Staff() {

  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch staff data
    const fetchStaff = async () => {
      const response = await fetch('/api/admin/staff');
      const data = await response.json();
      setStaff(data);
    };
    fetchStaff();
  }, []);

  const handleAddStaff = () => {
    navigate('/admin/staff/create'); 
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Manage Staff</h1>
      
      {/* Table Component */}
      <Table columns={['Name', 'Role', 'Email', 'Status']} data={staff} />

      {/* Button to Add New Staff */}
      <button 
      onClick={handleAddStaff}
      className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
        Add New Staff
      </button>
    </div>
  );
}

export default Staff;
