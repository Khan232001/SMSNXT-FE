import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Person, Email, Lock, Phone } from "@mui/icons-material";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    company: "",
    termsChecked: false,
    consentChecked: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { firstName, lastName, email, phoneNumber, password, company, termsChecked, consentChecked } = formData;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !company) {
      setError("All fields are required, including Company!");
      setIsLoading(false);
      return;
    }

    if (!termsChecked) {
      setError("You must agree to the Terms of Service!");
      setIsLoading(false);
      return;
    }

    if (!consentChecked) {
      setError("You must consent to be contacted!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          company,
          role: "user",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        alert("Signup successful! Check your email for OTP.");
        navigate("/otpverify");
      } else {
        setError(result.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
      <div className="w-full flex items-center justify-center  mt-6 ">
  <img
    src="/imgs/04.png"
    alt="logo"
    className="h-21 w-auto max-w-full object-contain rounded-lg "
  />
</div>
        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Sign Up</h2>
        <hr className="w-2/3 border-t-2 border-primary mb-6" />

        <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
          {[
            { name: "firstName", placeholder: "First Name", icon: <Person /> },
            { name: "lastName", placeholder: "Last Name", icon: <Person /> },
            { name: "email", placeholder: "Email", icon: <Email />, type: "email" },
            { name: "phoneNumber", placeholder: "Phone", icon: <Phone />, type: "tel" },
            { name: "password", placeholder: "Password", icon: <Lock />, type: "password" },
          ].map(({ name, placeholder, icon, type = "text" }) => (
            <div key={name} className="relative">
              <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-md border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          ))}

          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 21V7a1 1 0 011-1h16a1 1 0 011 1v14M9 21V9h6v12M9 3h6M9 7h.01M15 7h.01" />
              </svg>
            </span>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-md border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsChecked"
              checked={formData.termsChecked}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms & Privacy
              </a>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="consentChecked"
              checked={formData.consentChecked}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-700">I consent to be contacted.</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 wave-background">
        <div className="text-white max-w-md text-center lg:text-left">
          <h3 className="text-4xl font-bold mb-4">Plan a Year of SMS Campaigns in Minutes</h3>
          <p className="text-lg">Try our new Campaign Calendar — set up key moments and holiday campaigns today!</p>
          <div className="bg-white text-gray-900 p-4 mt-4 rounded-lg">
            <h4 className="font-bold mb-2">Holiday Campaigns</h4>
            <ul>
              <li className="mb-2">🎉 <strong>New Years Day:</strong> Start the year with compassion.</li>
              <li className="mb-2">🦃 <strong>Thanksgiving:</strong> Share gratitude-filled moments.</li>
            </ul>
          </div>
          <div className="w-full flex items-center justify-center  mt-6 ">
  <img
    src="/imgs/ffff gif.gif"
    alt="logo"
    className="h-64 w-auto max-w-full object-contain rounded-lg "
  />
</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
