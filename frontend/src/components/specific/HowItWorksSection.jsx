import React from 'react';
import StepCircle from '../generic/StepCircle';

const HowItWorksSection = () => (
  <section className="py-24">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-16">
        Get Your Personalized Plan in 3 Steps
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center max-w-xs">
          <StepCircle number={1} />
          <h3 className="text-xl font-semibold mb-2">Input Your Topics</h3>
          <p className="text-gray-400">
            Tell the AI what you need to learn and your available timeframe.
          </p>
        </div>
        
        {/* Mobile Divider */}
        <div className="md:hidden h-12 w-px bg-gray-700"></div>
        {/* Desktop Divider */}
        <div className="hidden md:block flex-grow mt-12 h-1 bg-gray-700 rounded-full mx-4"></div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center max-w-xs">
          <StepCircle number={2} />
          <h3 className="text-xl font-semibold mb-2">Generate Your Plan</h3>
          <p className="text-gray-400">
            Receive a complete, structured schedule with tasks and resources.
          </p>
        </div>
        
        {/* Mobile Divider */}
        <div className="md:hidden h-12 w-px bg-gray-700"></div>
        {/* Desktop Divider */}
        <div className="hidden md:block flex-grow mt-12 h-1 bg-gray-700 rounded-full mx-4"></div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center max-w-xs">
          <StepCircle number={3} />
          <h3 className="text-xl font-semibold mb-2">Track & Assess</h3>
          <p className="text-gray-400">
            Follow your plan, take quizzes, and watch your performance improve.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;