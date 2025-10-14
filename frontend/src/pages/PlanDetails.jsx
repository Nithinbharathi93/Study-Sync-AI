import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../supabaseClient';

function PlanDetails() {
  const { planId } = useParams(); // Get the plan ID from the URL
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Secure the page
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkUser();

    // Fetch the specific study plan
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/study-plan/${planId}`);
        setPlan(response.data);
      } catch (err) {
        setError('Failed to load study plan. It might not exist or you may not have permission to view it.'+err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
        <p className="ml-4">Loading your plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
        <Link to="/dashboard" className="mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700">
            Back to Dashboard
        </Link>
      </div>
    );
  }

  // Handle case where plan or its content is not available yet or structured incorrectly
  if (!plan || !plan.content || !plan.content.weekly_plan) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <p className="text-red-400 text-lg">Study plan data is unavailable or malformed.</p>
        <Link to="/dashboard" className="mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700">
            Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link to="/dashboard" className="text-purple-400 hover:text-purple-300">&larr; Back to Dashboard</Link>
        </nav>
        
        <div className="bg-white/5 p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-purple-300 mb-2">{plan.title}</h1>
          <p className="text-sm text-gray-400 mb-6">
            Created on: {new Date(plan.createdAt).toLocaleDateString()}
          </p>

          {plan.content.weekly_plan.map((week) => (
            <div key={week.week} className="mb-8">
              <h2 className="text-3xl font-semibold border-b-2 border-purple-400/50 pb-2 mb-4">Week {week.week}</h2>
              <div className="space-y-5">
                {week.daily_schedule.map((day) => (
                  <div key={day.day} className="bg-gray-800/60 p-4 rounded-lg">
                    {/* Assuming day.topic is still a direct string */}
                    <h3 className="text-xl font-bold text-white">{day.day}: <span className="font-normal text-gray-300">{day.topic}</span></h3>
                    
                    {/* --- UPDATED RENDERING FOR TASKS --- */}
                    <div className="mt-2 space-y-3 pl-2">
                      {day.tasks && day.tasks.map((task, index) => ( // Check if day.tasks exists
                        <div key={index}>
                          <p className="text-gray-200">&#8227; {task.description}</p>
                          {task.resources && task.resources.length > 0 && ( // Check if resources exist and are not empty
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
                    {/* --- END UPDATED RENDERING --- */}

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;