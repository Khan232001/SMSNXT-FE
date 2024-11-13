import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Logo and Description */}
        <div className="mb-8">
          <p className="text-lg font-semibold">Global Leader in Chat Commerce</p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-xl">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">SMS</a></li>
              <li><a href="#" className="hover:text-blue-500">WhatsApp</a></li>
              <li><a href="#" className="hover:text-blue-500">USSD</a></li>
              <li><a href="#" className="hover:text-blue-500">Advanced Messaging</a></li>
              <li><a href="#" className="hover:text-blue-500">Clickatell AI</a></li>
              <li><a href="#" className="hover:text-blue-500">Chat Flow</a></li>
              <li><a href="#" className="hover:text-blue-500">Chat Desk</a></li>
            </ul>
          </div>

          {/* Solutions by Industry */}
          <div>
            <h4 className="font-semibold mb-4 text-xl">Solutions by Industry</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">Retail</a></li>
              <li><a href="#" className="hover:text-blue-500">Airline</a></li>
              <li><a href="#" className="hover:text-blue-500">Travel</a></li>
              <li><a href="#" className="hover:text-blue-500">Banking</a></li>
              <li><a href="#" className="hover:text-blue-500">Technology</a></li>
              <li><a href="#" className="hover:text-blue-500">Health and Wellness</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-xl">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-500">Developer Docs</a></li>
              <li><a href="#" className="hover:text-blue-500">Demo Center</a></li>
              <li><a href="#" className="hover:text-blue-500">SMS Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-xl">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="hover:text-blue-500">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500">Press and Media</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-700">
          <p>&copy; 2024 BYT. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="hover:text-blue-500">Privacy Policy</a> | <a href="#" className="hover:text-blue-500">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
