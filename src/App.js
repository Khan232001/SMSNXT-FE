import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/UserDashboard';
import Campaigns from './pages/admin/Campaigns';
import Customers from './pages/admin/Customers';
import Order from './pages/admin/Orders';
import Payments from './pages/admin/Payments';
import Plans from './pages/admin/Plans';
import Reports from './pages/admin/Reports';
import SenderIDs from './pages/admin/SenderIDs';
import Login from './pages/user/Login';
import Home from './pages/Home';
import Pricing from './pages/user/Pricing';
import Contact from './pages/user/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/senderids" element={<SenderIDs />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/plans" element={<Plans />} />
        <Route path="/admin/payments" element={<Payments />} />
        <Route path="/admin/Campaigns" element={<Campaigns />} />
        <Route path="/admin/Customers" element={<Customers />} />
        <Route path="/admin/orders" element={<Order />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
