import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; 
import '../Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter valid credentials!');
      return;
    }

    try {
      setIsLoading(true); 
      const response = await api.post('/user/login', {
        email,
        password,
        loginType: 'admin',  
      });

      localStorage.setItem('token', response.data.data.token); 
      localStorage.setItem('user', JSON.stringify(response.data.data.user));

      navigate('/admin/dashboard');  

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Login Form */}
      <div className="login-left w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="logo text-2xl font-bold mb-9 text-primary text-center">BYT</div>

        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Admin Login</h2>
        <hr className="w-2/3 border-t-2 border-primary mb-6" />

        <form className="w-full max-w-md" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email or Username
            </label>
            <input
              id="email"
              type="text"
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

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Keep me logged in</span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={isLoading}  
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-500">or</p>
            <button
              type="button"
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 mt-2 rounded-md hover:bg-gray-200 transition duration-300"
            >
              Continue with Google
            </button>
          </div>
        </form>
      </div>

      {/* Right Side - Gradient Background */}
      <div className="wave-background w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="text-white max-w-md relative z-10">
          <h3 className="text-4xl font-bold mb-4">Plan a Year of SMS Campaigns in Minutes</h3>
          <p className="text-lg mb-4">
            Try our new Campaign Calendar — set up key moments and holiday campaigns today!
          </p>
          <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
            <h4 className="font-bold mb-2">Holiday Campaigns</h4>
            <ul>
              <li className="mb-2">🎉 <strong>New Years Day:</strong> Start the year with compassion.</li>
              <li className="mb-2">🦃 <strong>Thanksgiving:</strong> Share gratitude-filled moments.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
