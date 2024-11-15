import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/Dashboard';
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
import NotFound from './pages/NotFound';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SubscriptionPlans from './pages/user/SubscriptionPlans';
import OrderHistory from './pages/user/OrderHistory';
import CampaignManagement from './pages/user/CampaignManagement';
import ContactManagement from './pages/user/ContactManagement';
import Reporting from './pages/user/Reporting';
import Messaging from './pages/user/Messaging';
import SenderIDManagement from './pages/user/SenderIDManagement';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle Sidebar for small screens
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Router>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/subscription-plans" element={<SubscriptionPlans />} />
            <Route path="/order-recharge-history" element={<OrderHistory />} />
            <Route path="/campaign-management" element={<CampaignManagement />} />
            <Route path="/contact-management" element={<ContactManagement />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/quick-group-messaging" element={<Messaging />} />
            <Route path="/sender-id-management" element={<SenderIDManagement />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/senderids" element={<SenderIDs />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/plans" element={<Plans />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/campaigns" element={<Campaigns />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/orders" element={<Order />} />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
  );
}

export default App;
