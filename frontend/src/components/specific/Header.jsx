import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
        <div className="text-2xl font-bold tracking-tighter">
          <Link to="/">Study Sync AI</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/login" 
                className="font-semibold px-4 py-2 hover:text-purple-300 transition-colors">
            Login
          </Link>
          <Link to="/register" 
                className="bg-purple-600 hover:bg-purple-700 font-bold py-2 px-5 
                           rounded-lg transition-colors">
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/80 backdrop-blur-md rounded-lg p-4 mt-2">
          <nav className="flex flex-col items-center space-y-4">
            <Link to="/login" className="font-semibold py-2 hover:text-purple-300 transition-colors w-full text-center">
              Login
            </Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 font-bold py-2 px-5 rounded-lg transition-colors w-full text-center">
              Get Started
            </Link>
          </nav>
        </div>
      )}
      </div>
    </>
  );
};

export default Header;