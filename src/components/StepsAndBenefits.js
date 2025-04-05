import React from "react";
import { PhoneIcon, UsersIcon, ChatIcon, CloudIcon, CheckCircleIcon, UserGroupIcon, CogIcon, BellIcon } from '@heroicons/react/outline';

const StepsAndBenefits = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Accelerate Your Text Message Marketing
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Step 1: Secure Trusted Number */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <PhoneIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Step 1 - Secure Trusted Number</h3>
            <p className="text-gray-700 text-center">
              Own a textable number within 1 business day thanks to EZ Texting’s long-standing and trusted relationship with wireless carriers.
            </p>
          </div>

          {/* Step 2: Build Attentive Audience */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <UsersIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Step 2 - Build Attentive Audience</h3>
            <p className="text-gray-700 text-center">
              Grow an engaged text marketing contact list with QR codes, embedded sign-up forms, Keywords, and Team Inbox.
            </p>
          </div>

          {/* Step 3: Craft Effective Texts */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <ChatIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Step 3 - Craft Effective Texts</h3>
            <p className="text-gray-700 text-center">
              Engage contacts with SMS and MMS that delight and drive action, powered by AI Compose, smart scheduling, and a free image gallery and editor.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Benefit 1: No Hidden Fees */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <CheckCircleIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-4 text-blue-600">No Hidden Fees</h3>
            <p className="text-gray-700 text-center">No surprise charges. Transparent pricing with no hidden fees.</p>
          </div>

          {/* Benefit 2: Opt-In Tools */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <CogIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Opt-In Tools</h3>
            <p className="text-gray-700 text-center">Use our easy-to-use opt-in tools to grow your audience.</p>
          </div>

          {/* Benefit 3: Unlimited Contacts */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <UserGroupIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Unlimited Contacts</h3>
            <p className="text-gray-700 text-center">No limits on the number of contacts you can add to your list.</p>
          </div>

          {/* Benefit 4: Contact Management */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <BellIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Contact Management</h3>
            <p className="text-gray-700 text-center">Effortlessly manage your contacts with our simple dashboard.</p>
          </div>

          {/* Benefit 5: Message Automations */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <CloudIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Message Automations</h3>
            <p className="text-gray-700 text-center">Automate your messaging to keep your audience engaged effortlessly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsAndBenefits;
