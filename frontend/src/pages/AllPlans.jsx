import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function AllPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPlans = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        try {
          const plansResponse = await axios.get(`http://localhost:3001/study-plans/${session.user.id}`);
          setPlans(plansResponse.data);
        } catch (err) {
          setError('Could not fetch your study plans.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserAndPlans();
  }, [navigate]);

  // --- NEW: Delete Handler ---
  const handleDeletePlan = async (planId, e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop the event from bubbling up to the Link
    
    // Simple confirmation dialog
    if (window.confirm('Are you sure you want to delete this plan and all its assessments? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:3001/study-plan/${planId}`);
        // Remove the plan from the state to update the UI instantly
        setPlans(plans.filter(p => p.id !== planId));
      } catch (err) {
        setError('Failed to delete the plan. Please try again.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
        <p className="ml-4">Loading plans...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
            <Link to="/dashboard" className="text-purple-400 hover:text-purple-300">&larr; Back to Dashboard</Link>
        </nav>
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight">My Study Plans</h1>
          <p className="mt-2 text-gray-400 text-lg">Here is a complete list of all the study plans you've generated.</p>
        </div>
        
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              // The card itself is still a link to the details page
              <Link to={`/plan/${plan.id}`} key={plan.id} className="relative group block bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
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
                {/* --- NEW: Delete Button --- */}
                <button 
                  onClick={(e) => handleDeletePlan(plan.id, e)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Plan"
                >
                  &#x1F5D1; {/* Trash Can Icon */}
                </button>
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
  );
}

export default AllPlans;