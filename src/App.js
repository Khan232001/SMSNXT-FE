import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/Dashboard";
import Campaigns from "./pages/admin/Campaigns";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Payments from "./pages/admin/Payments";
import Plans from "./pages/admin/Plans";
import Reports from "./pages/admin/Reports";
import SenderIDs from "./pages/admin/SenderIDs";
import Login from "./pages/user/Login";
import Home from "./pages/Home";
import Pricing from "./pages/user/Pricing";
import Contact from "./pages/user/Contact";
import NotFound from "./pages/NotFound";
import SubscriptionPlans from "./pages/user/SubscriptionPlans";
import SubscriptionPricing from "./pages/user/subscriptionPricing";
import OrderHistory from "./pages/user/OrderHistory";
import CampaignManagement from "./pages/user/CampaignManagement";
import ContactManagement from "./pages/user/ContactManagement";
import TagsManagement from "./pages/user/TagsManagement";
import Reporting from "./pages/user/Reporting";
import SenderIDManagement from "./pages/user/SenderIDManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import Settings from "./pages/admin/Settings";
import SmsGateway from "./pages/admin/SmsGateway";
import Terms from "./pages/user/Terms";
import Policy from "./pages/user/Policy";
import SignUp from "./pages/SignUp";
import PaymentForm from "./pages/user/PaymentForm";
import ThankYou from "./pages/user/ThankYou";
import StaffManagement from "./pages/admin/StaffManagement";
import CampaignManagementAdmin from "./pages/admin/CampaignManagement";
import TagsManagementAdmin from "./pages/admin/TagsManagement";
import ContactManagementAdmin from "./pages/admin/ContactManagement";

// Components

import Templates from "./components/Templates";
import UserLayout from "./layout/UserLayout";
import ChatMessage from "./pages/user/ChatMessage";
import { Schedule } from "@mui/icons-material";
import ScheduledMessages from "./components/ScheduledMessages";

// Stripe Setup
const stripePromise = loadStripe("your-publishable-key-here");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="subscription-plans" element={<SubscriptionPlans />} />
            <Route path="subscription-pricing" element={<SubscriptionPricing />} />
            <Route path="order-recharge-history" element={<OrderHistory />} />
            <Route path="campaign-management" element={<CampaignManagement />} />
            <Route path="contact-management" element={<ContactManagement />} />
            <Route path="tags-management" element={<TagsManagement />} />
            <Route path="reporting" element={<Reporting />} />
            <Route path="sender-id-management" element={<SenderIDManagement />} />
            <Route path="payment" element={<PaymentForm />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="terms" element={<Terms />} />
            <Route path="policy" element={<Policy />} />
            <Route path="signup" element={<SignUp />} />

            {/* Messaging Nested Routes */}
           
            <Route path="messaging" >
              <Route index element={<ChatMessage />} />
         
              <Route path="templates" element={<Templates />} />
              <Route path="scheduled" element={<ScheduledMessages/>}/>
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route path="/admin">
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="senderids" element={<SenderIDs />} />
            <Route path="reports" element={<Reports />} />
            <Route path="plans" element={<Plans />} />
            <Route path="payments" element={<Payments />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="staff-management" element={<StaffManagement />} />
            <Route path="campaign-management" element={<CampaignManagementAdmin />} />
            <Route path="system-settings" element={<Settings />} />
            <Route path="sms-gateway" element={<SmsGateway />} />
            <Route path="tags-management" element={<TagsManagementAdmin />} />
            <Route path="contact-management" element={<ContactManagementAdmin />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
