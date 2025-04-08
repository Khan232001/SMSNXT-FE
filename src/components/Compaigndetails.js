import { useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [selectedUseCase, setSelectedUseCase] = useState("");

  const handleChange = (event) => {
    setSelectedUseCase(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <div className="max-w-3xl w-full bg-white text-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-yellow-600 font-bold text-3xl mb-4">Step 2: Campaign Details</h1>
        <p className="text-gray-700 mb-6">
          Describe your text messaging campaign (use case), its purpose, and recipients.
        </p>
        
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Campaign Details <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        <label className="block text-lg font-semibold text-gray-700 mb-2 mt-6">
          Describe your texting use case in detail <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        <p className="mt-4 text-gray-600">
          The description should include who the sender is, who the recipients are, and why messages are being sent.
        </p>
        
        <div className="bg-red-100 text-red-600 p-4 mt-4 rounded-lg flex items-center gap-2 border border-red-400">
          <span className="font-bold">Warning:</span>
          <p>
            The description should include who the sender is, who the recipients are, and why messages are being sent.
          </p>
        </div>
        
        <div className="flex justify-center mt-6">
        <Link to ='/samplemessages'>
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-800 transition-all font-semibold text-lg">
            Save & Continue
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
