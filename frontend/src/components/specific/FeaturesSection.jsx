import React from 'react';
import FeatureCard from '../generic/FeatureCard';

const FeaturesSection = () => (
  <section className="bg-black/20 py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Everything You Need to Succeed
      </h2>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
        From planning your first session to acing your final exam, we've got you covered.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        <FeatureCard 
          icon="✨"
          title="AI Study Planner"
          description="Tell us your topics and timeline. Our AI generates a detailed, day-by-day study schedule complete with learning resources."
        />
        <FeatureCard 
          icon="📝"
          title="AI Assessments"
          description="Generate quizzes based on your study plans to test your knowledge, identify weak spots, and prepare for exams."
        />
        <FeatureCard 
          icon="📊"
          title="Performance Dashboard"
          description="Visualize your progress with charts and stats. Track your average scores and see how you improve over time."
        />
        <FeatureCard 
          icon="🗓️"
          title="Personal Task Manager"
          description="Add your own daily to-dos to your schedule, check them off as you go, and stay perfectly organized."
        />
      </div>
    </div>
  </section>
);

export default FeaturesSection;