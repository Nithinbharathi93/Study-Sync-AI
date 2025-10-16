import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm 
                 transform hover:scale-105 hover:border-purple-400 transition-all duration-300">
    <div className="text-4xl mb-4 text-purple-400">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default FeatureCard;