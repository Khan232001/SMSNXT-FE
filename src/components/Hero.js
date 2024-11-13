import React, { useState } from "react";
import Features from "./Features";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section className="relative bg-navy text-white py-32 pb--9">
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
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold leading-tight mb-6 text-black">
          SMS Marketing Made Easy
        </h1>
        <p className="text-lg mb-8 text-black">
          Get started today with a FREE 14-day trial and see why Textedly is the
          easiest way to instantly send 10 or 100,000 bulk SMS and MMS mobile
          text messages on the #1 rated texting platform.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center"
        >
          <div className="relative w-full max-w-lg">
            <input
              type="email"
              className="py-3 px-6 w-full rounded-full shadow-lg text-black focus:outline-none"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 bg-blue-400 text-black py-2 px-6 rounded-full shadow-lg hover:bg-blue-300 font-semibold"
              style={{ margin: "4px" }}
            >
              Start Your Free Trial
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
