import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Playwrite IE font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function MainLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <nav style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,248,255,0.92) 100%)',
        borderBottom: '1px solid rgba(205,123,79,0.15)',
        boxShadow: '0 2px 8px rgba(19,25,49,0.06)',
        backdropFilter: 'blur(12px)',
      }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between gap-2">
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.3s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <img
              src="/images/logotalentifysv.png"
              alt="Talentify sv Logo"
              className="h-7 sm:h-10 w-auto rounded-lg"
            />
            <span className="text-[#131931] text-sm sm:text-lg font-bold tracking-tight hidden sm:inline" style={{
              fontFamily: "'Playwrite IE', serif",
            }}>Talentify sv</span>
          </Link>

          <div className="flex gap-2 sm:gap-4 items-center flex-wrap justify-end">
            <Link
              to="/admin/vacantes"
              className="text-[#131931] text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-md hover:text-[#CD7B4F] hover:bg-[rgba(205,123,79,0.08)] transition-all"
            >
              Vacantes
            </Link>

            <Link
              to="/admin/kanban"
              className="text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #131931 0%, #1F9DB9 100%)',
              }}
            >
              Kanban
            </Link>

            {isAdmin && (
              <Link
                to="/admin/usuarios"
                className="text-[#131931] text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-md hover:text-[#CD7B4F] hover:bg-[rgba(205,123,79,0.08)] transition-all"
              >
                Usuarios
              </Link>
            )}

            <span className="text-[#131931] text-xs sm:text-sm font-semibold pl-2 sm:pl-3 border-l border-[rgba(205,123,79,0.2)] whitespace-nowrap">
              {user?.nombre}
            </span>

            <button
              onClick={handleLogout}
              className="bg-white border border-[#CD7B4F] rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-[#CD7B4F] font-bold cursor-pointer hover:bg-[rgba(205,123,79,0.08)] transition-all whitespace-nowrap"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
