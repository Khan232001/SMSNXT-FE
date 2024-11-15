import React from "react";
import UserNavbar from "../../components/UserNavbar";
import UserSidebar from "../../components/UserSidebar";

const Reporting = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800">
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-100">
        {/* Navbar */}
        <div className="fixed top-0 left-64 w-full z-10">
          <UserNavbar />
        </div>

        {/* Content */}
        <div className="p-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reporting</h2>

          {/* Overview Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Messages Sent */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-700">Messages Sent</h3>
              <p className="text-3xl font-semibold text-gray-800">1,230</p>
            </div>

            {/* Pending Campaigns */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-700">Pending Campaigns</h3>
              <p className="text-3xl font-semibold text-gray-800">5</p>
            </div>

            {/* Active Subscriptions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-700">Active Subscriptions</h3>
              <p className="text-3xl font-semibold text-gray-800">2</p>
            </div>
          </div>

          {/* Detailed Reporting Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold text-lg text-gray-700">Detailed Reports</h3>

            {/* Date Range Filter */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
                Filter
              </button>
            </div>

            {/* Table for Reports */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Campaign</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Sent</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Delivered</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-700">Campaign 1</td>
                    <td className="px-4 py-2 text-sm text-gray-700">2024-10-30</td>
                    <td className="px-4 py-2 text-sm text-gray-700">1,000</td>
                    <td className="px-4 py-2 text-sm text-gray-700">980</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Success</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-700">Campaign 2</td>
                    <td className="px-4 py-2 text-sm text-gray-700">2024-10-29</td>
                    <td className="px-4 py-2 text-sm text-gray-700">1,500</td>
                    <td className="px-4 py-2 text-sm text-gray-700">1,400</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Success</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-700">Campaign 3</td>
                    <td className="px-4 py-2 text-sm text-gray-700">2024-10-28</td>
                    <td className="px-4 py-2 text-sm text-gray-700">2,000</td>
                    <td className="px-4 py-2 text-sm text-gray-700">1,800</td>
                    <td className="px-4 py-2 text-sm text-gray-700">Success</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphical Report Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-700">Campaign Overview (Graphical)</h3>

            {/* Placeholder for graph (you can use a chart library like Chart.js or Recharts) */}
            <div className="h-64 bg-gray-200 mt-4 flex justify-center items-center">
              <p className="text-gray-500">Graph Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;
