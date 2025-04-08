import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Person, Email, Lock, Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    termsChecked: false,
    consentChecked: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      alert("All fields are required!");
      return;
    }

    if (!formData.termsChecked) {
      alert("You must agree to the Terms of Service!");
      return;
    }

    if (!formData.consentChecked) {
      alert("You must consent to being contacted!");
      return;
    }

    // Save email for later use in OTP verification
    localStorage.setItem("userEmail", formData.email);

    alert("Signup successful! Redirecting to email verification...");

    // Go to OTP verification
    navigate("/otpverify");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-blue-700 to-cyan-500">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-96 text-white">
        <h2 className="text-3xl font-bold text-center">
          Join <span className="text-yellow-400">NXT</span>
        </h2>
        <p className="text-sm text-center text-gray-200">
          Revolutionizing Business Communication 🚀
        </p>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          {[
            { name: "firstName", placeholder: "First Name", icon: <Person /> },
            { name: "lastName", placeholder: "Last Name", icon: <Person /> },
            { name: "email", placeholder: "Email Address", icon: <Email />, type: "email" },
            { name: "phone", placeholder: "Phone Number", icon: <Phone />, type: "tel" },
            { name: "password", placeholder: "Password", icon: <Lock />, type: "password" },
          ].map(({ name, placeholder, icon, type = "text" }) => (
            <div key={name} className="relative">
              <span className="absolute left-3 top-3 text-gray-300">{icon}</span>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 rounded-lg bg-white/10 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          ))}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsChecked"
              checked={formData.termsChecked}
              onChange={handleChange}
              required
            />
            <label className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-yellow-400 hover:underline">
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
            <label className="text-sm">I consent to be contacted.</label>
          </div>
          <Link to='/signupquest'>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg"
          >
            Sign Up
          </button>
          </Link>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
