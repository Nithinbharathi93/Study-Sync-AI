import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePlan from './pages/CreatePlan'; 
import PlanDetails from './pages/PlanDetails';
import Assessment from './pages/Assessment';
import AllPlans from './pages/AllPlans';
import Schedule from './pages/Schedule';
import Performance from './pages/Performance';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
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