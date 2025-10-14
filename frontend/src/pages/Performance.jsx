import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// A reusable stat card component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white/5 p-6 rounded-xl">
    <div className="flex items-center">
      <div className="mr-4 text-3xl">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

function Performance() {
  const [user, setUser] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
      
      try {
        const response = await axios.get(`http://localhost:3001/performance/${session.user.id}`);
        setPerformanceData(response.data);
      } catch (err) {
        console.error("Failed to fetch performance data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
        <p className="ml-4">Loading performance data...</p>
      </div>
    );
  }

  // Calculate stats after data is loaded
  const averageScore = performanceData.assessments.length > 0
    ? Math.round(performanceData.assessments.reduce((acc, a) => acc + a.score, 0) / performanceData.assessments.length)
    : 0;

  const totalPlans = performanceData.plans.length;
  const totalAssessments = performanceData.assessments.length;

  // Format data for the chart
  const chartData = performanceData.assessments.map((a, index) => ({
    name: `Test ${index + 1}`,
    score: a.score,
    date: new Date(a.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8">
          <Link to="/dashboard" className="text-purple-400 hover:text-purple-300">&larr; Back to Dashboard</Link>
        </nav>
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight">Performance Overview</h1>
          <p className="mt-2 text-gray-400 text-lg">Track your progress and see how you're improving over time.</p>
        </div>
        
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Average Score" value={`${averageScore}%`} icon="🎯" />
          <StatCard title="Plans Created" value={totalPlans} icon="📚" />
          <StatCard title="Assessments Taken" value={totalAssessments} icon="📝" />
        </div>

        {/* Score Progress Chart */}
        <div className="bg-white/5 p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-6">Score Progress</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#9F7AEA" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400 py-12">Take an assessment to see your progress chart.</p>
          )}
        </div>

        {/* Assessment History Table */}
        <div className="bg-white/5 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Assessment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4">Plan</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Date Taken</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.assessments.map(assessment => (
                  <tr key={assessment.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">{assessment.studyPlan.title}</td>
                    <td className="p-4 font-bold text-purple-300">{assessment.score}%</td>
                    <td className="p-4 text-gray-400">{new Date(assessment.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {performanceData.assessments.length === 0 && (
              <p className="text-center text-gray-400 py-12">No assessment history yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;