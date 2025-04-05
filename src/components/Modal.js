import { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-0">
      <div className="max-w-3xl w-full bg-gray-200 text-black rounded-lg p-6 md:p-8 shadow-lg flex flex-col items-center">
        
        {/* Compliance Section */}
        <div className="flex flex-col items-center w-full mt-4 text-center">
          <span className="text-green-600 font-bold text-lg">100% Compliance</span>
          <div className="w-40 border-t border-black my-2"></div>
          <span className="text-gray-600 text-sm">with industry-wide application</span>
        </div>
        
        <h1 className="text-black font-bold text-center text-2xl mt-4">
          Get Started with 10DLC Registration
        </h1>
        
        <h2 className="font-bold mt-6 self-start">What is 10DLC Registration?</h2>
        <p className="mt-3 text-justify text-sm md:text-base">
          10DLC (10-Digit Long Code) registration is a compliance process
          required by mobile carriers in the U.S. for businesses that send SMS
          or MMS messages to customers. It ensures that messages are legitimate
          and reduces spam, improving delivery rates and trust.
        </p>
        
        <h3 className="font-bold mt-5 self-start">Why do I need it?</h3>
        <p className="mt-3 text-justify text-sm md:text-base">
          10DLC registration is required to comply with carrier regulations,
          prevent message filtering, and ensure better deliverability for your
          business texts. It also helps establish trust with mobile carriers and
          reduces the risk of penalties or blocked messages.
        </p>
        
        {/* Internship Logos */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {internshipsData.map((internship) => (
            <div key={internship.id} className="flex flex-col items-center w-24">
              <img
                src={internship.image}
                alt={internship.title}
                className="w-16 h-10 object-contain mb-2"
              />
              <span className="text-sm font-medium text-center">{internship.title}</span>
            </div>
          ))}
        </div>
        
        <h4 className="font-bold mt-5 self-start">What else do I need to know?</h4>
        <ul className="mt-3 space-y-2 self-start list-disc pl-5 text-sm md:text-base">
          <li>✅ 10DLC registration is mandatory for business texting in the U.S.</li>
          <li>✅ Unregistered messages may be blocked or face higher fees.</li>
          <li>✅ You need to provide your business details for registration.</li>
          <li>✅ Registration improves message deliverability and reduces spam filtering.</li>
          <li>✅ Different carriers may have varying rules and fees for 10DLC.</li>
        </ul>
        
        <div className="flex justify-center w-full mt-6">
        <Link to='/businesspage'>
          <button className="bg-green-700 text-white h-10 px-6 rounded-lg hover:bg-green-800 text-sm md:text-base">
            Proceed to Registration
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
