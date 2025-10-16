import React from 'react';
import Header from '../components/specific/Header';
import HeroSection from '../components/specific/HeroSection';
import FeaturesSection from '../components/specific/FeaturesSection';
import HowItWorksSection from '../components/specific/HowItWorksSection';
import CTASection from '../components/specific/CTASection';
import Footer from '../components/specific/Footer';

function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white font-sans overflow-x-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full 
                      bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/40 z-0">
      </div>
      
      {/* All content wrapped to ensure proper flow and stacking context */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default Home;