import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import JobDetailPage from './pages/JobDetailPage';
import JobManagementPage from './pages/JobManagementPage';

export default function App() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/admin/jobs" element={<JobManagementPage />} />
      </Routes>
    </div>
  );
}