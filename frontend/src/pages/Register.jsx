import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import image from '../assets/image.png';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      setMessage(response.data.message);
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Branding and Welcome Message */}
      <div className="relative hidden lg:flex flex-col items-center justify-center text-white p-12">
        <img 
          src={image}
          alt="Study Sync AI Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-500/80"></div>
        <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold tracking-tighter mb-4">
                Study Sync AI
            </h1>
            <p className="text-xl text-gray-300">
                Create your account and unlock your personalized study plan.
            </p>
        </div>
         <div className="absolute bottom-8 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Study Sync AI
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-900">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white">Create an Account</h1>
            <p className="mt-2 text-gray-400">Let's get you started.</p>
          </div>
          
          {message ? (
            <div className="text-center p-4 bg-green-500/20 rounded-lg">
                <p className="font-medium text-green-300">{message}</p>
                <p className="text-sm text-gray-400 mt-2">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  id="username" name="username" type="text" required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="e.g., studious_student"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email" name="email" type="email" autoComplete="email" required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password" name="password" type="password" autoComplete="new-password" required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              <div>
                <button
                  type="submit" disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-purple-600/30"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;