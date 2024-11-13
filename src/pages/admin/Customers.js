<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';  // Import the AdminLayout component
=======
// src/pages/admin/Customers.js

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';  // Import the AdminLayout component
import './Customers.css';  // Import the page-specific CSS
>>>>>>> acd4fce (first commit)

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [reports, setReports] = useState([]);

<<<<<<< HEAD
  // Mock data fetching for now
  useEffect(() => {
    // setCustomers(mockCustomers);
    // setSubscriptions(mockSubscriptions);
    // setReports(mockReports);
  }, []);
=======
//   useEffect(() => {
//     // Mock data fetching for now
//     setCustomers(mockCustomers);
//     setSubscriptions(mockSubscriptions);
//     setReports(mockReports);
//   }, []);
>>>>>>> acd4fce (first commit)

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
<<<<<<< HEAD
    <AdminLayout> 
      <br/> <br/> <br/> 
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Customer Management</h1>
      </header>

      <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Customers</h2>
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left bg-gray-100">Name</th>
              <th className="px-4 py-2 text-left bg-gray-100">Plan</th>
              <th className="px-4 py-2 text-left bg-gray-100">Usage</th>
              <th className="px-4 py-2 text-left bg-gray-100">Status</th>
              <th className="px-4 py-2 text-left bg-gray-100">Actions</th>
=======
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
>>>>>>> acd4fce (first commit)
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
<<<<<<< HEAD
              <tr key={customer.id} className="border-b">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.plan}</td>
                <td className="px-4 py-2">{customer.usage} SMS</td>
                <td className="px-4 py-2">{customer.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleCustomerChange(customer.id, customer.status === 'Active' ? 'Inactive' : 'Active')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  >
=======
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.plan}</td>
                <td>{customer.usage} SMS</td>
                <td>{customer.status}</td>
                <td>
                  <button onClick={() => handleCustomerChange(customer.id, customer.status === 'Active' ? 'Inactive' : 'Active')}>
>>>>>>> acd4fce (first commit)
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Subscriptions</h2>
        <table className="min-w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left bg-gray-100">Customer</th>
              <th className="px-4 py-2 text-left bg-gray-100">Plan</th>
              <th className="px-4 py-2 text-left bg-gray-100">Renewal Date</th>
              <th className="px-4 py-2 text-left bg-gray-100">Status</th>
              <th className="px-4 py-2 text-left bg-gray-100">Actions</th>
=======
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
>>>>>>> acd4fce (first commit)
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
<<<<<<< HEAD
              <tr key={subscription.id} className="border-b">
                <td className="px-4 py-2">{customers.find(c => c.id === subscription.customerId)?.name}</td>
                <td className="px-4 py-2">{subscription.plan}</td>
                <td className="px-4 py-2">{subscription.renewalDate}</td>
                <td className="px-4 py-2">{subscription.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSubscriptionRenewal(subscription.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                  >
=======
              <tr key={subscription.id}>
                <td>{customers.find(c => c.id === subscription.customerId)?.name}</td>
                <td>{subscription.plan}</td>
                <td>{subscription.renewalDate}</td>
                <td>{subscription.status}</td>
                <td>
                  <button onClick={() => handleSubscriptionRenewal(subscription.id)}>
>>>>>>> acd4fce (first commit)
                    Renew Subscription
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Process Payment</h2>
        <button
          onClick={() => handlePaymentProcessing(1, 50)}
          className="px-6 py-3 mt-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
        >
          Process Payment for Customer 1 ($50)
        </button>
      </div>

      <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Sender ID Management</h2>
        <button
          onClick={() => handleSenderIdApproval('12345')}
          className="px-6 py-3 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
        >
          Approve Sender ID 12345
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
        <ul className="mt-4">
          {reports.map(report => (
            <li key={report.id} className="py-2 border-b">
=======
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
>>>>>>> acd4fce (first commit)
              {report.type} - Total Messages: {report.totalMessages}
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Customers;
