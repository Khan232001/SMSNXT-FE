import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await api.post('/user/login', {
        email,
        password,
        loginType: 'user',  
      });
  
      localStorage.setItem('token', response.data.data.token); 
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
  
      navigate('/dashboard');  
  
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="login-left w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8">
<<<<<<< HEAD
     
        <div className="logo mb-6 text-2xl font-bold text-primary">
        <img src="/imgs/04.png" alt="logo" className="h-10 w-auto" />
          </div>
=======
        <div className="logo mb-6 text-2xl font-bold text-primary">smsNXT</div>
>>>>>>> main
        <h2 className="text-3xl font-bold mb-4 text-primary text-center">Login</h2>
        <hr className="w-2/3 border-t-2 border-primary mb-6" />

        <form className="w-full max-w-md" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
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

          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Keep me logged in</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="mt-4 text-center">
            <p className="text-gray-500">or</p>
            <button
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 mt-2 rounded-md hover:bg-gray-200 transition duration-300"
            >
              Continue with Google
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/admin/login" className="text-sm text-blue-500 hover:underline">
            Login as Admin
          </Link>
        </div>
        <div className="mt-6 text-center">
<<<<<<< HEAD
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
=======
          <Link to="/sign" className="text-sm text-blue-500 hover:underline">
>>>>>>> main
            Sign Up
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 wave-background">
        <div className="text-white max-w-md text-center lg:text-left">
<<<<<<< HEAD
      
          <h3 className="text-4xl font-bold mb-4">Plan a Year of SMS Campaigns in Minutes</h3>
          
=======
          <h3 className="text-4xl font-bold mb-4">Plan a Year of SMS Campaigns in Minutes</h3>
>>>>>>> main
          <p className="text-lg">Try our new Campaign Calendar — set up key moments and holiday campaigns today!</p>
          <div className="bg-white text-gray-900 p-4 mt-4 rounded-lg">
            <h4 className="font-bold mb-2">Holiday Campaigns</h4>
            <ul>
              <li className="mb-2">🎉 <strong>New Years Day:</strong> Start the year with compassion.</li>
              <li className="mb-2">🦃 <strong>Thanksgiving:</strong> Share gratitude-filled moments.</li>
            </ul>
<<<<<<< HEAD
           
          </div>
          <div className="w-full flex items-center justify-center  mt-6 ">
  <img
    src="/imgs/ffff gif.gif"
    alt="logo"
    className="h-64 w-auto max-w-full object-contain rounded-lg "
  />
</div>

=======
          </div>
>>>>>>> main
        </div>
      </div>
    </div>
  );
};

export default Login;
