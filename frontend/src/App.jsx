import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePlan from './pages/CreatePlan'; 
import PlanDetails from './pages/PlanDetails';
import Assessment from './pages/Assessment';
import AllPlans from './pages/AllPlans';
import Schedule from './pages/Schedule';
import Performance from './pages/Performance';

function Home() {
  // ... Home component code remains the same
  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 animate-gradient-x"></div>
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-shadow animate-glow">Study Sync AI</h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-8">
          Revolutionize your learning with an AI-powered study planner that adapts to you. Create personalized schedules, track your progress, and achieve your academic goals smarter, not harder.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"><h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3><p className="text-gray-300">Our AI crafts the perfect study plan based on your courses and deadlines.</p></div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"><h3 className="text-xl font-semibold mb-2">Progress Tracking</h3><p className="text-gray-300">Visualize your journey and stay motivated with insightful analytics.</p></div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"><h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3><p className="text-gray-300">Our planner adjusts in real-time to your performance and feedback.</p></div>
        </div>
        <div className="space-x-4">
          <Link to="/register" className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg">Get Started</Link>
          <Link to="/login" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">Login</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/plan/:planId" element={<PlanDetails />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/my-plans" element={<AllPlans />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </div>
  );
}

export default App;