import { useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [selectedUseCase, setSelectedUseCase] = useState("");

  const handleChange = (event) => {
    setSelectedUseCase(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <div className="max-w-3xl w-full bg-white text-gray-800 rounded-2xl p-8 shadow-2xl font-poppins">
        <h1 className="text-yellow-600 font-bold text-3xl mb-4 ">Step 3: Sample Messages</h1>
        <p className="text-gray-700 mb-6">
          Provide 2-5 examples of the messages u will send (Aligned with the selected use cases)
        </p>
        <ul className="mt-3 space-y-2 self-start list-disc pl-5">
          <li>✅ 10DLC registration is mandatory for business texting in the U.S.</li>
          <li>✅ Unregistered messages may be blocked or face higher fees.</li>
          <li>✅ You need to provide your business details for registration.</li>
          <li>✅ Registration improves message deliverability and reduces spam filtering.</li>
          <li>✅ Different carriers may have varying rules and fees for 10DLC.</li>
        </ul>
        
        <label className="block text-lg font-semibold text-gray-700 mb-2 mt-3">
        Sample Messages 1  <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        <label className="block text-lg font-semibold text-gray-700 mb-2 mt-6">
        Sample Messages 2 <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        <p className="mt-4 text-gray-600">
          The description should include who the sender is, who the recipients are, and why messages are being sent.
        </p>
        
        <div className="bg-blue-200 text-black p-4 mt-4 rounded-lg gap-2 border border-red-400">
             <input type="checkbox" className="mt-1 h-6 w-6" />
             <div>
          <span className="font-bold ml-4 mt-4">Example:</span>
          <p>
          10DLC (10-Digit Long Code) registration is a compliance process required by mobile carriers in the U.S. for businesses that send SMS or MMS messages to customers. It ensures that messages are legitimate and reduces spam, improving delivery rates and trust.
          </p>
        </div>
        </div>
        <div className="bg-blue-200 text-black p-4 mt-4 rounded-lg gap-2 border border-red-400">
        <input type="checkbox" className="mt-1 h-6 w-6" />
        <div>
          <h2 className="font-bold">Will your messages include a URL Link?:</h2>
          <p className="mt-2">
          If yes, please select the checkbox, and include links in the sample messages.
          Note: public URL shorteners (bit.ly, tinyURL) are not allowed.
          </p>
          </div>
        </div>
        <div className="bg-blue-200 text-black p-4 mt-4 rounded-lg border border-red-400">
        <input type="checkbox" className="mt-1 h-6 w-6" />
        <div>
        <h2 className="font-bold">Will your messages include a Phone Number?</h2>
        <p>
        Except for the required HELP information contact number. If yes, please
        select the checkbox, and include the phone number in the sample messages.
        </p>
      </div>
      </div>
      
        <div className="flex justify-center mt-6">
          <Link to ='/summary'>
          <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-800 transition-all font-semibold text-lg">
            Save & Continue
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
