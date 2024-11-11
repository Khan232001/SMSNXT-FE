// src/pages/admin/Customers.js

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';  // Import the AdminLayout component
import './Customers.css';  // Import the page-specific CSS

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [reports, setReports] = useState([]);

//   useEffect(() => {
//     // Mock data fetching for now
//     setCustomers(mockCustomers);
//     setSubscriptions(mockSubscriptions);
//     setReports(mockReports);
//   }, []);

  const handleCustomerChange = (id, status) => {
    setCustomers(prevState =>
      prevState.map(customer =>
        customer.id === id ? { ...customer, status } : customer
      )
    );
  };

  const handleSubscriptionRenewal = (id) => {
    setSubscriptions(prevState =>
      prevState.map(sub =>
        sub.id === id ? { ...sub, renewalDate: new Date().toLocaleDateString(), status: 'Active' } : sub
      )
    );
  };

  const handlePaymentProcessing = (customerId, amount) => {
    alert(`Payment of $${amount} processed for customer ID ${customerId}`);
  };

  const handleSenderIdApproval = (senderId) => {
    alert(`Sender ID ${senderId} approved.`);
  };

  return (
    <AdminLayout> <br/> <br/> <br/> 
      <header className="top-header">
        <h1>Customer Management</h1>
      </header>

      <div className="card">
        <h2>Customers</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.plan}</td>
                <td>{customer.usage} SMS</td>
                <td>{customer.status}</td>
                <td>
                  <button onClick={() => handleCustomerChange(customer.id, customer.status === 'Active' ? 'Inactive' : 'Active')}>
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Subscriptions</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Plan</th>
              <th>Renewal Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.id}>
                <td>{customers.find(c => c.id === subscription.customerId)?.name}</td>
                <td>{subscription.plan}</td>
                <td>{subscription.renewalDate}</td>
                <td>{subscription.status}</td>
                <td>
                  <button onClick={() => handleSubscriptionRenewal(subscription.id)}>
                    Renew Subscription
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Process Payment</h2>
        <button onClick={() => handlePaymentProcessing(1, 50)}>Process Payment for Customer 1 ($50)</button>
      </div>

      <div className="card">
        <h2>Sender ID Management</h2>
        <button onClick={() => handleSenderIdApproval('12345')}>Approve Sender ID 12345</button>
      </div>

      <div className="card">
        <h2>Reports</h2>
        <ul>
          {reports.map(report => (
            <li key={report.id}>
              {report.type} - Total Messages: {report.totalMessages}
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Customers;
