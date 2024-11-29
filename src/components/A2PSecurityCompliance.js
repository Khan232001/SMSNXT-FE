import React from 'react';
import { FaShieldAlt, FaRegIdCard, FaUserLock } from 'react-icons/fa';

const A2PSecurityCompliance = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">
            A2P Security & Compliance
          </h2>
        </div>

        {/* Icons Section */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Card 1: A2P Security */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-[300px]">
            <FaShieldAlt className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">A2P Security</h3>
            <p className="text-center text-sm text-gray-700">
              Compliance with A2P safeguards keeps your messages safe with robust protocols and stringent authentication measures.
            </p>
          </div>

          {/* Card 2: Dedicated Compliance Team */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-[300px]">
            <FaRegIdCard className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Dedicated Compliance Team</h3>
            <p className="text-center text-sm text-gray-700">
              Our dedicated compliance team is committed to staying ahead of industry regulations and best practices—keeping your messages safe and secure.
            </p>
          </div>

          {/* Card 3: Age-Gated Content */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-[300px]">
            <FaUserLock className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Age-Gated Content</h3>
            <p className="text-center text-sm text-gray-700">
              We ensure that only individuals of legal age have access to restricted content, such as promotions for age-restricted products or services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default A2PSecurityCompliance;
