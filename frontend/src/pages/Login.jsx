import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { data } = await axios.post('http://localhost:3001/login', formData);
      
      const { session } = data;
      await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
      });

      navigate('/dashboard');

    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Branding and Welcome Message */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-gray-800 text-white p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-20"></div>
        <div className="relative z-10 text-center">
            {/* --- UPDATED LINE --- */}
            <h1 className="text-5xl font-bold tracking-tighter mb-4">
                Study Sync AI
            </h1>
            {/* --- UPDATED LINE --- */}
            <p className="text-xl text-gray-300">
                Your AI-powered study planner. Log in to get started.
            </p>
        </div>
         <div className="absolute bottom-8 text-sm text-gray-400">
            {/* --- UPDATED LINE --- */}
            &copy; {new Date().getFullYear()} Study Sync AI
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-900">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white">Login</h1>
            <p className="mt-2 text-gray-400">Enter your credentials to continue.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-purple-400 hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-purple-600/30"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;