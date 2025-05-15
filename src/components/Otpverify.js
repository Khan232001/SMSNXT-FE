import { useState, useEffect } from "react";
import { Mail, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
  const [timer, setTimer] = useState(120); // 2 minutes
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
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

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleNext = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("OTP Verified Successfully!");
        navigate("/welcomesmsnxt");
      } else {
        alert(result.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      alert("Something went wrong while verifying OTP.");
    }
  };
  

  const handleResend = async () => {
    if (!email) {
      alert("Email not found. Please try logging in again.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("OTP resent successfully.");
        setTimer(120); // Reset timer
      } else {
        alert(result.message || "Could not resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      alert("Error resending OTP. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Please verify your email
        </h2>
        <p className="text-gray-600 mb-6">
          We have sent a 6-character code to{" "}
          <span className="font-medium text-gray-900">{email}</span>{" "}
          <button className="text-blue-600 hover:underline inline-flex items-center ml-1 text-sm">
            <Edit size={16} className="mr-1" />
            Edit
          </button>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
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
          </span>
          <br />
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`mt-1 ${
              timer > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            } text-sm font-medium`}
          >
            Resend OTP
          </button>
        </p>

        {/* Open Gmail */}
        <div className="flex gap-4 justify-center mt-6">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gmail_48dp.png"
              alt="Gmail"
              className="w-5 h-5"
            />
            Open Gmail
          </a>
        </div>

        {/* Next Button */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
