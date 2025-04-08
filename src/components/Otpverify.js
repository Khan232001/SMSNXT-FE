import { useState, useEffect } from "react";
import { Mail, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function EmailVerification() {
  const [timer, setTimer] = useState(120); // 2 minutes
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec < 10 ? "0" : ""}${sec}s`;
  };

  const handleNext = () => {
    // Perform OTP validation if needed, then:
    navigate("/dashboard"); // Replace with your actual next route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Please verify your email</h2>
        <p className="text-gray-600 mb-6">
          We have sent a 6-character code to{" "}
          <span className="font-medium text-gray-900">{email}</span>{" "}
          <button className="text-blue-600 hover:underline inline-flex items-center ml-1 text-sm">
            <Edit size={16} className="mr-1" />
            Edit
          </button>
        </p>

        {/* OTP boxes */}
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              maxLength={1}
              type="text"
              className="w-12 h-12 text-center border rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        {/* Timer and resend */}
        <p className="text-sm text-gray-600">
          Didn't get the verification code?
          <br />
          <span className="text-gray-800 font-semibold">
            Resend code in {formatTime(timer)}
          </span>{" "}
          or{" "}
          <button className="text-blue-600 hover:underline text-sm font-medium">
            Edit email
          </button>
        </p>

        {/* Email buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow hover:shadow-md transition">
            <img src="https://www.gstatic.com/images/branding/product/1x/gmail_48dp.png" alt="Gmail" className="w-5 h-5" />
            Open Gmail
          </button>
        </div>

        {/* NEXT Button */}
        <div className="mt-6">
        <Link to='/welcomesmsnxt'>
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Next
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
