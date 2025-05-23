import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthProvider } from "./context/AuthContext";
import { TagsProvider } from "./context/TagsContext"; // Import the TagsProvider

// Pages (imports remain the same)
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

// Components (imports remain the same)
import Templates from "./components/Templates";
import UserLayout from "./layout/UserLayout";
import ChatMessage from "./pages/user/ChatMessage";
import ScheduledMessages from "./components/ScheduledMessages";
import Conversations from "./components/Conversations";
import ChatWindow from "./components/ChatWindow";
import WelcomePage from "./components/Welcome";
import Welcome from "./components/Welcome";
import Modal from "./components/Modal";
import Businesspage from "./components/Businesspage";
import Usecase from "./components/Usecase";
import Compaigndetails from "./components/Compaigndetails";
import Samplemessages from "./components/Samplemessages";
import Summary from "./components/Summary";
import Signupquest from "./components/Signupquest";
import Otpverify from "./components/Otpverify";
import WelcomeSMSNXT from "./components/WelcomeSMSNXT";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Lastthing from "./components/Lastthing";
import Intro from "./components/Intro";
import Lastpage from './components/Lastpage';
import { ContactsProvider } from "./context/ContactsContext";

// Stripe Setup
const stripePromise = loadStripe("your-publishable-key-here");

function App() {
  const [collapsed, setCollapsed] = useState(false);

  function handleCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <AuthProvider>
          <TagsProvider> 
            <ContactsProvider>
            <Routes>
              {/* Auth Routes */}
              <Route path="sign" element={<SignUp />} />
              <Route path="login" element={<Login />} />

              <Route index element={<Home />} />
              <Route
                path="/"
                element={<UserLayout collapsed={collapsed} toggleCollapse={handleCollapse} />}
              >
                <Route index path="getting-started" element={<Welcome />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="compose" element={<ChatMessage />} />
                <Route path="templates" element={<Templates />} />
                <Route path="contact" element={<Contact />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="subscription-plans" element={<SubscriptionPlans />} />
                <Route path="subscription-pricing" element={<SubscriptionPricing />} />
                <Route path="order-recharge-history" element={<OrderHistory />} />
                <Route path="campaign" element={<CampaignManagement />} />
                <Route path="contact-management" element={<ContactManagement />} />
                <Route path="tags-management" element={<TagsManagement />} />
                <Route path="reporting" element={<Reporting />} />
                <Route path="sender-id-management" element={<SenderIDManagement />} />
                <Route path="payment" element={<PaymentForm />} />
                <Route path="thank-you" element={<ThankYou />} />
                <Route path="terms" element={<Terms />} />
                <Route path="policy" element={<Policy />} />
                <Route path="/modal" element={<Modal />} />
                <Route path="/businesspage" element={<Businesspage />} />
                <Route path="/usecase" element={<Usecase />} />
                <Route path="/Compaigndetails" element={<Compaigndetails />} />
                <Route path="/samplemessages" element={<Samplemessages />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/signupquest" element={<Signupquest />} />
                <Route path="/otpverify" element={<Otpverify />} />
                <Route path="/welcomesmsnxt" element={<WelcomeSMSNXT />} />
                <Route path="/step1" element={<Step1 />} />
                <Route path="/step2" element={<Step2 />} />
                <Route path="/step3" element={<Step3 />} />
                <Route path="/lastthing" element={<Lastthing />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/lastpage" element={<Lastpage />} />

                {/* Messaging Nested Routes */}
                <Route path="messaging">
                  <Route index element={<Conversations />} />
                  <Route path="open" element={<ChatWindow />} />
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
            </ContactsProvider>
          </TagsProvider>
        </AuthProvider>
      </Router>
    </Elements>
  );
}

export default App;