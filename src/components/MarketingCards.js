import React, { useState } from "react";
import { motion } from "framer-motion";

const MarketingCards = () => {
  const [zoomedCard, setZoomedCard] = useState(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            Elevate Your SMS Marketing 🚀
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Engage customers with full-screen, high-quality visuals & animations.
          </p>
        </div>

        {/* Marketing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardsData.map((card, index) => (
            <motion.div
              key={index}
              className={`relative p-6 rounded-2xl shadow-lg cursor-pointer bg-white transition-all 
                ${zoomedCard === index ? "scale-110 z-50 shadow-2xl" : "hover:scale-105"}`}
              onClick={() => setZoomedCard(zoomedCard === index ? null : index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <span className={`text-white p-3 rounded-full ${card.iconBg}`}>
                  <i className={`${card.icon} text-2xl`}></i>
                </span>
                <span className="ml-4 text-2xl font-semibold text-gray-800">
                  {card.title}
                </span>
              </div>
              <p className="text-gray-700 mb-4 text-lg">{card.description}</p>

              {/* Full-Width High-Resolution Image */}
              <motion.div className="rounded-xl overflow-hidden border border-gray-300 shadow-md w-full">
        <img
          src={card.image}
          alt="Marketing Preview"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </motion.div>
  ))}  {/* <-- Correctly closed .map() function */}
</div>
</div>
    </section>
  );
};

const cardsData = [
  {
    title: "Retail SMS Marketing",
    description: "Join our mobile club & get 20% off! Show this text for an extra coupon.",
    icon: "fas fa-tag",
    iconBg: "bg-blue-600",
    image: "https://www.firetext.co.uk/blog/wp-content/uploads/2020/06/SMS-marketing-for-retailers-after-Covid-3.png",
  },
  {
    title: "School SMS Alerts",
    description: "Reminder: Tomorrow is a minimum day. Pick up kids by 12 noon!",
    icon: "fas fa-school",
    iconBg: "bg-green-600",
    image: 'https://media.gatsia.com/unsafe/fit-in/437x0/filters:format(png):quality(80)/bucket-prod.jecreemavitrine.fr/uploads/sites/151/2023/11/Image-5.png',
  },
  {
    title: "E-Commerce Sales SMS",
    description: "Get 20% off Apple accessories! Use code APW20 at checkout.",
    icon: "fas fa-shopping-cart",
    iconBg: "bg-purple-600",
    image: "https://blog.wishpond.com/wp-content/uploads/2020/03/image2-6.png.webp",
  },
  {
    title: "Restaurant Promotions",
    description: "Happy Hour! Show this text to get $2 off any craft beer on tap.",
    icon: "fas fa-utensils",
    iconBg: "bg-yellow-600",
    image: "https://blog.wishpond.com/wp-content/uploads/2020/03/image2-6.png.webp",
  },
  {
    title: "Appointment Reminders",
    description: "Reminder: Dentist appointment at 12 PM tomorrow. Don't be late!",
    icon: "fas fa-calendar-check",
    iconBg: "bg-orange-600",
    image: "https://lh7-us.googleusercontent.com/NKyIw7X5eamfIun9Lfg6-Xzdtl7zPDNSg-UYGsCHw3K-tdpzC3qt5mQ7wP_3GCHn2JVpi8xgoDHyh73CJOfthCTPBQgYtsq54Ofd1vMvF1HNVSlPEjMlHoL3-xNb5rmJp1DeMqBhhbZlyy1GZfIKgiI",
  },
  {
    title: "Real Estate SMS Leads",
    description: "Home prices are rising! Get an instant valuation of your home now.",
    icon: "fas fa-home",
    iconBg: "bg-teal-600",
    image: "https://leadferno.com/wp-content/uploads/sales-follow-up-text.png",
  },
];

export default MarketingCards;
