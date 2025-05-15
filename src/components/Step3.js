import React from 'react';
import { Briefcase, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Search,
    UserPlus,
    Facebook,
    Rocket, 
    Music,
    Globe,
    Linkedin,
    AppWindow,
    Megaphone,
  } from 'lucide-react';
  
  const options = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: 'Search',
      description: 'You discovered SMSNXT through a search engine like Google or Bing.',
    },
    {
      icon: <UserPlus className="h-8 w-8 text-green-600" />,
      title: 'Friend/Colleague',
      description: 'A friend, colleague, or contact personally recommended SMSNXT.',
    },
    {
      icon: <Facebook className="h-8 w-8 text-blue-700" />,
      title: 'Facebook',
      description: 'You found SMSNXT while browsing or interacting on Facebook.',
    },
    {
      icon: <Rocket className="h-8 w-8 text-red-500" />,
      title: 'Reddit',
      description: 'SMSNXT was mentioned in a post or comment on Reddit.',
    },
    {
      icon: <Music className="h-8 w-8 text-pink-500" />,
      title: 'Tiktok',
      description: 'You came across SMSNXT through a video or ad on TikTok.',
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: '3rd Party Site',
      description: 'A blog, article, or website mentioned SMSNXT as a useful tool.',
    },
    {
      icon: <Linkedin className="h-8 w-8 text-blue-500" />,
      title: 'LinkedIn',
      description: 'You found SMSNXT via LinkedIn content or professional recommendation.',
    },
    {
      icon: <AppWindow className="h-8 w-8 text-gray-600" />,
      title: 'App Store',
      description: 'You discovered SMSNXT while browsing an app store.',
    },
    {
      icon: <Megaphone className="h-8 w-8 text-yellow-500" />,
      title: 'Ads',
      description: 'You saw a banner, video, or display ad for SMSNXT.',
    },
  ];
  

const Step3 = () => {
  return (
    <div className="px-4 sm:px-8">
      <div className="text-center mb-8">
        <span className="text-sm font-semibold text-gray-500">STEP 3 OF 3</span>
        <h1 className="text-3xl font-bold mt-2">How did you hear about Us?</h1>
        <p className="text-gray-600 mt-2">
          Let us know how you plan to use SMSNXT so we can tailor your experience accordingly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 l transition duration-300 border border-gray-100  hover:shadow-xl transform hover:-translate-y-1
    hover:border-black"
          >
            <div className="mb-4">{option.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
            <p className="text-gray-500">{option.description}</p>
          </div>
        ))}
      </div>
      <Link to ='/lastpage'>
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

export default Step3;
