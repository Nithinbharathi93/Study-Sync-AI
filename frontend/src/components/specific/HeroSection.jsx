import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-20 pb-28">
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
      Stop Guessing, Start{' '}
      <span className="bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 to-pink-500">
        Studying Smarter
      </span>
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
      Study Sync AI is your personal academic assistant. We leverage artificial 
      intelligence to create hyper-personalized study plans, generate assessments, 
      and track your performance, so you can achieve your goals faster.
    </p>
    <Link to="/register" 
          className="bg-white text-gray-900 font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg 
                     hover:bg-gray-200 transition-transform hover:scale-105 
                     shadow-lg shadow-white/10">
      Start Learning for Free
    </Link>
  </main>
);

export default HeroSection;