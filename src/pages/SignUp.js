import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login3 = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Handle the signup form submission
  const handleSignup = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required!");
      return;
    }
    if (!termsChecked || !privacyChecked) {
      alert("You must agree to the terms and privacy policy!");
      return;
    }

    // Signup logic (e.g., API call)
    alert("Signup successful! Redirecting to dashboard...");
    navigate("/dashboard"); // Navigate to dashboard after successful signup
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Signup Form */}
      <div className="signup-left w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="logo mb-6 text-2xl font-bold text-primary text-center">
          BYT
        </div>
        <h2 className="text-3xl font-bold mb-4 text-primary text-center">
          Sign Up
        </h2>
        <hr className="w-2/3 border-t-2 border-primary mb-6" />{" "}
        {/* Line beneath the heading */}
        <form className="w-full max-w-md" onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@me.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">
                I agree to the{" "}
                <a href="/terms" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">
                I agree to the{" "}
                <a href="/policy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Gradient Background with Wave Effect */}
      <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-8 wave-background">
        <div className="text-white max-w-md relative z-10">
          <h3 className="text-4xl font-bold mb-4">Welcome to BYT!</h3>
          <p className="text-lg">
            Sign up to create and manage your SMS campaigns effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login3;
