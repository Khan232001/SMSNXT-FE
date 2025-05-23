import React from 'react';
import { Briefcase, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
const options = [
  {
    icon: <Briefcase className="h-10 w-10 text-blue-600" />,
    title: 'Business Communication',
    description: 'Use SMSNXT to streamline your customer communication and boost engagement.',
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-green-600" />,
    title: 'Personal Messaging',
    description: 'Send messages to friends and family with ease and reliability.',
  },
  {
    icon: <Users className="h-10 w-10 text-purple-600" />,
    title: 'Community Building',
    description: 'Create and manage groups to stay connected with your community.',
  },
];

const Step1 = () => {
  return (
    <div className="px-4 sm:px-8">
      <div className="text-center mb-8">
        <span className="text-sm font-semibold text-gray-500">STEP 1 OF 4</span>
        <h1 className="text-3xl font-bold mt-2">What are you here to do?</h1>
        <p className="text-gray-600 mt-2">
          Let us know how you plan to use SMSNXT so we can tailor your experience accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="mb-4">{option.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>
     <Link to='/step2'>
      <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all shadow-md mt-10"
            >
              Continue
            </button>
            </Link>  
    </div>
  );
};

export default Step1;
