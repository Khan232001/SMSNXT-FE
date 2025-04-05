import { useState } from "react";

const internshipsData = [
  {
    id: 1,
    title: "Uber",
    image: "https://static-00.iconduck.com/assets.00/uber-icon-1024x1024-du697sau.png",
  },
  {
    id: 2,
    title: "Amazon",
    image: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.jpg",
  },
  {
    id: 3,
    title: "Doordash",
    image: "https://typetype.org/wp-content/uploads/Doordash_1-1536x1536.png",
  },
];

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 px-4">
      <div className="w-full max-w-2xl bg-white text-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800">
          Tell Us About Yourself
        </h1>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="John Doe"
            />
          </div>

          {/* Mobile Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Mobile Phone Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="+1 234 567 890"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="My Awesome Startup"
            />
          </div>

          {/* Website or Social Media */}
          <div>
            <label className="block text-sm font-medium mb-1">Website or Social Media Link</label>
            <input
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="California"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all shadow-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
