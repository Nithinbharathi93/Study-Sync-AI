import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Assessment() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user and their study plans
  useEffect(() => {
    const fetchUserAndPlans = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
        try {
          const plansResponse = await axios.get(`http://localhost:3001/study-plans/${session.user.id}`);
          setPlans(plansResponse.data);
        } catch (err) {
          setError('Could not fetch your study plans.');
        }
      }
    };
    fetchUserAndPlans();
  }, [navigate]);

  const handleGenerateTest = async () => {
    if (!selectedPlanId) {
      setError('Please select a study plan first.');
      return;
    }
    setLoading(true);
    setError('');
    setQuiz(null);
    try {
      const response = await axios.post('http://localhost:3001/generate-assessment', { planId: selectedPlanId });
      setQuiz(response.data);
      setAnswers({}); // Reset answers for the new quiz
    } catch (err) {
      setError('Failed to generate the test. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex });
  };

  const handleSubmitTest = async () => {
    setLoading(true);
    let correctAnswers = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswerIndex) {
        correctAnswers++;
      }
    });
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    try {
      await axios.post('http://localhost:3001/submit-assessment', {
        score: calculatedScore,
        userId: user.id,
        planId: selectedPlanId,
      });
      setScore(calculatedScore);
      setQuiz(null); // Hide quiz after submission
    } catch (err) {
      setError('Failed to submit your score.');
    } finally {
      setLoading(false);
    }
  };
  
  // Renders the initial plan selection view
  const renderPlanSelection = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Select a Study Plan</h2>
      <p className="text-gray-400 mb-6">Choose one of your plans to generate an assessment.</p>
      <select
        value={selectedPlanId}
        onChange={(e) => setSelectedPlanId(e.target.value)}
        className="w-full max-w-lg px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
      >
        <option value="">-- Select a Plan --</option>
        {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.title}</option>)}
      </select>
      <button onClick={handleGenerateTest} disabled={loading} className="px-8 py-3 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50">
        {loading ? 'Generating...' : 'Generate Test'}
      </button>
    </div>
  );

  // Renders the quiz questions
  const renderQuiz = () => (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h2>
      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="bg-gray-800/50 p-6 rounded-lg mb-4">
          <p className="font-semibold mb-3">{qIndex + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((option, oIndex) => (
              <label key={oIndex} className={`block p-3 rounded-md cursor-pointer transition-colors ${answers[qIndex] === oIndex ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                <input type="radio" name={`question-${qIndex}`} value={oIndex} onChange={() => handleAnswerSelect(qIndex, oIndex)} className="hidden" />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmitTest} disabled={loading} className="w-full mt-6 px-8 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
        {loading ? 'Submitting...' : 'Submit Test'}
      </button>
    </div>
  );

  // Renders the final score
  const renderScore = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Assessment Complete!</h2>
      <p className="text-6xl font-bold text-purple-400 mb-6">{score}%</p>
      <p className="text-gray-400 mb-6">Your score has been saved to your performance dashboard.</p>
      <button onClick={() => { setScore(null); setSelectedPlanId(''); }} className="px-8 py-3 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700">
        Take Another Test
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link to="/dashboard" className="text-purple-400 hover:text-purple-300">&larr; Back to Dashboard</Link>
        </nav>
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {score !== null ? renderScore() : quiz ? renderQuiz() : renderPlanSelection()}
        </div>
      </div>
    </div>
  );
}

export default Assessment;