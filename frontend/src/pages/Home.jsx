import { Link } from 'react-router-dom';

function Home() {
  // Helper component for feature cards
  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm transform hover:scale-105 hover:border-purple-400 transition-all duration-300">
      <div className="text-4xl mb-4 text-purple-400">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-x-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/40 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold tracking-tighter">
            Study Sync AI
          </div>
          <nav className="space-x-4">
            <Link to="/login" className="font-semibold px-4 py-2 hover:text-purple-300 transition-colors">Login</Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 font-bold py-2 px-5 rounded-lg transition-colors">
              Get Started
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center text-center pt-20 pb-28">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
            Stop Guessing, Start <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Studying Smarter</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10">
            Study Sync AI is your personal academic assistant. We leverage artificial intelligence to create hyper-personalized study plans, generate assessments, and track your performance, so you can achieve your goals faster.
          </p>
          <Link to="/register" className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg shadow-white/10">
            Start Learning for Free
          </Link>
        </main>
      </div>

      {/* Full Features Section */}
      <section className="bg-black/20 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">From planning your first session to acing your final exam, we've got you covered.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
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
      
      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Get Your Personalized Plan in 3 Steps</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                  <div className="w-24 h-24 flex items-center justify-center bg-purple-500/20 border-2 border-purple-500 rounded-full text-3xl font-bold mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-2">Input Your Topics</h3>
                  <p className="text-gray-400">Tell the AI what you need to learn and your available timeframe.</p>
              </div>
              <div className="hidden md:block h-1 w-full bg-gray-700"></div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                  <div className="w-24 h-24 flex items-center justify-center bg-purple-500/20 border-2 border-purple-500 rounded-full text-3xl font-bold mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-2">Generate Your Plan</h3>
                  <p className="text-gray-400">Receive a complete, structured schedule with tasks and resources.</p>
              </div>
              <div className="hidden md:block h-1 w-full bg-gray-700"></div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                  <div className="w-24 h-24 flex items-center justify-center bg-purple-500/20 border-2 border-purple-500 rounded-full text-3xl font-bold mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-2">Track & Assess</h3>
                  <p className="text-gray-400">Follow your plan, take quizzes, and watch your performance improve.</p>
              </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-purple-600/10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Study Habits?</h2>
            <p className="text-gray-300 mb-8">Join thousands of students achieving their academic goals with Study Sync AI.</p>
            <Link to="/register" className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg shadow-white/10">
              Sign Up for Free
            </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Study Sync AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;