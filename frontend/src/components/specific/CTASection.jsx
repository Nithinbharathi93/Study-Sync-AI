import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => (
  <section className="bg-purple-600/10 py-20 text-center">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Ready to Transform Your Study Habits?
      </h2>
      <p className="text-gray-300 mb-8">
        Join thousands of students achieving their academic goals with Study Sync AI.
      </p>
      <Link to="/register" 
            className="bg-white text-gray-900 font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg 
                       hover:bg-gray-200 transition-transform hover:scale-105 
                       shadow-lg shadow-white/10">
        Sign Up for Free
      </Link>
    </div>
  </section>
);

export default CTASection;