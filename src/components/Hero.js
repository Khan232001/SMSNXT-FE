import React, { useState, useEffect } from "react";

const Hero = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading and then show real messages after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          id: 1,
          user: "Dental Center",
          text: "Hi Chris! Thanks for coming in for your semi-annual teeth cleaning program, we loved seeing you. We'd really appreciate it if you left us a review on Google. Click on our profile below.",
        },
        {
          id: 2,
          user: "You",
          text: "Yes, for sure. I will do this right away. You all do great work.",
        },
        {
          id: 3,
          user: "You",
          text: "...just left you 5 stars!",
        },
      ]);
      setLoading(false);
    }, 1000); // Simulate a 3-second loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-navy text-white py-32">
      <div className="absolute inset-0 bg-navy-900"></div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#172554"
            fillOpacity="1"
            d="M0,192L480,288C960,384,1440,288,1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto px-20 gap-8">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6 text-black">
            SMS Marketing Made Easy
          </h1>
          <p className="text-lg mb-8 text-black">
            Get started today with a FREE 14-day trial and see why Textedly is
            the easiest way to instantly send 10 or 100,000 bulk SMS and MMS
            mobile text messages on the #1 rated texting platform.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex justify-center lg:justify-start items-center"
          >
            <div className="relative w-full max-w-lg">
              <input
                type="email"
                className="py-3 px-6 w-full rounded-full shadow-lg text-black focus:outline-none"
                placeholder="Enter your email address"
                required
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-blue-400 text-black py-2 px-6 rounded-full shadow-lg hover:bg-blue-300 font-semibold"
                style={{ margin: "4px" }}
              >
                Start Your Free Trial
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-400 mt-2">No credit card required</p> {/* Added line */}
        </div>

        {/* Right Phone UI */}
        <div className="relative w-64 h-[500px] bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          {/* Phone Header */}
          <div className="bg-black-500 text-white px-4 py-2 text-lg font-semibold">
            Chat with Chris
          </div>

          {/* Chat Screen */}
          <div className="absolute inset-0 top-10 p-4 bg-gray-100 overflow-y-auto">
            <div className="space-y-4">
              {loading
                ? // Skeleton Loader (while loading messages)
                  Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-start animate-pulse"
                    >
                      <div className="bg-gray-300 py-2 px-4 rounded-lg shadow w-[70%] h-10"></div>
                    </div>
                  ))
                : // Actual Messages
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col items-${msg.user === "You" ? "end" : "start"}`}
                    >
                      <div
                        className={`py-2 px-4 rounded-lg shadow text-black max-w-[70%] ${
                          msg.user === "You" ? "bg-black-500 text-black bg-blue-100" : "bg-white"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
