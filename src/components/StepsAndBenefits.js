import React from "react";
import {
  PhoneIcon,
  UsersIcon,
  ChatIcon,
  CloudIcon,
  CheckCircleIcon,
  UserGroupIcon,
  CogIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";

const StepsAndBenefits = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Supercharge Your <span className="text-yellow-300">SMS Marketing</span>
        </motion.h2>
        <motion.p
          className="text-lg opacity-90 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Drive engagement and conversions with our AI-powered messaging solutions.
        </motion.p>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
        {[
          {
            icon: <PhoneIcon className="h-14 w-14 text-yellow-300 mb-4" />, 
            title: "Step 1 - Secure Trusted Number",
            text: "Get a trusted, textable number within 1 business day with our strong carrier relationships.",
          },
          {
            icon: <UsersIcon className="h-14 w-14 text-yellow-300 mb-4" />, 
            title: "Step 2 - Build Attentive Audience",
            text: "Grow your contact list using QR codes, Keywords, and embedded sign-up forms.",
          },
          {
            icon: <ChatIcon className="h-14 w-14 text-yellow-300 mb-4" />, 
            title: "Step 3 - Craft Effective Texts",
            text: "Create high-converting SMS & MMS messages with AI-powered tools.",
          },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg text-blue-900 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {step.icon}
            <h3 className="text-xl font-bold mb-3 text-blue-800">{step.title}</h3>
            <p className="text-gray-700 text-center">{step.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {[
          { icon: <CheckCircleIcon className="h-14 w-14 text-yellow-300 mb-4" />, title: "No Hidden Fees", text: "Transparent pricing with zero hidden charges." },
          { icon: <CogIcon className="h-14 w-14 text-yellow-300 mb-4" />, title: "Opt-In Tools", text: "Easily grow your audience with intuitive opt-in tools." },
          { icon: <UserGroupIcon className="h-14 w-14 text-yellow-300 mb-4" />, title: "Unlimited Contacts", text: "No limits on the number of contacts you can store." },
          { icon: <BellIcon className="h-14 w-14 text-yellow-300 mb-4" />, title: "Contact Management", text: "Effortlessly manage and segment your contacts." },
          { icon: <CloudIcon className="h-14 w-14 text-yellow-300 mb-4" />, title: "Message Automations", text: "Automate SMS campaigns and keep your audience engaged." },
        ].map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg text-blue-900 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {benefit.icon}
            <h3 className="text-lg font-bold mb-3 text-blue-800">{benefit.title}</h3>
            <p className="text-gray-700 text-center">{benefit.text}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-16">
        <motion.button
          className="bg-yellow-400 text-blue-900 px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started Today
        </motion.button>
      </div>
    </section>
  );
};

export default StepsAndBenefits;
