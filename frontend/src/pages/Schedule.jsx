import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Schedule() {
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user and schedule data
  useEffect(() => {
    const fetchUserAndSchedule = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
      
      try {
        setLoading(true);
        const date = new Date(selectedDate.setHours(0, 0, 0, 0)); // Normalize date to start of day
        const response = await axios.post('http://localhost:3001/schedule', { userId: session.user.id, date: date.toISOString() });
        setSchedule(response.data);
      } catch (err) {
        console.error("Failed to fetch schedule", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndSchedule();
  }, [navigate, selectedDate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const response = await axios.post('http://localhost:3001/tasks', { scheduleId: schedule.id, title: newTaskTitle });
    setSchedule({ ...schedule, tasks: [...schedule.tasks, response.data] });
    setNewTaskTitle('');
  };
  
  const handleToggleTask = async (taskId, currentStatus) => {
    const response = await axios.patch(`http://localhost:3001/tasks/${taskId}`, { isCompleted: !currentStatus });
    const updatedTasks = schedule.tasks.map(task => task.id === taskId ? response.data : task);
    setSchedule({ ...schedule, tasks: updatedTasks });
  };

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3001/tasks/${taskId}`);
    const filteredTasks = schedule.tasks.filter(task => task.id !== taskId);
    setSchedule({ ...schedule, tasks: filteredTasks });
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link to="/dashboard" className="text-purple-400 hover:text-purple-300">&larr; Back to Dashboard</Link>
        </nav>
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight">My Schedule</h1>
          <p className="mt-2 text-gray-400 text-lg">Manage your daily tasks and stay on track.</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0">Tasks for: {selectedDate.toLocaleDateString()}</h2>
            <input 
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {loading ? <p>Loading tasks...</p> : (
            <div>
              {/* Task List */}
              <div className="space-y-3 mb-6">
                {schedule && schedule.tasks.map(task => (
                  <div key={task.id} className="flex items-center bg-gray-800/50 p-3 rounded-lg">
                    <input 
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleToggleTask(task.id, task.isCompleted)}
                      className="h-6 w-6 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className={`ml-4 flex-grow ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
                    <button onClick={() => handleDeleteTask(task.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                      &#x1F5D1; {/* Trash Can Icon */}
                    </button>
                  </div>
                ))}
                {schedule && schedule.tasks.length === 0 && (
                  <p className="text-center text-gray-400 py-4">No tasks for this day. Add one below!</p>
                )}
              </div>

              {/* Add Task Form */}
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input 
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-grow w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button type="submit" className="px-6 py-3 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700">Add</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;