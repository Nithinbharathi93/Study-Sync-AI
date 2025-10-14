import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// A reusable card component for the dashboard features
const DashboardCard = ({ title, description, linkTo, icon }) => (
    <Link to={linkTo} className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600/30 mb-4">
            <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </Link>
);

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [studyPlans, setStudyPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndPlans = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        try {
          const profileResponse = await axios.get(`http://localhost:3001/profile/${session.user.id}`);
          setProfile(profileResponse.data);
          const plansResponse = await axios.get(`http://localhost:3001/study-plans/${session.user.id}`);
          setStudyPlans(plansResponse.data);
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
          navigate('/login');
        }
      }
    };
    fetchSessionAndPlans();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-xl text-purple-300">Welcome back, {profile.username}!</p>
            </div>
            <button
                onClick={handleLogout}
                className="py-2 px-5 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-all"
            >
                Logout
            </button>
        </header>

        {/* --- UPDATED: Dashboard Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard 
                title="AI Insights" 
                description="Generate a new AI-powered study plan."
                linkTo="/create-plan"
                icon="✨"
            />
            <DashboardCard 
                title="My Schedule" 
                description="View your upcoming tasks and weekly schedule."
                linkTo="/schedule" // Future page
                icon="🗓️"
            />
            <DashboardCard 
                title="Assessments" 
                description="Test your knowledge with an AI-generated quiz."
                linkTo="/assessment"
                icon="📝"
            />
            <DashboardCard 
                title="Performance" 
                description="Track your progress and study analytics."
                linkTo="/performance" 
                icon="📊"
            />
        </div>

        <div className="mt-12">
            {/* --- UPDATED: Recent Plans Header --- */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Recent Plans</h2>
                <Link to="/my-plans" className="bg-gray-800 text-sm font-semibold text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    View All
                </Link>
            </div>

            {studyPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studyPlans.slice(0, 3).map((plan) => (
                        <Link to={`/plan/${plan.id}`} key={plan.id} className="block bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-1">
                            <h3 className="text-xl font-semibold text-purple-300 truncate">{plan.title}</h3>
                            <p className="text-sm text-gray-400 mt-1 mb-3">
                                Created on: {new Date(plan.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {plan.topics.map((topic, index) => (
                                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="bg-white/5 p-8 rounded-xl text-center">
                    <p className="text-gray-400">You haven't created any study plans yet.</p>
                    <Link to="/create-plan" className="mt-4 inline-block bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        Create Your First Plan
                    </Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;