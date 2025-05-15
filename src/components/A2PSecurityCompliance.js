import React from 'react';
import { FaShieldAlt, FaRegIdCard, FaUserLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

const A2PSecurityCompliance = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">A2P Security & Compliance</h2>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: A2P Security */}
          <motion.div
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <FaShieldAlt className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">A2P Security</h3>
            <p className="text-center text-gray-600">
              Compliance with A2P safeguards keeps your messages safe with robust protocols and stringent authentication measures.
            </p>
          </motion.div>

          {/* Card 2: Dedicated Compliance Team */}
          <motion.div
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <FaRegIdCard className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Dedicated Compliance Team</h3>
            <p className="text-center text-gray-600">
              Our dedicated compliance team stays ahead of industry regulations and best practices—keeping your messages secure.
            </p>
          </motion.div>

          {/* Card 3: Age-Gated Content */}
          <motion.div
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <FaUserLock className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Age-Gated Content</h3>
            <p className="text-center text-gray-600">
              We ensure only individuals of legal age access restricted content, such as promotions for age-restricted products or services.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default A2PSecurityCompliance;
