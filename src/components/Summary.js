export default function ComplianceForm() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl transition duration-500 hover:scale-105">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">1. Summary</h2>

        <div className="space-y-6 text-gray-700">
          {/* Summary Information */}
          {[
            { label: "Selected number", value: "(400) 402-0452 (Two-way SMS, MMS & Calls)" },
            { label: "Brand name", value: "BLUECATE" },
            { label: "Contact email address", value: "INFO@BLUECATE.COM" },
            { label: "Contact phone", value: "(973) 345-6784" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between p-3 bg-blue-50 rounded-md shadow-md hover:scale-105 transition">
              <span className="font-semibold">{item.label}</span>
              <span className="text-gray-600">{item.value}</span>
            </div>
          ))}

          {/* Campaign Description */}
          <div className="p-3 bg-blue-50 rounded-md shadow-md hover:scale-105 transition">
            <span className="font-semibold block">Campaign Description</span>
            <span className="text-gray-600 block mt-1">
              Marketing Product for our new launch in Chicago and Vegas areas. We send weekly marketing messages about sales and offers.
            </span>
          </div>

          {/* Opt-in Flow Description */}
          <div className="p-3 bg-blue-50 rounded-md shadow-md hover:scale-105 transition">
            <span className="font-semibold block">Opt-in Flow Description</span>
            <span className="text-gray-600 block mt-1">
              End users opt-in by visiting
              <a href="#" className="text-blue-600 underline hover:text-blue-700 ml-1">www.smsnxt.com</a>.
              SMS terms at
              <a href="#" className="text-blue-600 underline hover:text-blue-700 ml-1">www.smsnxt.com</a>.
              Privacy policy at
              <a href="#" className="text-blue-600 underline hover:text-blue-700 ml-1">www.smsnxt.com</a>.
            </span>
          </div>
        </div>

        {/* Sample Messages Section */}
        <h2 className="text-lg font-bold mt-6 mb-3 text-gray-800 text-center">Sample Messages</h2>
        <div className="space-y-3">
          {[
            "Hello, please join our marketing event. Reply STOP to opt out.",
            "Don't miss out! Exclusive offer inside. Reply STOP to opt out."
          ].map((msg, index) => (
            <div key={index} className="bg-blue-100 p-3 rounded-lg text-gray-700 hover:scale-105 transition">
              {msg}
            </div>
          ))}
        </div>

        {/* Costs and Terms */}
        <h2 className="text-lg font-bold mt-6 mb-3 text-gray-800 text-center">2. Costs and Terms</h2>
        <div className="space-y-6 text-gray-700">
          {[
            { label: "Brand registration", value: "FREE", className: "text-green-600 font-semibold" },
            { label: "Campaign vetting", value: "FREE", className: "text-green-600 font-semibold" },
            { label: "Campaign monthly fee", value: "FREE for 1 month, later $10 per month", className: "font-semibold" },
          ].map((item, index) => (
            <div key={index} className="flex justify-between p-3 bg-blue-50 rounded-md shadow-md hover:scale-105 transition">
              <span>{item.label}</span>
              <span className={item.className}>{item.value}</span>
            </div>
          ))}

          <div className="flex justify-between font-semibold mt-2 border-t pt-2">
            <span>Total</span>
            <span>$0.00 (due now)</span>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="mt-6 space-y-3 text-gray-600">
          {[
            "I agree to the $10 monthly renewal fee, deducted from my account starting 7 Mar 2025, which will go to The Campaign Registry. You can cancel at any time.",
            "I understand that incorrect or incomplete details about your brand or campaign can lead to rejection by The Campaign Registry."
          ].map((text, index) => (
            <label key={index} className="flex items-start gap-2">
              <input type="checkbox" className="h-5 w-5 mt-1 text-blue-600 border-gray-300 rounded transition hover:scale-110" />
              <span>{text}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap justify-between gap-4">
          <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md transition hover:bg-gray-400 hover:scale-105">
            Back
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md transition hover:bg-blue-700 hover:scale-105">
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );
}
