import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

// Helper component to render the study plan
const StudyPlanDisplay = ({ plan }) => {
  // Defensive check in case the AI response is malformed
  if (!plan || !plan.content || !plan.content.weekly_plan) {
    return <p className="text-red-400 text-center mt-8">Could not display the plan. The format is incorrect.</p>;
  }

  return (
    <div className="mt-8 bg-white/10 p-6 rounded-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-purple-300 mb-4">{plan.title}</h2>
      {plan.content.weekly_plan.map((week) => (
        <div key={week.week} className="mb-6">
          <h3 className="text-2xl font-semibold border-b-2 border-purple-400/50 pb-2 mb-3">Week {week.week}</h3>
          <div className="space-y-4">
            {week.daily_schedule.map((day) => (
              <div key={day.day} className="bg-gray-800/50 p-4 rounded-md">
                <h4 className="text-lg font-bold text-white">{day.day}: <span className="font-normal text-gray-300">{day.topic}</span></h4>
                
                {/* --- UPDATED TASK RENDERING LOGIC --- */}
                <div className="mt-2 space-y-3 pl-2">
                  {day.tasks && day.tasks.map((task, index) => (
                    <div key={index}>
                      <p className="text-gray-200">&#8227; {task.description}</p>
                      {task.resources && task.resources.length > 0 && (
                        <div className="pl-6 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          {task.resources.map((resource, resIndex) => (
                            <a
                              key={resIndex}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                            >
                              &#128279; {resource.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* --- END UPDATED LOGIC --- */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

function CreatePlan() {
  const [topics, setTopics] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Secure the page and get user ID
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setGeneratedPlan(null);

    try {
      const response = await axios.post('http://localhost:3001/create-plan', {
        topics: topics.split(',').map(topic => topic.trim()),
        duration,
        userId: user.id,
      });
      setGeneratedPlan(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to generate plan. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-gray-900"></div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight">AI Study Planner</h1>
          <p className="mt-2 text-gray-400 text-lg">Tell our AI what you want to learn, and we'll craft the perfect schedule for you.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topics" className="block text-sm font-medium text-gray-300 mb-2">
                Topics to Learn (comma-separated)
              </label>
              <input
                id="topics" value={topics} onChange={(e) => setTopics(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., React Hooks, Advanced CSS, JavaScript Algorithms"
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
                Study Duration
              </label>
              <input
                id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., 4 weeks, 1 month, 10 days"
              />
            </div>
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <div className="flex justify-end items-center space-x-4">
              <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Back to Dashboard</Link>
              <button
                type="submit" disabled={loading}
                className="px-8 py-3 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-600/30"
              >
                {loading ? 'Generating Plan...' : 'Generate Plan'}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="text-center mt-8">
             <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-purple-400 mx-auto"></div>
             <p className="mt-2 text-gray-400">Our AI is building your schedule...</p>
          </div>
        )}

        {generatedPlan && <StudyPlanDisplay plan={generatedPlan} />}
      </div>
    </div>
  );
}

export default CreatePlan;