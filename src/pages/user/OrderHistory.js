import React, { useState } from 'react';
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";

const OrderHistory = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    { id: 1, orderNumber: 'ORD12345', date: '2024-11-14', status: 'Completed', total: 250.00 },
    { id: 2, orderNumber: 'ORD12346', date: '2024-11-12', status: 'Pending', total: 150.00 },
    { id: 3, orderNumber: 'ORD12347', date: '2024-11-10', status: 'Cancelled', total: 100.00 },
    { id: 4, orderNumber: 'ORD12348', date: '2024-11-08', status: 'Completed', total: 200.00 },
    { id: 5, orderNumber: 'ORD12349', date: '2024-11-05', status: 'Pending', total: 350.00 },
  ]);

  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter orders by status
  const filteredOrders = selectedStatus === 'All' ? orders : orders.filter(order => order.status === selectedStatus);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <Navbar /> <br/> <br/> <br/>

        {/* Order History Content */}
        <div className="container mx-auto p-6 flex-1">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Order History</h2>
            <div className="flex items-center space-x-4">
              <label htmlFor="status" className="text-sm text-gray-600">Filter by Status:</label>
              <select
                id="status"
                className="p-2 border border-gray-300 rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Order Number</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
