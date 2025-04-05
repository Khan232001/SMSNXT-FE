// src/components/AdminLayout.js

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './AdminSidebar';
import './AdminLayout.css';  // Layout-specific styles

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-content">
        <Sidebar />
        <main className="main-content">
          {children}  {/* This will render page-specific content */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
