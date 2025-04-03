// src/components/AdminLayout.js

import React, { useState } from 'react';
import Navbar from './Navbar';
import AdminSidebar from "../components/AdminSidebar";
import './AdminLayout.css';  // Layout-specific styles

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(!collapsed);
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-content">
      <AdminSidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <main className="main-content">
          {children}  {/* This will render page-specific content */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
