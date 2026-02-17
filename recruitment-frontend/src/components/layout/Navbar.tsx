import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-primary-600 border-b-2 border-primary-600'
      : 'text-surface-500 hover:text-surface-800';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 font-display">RecruitATS</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/" className={`px-4 py-2 text-sm font-medium transition-colors ${isActive('/')}`}>
              Vacantes
            </Link>
            <Link to="/admin/jobs" className={`px-4 py-2 text-sm font-medium transition-colors ${isActive('/admin/jobs')}`}>
              <span className="flex items-center gap-1.5"><LayoutDashboard size={16} />Gestion</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}