import React from 'react';
import { FaFileAlt, FaImages, FaPlayCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Resource Data
const resources = {
  Guides: [
    {
      title: "SMS Marketing 101",
      description: "Learn the basics of SMS marketing and how it can boost engagement.",
      imageUrl: "https://img.targetbay.com/images/live/2023/02/13012152/banner.jpg",
    },
    {
      title: "Best Practices for SMS Campaigns",
      description: "Discover key strategies for creating effective SMS campaigns.",
      imageUrl: "https://textdrip.com/wp-content/uploads/2024/07/best-practices-for-sms-marketing-campaigns-that-convert-669e298dee478-1.webp",
    },
  ],
  Articles: [
    {
      title: "Why SMS Marketing Works Better Than Email",
      description: "Explore the advantages of SMS marketing over email campaigns.",
      imageUrl: "https://d7networks.com/media/images/SMS_Marketing_vs._Email_Marketing_Why_SMS.max-1000x3000.webp",
    },
    {
      title: "5 Ways to Increase Conversions with SMS",
      description: "Practical tips to drive customer engagement and sales.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy4SvRHLyXQusu2wMak_Cc66e-ag3pcmwf0Q&s",
    },
  ],
  Videos: [
    {
      title: "Getting Started with SMS Marketing",
      description: "Step-by-step guide to launching your first SMS campaign.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageUrl: "https://cdn.prod.website-files.com/656ac26f3a3f6e1cc08ba7a5/6581926fa2ce38dc25c37091_your-guide-to-getting-started-with-sms-marketing.svg",
    },
    {
      title: "Optimizing Your SMS Open Rates",
      description: "Best practices to ensure your messages get read.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFkSSqpJtwW_PzHP3ZzhDd7RekK4uMSbx8_w&s",
    },
  ],
};

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const TextMarketingResources = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">Text Marketing Resources</h2>
          <p className="text-gray-300 mt-2">Discover guides, articles, and videos to enhance your SMS marketing strategies.</p>
        </motion.div>

        {/* Resource Sections */}
        <motion.div className="space-y-12" variants={containerVariants} initial="hidden" animate="visible">
          {Object.entries(resources).map(([category, items], index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-xl w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Title */}
              <h3 className="text-2xl font-semibold mb-6 text-indigo-600">{category}</h3>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-md transform transition hover:-translate-y-2 hover:shadow-xl"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    {/* Icons */}
                    {category === "Guides" && <FaFileAlt className="text-5xl text-indigo-400 mb-4" />}
                    {category === "Articles" && <FaImages className="text-5xl text-indigo-400 mb-4" />}
                    {category === "Videos" && <FaPlayCircle className="text-5xl text-indigo-400 mb-4" />}

                    {/* Image */}
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}

                    {/* Video */}
                    {category === "Videos" && item.videoUrl && (
                      <iframe
                        className="w-full h-40 rounded-lg"
                        src={item.videoUrl}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}

                    {/* Title & Description */}
                    <h4 className="text-lg font-semibold mb-2 text-white">{item.title}</h4>
                    <p className="text-center text-sm text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* View More */}
              <div className="text-center mt-6">
                <a href="#" className="text-indigo-600 font-semibold hover:underline">
                  View All {category}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TextMarketingResources;
